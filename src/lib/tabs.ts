import { onReducedMotion, reducedMotion } from '../engine/client';

const FINE = '(hover: hover) and (pointer: fine)';

type Dir = 'next' | 'prev';

/**
 * Brings the next tab on every `ms` while the stage is in view and nobody is reading it. The
 * fill of the pressed tab ([data-time]) is the timer itself: its animation runs, holds and
 * finishes the tab. The hold button pauses and resumes it; a tab picked by hand turns it off
 * until the button starts it again. Returns the switch-off for those tabs.
 */
function cycleTabs(stage: HTMLElement, tabs: HTMLButtonElement[], pick: (tab: HTMLButtonElement, dir?: Dir) => void, hold: HTMLButtonElement, ms: number): () => void {
  const frame = stage.querySelector<HTMLElement>('[data-frame]');
  /** Why the timer stands still although it is on: out of view, page hidden, read under the pointer, keyboard focus. */
  const holds = new Set<string>(['view']);
  let run: Animation | null = null;
  let paused = false;

  const pressed = () => tabs.find((tab) => tab.getAttribute('aria-pressed') === 'true') ?? tabs[0]!;

  const paint = () => {
    stage.setAttribute('data-cycle-state', !run ? 'off' : paused ? 'paused' : 'on');
    hold.setAttribute('aria-pressed', String(!run || paused));
  };

  const sync = () => {
    if (!run) return;
    if (paused || holds.size) run.pause();
    else run.play();
  };

  const stop = () => {
    run?.cancel();
    run = null;
    paused = false;
    paint();
  };

  const start = () => {
    run?.cancel();
    run = null;
    paused = false;
    const fill = pressed().querySelector<HTMLElement>('[data-time]');
    if (fill) {
      const mine = fill.animate([{ scale: '0 1' }, { scale: '1 1' }], { duration: ms, easing: 'linear' });
      run = mine;
      // a timer cancelled by a stop or a restart rejects `finished`; only the live one moves on
      mine.finished.then(
        () => {
          if (run !== mine) return;
          // wrapping from the last tab to the first still moves forward
          pick(tabs[(tabs.indexOf(pressed()) + 1) % tabs.length]!, 'next');
          start();
        },
        () => {},
      );
      sync();
    }
    paint();
  };

  const holdWhile = (reason: string, on: boolean) => {
    if (on) holds.add(reason);
    else holds.delete(reason);
    sync();
  };

  hold.addEventListener('click', () => {
    if (!run) start();
    else {
      paused = !paused;
      paint();
    }
    // pressed from the keyboard, the button asks to run although focus is inside
    holdWhile('focus', false);
  });

  new IntersectionObserver(([entry]) => holdWhile('view', !entry!.isIntersecting), { threshold: 0.25 }).observe(stage);
  document.addEventListener('visibilitychange', () => holdWhile('page', document.hidden));
  // the pointer reads the pane, not the tabs: a click on the button must not hold what it starts
  if (frame && window.matchMedia(FINE).matches) {
    frame.addEventListener('pointerenter', () => holdWhile('pointer', true));
    frame.addEventListener('pointerleave', () => holdWhile('pointer', false));
  }
  stage.addEventListener('focusin', (event) => {
    if ((event.target as Element).matches(':focus-visible')) holdWhile('focus', true);
  });
  stage.addEventListener('focusout', (event) => {
    if (!stage.contains(event.relatedTarget as Node | null)) holdWhile('focus', false);
  });

  if (reducedMotion()) paint();
  else start();
  onReducedMotion((reduced) => {
    if (!reduced || !run || paused) return;
    paused = true;
    sync();
    paint();
  });
  return stop;
}

/**
 * Wires every [data-tabs] stage: a [data-tab] button shows the [data-pane] of the same name.
 * With data-cycle (milliseconds) and a [data-hold] button the tabs also switch on their own.
 * With data-hash the tab follows the address: #name opens it on load and a pick writes it.
 * With data-exit (milliseconds) the pane being left stays on as [data-leaving] for that long, so
 * it can animate out while the next one comes in; the stage carries data-dir="next" or "prev".
 */
export function wireTabs(root: ParentNode = document): void {
  // several sections call this on one page; each stage is wired once
  for (const stage of root.querySelectorAll<HTMLElement>('[data-tabs]:not([data-tabs-wired])')) {
    stage.setAttribute('data-tabs-wired', '');
    const tabs = Array.from(stage.querySelectorAll<HTMLButtonElement>('[data-tab]'));
    const panes = Array.from(stage.querySelectorAll<HTMLElement>('[data-pane]'));
    const hold = stage.querySelector<HTMLButtonElement>('[data-hold]');
    const ms = Number(stage.dataset.cycle);
    const hash = stage.hasAttribute('data-hash');
    const exit = Number(stage.dataset.exit) || 0;
    const leaving = new Map<HTMLElement, number>();

    /** Ends a pane's exit early: it is hidden now, or shown again when it is picked back mid-way. */
    const settle = (pane: HTMLElement, hidden: boolean) => {
      window.clearTimeout(leaving.get(pane));
      leaving.delete(pane);
      pane.removeAttribute('data-leaving');
      pane.inert = false;
      pane.hidden = hidden;
    };

    const pick = (tab: HTMLButtonElement, dir?: Dir) => {
      const name = tab.dataset.tab;
      const from = tabs.findIndex((other) => other.getAttribute('aria-pressed') === 'true');
      stage.dataset.dir = dir ?? (tabs.indexOf(tab) < from ? 'prev' : 'next');
      for (const other of tabs) other.setAttribute('aria-pressed', String(other === tab));
      for (const pane of panes) {
        if (pane.dataset.pane === name) settle(pane, false);
        else if (!pane.hidden && !leaving.has(pane) && exit > 0 && !reducedMotion()) {
          pane.setAttribute('data-leaving', '');
          pane.inert = true;
          leaving.set(pane, window.setTimeout(() => settle(pane, true), exit));
        } else if (!leaving.has(pane)) pane.hidden = true;
      }
      // a row of tabs that scrolls sideways on a phone brings the pressed one to its middle, without moving the page
      const bar = tab.parentElement;
      if (bar && bar.scrollWidth > bar.clientWidth) {
        const at = tab.getBoundingClientRect().left - bar.getBoundingClientRect().left;
        bar.scrollTo({ left: bar.scrollLeft + at - (bar.clientWidth - tab.offsetWidth) / 2, behavior: reducedMotion() ? 'auto' : 'smooth' });
      }
    };

    if (hash) {
      const named = tabs.find((tab) => `#${tab.dataset.tab}` === location.hash);
      if (named) pick(named);
    }

    const stop = hold && ms > 0 ? cycleTabs(stage, tabs, pick, hold, ms) : undefined;
    for (const tab of tabs) {
      tab.addEventListener('click', () => {
        pick(tab);
        stop?.();
        if (hash) history.replaceState(null, '', `#${tab.dataset.tab}`);
      });
    }
  }
}
