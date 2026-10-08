export interface Market {
  /** Lower-case ticker, the key a widget looks a row up by. */
  id: string;
  /** Upper-case ticker, as printed. */
  symbol: string;
  name: string;
  price: number;
  /** Percent over 24 hours: 1.42 is +1.42%. */
  change24h: number;
  high24h: number | null;
  low24h: number | null;
  /** Traded value over 24 hours, in USDT. */
  volume24h: number;
  /** A week of prices, oldest first; empty outside the spark list or when the week failed to load. */
  spark: number[];
}

/** One point of chart history: [epoch ms, price]. */
export type SeriesPoint = [number, number];

export interface MarketSnapshot {
  lists: Record<string, string[]>;
  rows: Market[];
}
