import type { IconName } from './icons';

export interface Solution {
  slug: string;
  key: 'theft' | 'behavior' | 'scanning' | 'fingerprint' | 'codescan' | 'camp' | 'records';
  icon: IconName;
}

export const solutions: Solution[] = [
  { slug: 'data-theft-detection', key: 'theft', icon: 'mail' },
  { slug: 'behavior-analytics', key: 'behavior', icon: 'pulse' },
  { slug: 'vulnerability-scanning', key: 'scanning', icon: 'scan' },
  { slug: 'fingerprint', key: 'fingerprint', icon: 'fingerprint' },
  { slug: 'codescan', key: 'codescan', icon: 'code' },
  { slug: 'reserve-camp', key: 'camp', icon: 'restore' },
  { slug: 'activity-records', key: 'records', icon: 'list' },
];

/** The solutions as link cards, leaving one out for an "other solutions" row. */
export const solutionCards = (except?: Solution['key']) =>
  solutions
    .filter((s) => s.key !== except)
    .map((s) => ({ href: `/solutions/${s.slug}`, icon: s.icon, titleKey: `solutions.${s.key}.title`, textKey: `solutions.${s.key}.text` }));
