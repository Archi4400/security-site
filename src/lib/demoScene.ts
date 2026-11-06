/**
 * What every interactive walk-through shares: steps that show and hide their parts, decisions that
 * wait for a click and make it themselves if no one does, a start the first time the stage is seen,
 * and parts held at the tallest any step makes them, so the stage keeps its size as the steps change.
 * A step's parts name it in data-show; a decision is a button with data-act.
 */
import { onLang, reducedMotion } from '../engine/client';

/** How long a decision waits for a click before the scene makes it itself. */
const PATIENCE = 7000;

interface Options {
  /** Where each step sits on the step bar: the stage it is on, one past the last once all are done. */
  stages: Record<string, number>;
  /** The step the scene ends on: nothing waits there. */
  last: string;
  /** Side choices: focus is not moved to them when a step opens. */
  aside?: string[];
  /** Runs as each step begins, before its parts are shown. */
  enter?: (step: string) => void;
}

interface Script {
  /** Plays the scene from the top up to its first decision. */
  play: () => void;
  /** Puts the scene's own parts back as they were, for a replay. */
  reset: () => void;
  /** What each decision does, by its data-act; replay is built in. */
  acts: Record<string, (button: HTMLElement) => void>;
}

export function scene(root: HTMLElement, options: Options) {
  const stages = [...root.querySelectorAll<HTMLElement>('[data-demo-stage]')];
  const parts = [...root.querySelectorAll<HTMLElement>('[data-show]')];
  const cursor = root.querySelector<HTMLElement>('[data-demo-cursor]')!;
  const timers = new Set<number>();
  let step = '0';
  let inView = false;
  // every decision taken counts up, so a wait set before it knows it has been answered
  let acted = 0;

  const later = (ms: number, run: () => void) => {
    const id = window.setTimeout(() => {
      timers.delete(id);
      run();
    }, ms);
    timers.add(id);
  };

  /*
   * Parts whose height changes from step to step, each held at the tallest it gets in any of them.
   * Where the script, not data-show, picks what a part shows, `variants` set up each possibility in
   * turn and `restore` puts back what is showing now.
   */
  const held: { box: HTMLElement; variants: (() => void)[]; restore?: () => void }[] = [];

  const measure = () => {
    const shown = parts.map((part) => part.hidden);
    const tallest = held.map(({ box }) => {
      box.style.minHeight = '0px';
      return 0;
    });
    // all in one go, before anything is painted: each step's parts in turn, every held part read in each variant
    for (const each of Object.keys(options.stages)) {
      for (const part of parts) part.hidden = !part.dataset.show!.split(' ').includes(each);
      held.forEach(({ box, variants }, i) => {
        for (const variant of variants) {
          variant();
          tallest[i] = Math.max(tallest[i]!, box.offsetHeight);
        }
      });
    }
    parts.forEach((part, i) => (part.hidden = shown[i]!));
    held.forEach(({ box, restore }, i) => {
      restore?.();
      box.style.minHeight = `${tallest[i]}px`;
    });
  };

  /** Holds a part at the tallest any step (and any of its variants) makes it. */
  const hold = (box: HTMLElement, variants: (() => void)[] = [() => {}], restore?: () => void) =>
    held.push({ box, variants, restore });

  // the alert's place over the panel: one line on a wide stage, it can take two on a phone
  hold(root.querySelector<HTMLElement>('.demo__slot')!);

  const usable = (el: Element | null) =>
    el instanceof HTMLElement &&
    root.contains(el) &&
    !el.closest('[hidden]') &&
    !(el as HTMLButtonElement).disabled &&
    el.getAttribute('aria-disabled') !== 'true';

  const go = (next: string) => {
    const active = document.activeElement;
    const focused = root.contains(active) && active !== root;
    step = next;
    root.dataset.step = next;
    options.enter?.(next);
    for (const part of parts) part.hidden = !part.dataset.show!.split(' ').includes(next);
    const at = options.stages[next]!;
    stages.forEach((stage, i) => {
      stage.dataset.state = i + 1 < at ? 'done' : i + 1 === at ? 'now' : '';
    });
    // a focused control that is now hidden or switched off hands focus to the stage, so it is not lost
    if (focused && !usable(document.activeElement)) root.focus({ preventScroll: true });
    // someone moving by keyboard is taken on to the next decision as soon as it appears: the step's main one
    // (data-lead) if it has one, or else the first
    if (document.activeElement === root) {
      const decisions = [...root.querySelectorAll<HTMLElement>('[data-act]')].filter(
        (button) => usable(button) && !options.aside?.includes(button.dataset.act!),
      );
      (decisions.find((button) => button.hasAttribute('data-lead')) ?? decisions[0])?.focus({ preventScroll: true });
    }
  };

  /** The point a part sits at, inside the stage. */
  const centre = (el: Element) => {
    const stage = root.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    return { x: box.left - stage.left + box.width / 2, y: box.top - stage.top + box.height / 2, w: stage.width, h: stage.height };
  };

  /** Waits at a decision; if no one has clicked in time, the cursor comes and clicks it (`which` narrows the button). */
  const wait = (act: string, which = '') => {
    if (reducedMotion()) return;
    const asked = acted;
    later(PATIENCE, () => {
      const target = root.querySelector<HTMLElement>(`[data-act="${act}"]${which}`);
      if (acted !== asked || !usable(target) || step === options.last) return;
      // off screen, or someone is already moving through the scene by keyboard: no one to click for yet
      if (!inView || root.matches(':focus-visible') || root.querySelector(':focus-visible')) {
        wait(act, which);
        return;
      }
      const to = centre(target!);
      cursor.style.transition = 'none';
      cursor.style.translate = `${to.w * 0.92}px ${to.h * 0.95}px`;
      cursor.hidden = false;
      void cursor.offsetHeight;
      cursor.style.transition = '';
      cursor.style.translate = `${to.x}px ${to.y}px`;
      later(950, () => {
        // someone got there first while the cursor was on its way
        if (acted !== asked) {
          cursor.hidden = true;
          return;
        }
        cursor.dataset.press = '';
        target!.click();
        later(400, () => {
          delete cursor.dataset.press;
          cursor.hidden = true;
        });
      });
    });
  };

  /** Wires up the decisions and starts the scene the first time it is seen. */
  const start = ({ play, reset, acts }: Script) => {
    const all: Script['acts'] = {
      ...acts,
      replay: () => {
        for (const id of timers) window.clearTimeout(id);
        timers.clear();
        cursor.hidden = true;
        reset();
        play();
      },
    };

    root.addEventListener('click', (event) => {
      const button = (event.target as Element).closest<HTMLElement>('[data-act]');
      if (!button || !usable(button)) return;
      const run = all[button.dataset.act!];
      if (!run) return;
      acted += 1;
      // not one of the scene's timers: a replay must not leave the ripple on the button
      button.dataset.ripple = '';
      window.setTimeout(() => delete button.dataset.ripple, 300);
      run(button);
    });

    // the held parts are measured now, and again whenever the text or the stage's width changes
    onLang(() => measure());
    let width = root.offsetWidth;
    let settle = 0;
    new ResizeObserver(() => {
      if (root.offsetWidth === width) return;
      width = root.offsetWidth;
      window.clearTimeout(settle);
      settle = window.setTimeout(measure, 150);
    }).observe(root);

    // a waiting decision only clicks itself while the stage is on screen
    let begun = false;
    new IntersectionObserver(
      ([entry]) => {
        inView = !!entry?.isIntersecting;
        if (inView && !begun) {
          begun = true;
          play();
        }
      },
      { threshold: 0.35 },
    ).observe(root);
  };

  return {
    get step() {
      return step;
    },
    go,
    later,
    wait,
    hold,
    start,
  };
}
