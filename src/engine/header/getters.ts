import { langMenu as LANG_MENU, menuDialog as MENU_DIALOG, themeGroup as THEME_GROUP } from '../contract.json';
import type { EngineConfig, ThemeName } from '../config';

type Hook = Record<`data-${string}`, string>;
type AriaLabel = (key: string) => Record<string, string>;

const ID = /^[a-z][a-z0-9-]*$/;

const hook = (name: string, value: string) => ({ [name]: value }) as Hook;

function checkId(getter: string, id: string): void {
  if (!ID.test(id)) throw new Error(`${getter}("${id}"): an id is lower-case letters, digits and "-", starting with a letter`);
}

export function createHeader(config: Pick<EngineConfig, 'i18n' | 'theme'>, ariaLabel: AriaLabel) {
  const { defaultLang, languages } = config.i18n;
  const codes = languages.map((language) => language.code);
  const short = languages.find((language) => language.code === defaultLang)?.short ?? defaultLang;
  const chars = Math.max(1, ...languages.map((language) => [...language.short].length));

  function checkLanguage(getter: string, code: string): void {
    if (!codes.includes(code)) throw new Error(`${getter}("${code}"): "${code}" is not in i18n.languages (${codes.join(', ')})`);
  }

  function langMenu(id: string) {
    checkId('langMenu', id);
    const { root, parts } = LANG_MENU;
    const trigger = `${id}-trigger`;
    const menu = `${id}-menu`;
    return {
      short,
      root: () => hook(root.hook, id),
      trigger: () => ({
        type: 'button' as const,
        id: trigger,
        'aria-haspopup': 'menu' as const,
        'aria-expanded': 'false' as const,
        'aria-controls': menu,
        ...hook(parts.trigger.hook, id),
      }),
      label: () => ({ 'data-i18n': 'ui.language', 'data-sr': '', ...hook(parts.label.hook, id) }),
      flag: (code: string) => {
        checkLanguage('lang.flag', code);
        return { hidden: code !== defaultLang, 'aria-hidden': 'true' as const, ...hook(parts.flag.hook, code) };
      },
      code: () => ({ style: `--lang-code-chars:${chars}`, ...hook(parts.code.hook, id) }),
      menu: () => ({ id: menu, role: 'menu' as const, 'aria-labelledby': trigger, hidden: true, ...hook(parts.menu.hook, id) }),
      row: () => ({ role: 'none' as const }),
      item: (code: string) => {
        checkLanguage('lang.item', code);
        const on = code === defaultLang;
        return {
          type: 'button' as const,
          role: 'menuitemradio' as const,
          'aria-checked': on ? ('true' as const) : ('false' as const),
          tabindex: on ? '0' : '-1',
          lang: code,
          ...hook(parts.item.hook, code),
        };
      },
    };
  }

  function menuDialog(id: string, options: { closeAt?: string } = {}) {
    checkId('menuDialog', id);
    const { root, parts } = MENU_DIALOG;
    const title = `${id}-title`;
    return {
      opener: () => ({ type: 'button' as const, ...hook(parts.opener.hook, id), ...ariaLabel('ui.menuOpen') }),
      dialog: () => ({
        id,
        'aria-labelledby': title,
        ...hook(root.hook, id),
        ...(options.closeAt ? hook('data-close-at', options.closeAt) : {}),
      }),
      title: () => ({ id: title, 'data-i18n': 'ui.menu', ...hook(parts.title.hook, id) }),
      close: () => ({ type: 'button' as const, ...hook(parts.close.hook, id), ...ariaLabel('ui.menuClose') }),
    };
  }

  function themeGroup(id: string) {
    checkId('themeGroup', id);
    const { root, parts } = THEME_GROUP;
    const label = `${id}-label`;
    return {
      group: () => ({ role: 'group' as const, 'aria-labelledby': label, ...hook(root.hook, id) }),
      label: () => ({ id: label, 'data-i18n': 'ui.theme', ...hook(parts.label.hook, id) }),
      option: (value: ThemeName) => {
        if (value !== 'light' && value !== 'dark') throw new Error(`theme.option("${String(value)}"): the theme is "light" or "dark"`);
        return {
          type: 'button' as const,
          'aria-pressed': value === config.theme.default ? ('true' as const) : ('false' as const),
          ...hook(parts.option.hook, value),
        };
      },
    };
  }

  return { langMenu, menuDialog, themeGroup };
}
