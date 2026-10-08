import { lang as current } from '../i18n/client';

export function formatPrice(value: number, options: { lang?: string } = {}): string {
  const size = Math.abs(value);
  const digits = size >= 1 || size === 0 ? 2 : size >= 0.01 ? 4 : 6;
  return new Intl.NumberFormat(options.lang ?? current(), {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatChange(value: number, options: { lang?: string } = {}): string {
  return new Intl.NumberFormat(options.lang ?? current(), {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: 'exceptZero',
  }).format(value / 100);
}
