import { followLang } from '../i18n/client';

// the select hooks of the contract, written out so the core chunk does not carry them
const ROOT = 'data-pick';
const LABEL = 'data-pick-label';
const NATIVE = 'data-pick-native';
const UI = 'data-pick-ui';
const TRIGGER = 'data-pick-trigger';
const VALUE = 'data-pick-value';
const LIST = 'data-pick-list';
const ITEM = 'data-pick-item';
const OFF = 'data-pick-off';
const ACTIVE = 'data-active';
const TYPING = 500;
const PAGE = 10;

interface Pick {
  ui: HTMLElement;
  close: () => void;
  leave: () => void;
}

const picks: Pick[] = [];

function parts(root: Element, hook: string): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>(`[${hook}]`)].filter((el) => el.closest(`[${ROOT}]`) === root);
}

const textOf = (el: Element) => (el.textContent ?? '').trim();
const printable = (event: KeyboardEvent) => event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;

function bind(root: HTMLElement): void {
  const id = root.getAttribute(ROOT) ?? '';
  const [label] = parts(root, LABEL);
  const [native] = parts(root, NATIVE);
  const [ui] = parts(root, UI);
  const [trigger] = parts(root, TRIGGER);
  const [value] = parts(root, VALUE);
  const [list] = parts(root, LIST);
  const items = list ? parts(root, ITEM).filter((item) => list.contains(item)) : [];
  if (
    !(native instanceof HTMLSelectElement) ||
    !(trigger instanceof HTMLButtonElement) ||
    !ui?.contains(trigger) ||
    !value ||
    !trigger.contains(value) ||
    !list ||
    !ui.contains(list) ||
    !items.length
  ) {
    // a field without its parts stays the native select it is without scripts
    root.setAttribute(OFF, '');
    return;
  }
  if (label instanceof HTMLLabelElement) label.htmlFor = trigger.id;

  let active = 0;
  // an option the pointer only passed over is not a choice
  let pointed = false;
  let typed = '';
  let typedAt = -Infinity;

  const isOpen = () => !list.hidden;
  const chosen = () => Math.max(0, items.findIndex((item) => item.dataset.value === native.value));

  /** Everything the field shows, read from the native select. */
  const paint = () => {
    const at = chosen();
    const open = isOpen();
    items.forEach((item, i) => {
      item.setAttribute('aria-selected', String(i === at));
      item.toggleAttribute(ACTIVE, open && i === active);
    });
    value.textContent = textOf(items[at]);
    if (open) trigger.setAttribute('aria-activedescendant', items[active].id);
    else trigger.removeAttribute('aria-activedescendant');
  };

  // the list scrolls to the active option; the page stays where it is
  const reveal = (item: HTMLElement) => {
    const top = item.offsetTop;
    const bottom = top + item.offsetHeight;
    if (top < list.scrollTop) list.scrollTop = top;
    else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
  };

  const setActive = (next: number, by: 'key' | 'pointer' = 'key') => {
    active = Math.min(items.length - 1, Math.max(0, next));
    pointed = by === 'pointer';
    paint();
    if (by === 'key') reveal(items[active]);
  };

  const close = () => {
    if (!isOpen()) return;
    const inside = list.contains(document.activeElement);
    list.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    paint();
    if (inside) trigger.focus();
  };

  const open = (at?: number) => {
    if (isOpen()) return;
    if (import.meta.env.DEV && textOf(value) !== textOf(items[chosen()])) {
      console.error(`select "${id}": the native value changed without a change event — dispatch it after writing native.value`);
    }
    for (const other of picks) if (other !== self) other.close();
    list.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    setActive(at ?? chosen());
  };

  /** The one place the value changes, and the only source of its events. */
  const commit = (at = active) => {
    const next = items[at].dataset.value ?? '';
    const changed = next !== native.value;
    native.value = next;
    close();
    if (!changed) return;
    native.dispatchEvent(new Event('input', { bubbles: true }));
    native.dispatchEvent(new Event('change', { bubbles: true }));
  };

  /** Leaving the field chooses what the keyboard made active; what the pointer only passed over is dropped. */
  const leave = () => {
    if (!isOpen()) return;
    if (pointed) close();
    else commit();
  };

  const typeahead = (char: string) => {
    const now = performance.now();
    typed = now - typedAt > TYPING ? char : typed + char;
    typedAt = now;
    // one letter pressed again and again steps through the options that start with it
    const term = ([...typed].every((c) => c === typed[0]) ? typed[0] : typed).toLowerCase();
    const from = term.length === 1 ? active + 1 : active;
    for (let step = 0; step < items.length; step += 1) {
      const at = (from + step) % items.length;
      if (textOf(items[at]).toLowerCase().startsWith(term)) {
        setActive(at);
        return;
      }
    }
  };

  const onKey = (event: KeyboardEvent) => {
    const { key, altKey } = event;
    if (!isOpen()) {
      if (key === 'Enter' || key === ' ' || key === 'ArrowDown' || key === 'ArrowUp') {
        event.preventDefault();
        open();
      } else if (key === 'Home' || key === 'End') {
        event.preventDefault();
        open(key === 'Home' ? 0 : items.length - 1);
      } else if (printable(event)) {
        event.preventDefault();
        open();
        typeahead(key);
      }
      return;
    }
    const move = (next: number) => {
      event.preventDefault();
      setActive(next);
    };
    if (key === 'ArrowDown') move(active + 1);
    else if (key === 'ArrowUp' && !altKey) move(active - 1);
    else if (key === 'Home') move(0);
    else if (key === 'End') move(items.length - 1);
    else if (key === 'PageDown') move(active + PAGE);
    else if (key === 'PageUp') move(active - PAGE);
    else if (key === 'Enter' || key === ' ' || key === 'ArrowUp') {
      event.preventDefault();
      commit();
    } else if (key === 'Escape') {
      // claimed, so a dialog around the field stays open
      event.preventDefault();
      close();
    } else if (key === 'Tab') commit();
    else if (printable(event)) {
      event.preventDefault();
      typeahead(key);
    }
  };

  const itemAt = (event: Event) => {
    const item = (event.target as Element).closest<HTMLElement>(`[${ITEM}]`);
    return item ? items.indexOf(item) : -1;
  };

  ui.addEventListener('keydown', onKey);
  // a button clicks on the keyup of Space; the list already answered its keydown
  trigger.addEventListener('keyup', (event) => {
    if (event.key === ' ') event.preventDefault();
  });
  trigger.addEventListener('click', () => {
    // Safari leaves a clicked button unfocused, and the list's keys would go to the page
    trigger.focus();
    if (isOpen()) close();
    else open();
  });
  // the press must not take the focus from the button before its click reaches the option
  list.addEventListener('mousedown', (event) => event.preventDefault());
  list.addEventListener('click', (event) => {
    const at = itemAt(event);
    if (at === -1) return;
    commit(at);
    trigger.focus();
  });
  list.addEventListener('mousemove', (event) => {
    const at = itemAt(event);
    if (at !== -1 && at !== active) setActive(at, 'pointer');
  });
  ui.addEventListener('focusout', (event) => {
    if (!ui.contains(event.relatedTarget as Node | null)) leave();
  });

  native.addEventListener('change', paint);
  // the browser resets the fields after the event
  native.form?.addEventListener('reset', () => setTimeout(() => (isOpen() ? close() : paint())));
  // a page from the history cache keeps what the visitor chose, and the field may have changed under it
  window.addEventListener('pageshow', paint);
  root.closest('dialog')?.addEventListener('close', close);

  const self: Pick = { ui, close, leave };
  picks.push(self);
  followLang(() => paint());
}

export function bindSelects(): void {
  for (const root of document.querySelectorAll<HTMLElement>(`[${ROOT}]`)) {
    try {
      bind(root);
    } catch (error) {
      root.setAttribute(OFF, '');
      console.error(error);
    }
  }
  if (!picks.length) return;
  // a tap on the page does not always take the focus from the button
  document.addEventListener('click', (event) => {
    for (const pick of picks) if (!pick.ui.contains(event.target as Node)) pick.leave();
  });
}
