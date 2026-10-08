import { themeGroup as THEME_GROUP } from '../contract.json';
import { onTheme, setTheme, type Theme } from '../theme/client';

const { root: ROOT, parts: PART } = THEME_GROUP;

export function bindThemeGroups(): void {
  const options: HTMLElement[] = [];
  for (const group of document.querySelectorAll(`[${ROOT.hook}]`)) {
    for (const option of group.querySelectorAll<HTMLElement>(`[${PART.option.hook}]`)) {
      const value = option.getAttribute(PART.option.hook);
      if (option.closest(`[${ROOT.hook}]`) !== group || (value !== 'light' && value !== 'dark')) continue;
      option.addEventListener('click', () => setTheme(value));
      options.push(option);
    }
  }
  if (!options.length) return;
  onTheme((current: Theme) => {
    for (const option of options) option.setAttribute('aria-pressed', String(option.getAttribute(PART.option.hook) === current));
  });
}
