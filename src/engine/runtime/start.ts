import { bindLangMenus } from '../header/lang-menu';
import { bindMenuDialogs } from '../header/menu-dialog';
import { bindThemeGroups } from '../header/theme-group';
import { initI18n, type Format } from '../i18n/client';

export interface StartOptions {
  i18n?: { formats?: Record<string, Format> };
}

let started = false;

// a module that fails to load leaves its markup as the server drew it, which works without it
export const failed = (module: string) => (error: unknown) => {
  if (import.meta.env.DEV) console.error(`start(): the ${module} module failed`, error);
};

export function start(options: StartOptions = {}): void {
  if (started) return;
  started = true;
  initI18n(options.i18n);
  bindLangMenus();
  bindMenuDialogs();
  bindThemeGroups();
  if (document.querySelector('[data-reveal]')) {
    void import('../reveal/client').then(({ bindReveals }) => bindReveals()).catch(failed('reveal'));
  }
  if (document.querySelector('[data-count]')) {
    void import('../count/client').then(({ bindCounts }) => bindCounts()).catch(failed('count-up'));
  }
  if (document.querySelector('[data-tape]')) {
    void import('../tape/client').then(({ bindTapes }) => bindTapes()).catch(failed('tape'));
  }
  if (document.querySelector('[data-pick]')) {
    void import('../select/client')
      .then(({ bindSelects }) => bindSelects())
      .catch((error: unknown) => {
        // the fields stay the native selects they are without scripts
        document.documentElement.setAttribute('data-pick-off', '');
        failed('select')(error);
      });
  }
  if (import.meta.env.DEV) {
    void import('./check').then(({ reportPage }) => reportPage()).catch(failed('check'));
  }
}
