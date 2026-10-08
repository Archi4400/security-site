export const DEFAULT_SPEED = 40;
const MAX_CLONES = 50;

/** Where a walk of `distance` px lands on a loop of `step` px, from 0 up to `step`. */
export function wrap(distance: number, step: number): number {
  if (!(step > 0)) return 0;
  return ((distance % step) + step) % step;
}

/** Copies of the set the track needs after it: the view and one set more, at least one once both have a width. */
export function clonesFor(view: number, step: number): number {
  if (!(step > 0) || !(view > 0)) return 0;
  return Math.min(MAX_CLONES, Math.max(1, Math.ceil(view / step)));
}

/** How far the track is shifted at a share of its cycle; a reversed tape plays its frames backwards. */
export function shiftAt(progress: number, step: number, reverse: boolean): number {
  return wrap((reverse ? 1 - progress : progress) * step, step);
}

/** The share of the cycle at which the track is shifted by `shift` px. */
export function progressAt(shift: number, step: number, reverse: boolean): number {
  if (!(step > 0)) return 0;
  const share = wrap(shift, step) / step;
  return reverse ? wrap(1 - share, 1) : share;
}

/** --tape-speed in px per second; `ok` is false for a value that is set but is not a positive number. */
export function speedOf(raw: string): { speed: number; ok: boolean } {
  const text = raw.trim();
  if (!text) return { speed: DEFAULT_SPEED, ok: true };
  const speed = Number(text);
  return Number.isFinite(speed) && speed > 0 ? { speed, ok: true } : { speed: DEFAULT_SPEED, ok: false };
}
