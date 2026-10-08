/**
 * The aurora: three coloured lights rising from the lower edge, resolved into
 * a low-resolution buffer and scaled up by the browser's bilinear filter, so
 * the falloff stays smooth at any size. Two octaves of value noise pass over
 * it as haze. Data in, state, draw, events, teardown, in that order.
 */

const DRIFT_PERIOD_MS = 21_500;
const DRIFT_AMOUNT = 0.085;
const LEAN_EASE = 0.06;
const NOISE_SCALE = 2.4;
const NOISE_DRIFT_PER_MS = 0.000042;
const LIT_GAMMA = 1.35;
const BOOT_MS = 1100;
const MAX_DPR = 1.5;

type Rgb = [number, number, number];

export interface AuroraConfig {
  intensity: number;
  scale: number;
  lean: number;
  fps: number;
  /** Vertical position of the light sources, 0 top to 1 bottom. */
  rise: number;
}

interface Ink {
  lights: [Rgb, Rgb, Rgb];
  alpha: number;
  haze: number;
  base: Rgb;
  add: boolean;
}

interface Light {
  x: number;
  y: number;
  rx: number;
  ry: number;
  phase: number;
  speed: number;
}

/* ── value noise ─────────────────────────────────────────────────────────── */

const PERM = new Uint8Array(256);
for (let i = 0; i < 256; i++) PERM[i] = i;
for (let i = 255, seed = 2027; i > 0; i--) {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  const j = seed % (i + 1);
  const t = PERM[i]!;
  PERM[i] = PERM[j]!;
  PERM[j] = t;
}

const corner = (xi: number, yi: number): number => PERM[(PERM[xi & 255]! + (yi & 255)) & 255]! / 255;

function vnoise(x: number, y: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = corner(xi, yi);
  const b = corner(xi + 1, yi);
  const c = corner(xi, yi + 1);
  const d = corner(xi + 1, yi + 1);
  const top = a + (b - a) * u;
  return top + (c + (d - c) * u - top) * v;
}

const fbm = (x: number, y: number): number => vnoise(x, y) * 0.62 + vnoise(x * 2.3 + 7.1, y * 2.3 - 3.7) * 0.38;

/* ── tokens ──────────────────────────────────────────────────────────────── */

function rgb(value: string, fallback: Rgb): Rgb {
  const n = value.match(/[\d.]+/g);
  return n && n.length >= 3 ? [Number(n[0]), Number(n[1]), Number(n[2])] : fallback;
}

function readInk(el: Element): Ink {
  const cs = getComputedStyle(el);
  const num = (name: string, fallback: number): number => {
    const v = Number.parseFloat(cs.getPropertyValue(name));
    return Number.isFinite(v) ? v : fallback;
  };
  return {
    lights: [
      rgb(cs.getPropertyValue('--aurora-1'), [255, 138, 61]),
      rgb(cs.getPropertyValue('--aurora-2'), [139, 61, 255]),
      rgb(cs.getPropertyValue('--aurora-3'), [47, 91, 255]),
    ],
    alpha: num('--aurora-a', 0.85),
    haze: num('--haze-a', 0.5),
    base: rgb(cs.backgroundColor, [5, 6, 8]),
    add: num('--aurora-mix', 1) >= 0.5,
  };
}

/* ── state ───────────────────────────────────────────────────────────────── */

function lightsFor(rise: number): Light[] {
  return [
    { x: 0.1, y: rise + 0.08, rx: 0.3, ry: 0.32, phase: 0, speed: 1 },
    { x: 0.42, y: rise + 0.12, rx: 0.34, ry: 0.36, phase: 2.1, speed: 0.8 },
    { x: 0.86, y: rise - 0.12, rx: 0.42, ry: 0.5, phase: 4.2, speed: 0.65 },
  ];
}

/* ── draw ────────────────────────────────────────────────────────────────── */

function paint(
  ctx: CanvasRenderingContext2D,
  image: ImageData,
  bw: number,
  bh: number,
  ink: Ink,
  lights: Light[],
  t: number,
  leanX: number,
  leanY: number,
  level: number,
): void {
  const data = image.data;
  const aspect = bw / Math.max(bh, 1);
  const drift = (t / DRIFT_PERIOD_MS) * Math.PI * 2;
  const haze = t * NOISE_DRIFT_PER_MS;

  const cx: number[] = [];
  const cy: number[] = [];
  const kx: number[] = [];
  const ky: number[] = [];
  for (const l of lights) {
    cx.push(l.x + Math.cos(drift * l.speed + l.phase) * DRIFT_AMOUNT + leanX);
    cy.push(l.y + Math.sin(drift * l.speed * 0.7 + l.phase) * DRIFT_AMOUNT * 0.6 + leanY);
    kx.push(1 / (l.rx * l.rx));
    ky.push(1 / (l.ry * l.ry));
  }

  const [br, bg, bb] = ink.base;
  let i = 0;
  for (let py = 0; py < bh; py++) {
    const v = (py + 0.5) / bh;
    for (let px = 0; px < bw; px++) {
      const u = (px + 0.5) / bw;
      const n = fbm(u * NOISE_SCALE * aspect + haze, v * NOISE_SCALE - haze * 0.7);
      const veil = 1 - ink.haze * 0.5 + ink.haze * n;

      let r = 0;
      let g = 0;
      let b = 0;
      for (let k = 0; k < 3; k++) {
        const dx = u - cx[k]!;
        const dy = v - cy[k]!;
        let w = 1 / (1 + (dx * dx * kx[k]! + dy * dy * ky[k]!) * 2.2);
        w = w ** LIT_GAMMA * veil * level * ink.alpha;
        const c = ink.lights[k]!;
        if (ink.add) {
          r += c[0] * w;
          g += c[1] * w;
          b += c[2] * w;
        } else {
          r += (c[0] - br) * w;
          g += (c[1] - bg) * w;
          b += (c[2] - bb) * w;
        }
      }
      r += br;
      g += bg;
      b += bb;

      data[i] = r < 0 ? 0 : r > 255 ? 255 : r;
      data[i + 1] = g < 0 ? 0 : g > 255 ? 255 : g;
      data[i + 2] = b < 0 ? 0 : b > 255 ? 255 : b;
      data[i + 3] = 255;
      i += 4;
    }
  }
  ctx.putImageData(image, 0, 0);
}

/* ── the field ───────────────────────────────────────────────────────────── */

export interface Aurora {
  start(): void;
  stop(): void;
  resize(): void;
  refreshInk(): void;
  point(x: number | null, y: number | null): void;
  still(): void;
}

export function createAurora(root: HTMLElement, canvas: HTMLCanvasElement, cfg: AuroraConfig): Aurora | null {
  const ctx = canvas.getContext('2d', { alpha: false });
  const buffer = document.createElement('canvas');
  const bctx = buffer.getContext('2d', { alpha: false });
  if (!ctx || !bctx) return null;

  const lights = lightsFor(cfg.rise);
  const gap = 1000 / cfg.fps;
  let ink = readInk(root);
  let image: ImageData | null = null;
  let bw = 0;
  let bh = 0;
  let raf = 0;
  let running = false;
  let boot = 0;
  let last = 0;
  let leanX = 0;
  let leanY = 0;
  let targetX = 0;
  let targetY = 0;

  const measure = (): void => {
    const box = root.getBoundingClientRect();
    const w = Math.max(1, Math.round(box.width));
    const h = Math.max(1, Math.round(box.height));
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    bw = Math.max(8, Math.round(w / cfg.scale));
    bh = Math.max(8, Math.round(h / cfg.scale));
    buffer.width = bw;
    buffer.height = bh;
    image = bctx.createImageData(bw, bh);
  };

  const compose = (now: number, settled = false): void => {
    if (!image) return;
    const progress = settled || boot === 0 ? 1 : Math.min(1, (now - boot) / BOOT_MS);
    const level = cfg.intensity * (1 - (1 - progress) ** 3);
    leanX += (targetX - leanX) * LEAN_EASE;
    leanY += (targetY - leanY) * LEAN_EASE;
    paint(bctx, image, bw, bh, ink, lights, now, leanX, leanY, level);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(buffer, 0, 0, bw, bh, 0, 0, canvas.width, canvas.height);
  };

  const frame = (now: number): void => {
    if (!running) return;
    if (now - last >= gap) {
      last = now;
      compose(now);
    }
    raf = requestAnimationFrame(frame);
  };

  return {
    start() {
      if (running) return;
      if (bw === 0) measure();
      if (boot === 0) boot = performance.now();
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
      raf = 0;
    },
    resize() {
      measure();
      compose(performance.now(), true);
    },
    refreshInk() {
      ink = readInk(root);
      compose(performance.now(), true);
    },
    point(x, y) {
      if (x === null || y === null) {
        targetX = 0;
        targetY = 0;
        return;
      }
      const box = root.getBoundingClientRect();
      if (!box.width || !box.height) return;
      targetX = ((x - box.left) / box.width - 0.5) * 2 * cfg.lean;
      targetY = ((y - box.top) / box.height - 0.5) * cfg.lean;
    },
    still() {
      if (bw === 0) measure();
      compose(8000, true);
    },
  };
}
