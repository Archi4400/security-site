import type { IconName } from './icons';

export interface Product {
  slug: string;
  key: 'single' | 'manga' | 'grex' | 'reserve';
  icon: IconName;
}

export const products: Product[] = [
  { slug: 'single', key: 'single', icon: 'site' },
  { slug: 'manga', key: 'manga', icon: 'database' },
  { slug: 'grex', key: 'grex', icon: 'layers' },
  { slug: 'reserve', key: 'reserve', icon: 'restore' },
];

/** The products as link cards, leaving one out for an "other products" row. */
export const productCards = (except?: Product['key']) =>
  products
    .filter((p) => p.key !== except)
    .map((p) => ({ href: `/products/${p.slug}`, icon: p.icon, titleKey: `products.${p.key}.name`, textKey: `products.${p.key}.text` }));
