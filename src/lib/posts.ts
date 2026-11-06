import type { ImageMetadata } from 'astro';
import binanceCover from '../assets/blog/binance-cover.jpg';
import binance1 from '../assets/blog/binance-1.jpg';
import binance2 from '../assets/blog/binance-2.jpg';
import aiCover from '../assets/blog/ai-cover.jpg';
import ai1 from '../assets/blog/ai-1.jpg';
import allowlistCover from '../assets/blog/allowlist-cover.jpg';
import allowlist1 from '../assets/blog/allowlist-1.jpg';
import offboardingCover from '../assets/blog/offboarding-cover.jpg';
import offboarding1 from '../assets/blog/offboarding-1.jpg';
import scoreCover from '../assets/blog/score-cover.jpg';
import score1 from '../assets/blog/score-1.jpg';
import signinsCover from '../assets/blog/signins-cover.jpg';
import signins1 from '../assets/blog/signins-1.jpg';
import tenancyCover from '../assets/blog/tenancy-cover.jpg';
import tenancy1 from '../assets/blog/tenancy-1.jpg';
import thresholdsCover from '../assets/blog/thresholds-cover.jpg';
import thresholds1 from '../assets/blog/thresholds-1.jpg';
import trustedCover from '../assets/blog/trusted-cover.jpg';
import trusted1 from '../assets/blog/trusted-1.jpg';

export interface Figure {
  image: ImageMetadata;
  /** The body paragraph the picture follows, by index. */
  after: number;
}

/**
 * One piece of an article's body as the dictionary writes it: a plain string is a paragraph, and `rich`
 * one with markup in it (<strong>); the rest are headings, a bulleted list, terms each with a line of
 * explanation, numbered stages, the sources a section rests on (links allowed), and a closing line.
 */
export type Block =
  | string
  | { rich: string }
  | { h2: string }
  | { h3: string }
  | { list: string[] }
  | { terms: { title: string; text: string }[] }
  | { steps: { title: string; text: string }[] }
  | { sources: { title: string; items: string[] } }
  | { close: string };

export interface Post {
  slug: string;
  key: 'binance' | 'ai' | 'trusted' | 'offboarding' | 'thresholds' | 'signins' | 'allowlist' | 'score' | 'tenancy';
  minutes: number;
  date: string;
  /** On the card and at the top of the article; its alt text is the dictionary's `cover`. */
  cover: ImageMetadata;
  /** Pictures inside the article; alt and caption are the dictionary's `figures`, in the same order. */
  figures: Figure[];
}

/** Newest first, by date (posts from the same day keep the order they are listed in): the blog and the latest posts read them in this order. */
export const posts: Post[] = (
  [
    {
      slug: 'binance-hack-2026-how-it-happened',
      key: 'binance',
      minutes: 8,
      date: '2026-11-06',
      cover: binanceCover,
      figures: [
        { image: binance1, after: 5 },
        { image: binance2, after: 38 },
      ],
    },
    {
      slug: 'ai-vs-hackers-cybersecurity-2026',
      key: 'ai',
      minutes: 8,
      date: '2026-11-06',
      cover: aiCover,
      figures: [{ image: ai1, after: 56 }],
    },
    {
      slug: 'trusted-access-cybersecurity-threats',
      key: 'trusted',
      minutes: 6,
      date: '2026-11-06',
      cover: trustedCover,
      figures: [{ image: trusted1, after: 11 }],
    },
    {
      slug: 'the-token-that-outlived-the-employee',
      key: 'offboarding',
      minutes: 4,
      date: '2026-10-06',
      cover: offboardingCover,
      figures: [{ image: offboarding1, after: 1 }],
    },
    {
      slug: 'one-limit-for-everyone-fits-no-one',
      key: 'thresholds',
      minutes: 5,
      date: '2026-09-29',
      cover: thresholdsCover,
      figures: [{ image: thresholds1, after: 1 }],
    },
    {
      slug: 'why-your-crm-never-sees-a-failed-sign-in',
      key: 'signins',
      minutes: 4,
      date: '2026-09-22',
      cover: signinsCover,
      figures: [{ image: signins1, after: 1 }],
    },
    {
      slug: 'allow-list-not-deny-list',
      key: 'allowlist',
      minutes: 5,
      date: '2026-09-15',
      cover: allowlistCover,
      figures: [{ image: allowlist1, after: 2 }],
    },
    {
      slug: 'a-protection-score-that-does-not-punish-you',
      key: 'score',
      minutes: 4,
      date: '2026-09-08',
      cover: scoreCover,
      figures: [{ image: score1, after: 1 }],
    },
    {
      slug: 'tenant-isolation-belongs-in-the-access-layer',
      key: 'tenancy',
      minutes: 4,
      date: '2026-09-01',
      cover: tenancyCover,
      figures: [{ image: tenancy1, after: 1 }],
    },
  ] satisfies Post[]
).sort((a, b) => b.date.localeCompare(a.date));
