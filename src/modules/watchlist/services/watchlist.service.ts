import type {
  Token,
  Timeframe,
  TokenHighLow,
  DexScreenerPair,
  DexScreenerSearchResponse,
} from '../types/token.interface'
import { createHttpClient } from '@/config/http-client'

const httpClient = createHttpClient({
  baseUrl: 'https://api.dexscreener.com',
})

// Default tokens to load on startup (pair addresses)
const DEFAULT_PAIRS: { chainId: string; pairAddress: string }[] = [
  { chainId: 'ethereum', pairAddress: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640' }, // ETH/USDC Uniswap v3
  { chainId: 'ethereum', pairAddress: '0x4585fe77225b41b697c938b018e2ac67ac5a20c0' }, // WBTC/ETH Uniswap v3
  { chainId: 'solana', pairAddress: '8sLbNZoA1cfnvMJLPfp98ZLAnFSYCFApfJKMbiXNLwxj' }, // SOL/USDC Raydium
  { chainId: 'ethereum', pairAddress: '0xa43fe16908251ee70ef74718545e4fe6c5ccec9f' }, // PEPE/WETH Uniswap v2
]

/**
 * Map DexScreener pair to our Token interface.
 * Uses AbortController per project rules.
 */
function mapPairToToken(pair: DexScreenerPair): Token {
  const price = parseFloat(pair.priceUsd || '0')
  const change = pair.priceChange.h24 ?? 0

  return {
    id: `${pair.chainId}:${pair.pairAddress}`,
    name: pair.baseToken.name,
    symbol: pair.baseToken.symbol,
    icon: pair.info?.imageUrl || '',
    price,
    change24h: change,
    high: price * (1 + Math.abs(pair.priceChange.h1 ?? 0) / 100),
    low: price * (1 - Math.abs(pair.priceChange.h1 ?? 0) / 100),
    volume: pair.volume.h24 ?? 0,
    tvl: pair.liquidity?.usd ?? 0,
    trend: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral',
    pairAddress: pair.pairAddress,
    chainId: pair.chainId,
    dexId: pair.dexId,
    dexUrl: pair.url,
  }
}

/**
 * Fetch pairs by chain + pair address
 */
export async function fetchPairsByAddress(
  chainId: string,
  pairAddress: string,
  signal?: AbortSignal
): Promise<DexScreenerPair[]> {
  const data = await httpClient.get<{ pairs: DexScreenerPair[] }>(
    `/latest/dex/pairs/${chainId}/${pairAddress}`,
    { signal }
  )
  return data.pairs ?? []
}

/**
 * Fetch default token list
 */
export async function fetchTokens(signal?: AbortSignal): Promise<Token[]> {
  const results: Token[] = []

  // Fetch all default pairs in parallel
  const fetches = DEFAULT_PAIRS.map((p) =>
    fetchPairsByAddress(p.chainId, p.pairAddress, signal)
      .then((pairs) => {
        if (pairs.length > 0) results.push(mapPairToToken(pairs[0]))
      })
      .catch(() => {
        /* skip failed fetches silently */
      })
  )

  await Promise.all(fetches)
  return results
}

/**
 * Search for DEX pairs by query (token name, symbol, or address)
 */
export async function searchTokens(
  query: string,
  signal?: AbortSignal
): Promise<Token[]> {
  const data = await httpClient.get<DexScreenerSearchResponse>(
    '/latest/dex/search',
    { params: { q: query }, signal }
  )

  // Deduplicate by base token symbol, keep highest liquidity pair
  const seen = new Map<string, DexScreenerPair>()
  for (const pair of data.pairs ?? []) {
    const key = pair.baseToken.symbol
    const existing = seen.get(key)
    if (
      !existing ||
      (pair.liquidity?.usd ?? 0) > (existing.liquidity?.usd ?? 0)
    ) {
      seen.set(key, pair)
    }
  }

  return Array.from(seen.values())
    .slice(0, 10)
    .map(mapPairToToken)
}

/**
 * Compute high/low based on price change per timeframe from DexScreener.
 * DexScreener provides: m5, h1, h6, h24 price changes.
 * We map our timeframes: 1h→h1, 4h→h6 (closest), 24h→h24, 7d→h24*2 (estimate).
 */
const TIMEFRAME_MAP: Record<Timeframe, keyof DexScreenerPair['priceChange']> = {
  '1h': 'h1',
  '4h': 'h6',
  '24h': 'h24',
  '7d': 'h24',
}

const TIMEFRAME_VOLATILITY: Record<Timeframe, number> = {
  '1h': 1,
  '4h': 1.5,
  '24h': 2,
  '7d': 4,
}

export async function fetchTokenHighLow(
  tokens: Token[],
  timeframe: Timeframe
): Promise<TokenHighLow[]> {
  // Re-fetch pairs to get fresh priceChange data
  const results: TokenHighLow[] = []

  for (const token of tokens) {
    try {
      const pairs = await fetchPairsByAddress(token.chainId, token.pairAddress)
      if (pairs.length > 0) {
        const pair = pairs[0]
        const price = parseFloat(pair.priceUsd || '0')
        const changeKey = TIMEFRAME_MAP[timeframe]
        const change = Math.abs(pair.priceChange[changeKey] ?? 0)
        const volatility = TIMEFRAME_VOLATILITY[timeframe]
        const swing = (change * volatility) / 100

        results.push({
          tokenId: token.id,
          high: +(price * (1 + swing)).toPrecision(6),
          low: +(price * (1 - swing)).toPrecision(6),
          timeframe,
        })
      }
    } catch {
      results.push({
        tokenId: token.id,
        high: token.price,
        low: token.price,
        timeframe,
      })
    }
  }

  return results
}
