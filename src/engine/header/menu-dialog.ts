import { menuDialog as MENU_DIALOG } from '../contract.json';

const { root: ROOT, parts: PART } = MENU_DIALOG;
const PAD = '--scroll-lock-pad';

/** The width the scrollbar gives back when the page is locked; none if the page keeps its gutter. */
function scrollbarWidth(): number {
  const html = document.documentElement;
  if (getComputedStyle(html).getPropertyValue('scrollbar-gutter').includes('stable')) return 0;
  return Math.max(0, window.innerWidth - html.clientWidth);
}

function outside(dialog: HTMLDialogElement, event: MouseEvent): boolean {
  if (event.target !== dialog) return false;
  const box = dialog.getBoundingClientRect();
  return event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
}

/** What a link to an anchor on this page points to; null for any other link. */
function anchorTarget(link: HTMLAnchorElement): HTMLElement | null {
  if (!link.hash || link.pathname !== window.location.pathname || link.search !== window.location.search) return null;
  const raw = link.hash.slice(1);
  let id = raw;
  try {
    id = decodeURIComponent(raw);
  } catch {
    // a hash like #100% is no escape; it is looked up as written
  }
  return document.getElementById(id);
}

function focusTarget(target: HTMLElement): void {
  if (!target.hasAttribute('tabindex') && target.tabIndex < 0) {
    target.setAttribute('tabindex', '-1');
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
  }
  target.focus({ preventScroll: true });
}

function bind(dialog: HTMLDialogElement): void {
  const id = dialog.getAttribute(ROOT.hook)!;
  let from: HTMLElement | null = null;
  let to: HTMLElement | null = null;
  let pressedOutside = false;

  for (const opener of document.querySelectorAll<HTMLElement>(`[${PART.opener.hook}]`)) {
    if (opener.getAttribute(PART.opener.hook) !== id) continue;
    opener.addEventListener('click', () => {
      if (dialog.open) return;
      from = opener;
      document.documentElement.style.setProperty(PAD, `${scrollbarWidth()}px`);
      dialog.showModal();
    });
  }

  dialog.addEventListener('pointerdown', (event) => {
    pressedOutside = outside(dialog, event);
  });
  dialog.addEventListener('click', (event) => {
    const target = event.target as Element;
    const wasOutside = pressedOutside;
    pressedOutside = false;
    const link = target.closest<HTMLAnchorElement>('a[href]');
    if (target.closest(`[${PART.close.hook}]`) || link) {
      to = link ? anchorTarget(link) : null;
      dialog.close();
    } else if (wasOutside && outside(dialog, event)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.documentElement.style.removeProperty(PAD);
    if (to) focusTarget(to);
    else from?.focus({ preventScroll: true });
    from = null;
    to = null;
  });

  const query = dialog.getAttribute('data-close-at');
  if (query) {
    window.matchMedia(query).addEventListener('change', (event) => {
      if (event.matches && dialog.open) dialog.close();
    });
  }

  if (import.meta.env.DEV) {
    new MutationObserver(() => {
      if (dialog.open && !from) {
        console.error(
          `menuDialog "${id}": opened without its opener — open it through menu.opener(), which measures the scrollbar before the page is locked`,
        );
      }
    }).observe(dialog, { attributes: true, attributeFilter: ['open'] });
  }
}

export function bindMenuDialogs(): void {
  for (const dialog of document.querySelectorAll(`[${ROOT.hook}]`)) {
    if (dialog instanceof HTMLDialogElement) bind(dialog);
  }
}
