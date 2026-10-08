import type { MarketConfig } from '../config';
import { coinName } from './catalog';

export function marketHelpers(market: MarketConfig) {
  return {
    marketList(name: string): { id: string; symbol: string; name: string }[] {
      if (!Object.hasOwn(market.lists, name)) throw new Error(`market.lists has no "${name}"`);
      return market.lists[name].map((id) => ({ id, symbol: id.toUpperCase(), name: coinName(id) }));
    },
    seriesOptions(): { ids: string[]; days: number[] } {
      return { ids: [...market.series.ids], days: [...market.series.days] };
    },
  };
}
