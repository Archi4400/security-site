/** Writes the pointer position inside every [data-spot] as --mx / --my, for a light that follows it. */
export function wireSpot(root: ParentNode = document): void {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  for (const el of root.querySelectorAll<HTMLElement>('[data-spot]')) {
    el.addEventListener(
      'pointermove',
      (event) => {
        const box = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${Math.round(event.clientX - box.left)}px`);
        el.style.setProperty('--my', `${Math.round(event.clientY - box.top)}px`);
      },
      { passive: true },
    );
  }
}
