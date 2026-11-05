import { products } from '../../lib/products';
import { solutions } from '../../lib/solutions';

export interface NavLink {
  href: string;
  key: string;
  textKey?: string;
  /** Not built yet: shown with a "coming soon" mark instead of a link. */
  soon?: boolean;
}

export interface NavGroup {
  /** Without it the group only opens its panel. */
  href?: string;
  key: string;
  allKey?: string;
  items: NavLink[];
}

export type NavEntry = NavLink | NavGroup;

export const productLinks: NavLink[] = products.map((p) => ({
  href: `/products/${p.slug}`,
  key: `products.${p.key}.short`,
  textKey: `menu.products.${p.key}`,
}));

export const solutionLinks: NavLink[] = solutions.map((s) => ({
  href: `/solutions/${s.slug}`,
  key: `solutions.${s.key}.title`,
  textKey: `menu.solutions.${s.key}`,
}));

export const resourceLinks: NavLink[] = [
  { href: '/blog', key: 'nav.blog', textKey: 'menu.blog' },
  { href: '', key: 'nav.community', textKey: 'menu.community', soon: true },
  { href: '', key: 'nav.api', textKey: 'menu.api', soon: true },
  { href: '/press', key: 'menu.press.title', textKey: 'menu.press.text' },
];

export const aboutLinks: NavLink[] = [
  { href: '/about', key: 'menu.company.title', textKey: 'menu.company.text' },
  { href: '/careers', key: 'menu.careers.title', textKey: 'menu.careers.text' },
  { href: '/press', key: 'menu.press.title', textKey: 'menu.press.text' },
  { href: '/faq', key: 'menu.faq.title', textKey: 'menu.faq.text' },
  { href: '/resellers', key: 'menu.resellers.title', textKey: 'menu.resellers.text' },
];

export const navRoutes: NavEntry[] = [
  { href: '/', key: 'nav.home' },
  { href: '/products', key: 'nav.products', allKey: 'nav.productsAll', items: productLinks },
  { href: '/solutions', key: 'nav.solutions', allKey: 'nav.solutionsAll', items: solutionLinks },
  { key: 'nav.resources', items: resourceLinks },
  { href: '/pricing', key: 'nav.pricing' },
];

/** Set apart from the rest of the menu, as the way in for someone who needs help now. */
export const ATTACK = '/contact?topic=attack';
export const DEMO = '/contact?topic=demo';

export const isGroup = (entry: NavEntry): entry is NavGroup => 'items' in entry;

export const isCurrent = (href: string | undefined, path: string): boolean =>
  !href ? false : href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`);
