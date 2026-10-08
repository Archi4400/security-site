export interface Post {
  slug: string;
  key: 'signins' | 'allowlist' | 'score';
  minutes: number;
  /** Cover tint: which aurora lights lead. */
  tone: 'amber' | 'violet' | 'blue';
  date: string;
}

export const posts: Post[] = [
  { slug: 'why-your-crm-never-sees-a-failed-sign-in', key: 'signins', minutes: 4, tone: 'amber', date: '2026-09-22' },
  { slug: 'allow-list-not-deny-list', key: 'allowlist', minutes: 5, tone: 'violet', date: '2026-09-15' },
  { slug: 'a-protection-score-that-does-not-punish-you', key: 'score', minutes: 4, tone: 'blue', date: '2026-09-08' },
];
