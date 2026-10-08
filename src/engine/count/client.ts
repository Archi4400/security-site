import { followLang, lang, onLang, t } from '../i18n/client';
import { onReducedMotion, reducedMotion } from '../motion/reduced';
import { formatCount } from './format';

const DURATION = 1200;
const STATE = 'data-count-state';
// the countUp hooks of the contract, written out so the core chunk does not carry them
const ROOT = 'data-count';
const VALUE = 'data-count-value';
const DIGITS = 'data-count-digits';

interface Counter {
  root: HTMLElement;
  value: HTMLElement;
  digits: HTMLElement;
  to: number;
  decimals: number;
  key: string | undefined;
  frame: number;
}

const ease = (x: number) => 1 - (1 - x) ** 3;

function part(root: Element, hook: string): HTMLElement | undefined {
  return [...root.querySelectorAll<HTMLElement>(`[${hook}]`)].find((el) => el.closest(`[${ROOT}]`) === root);
}

export function bindCounts(): void {
  const counters: Counter[] = [];
  for (const root of document.querySelectorAll<HTMLElement>(`[${ROOT}]`)) {
    const value = part(root, VALUE);
    const digits = part(root, DIGITS);
    const to = Number(root.dataset.countTo);
    const decimals = Number(root.dataset.countDecimals ?? 0);
    if (!value || !digits || !Number.isFinite(to)) continue;
    counters.push({ root, value, digits, to, decimals, key: root.dataset.countKey, frame: 0 });
  }
  if (!counters.length) return;

  const text = (c: Counter, n: number) => formatCount(n, c.decimals, lang(), c.key === undefined ? undefined : t(c.key));
  const state = (c: Counter) => c.root.getAttribute(STATE);

  const finish = (c: Counter) => {
    cancelAnimationFrame(c.frame);
    c.root.setAttribute(STATE, 'done');
    c.digits.textContent = '';
  };

  const run = (c: Counter) => {
    c.root.setAttribute(STATE, 'run');
    c.digits.textContent = text(c, 0);
    const start = performance.now();
    const step = () => {
      const progress = Math.min(1, (performance.now() - start) / DURATION);
      if (progress < 1) {
        c.digits.textContent = text(c, c.to * ease(progress));
        c.frame = requestAnimationFrame(step);
      } else finish(c);
    };
    c.frame = requestAnimationFrame(step);
  };

  const arm = () => {
    if (reducedMotion()) {
      counters.forEach(finish);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          const c = counters.find((counter) => counter.root === entry.target);
          if (c && state(c) === 'wait') run(c);
        }
      },
      { threshold: 0.5 },
    );
    for (const c of counters) {
      const box = c.root.getBoundingClientRect();
      if (box.top < window.innerHeight && box.bottom > 0) run(c);
      else {
        c.root.setAttribute(STATE, 'wait');
        c.digits.textContent = text(c, 0);
        observer.observe(c.root);
      }
    }
    onReducedMotion((reduced) => {
      if (!reduced) return;
      observer.disconnect();
      counters.forEach(finish);
    });
  };

  let armed = false;
  const follow = () => {
    for (const c of counters) {
      c.value.textContent = text(c, c.to);
      if (state(c) === 'wait') c.digits.textContent = text(c, 0);
    }
    if (!armed) {
      armed = true;
      arm();
    }
  };
  // a pattern comes from the dictionary, so wait for it; a bare number does not need one
  if (counters.some((c) => c.key !== undefined)) onLang(follow);
  else followLang(follow);
}
