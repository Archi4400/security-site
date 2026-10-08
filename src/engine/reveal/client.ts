import { onReducedMotion, reducedMotion } from '../motion/reduced';

const WAIT = 'data-reveal-wait';

export function bindReveals(): void {
  if (reducedMotion()) return;
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      // in view, or already scrolled past by a jump
      if (entry.isIntersecting || entry.boundingClientRect.bottom <= 0) {
        entry.target.removeAttribute(WAIT);
        observer.unobserve(entry.target);
      }
    }
  });
  for (const el of document.querySelectorAll('[data-reveal]')) {
    // only what the visitor has not seen yet waits; the rest stays as the server drew it
    if (el.getBoundingClientRect().top < window.innerHeight) continue;
    el.setAttribute(WAIT, '');
    observer.observe(el);
  }
  const release = () => {
    for (const el of document.querySelectorAll(`[${WAIT}]`)) el.removeAttribute(WAIT);
    observer.disconnect();
  };
  onReducedMotion((reduced) => {
    if (reduced) release();
  });
  window.addEventListener('beforeprint', release);
}
