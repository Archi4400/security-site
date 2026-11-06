/**
 * Scenario A, "the night export": synthetic data for the scene and the graph's geometry,
 * shared by the markup the server renders and the script that plays it.
 */

/** A line in the CRM's activity feed: time, account, action, object. */
export type FeedRow = [string, string, string, string];

/** The feed as the scene opens: a quiet evening in the CRM, enough of it to fill the column. */
export const opening: FeedRow[] = [
  ['22:02', 'olga.d', 'signed in', '—'],
  ['22:05', 'anna.k', 'viewed', 'Deal #2038'],
  ['22:09', 'tom.b', 'updated', 'Ticket #311'],
  ['22:12', 'olga.d', 'viewed', 'Report · Q3 pipeline'],
  ['22:16', 'lena.p', 'created', 'Contact · Novak'],
  ['22:19', 'max.r', 'viewed', 'Deal #2033'],
  ['22:23', 'anna.k', 'updated', 'Contact · Silva'],
  ['22:27', 'olga.d', 'signed out', '—'],
  ['22:31', 'tom.b', 'viewed', 'Contact · Weber'],
  ['22:34', 'anna.k', 'created', 'Task · Follow-up'],
  ['22:36', 'lena.p', 'viewed', 'Deal #1987'],
  ['22:39', 'max.r', 'updated', 'Deal #2033'],
  ['22:41', 'anna.k', 'viewed', 'Deal #2041'],
  ['22:42', 'lena.p', 'updated', 'Contact · Ortega'],
  ['22:44', 'max.r', 'viewed', 'Account · Nordwind'],
  ['22:45', 'tom.b', 'closed', 'Ticket #318'],
  ['22:47', 'anna.k', 'updated', 'Deal #2041'],
];

/** What comes in while nothing is wrong yet. */
export const evening: FeedRow[] = [
  ['22:49', 'lena.p', 'viewed', 'Invoice #882'],
  ['22:52', 'tom.b', 'updated', 'Contact · Haas'],
  ['22:55', 'anna.k', 'signed out', '—'],
];

/** Midnight, and an export far beyond anything this account does. */
export const anomaly: FeedRow = ['23:58', 'max.r', 'export.csv', '2,400 records'];

/** The exports that try to follow once access is paused. */
export const blocked: FeedRow[] = [
  ['23:59', 'max.r', 'export.csv', 'blocked'],
  ['00:00', 'max.r', 'export.csv', 'blocked'],
];

/**
 * The accounts being checked, and where tonight's activity sits on each one's track, from 0 to 1:
 * the first half is usual for that account, up to three quarters unusual, past that far outside.
 */
export const accounts = [
  { id: 'anna.k', at: 0.28 },
  { id: 'lena.p', at: 0.2 },
  { id: 'max.r', at: 0.24 },
  { id: 'tom.b', at: 0.34 },
  { id: 'olga.d', at: 0.16 },
];

export type Zone = 'ok' | 'warn' | 'bad';

export function zoneOf(at: number): Zone {
  return at < 0.5 ? 'ok' : at < 0.75 ? 'warn' : 'bad';
}

/** The account that climbs: through the evening it creeps up (ms into the scene, where it is by then). */
export const suspect = 'max.r';
export const climb: [number, number][] = [
  [600, 0.33],
  [1500, 0.44],
  [2400, 0.56],
  [3300, 0.68],
];
/** Where it stands once the export runs. */
export const peakAt = 0.95;

/** Events analysed so far tonight, where the counter starts. */
export const analysed = 12480;

/** Records exported in each of the last twelve hours: an ordinary day, then the spike. */
export const calm = [22, 30, 26, 34, 28, 24, 31, 27, 23, 29, 25, 24];
export const spike = [22, 30, 26, 34, 28, 24, 31, 27, 23, 29, 38, 250];

/** Once access is paused the hours go on: the spike stays in the record, and the line falls back. */
export const after = [92, 33, 26];

export const GRAPH = { width: 240, height: 80, max: 260 } as const;

/** The graph shows this many hours; the series can be longer and slide through them. */
const HOURS = calm.length;
const STEP = GRAPH.width / (HOURS - 1);

const yOf = (v: number) => GRAPH.height - 6 - (v / GRAPH.max) * (GRAPH.height - 14);

/** Every hour of the series, `offset` hours slid to the left; the ones off either end are clipped. */
function points(values: number[], offset: number): [number, number][] {
  return values.map((v, i) => [(i - offset) * STEP, yOf(v)]);
}

export function linePath(values: number[], offset = 0): string {
  return points(values, offset)
    .map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(' ');
}

export function areaPath(values: number[], offset = 0): string {
  const all = points(values, offset);
  const first = all[0]![0].toFixed(1);
  const last = all.at(-1)![0].toFixed(1);
  return `${linePath(values, offset)} L${last} ${GRAPH.height} L${first} ${GRAPH.height} Z`;
}

/** The hour at the graph's right edge, for the dot that marks it: [x, y, value]. */
export function edgeOf(values: number[], offset = 0): [number, number, number] {
  const at = offset + HOURS - 1;
  const below = Math.min(Math.floor(at), values.length - 1);
  const above = Math.min(below + 1, values.length - 1);
  const v = values[below]! + (values[above]! - values[below]!) * (at - below);
  return [GRAPH.width, yOf(v), v];
}
