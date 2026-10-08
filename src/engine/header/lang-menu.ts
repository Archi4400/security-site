import { langMenu as LANG_MENU } from '../contract.json';
import { followLang, preloadDictionaries, setLang } from '../i18n/client';
import { appData } from '../runtime/data';

const { root: ROOT, parts: PART } = LANG_MENU;
const ROOT_SELECTOR = `[${ROOT.hook}]`;

interface Menu {
  root: Element;
  trigger: HTMLButtonElement;
  list: HTMLElement;
  items: HTMLElement[];
  flags: Element[];
  code: HTMLElement | undefined;
}

const menus: Menu[] = [];

function inside<T extends Element>(root: Element, hook: string): T[] {
  return [...root.querySelectorAll<T>(`[${hook}]`)].filter((el) => el.closest(ROOT_SELECTOR) === root);
}

const isOpen = (menu: Menu) => !menu.list.hidden;

function focusItem(menu: Menu, item: HTMLElement): void {
  for (const other of menu.items) other.tabIndex = other === item ? 0 : -1;
  item.focus();
}

function close(menu: Menu, returnFocus: boolean): void {
  if (!isOpen(menu)) return;
  menu.list.hidden = true;
  menu.trigger.setAttribute('aria-expanded', 'false');
  if (returnFocus) menu.trigger.focus();
}

function open(menu: Menu, at: 'checked' | 'last'): void {
  for (const other of menus) if (other !== menu) close(other, false);
  menu.list.hidden = false;
  menu.trigger.setAttribute('aria-expanded', 'true');
  preloadDictionaries();
  const checked = menu.items.find((item) => item.getAttribute('aria-checked') === 'true') ?? menu.items[0];
  focusItem(menu, at === 'last' ? menu.items[menu.items.length - 1] : checked);
}

function paint(menu: Menu, code: string): void {
  for (const flag of menu.flags) flag.toggleAttribute('hidden', flag.getAttribute(PART.flag.hook) !== code);
  if (menu.code) menu.code.textContent = appData().languages.find((language) => language.code === code)?.short ?? code;
  for (const item of menu.items) {
    const on = item.getAttribute(PART.item.hook) === code;
    item.setAttribute('aria-checked', String(on));
    item.tabIndex = on ? 0 : -1;
  }
}

function onMenuKey(menu: Menu, event: KeyboardEvent): void {
  const { items } = menu;
  const current = items.indexOf(document.activeElement as HTMLElement);
  const move = (index: number) => {
    event.preventDefault();
    focusItem(menu, items[(index + items.length) % items.length]);
  };
  if (event.key === 'ArrowDown') move(current + 1);
  else if (event.key === 'ArrowUp') move(current - 1);
  else if (event.key === 'Home') move(0);
  else if (event.key === 'End') move(items.length - 1);
  else if (event.key === 'Escape') {
    // claimed, so a dialog around the menu stays open
    event.preventDefault();
    close(menu, true);
  } else if (event.key === 'Tab') close(menu, false);
}

function bind(menu: Menu): void {
  menu.trigger.addEventListener('click', () => (isOpen(menu) ? close(menu, false) : open(menu, 'checked')));
  menu.trigger.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      open(menu, event.key === 'ArrowUp' ? 'last' : 'checked');
    }
  });
  menu.list.addEventListener('keydown', (event) => onMenuKey(menu, event));
  menu.list.addEventListener('click', (event) => {
    const item = (event.target as Element).closest<HTMLElement>(`[${PART.item.hook}]`);
    if (!item || !menu.items.includes(item)) return;
    close(menu, true);
    void setLang(item.getAttribute(PART.item.hook)!);
  });
}

export function bindLangMenus(): void {
  for (const root of document.querySelectorAll(ROOT_SELECTOR)) {
    const trigger = inside<HTMLElement>(root, PART.trigger.hook)[0];
    const list = inside<HTMLElement>(root, PART.menu.hook)[0];
    const items = inside<HTMLElement>(root, PART.item.hook);
    if (!(trigger instanceof HTMLButtonElement) || !list || !items.length) continue;
    const menu: Menu = { root, trigger, list, items, flags: inside(root, PART.flag.hook), code: inside<HTMLElement>(root, PART.code.hook)[0] };
    menus.push(menu);
    bind(menu);
    menu.root.closest('dialog')?.addEventListener('close', () => close(menu, false));
  }
  if (!menus.length) return;
  document.addEventListener('click', (event) => {
    for (const menu of menus) if (isOpen(menu) && !menu.root.contains(event.target as Node)) close(menu, false);
  });
  followLang((code) => {
    for (const menu of menus) paint(menu, code);
  });
}
