import type { ImageMetadata } from 'astro';
import uncovered from '../assets/images/work-uncovered.png';
import capmint from '../assets/images/work-capmint.png';
import paisasmart from '../assets/images/work-paisasmart.png';
import masaba from '../assets/images/work-masaba.png';

export const navLinks = [
  { label: 'Approach', href: '/approach' },
  { label: 'Work', href: '/work' },
  { label: 'Originals', href: '/originals' },
  { label: 'About', href: '/about' },
];

export const contactHref = '/contact';

/**
 * Hero video. Drop the file at public/video/hero.mp4 (optionally a poster image
 * too, e.g. public/video/hero.jpg — shown in the player card before playback
 * and as the "now playing" artwork).
 * title / subtitle are the labels shown on the player and "now playing" cards.
 */
export const heroVideo = {
  src: '/video/hero.mp4',
  type: 'video/mp4',
  /** Frame of the video at `startAt` (the clip opens on black, so the first frame isn't usable). */
  poster: '/video/hero.jpg' as string | undefined,
  /** Seconds into the video to show in the card and start playing from. */
  startAt: 3,
  title: 'All Risk is creative',
  subtitle: 'Cozm Originals',
  /** Shown until the video's real duration loads. */
  duration: '0:47',
};

export const statement = [
  'India’s most curious audience has plenty to watch, just very little about India.',
  'India’s top 10% is about 140 million people, curious, ambitious and hungry for media that makes them think. But Indian media has mostly aimed for the widest audience, leaving them to fill the gap with shows from elsewhere.',
  'We think they deserve better, so we started making it ourselves. Our originals are where we learn what this audience chooses, and everything we build with brands starts from there.',
];

export const services = [
  'Podcasts',
  'Documentaries',
  'Long-form interviews',
  'Video essays',
  'Youtube channels',
  'Short-form video',
  'Content strategy',
  'Format & IP development',
  'Editorial direction',
  'Launch & release strategy',
  'Publishing systems',
  'In-house teams',
];

export type WorkItem = {
  title: string;
  description: string;
  image: ImageMetadata;
  /** CSS object-position reproducing the Figma crop. */
  position?: string;
  href?: string;
};

export const featuredWork: WorkItem[] = [
  {
    title: 'Uncovered with Suketu Shah',
    description: 'Conversations with India’s top industrialists and businesspeople.',
    image: uncovered,
  },
  {
    title: 'CapMint Stories',
    description: 'Short documentaries on India’s most successful investors and traders.',
    image: capmint,
    position: '21.2% 50%',
  },
  {
    title: 'PaisaSmart',
    description: 'Educating India’s next 100 million investors on finance and capital markets.',
    image: paisasmart,
    position: '18.6% 50%',
  },
  {
    title: 'How I Masaba',
    description: 'The world’s most accomplished women on their craft.',
    image: masaba,
  },
];

/* ---------- Work page ---------- */

export interface WorkProject {
  /** The cover, title and one-line description, shared with the featured work tiles. */
  item: WorkItem;
  /** Format, shown in the list (e.g. 'Podcast'). */
  category: string;
  /** Longer description. */
  about?: string;
  /** Label / value facts (host, views, guests…), two per row. */
  facts?: { label: string; value: string }[];
  /** Where to watch or listen. */
  watch?: { label: string; href: string };
}

const work = (title: string) => featuredWork.find((w) => w.title === title)!;

/**
 * The /work page list, in Figma's order. Only Uncovered has full copy in the
 * design so far; the others show what exists (fields left out aren't rendered).
 */
export const workProjects: WorkProject[] = [
  {
    item: work('Uncovered with Suketu Shah'),
    category: 'Podcast',
    about:
      'Long, unhurried conversations that go past the press release: how India’s most consequential business leaders think, decide and live. Made for people who want the story behind the companies they invest in, work for and compete with.',
    facts: [
      { label: 'Host', value: 'Suketu Shah' },
      { label: 'Views (till date)', value: '160,000' },
      { label: 'Notable guests', value: 'Harsh Mariwala, Sajjan Jindal and Perizaad Zorabian' },
    ],
    // TODO: real link.
    watch: { label: 'Watch on Youtube', href: '#' },
  },
  { item: work('CapMint Stories'), category: 'Documentaries' },
  { item: work('How I Masaba'), category: 'Podcast (audio only)' },
  { item: work('PaisaSmart'), category: 'Youtube channel' },
];

/* ---------- Approach page ---------- */

export interface ApproachStep {
  /** Day of the 90-day programme, shown as a large numeral (e.g. '01'). */
  day: string;
  title: string;
  description: string;
}

/** The four phases shown on the dial, one per 90° turn. */
export const approachSteps: ApproachStep[] = [
  {
    day: '01',
    title: 'Create the format',
    description: 'We work out the idea, format, and voice with you and your team.',
  },
  {
    day: '30',
    title: 'Train the team',
    description:
      'Your team starts leading production, and we coach them through each episode until they’re confident.',
  },
  {
    day: '60',
    title: 'Set up workflows',
    description:
      'We put the templates, quality checks and publishing schedule in place, and write them down so nothing depends on us.',
  },
  {
    day: '90',
    title: 'Hand it over',
    description:
      'Your team runs it on its own, and each new episode costs less to make than the last.',
  },
];

/** "On day 91, you'll have:" — what the team is left with. */
export const dayNinetyOne = [
  'A written playbook of workflows, templates and quality checks.',
  'A publishing schedule your team can keep up, and the numbers to track.',
  'Your own format, with the idea, voice and first episodes made alongside your team.',
  'A team that has already produced episodes themselves.',
];

/** Typical agency vs Cozm comparison table. */
export const agencyComparison = {
  heading: 'Media only pays off if you keep showing up, and that’s hard to do through an agency.',
  intro: [
    'The brands that win with media show up every week, for years. That’s hard when your voice lives inside someone else’s company, where you pay their margin and their team gets better instead of yours.',
    'Built in-house, the capability compounds: each episode gets easier and cheaper to make, and over time your media becomes one of your biggest advantages.',
  ],
  columns: ['A typical agency', 'Cozm'] as const,
  rows: [
    ['Stays as long as you pay', 'Works with you for 90 days'],
    ['Only delivers the episodes', 'Delivers the episodes and the skills to make more'],
    ['Their team learns the craft', 'Your team learns the craft'],
    ['Costs keep growing', 'Each episode gets cheaper to make'],
    ['Works to keep you coming back', 'Works to make you independent'],
    ['After day 90, sends another invoice', 'After day 90, your team runs it'],
  ] as const,
};

export interface Offering {
  name: string;
  description: string;
  /** Image for the stack. Until real images exist, a labelled placeholder card is shown. */
  image?: ImageMetadata;
}

/** "What we do" — the studio's offerings. */
export const offerings: Offering[] = [
  {
    name: 'Audio',
    description:
      'Narrative and conversation podcasts. Format, research, recording, edit, mix and release.',
  },
  {
    name: 'Video',
    description:
      'Long-form interviews, documentaries and short-form. Research and script through shoot, edit, finishing and Shorts.',
  },
  {
    name: 'Creative consulting',
    description:
      'Content strategy, format and IP development, editorial direction, and building your in-house team.',
  },
];
