export interface Token {
  id: string
  name: string
  symbol: string
  icon: string
  price: number
  change24h: number
  high: number
  low: number
  volume: number
  tvl: number
  trend: 'up' | 'down' | 'neutral'
  pairAddress: string
  chainId: string
  dexId: string
  dexUrl: string
}

export type Timeframe = '1h' | '4h' | '24h' | '7d'

export interface TokenHighLow {
  tokenId: string
  high: number
  low: number
  timeframe: Timeframe
}

/** DexScreener API response types */
export interface DexScreenerPair {
  chainId: string
  dexId: string
  url: string
  pairAddress: string
  baseToken: {
    address: string
    name: string
    symbol: string
  }
  quoteToken: {
    address: string
    name: string
    symbol: string
  }
  priceNative: string
  priceUsd: string
  txns: Record<string, { buys: number; sells: number }>
  volume: {
    m5?: number
    h1?: number
    h6?: number
    h24?: number
  }
  priceChange: {
    m5?: number
    h1?: number
    h6?: number
    h24?: number
  }
  liquidity?: {
    usd: number
    base: number
    quote: number
  }
  fdv?: number
  marketCap?: number
  info?: {
    imageUrl?: string
  }
}

export interface DexScreenerSearchResponse {
  schemaVersion: string
  pairs: DexScreenerPair[]
}
