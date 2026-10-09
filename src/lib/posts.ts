import type { ImageMetadata } from 'astro';
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

export interface Figure {
  image: ImageMetadata;
  /** The body paragraph the picture follows, by index. */
  after: number;
}

export interface Post {
  slug: string;
  key: 'offboarding' | 'thresholds' | 'signins' | 'allowlist' | 'score' | 'tenancy';
  minutes: number;
  date: string;
  /** On the card and at the top of the article; its alt text is the dictionary's `cover`. */
  cover: ImageMetadata;
  /** Pictures inside the article; alt and caption are the dictionary's `figures`, in the same order. */
  figures: Figure[];
}

/** Newest first, by date: the blog and the latest posts under an article read them in this order. */
export const posts: Post[] = (
  [
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
