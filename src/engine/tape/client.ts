import { onReducedMotion } from '../motion/reduced';
import { clonesFor, DEFAULT_SPEED, progressAt, shiftAt, speedOf, wrap } from './loop';

// the tape hooks of the contract, written out so the core chunk does not carry them
const ROOT = 'data-tape';
const VIEW = 'data-tape-view';
const TRACK = 'data-tape-track';
const RUN = 'data-tape-run';
const HOLD = 'data-tape-hold';
const REVERSE = 'data-tape-reverse';
const CLONE = 'data-tape-clone';
const STATE = 'data-tape-state';
const DRAGGING = 'data-tape-dragging';
const HOVER = '(hover: hover) and (pointer: fine)';
const SLOP = 5;

function part(root: Element, hook: string): HTMLElement | undefined {
  return [...root.querySelectorAll<HTMLElement>(`[${hook}]`)].find((el) => el.closest(`[${ROOT}]`) === root);
}

function bind(root: HTMLElement): void {
  const id = root.getAttribute(ROOT) ?? '';
  const view = part(root, VIEW);
  const track = part(root, TRACK);
  const run = part(root, RUN);
  const hold = part(root, HOLD);
  if (!view || !track || !run || !view.contains(track) || !track.contains(run)) return;
  const reverse = root.hasAttribute(REVERSE);

  let animation: Animation | null = null;
  let step = 0;
  let duration = 0;
  let still = false;
  let held = false;
  let calm = false;
  let frame = 0;
  let warned = false;
  let checked = false;
  const pauses = new Set<string>();

  /** How far the cells are moved left: the loop's place while it runs, the scroll while it stands still. */
  const shiftNow = () => {
    if (still) return view.scrollLeft;
    if (!animation || !duration) return 0;
    const time = Number(animation.currentTime ?? 0);
    return shiftAt((time % duration) / duration, step, reverse);
  };

  const seek = (shift: number) => {
    if (animation) animation.currentTime = progressAt(shift, step, reverse) * duration;
  };

  const sync = () => {
    if (!animation) return;
    if (pauses.size) animation.pause();
    else animation.play();
  };

  const loop = (shift: number) => {
    animation?.cancel();
    animation = null;
    if (still || !step) return;
    const raw = getComputedStyle(root).getPropertyValue('--tape-speed');
    const { speed, ok } = speedOf(raw);
    if (import.meta.env.DEV && !ok && !warned) {
      warned = true;
      console.error(`tape "${id}": --tape-speed "${raw.trim()}" is not a positive number — the tape moves at ${DEFAULT_SPEED} px/s`);
    }
    duration = (step / speed) * 1000;
    const frames = [{ translate: '0px' }, { translate: `${-step}px` }];
    animation = track.animate(reverse ? frames.reverse() : frames, { duration, iterations: Infinity, easing: 'linear' });
    animation.id = 'tape';
    // a loop that is replaced rejects `finished`; nothing waits on it
    animation.finished.catch(() => {});
    seek(shift);
    sync();
  };

  const copy = () => {
    const clone = run.cloneNode(true) as HTMLElement;
    clone.removeAttribute(RUN);
    clone.setAttribute(CLONE, '');
    clone.setAttribute('aria-hidden', 'true');
    clone.inert = true;
    for (const el of [clone, ...clone.querySelectorAll('[id]')]) el.removeAttribute('id');
    return clone;
  };

  const paint = () => {
    if (still) root.setAttribute(STATE, 'still');
    else root.removeAttribute(STATE);
    view.setAttribute('role', still ? 'region' : 'marquee');
    if (still && step) view.tabIndex = 0;
    else view.removeAttribute('tabindex');
  };

  const build = () => {
    frame = 0;
    const before = shiftNow();
    for (const el of [...run.parentElement!.children]) if (el.hasAttribute(CLONE)) el.remove();
    step = 0;
    const width = view.clientWidth;
    if (width && run.offsetWidth) {
      const first = copy();
      run.after(first);
      step = first.offsetLeft - run.offsetLeft;
      if (step > 0) {
        let last: Element = first;
        for (let n = clonesFor(width, step); n > 1; n--) {
          const next = copy();
          last.after(next);
          last = next;
        }
      } else {
        first.remove();
        step = 0;
      }
    }
    const shift = wrap(before, step);
    if (still) view.scrollLeft = shift;
    else loop(shift);
    paint();
    if (import.meta.env.DEV && animation && !checked) {
      checked = true;
      if (track.getAnimations().some((a) => a !== animation)) {
        console.error(`tape "${id}": the track has its own animation — the engine moves it, drop yours`);
      }
    }
  };

  const schedule = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      try {
        build();
      } catch (error) {
        console.error(error);
      }
    });
  };

  const settle = () => {
    const next = held || calm;
    if (next !== still) {
      const shift = shiftNow();
      still = next;
      // the state first: the view scrolls only while the tape stands still
      paint();
      if (still) {
        animation?.cancel();
        animation = null;
        view.scrollLeft = shift;
      } else {
        view.scrollLeft = 0;
        loop(wrap(shift, step));
      }
    }
    paint();
    if (hold) {
      hold.setAttribute('aria-pressed', String(held));
      hold.hidden = calm;
    }
  };

  const pause = (reason: string, on: boolean) => {
    if (on) pauses.add(reason);
    else pauses.delete(reason);
    sync();
  };

  // a scroll of the moving view (the browser showing a focused cell) becomes the place of the loop
  const fold = () => {
    if (still || !view.scrollLeft) return;
    const shift = wrap(shiftNow() + view.scrollLeft, step);
    view.scrollLeft = 0;
    seek(shift);
  };

  hold?.addEventListener('click', () => {
    held = !held;
    settle();
  });
  onReducedMotion((reduced) => {
    calm = reduced;
    settle();
  });

  const pointer = window.matchMedia(HOVER);
  // the view, not the root: a tape just started from its button would stay paused under the mouse
  view.addEventListener('pointerenter', () => {
    if (pointer.matches) pause('hover', true);
  });
  view.addEventListener('pointerleave', () => pause('hover', false));
  view.addEventListener('focusin', (event) => {
    pause('focus', true);
    if (still || !animation) return;
    fold();
    const cell = (event.target as Element).getBoundingClientRect();
    const box = view.getBoundingClientRect();
    if (cell.left >= box.left && cell.right <= box.right) return;
    seek(wrap(cell.left - run.getBoundingClientRect().left, step));
  });
  view.addEventListener('focusout', (event) => {
    if (!view.contains(event.relatedTarget as Node | null)) pause('focus', false);
  });
  view.addEventListener('scroll', fold);
  document.addEventListener('visibilitychange', () => pause('hidden', document.hidden));
  window.addEventListener('beforeprint', () => {
    pause('print', true);
    seek(0);
  });
  window.addEventListener('afterprint', () => pause('print', false));

  // a press is a click until the mouse moves past SLOP; only then is it a drag
  let drag: { pointer: number; x: number; from: number; moved: boolean } | null = null;
  let swallow = false;
  view.addEventListener('pointerdown', (event) => {
    if (!still || event.pointerType !== 'mouse' || event.button !== 0) return;
    event.preventDefault();
    drag = { pointer: event.pointerId, x: event.clientX, from: view.scrollLeft, moved: false };
  });
  view.addEventListener('pointermove', (event) => {
    if (!drag || event.pointerId !== drag.pointer) return;
    if (!(event.buttons & 1)) {
      drag = null;
      return;
    }
    const dx = event.clientX - drag.x;
    if (!drag.moved) {
      if (Math.abs(dx) <= SLOP) return;
      drag.moved = true;
      view.setPointerCapture(event.pointerId);
      root.setAttribute(DRAGGING, '');
      view.focus({ preventScroll: true });
    }
    view.scrollLeft = drag.from - dx;
  });
  const release = (event: PointerEvent) => {
    if (!drag || event.pointerId !== drag.pointer) return;
    const moved = drag.moved;
    drag = null;
    if (!moved) return;
    // a drag is not a click on the cell it ends over
    swallow = true;
    setTimeout(() => {
      swallow = false;
    }, 0);
    root.removeAttribute(DRAGGING);
    if (view.hasPointerCapture(event.pointerId)) view.releasePointerCapture(event.pointerId);
  };
  view.addEventListener('pointerup', release);
  view.addEventListener('pointercancel', release);
  // a link or image inside would otherwise start its own native drag
  view.addEventListener('dragstart', (event) => {
    if (still) event.preventDefault();
  });
  view.addEventListener(
    'click',
    (event) => {
      if (!swallow) return;
      swallow = false;
      event.preventDefault();
      event.stopPropagation();
    },
    true,
  );

  new MutationObserver(schedule).observe(run, { childList: true, subtree: true, characterData: true, attributes: true });
  const sizes = new ResizeObserver(schedule);
  sizes.observe(view);
  sizes.observe(run);
  paint();
  schedule();
}

export function bindTapes(): void {
  for (const root of document.querySelectorAll<HTMLElement>(`[${ROOT}]`)) {
    try {
      bind(root);
    } catch (error) {
      console.error(error);
    }
  }
}
