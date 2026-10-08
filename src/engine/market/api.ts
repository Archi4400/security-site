import type { MarketConfig } from '../config';
import { loadMarkets, loadSeries, Resting } from './feed';

const SHARED = { 'cache-control': 'public, max-age=30, stale-while-revalidate=60' };
const NO_STORE = { 'cache-control': 'no-store' };

const unavailable = () => Response.json({ error: 'market feed unavailable' }, { status: 503, headers: NO_STORE });

export async function marketsResponse(market: MarketConfig): Promise<Response> {
  try {
    return Response.json(await loadMarkets(market), { headers: SHARED });
  } catch (error) {
    if (!(error instanceof Resting)) console.error('[market] /api/markets:', error);
    return unavailable();
  }
}

export async function seriesResponse(market: MarketConfig, url: URL): Promise<Response> {
  const id = url.searchParams.get('id') ?? '';
  const days = Number(url.searchParams.get('days'));
  if (!market.series.ids.includes(id) || !market.series.days.includes(days)) {
    return Response.json({ error: 'unknown asset or window' }, { status: 400, headers: NO_STORE });
  }
  try {
    return Response.json(await loadSeries(id, days), { headers: SHARED });
  } catch (error) {
    if (!(error instanceof Resting)) console.error(`[market] /api/series ${id}:${days}:`, error);
    return unavailable();
  }
}
