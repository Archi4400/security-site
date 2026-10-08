const formats = new Map<string, Intl.NumberFormat>();

/** The number in the language's own digits, put into the pattern's {n} when there is one. */
export function formatCount(value: number, decimals: number, lang: string, pattern?: string): string {
  const id = `${lang}:${decimals}`;
  let format = formats.get(id);
  if (!format) {
    format = new Intl.NumberFormat(lang, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    formats.set(id, format);
  }
  const number = format.format(value);
  // a function, so "$&" and the like in the pattern stay text
  return pattern === undefined ? number : pattern.replace('{n}', () => number);
}
