import type { Timeframe, DexScreenerPair } from '../types/token.interface'

// Default tokens to load on startup (pair addresses)
export const DEFAULT_PAIRS: { chainId: string; pairAddress: string }[] = [
  {
    chainId: 'ethereum',
    pairAddress: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
  }, // ETH/USDC Uniswap v3
  {
    chainId: 'ethereum',
    pairAddress: '0x4585fe77225b41b697c938b018e2ac67ac5a20c0',
  }, // WBTC/ETH Uniswap v3
  {
    chainId: 'solana',
    pairAddress: '8sLbNZoA1cfnvMJLPfp98ZLAnFSYCFApfJKMbiXNLwxj',
  }, // SOL/USDC Raydium
  {
    chainId: 'ethereum',
    pairAddress: '0xa43fe16908251ee70ef74718545e4fe6c5ccec9f',
  }, // PEPE/WETH Uniswap v2
]

/**
 * Compute high/low based on price change per timeframe from DexScreener.
 * DexScreener provides: m5, h1, h6, h24 price changes.
 * We map our timeframes: 1h→h1, 4h→h6 (closest), 24h→h24, 7d→h24*2 (estimate).
 */
export const TIMEFRAME_MAP: Record<
  Timeframe,
  keyof DexScreenerPair['priceChange']
> = {
  '1h': 'h1',
  '4h': 'h6',
  '24h': 'h24',
  '7d': 'h24',
}

export const TIMEFRAME_VOLATILITY: Record<Timeframe, number> = {
  '1h': 1,
  '4h': 1.5,
  '24h': 2,
  '7d': 4,
}
