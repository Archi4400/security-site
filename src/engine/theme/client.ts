import { appData } from '../runtime/data';
import { notify } from '../runtime/notify';

export type Theme = 'light' | 'dark';

const listeners = new Set<(theme: Theme) => void>();

export function theme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export function setTheme(next: Theme): void {
  if (next !== 'light' && next !== 'dark') {
    if (import.meta.env.DEV) console.error(`setTheme("${String(next)}"): the theme is "light" or "dark".`);
    return;
  }
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem('theme', next);
  } catch {
    /* storage refused: the choice lasts for this page only */
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', appData().theme.color[next]);
  for (const listener of [...listeners]) notify(listener, next);
  document.dispatchEvent(new CustomEvent('cn:themechange', { detail: { theme: next } }));
}

export function onTheme(listener: (theme: Theme) => void): () => void {
  listeners.add(listener);
  notify(listener, theme());
  return () => {
    listeners.delete(listener);
  };
}
