import type { ImageMetadata } from 'astro';
import uncovered from '../assets/images/work-uncovered.png';
import capmint from '../assets/images/work-capmint.png';
import paisasmart from '../assets/images/work-paisasmart.png';
import masaba from '../assets/images/work-masaba.png';
import { withBase } from '../lib/paths';

/**
 * Where every "Talk to us" / "Start a conversation" button goes (header,
 * home intro, approach intro, footer). Set to undefined to make them dummy
 * buttons that do nothing.
 */
export const contactHref: string | undefined = 'mailto:palash@cozm.in';

export const navLinks = [
  { label: 'Approach', href: '/approach' },
  { label: 'Work', href: '/work' },
  { label: 'Originals', href: '/originals' },
  { label: 'About', href: '/about' },
];

/**
 * Hero video, also used by the Originals showcase. Always muted, so encoded without
 * audio: hero.webm (AV1: SVT-AV1 preset 2, CRF 46) and hero.mp4 (H.264 High@4.0,
 * two-pass 400 kb/s, +faststart), each with a keyframe at startAt so the #t= start
 * decodes at once. hero.jpg is the frame at startAt, shown in the player card before
 * playback and as the "now playing" artwork.
 * title / subtitle are the labels shown on the player and "now playing" cards.
 */
export const heroVideo = {
  /** H.264 MP4, plays everywhere. */
  src: withBase('/video/hero.mp4'),
  type: 'video/mp4',
  /** Every encoding, best first (AV1 is about half the MP4's size). */
  sources: [
    { src: withBase('/video/hero.webm'), type: 'video/webm; codecs="av01.0.05M.08"' },
    { src: withBase('/video/hero.mp4'), type: 'video/mp4; codecs="avc1.640028"' },
  ],
  /** Frame of the video at `startAt` (the clip opens on black, so the first frame isn't usable). */
  poster: withBase('/video/hero.jpg') as string | undefined,
  /** Seconds into the video to show in the card and start playing from. */
  startAt: 3,
  title: 'All Risk is creative',
  subtitle: 'Cozm Originals',
  /** Shown until the video's real duration loads. */
  duration: '0:47',
};

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
  about: string;
  /** Label / value facts (host, views, guests…), two per row. */
  facts: { label: string; value: string }[];
  /** Closing credit line. */
  credit?: string;
  /** Where to watch. */
  watch: string;
}

const work = (title: string): WorkItem => {
  const item = featuredWork.find((w) => w.title === title);
  if (!item) throw new Error(`No featured work titled "${title}"`);
  return item;
};

/** The /work page list, in Figma's order. Copy from the Notion "Work" page. */
export const workProjects: WorkProject[] = [
  {
    item: work('Uncovered with Suketu Shah'),
    category: 'Podcast',
    about:
      'Long, unhurried conversations that go past the press release: how India’s most consequential business leaders think, decide and live. Made for people who want the story behind the companies they invest in, work for and compete with.',
    facts: [
      { label: 'Host', value: 'Suketu Shah' },
      { label: 'Views (till date)', value: '1,457,690' },
      { label: 'Notable guests', value: 'Harsh Mariwala, Sajjan Jindal and Perizaad Zorabian' },
    ],
    watch: 'https://www.youtube.com/@UncoveredwithSuketuShah',
  },
  {
    item: work('CapMint Stories'),
    category: 'Documentaries',
    about:
      'Tight, cinematic portraits of people who built wealth in Indian markets, and the thinking behind it. Made for investors who would rather learn from practitioners than from tips.',
    facts: [
      { label: 'Made for', value: 'CapMint' },
      { label: 'Acquired by', value: 'AlphaGrep' },
      { label: 'Episodes', value: '25' },
      { label: 'Views (till date)', value: '2,683,450' },
    ],
    watch: 'https://www.youtube.com/@CapMintStories',
  },
  {
    item: work('How I Masaba'),
    category: 'Podcast (audio only)',
    about:
      'Masaba Gupta in conversation with women at the top of their fields, on the work, the doubts and the discipline behind it.',
    facts: [
      { label: 'Host', value: 'Masaba Gupta' },
      { label: 'Commissioned by', value: 'Luminary' },
      {
        label: 'Notable guests',
        value: 'Sania Mirza, Faye D’Souza, Anoushka Shankar, Maitreyi Ramakrishnan and Mithali Raj',
      },
    ],
    watch: 'https://www.youtube.com/playlist?list=PLjJcxDJbsFFnbhpNviAMv3iKYK9OXOoQP',
  },
  {
    item: work('PaisaSmart'),
    category: 'Youtube channel',
    about:
      'A YouTube channel of smart, nuanced explainers on India’s economy and markets. We joined at about 500 subscribers. We made the first episodes, built the production setup and defined the tone, then trained the team to run it themselves.',
    facts: [
      { label: 'Made for', value: 'Elixir Equities' },
      { label: 'Subscribers', value: '~500 → 186K' },
    ],
    credit: 'Built with COZM, run in-house since the handover',
    watch: 'https://www.youtube.com/@paisasmart',
  },
];

/* ---------- Originals page ---------- */

export interface Original {
  title: string;
  /** Format, shown in the list. */
  category: string;
  /** Shows a "Coming soon!" tag next to the title. */
  comingSoon?: boolean;
  /** One-line premise. */
  description: string;
  /** Longer description. */
  about?: string;
  facts: { label: string; value: string }[];
  /** A line above the actions (e.g. what the notify form is for). */
  note?: string;
  /** Where to listen / watch. A coming-soon original shows the notify form instead. */
  links?: { label: string; href: string }[];
  /** Background video while this original is selected. */
  video: {
    /** Fallback file; also identifies the video (same src = same video, just restarted). */
    src: string;
    /** Encodings, best first; the browser plays the first one it supports. */
    sources?: { src: string; type: string }[];
    poster?: string;
    startAt?: number;
  };
}

/** Cozm's own shows, in Figma's order. The first is selected by default. */
export const originals: Original[] = [
  {
    title: 'All Risk is Creative',
    category: 'Podcast',
    description: 'Stories of people who bet everything on an idea.',
    about:
      'Documentary-style video essays and long-form conversations about risk-takers in technology, business and ideas, from Lee Kuan Yew and Ren Zhengfei to Jensen Huang, Jim Simons and Ramanujan. Made in India, watched around the world.',
    facts: [
      { label: 'Host', value: 'Palash Kulkarni' },
      { label: 'Platform', value: 'Spotify, Youtube' },
    ],
    // TODO: real links.
    links: [
      { label: 'Listen on Spotify', href: '#' },
      { label: 'Watch on Youtube', href: '#' },
    ],
    video: heroVideo,
  },
  {
    title: 'The Craft',
    category: 'Documentaries',
    comingSoon: true,
    // TODO: placeholder copy from Figma.
    description: 'Add a few lines here about what The Craft is, and why one should check it out',
    facts: [
      { label: 'Host', value: 'Palash Kulkarni' },
      { label: 'Platform', value: 'TBD' },
    ],
    note: 'A new COZM original. Get the first episode the day it’s out.',
    // TODO: its own video; for now the same one, restarted.
    video: heroVideo,
  },
];

/* ---------- About page ---------- */

export const aboutIntro = {
  heading: 'India’s most ambitious people deserve media as ambitious as they are.',
  subheading: 'COZM exists to make it, and to enable India’s companies able to make it themselves.',
};

/** Why COZM exists — shown beside the illustration. */
export const manifesto = {
  body: [
    'Indian media has long underestimated its audience. From films to podcasts, the instinct has been to serve the lowest common denominator.',
    'So the most curious and ambitious Indians, hungry to learn and to grow, spend their attention elsewhere. Their media diet is mostly Western, and mostly not about them.',
    'A country cannot grow creatively by alienating its best minds. We want to make media that is original to India, not a copy of the West, and good enough to travel anywhere.',
    'It is also a sound business. India’s top 10% is about 140 million people, and they are its emerging consumer class. Get a piece of their mind and you get a piece of their wallet.',
    'We do it two ways: with companies, by building media capability inside them, and on our own, through COZM Originals.',
  ],
};

/** "Our philosophy" — four principles, shown 2 × 2. */
export const philosophy = [
  { title: 'Media is a capability', description: 'Build it once and it keeps paying off for years' },
  { title: 'Consistency beats virality', description: 'Showing up every week matters more than one lucky hit' },
  {
    title: 'Own what you make',
    description: 'Every rupee spent renting creativity is a rupee not spent building your own',
  },
  { title: 'Craft is the strategy', description: 'India’s top 10% can tell the difference' },
];

/** Bio paragraphs; a paragraph can be a list of text and link parts. */
type BioPart = string | { label: string; href: string };
export const team = {
  name: 'Palash Kulkarni',
  bio: [
    'Palash Kulkarni is the founder of COZM. He is a writer, producer and creator who works where business and storytelling meet.',
    'He studied engineering at IIT Bombay and has worked with Bain & Company, Disney+ Hotstar and Rainshine Entertainment, a media investment fund. That mix of consultant, investor and creator is COZM’s edge: he translates business goals into creative ones.',
    [
      'Palash hosts ',
      { label: 'All Risk Is Creative', href: '/originals' },
      ', writes about the business of creativity on Substack, and makes documentaries and short films.',
    ],
  ] as (string | BioPart[])[],
  social: {
    x: 'https://x.com/ABiggerSpalash',
    linkedin: 'https://www.linkedin.com/in/palash-kulkarni-a6696525/',
    substack: 'https://substack.com/@palashk',
  },
};

/* ---------- Approach page ---------- */

export interface ApproachStep {
  /** Day of the 90-day programme, shown as a large numeral (e.g. '01'). */
  day: string;
  title: string;
  description: string;
  /** How the same step goes with an agency, shown below the description. */
  agency: string;
}

/** The four phases shown on the dial, one per 90° turn. */
export const approachSteps: ApproachStep[] = [
  {
    day: '01',
    title: 'Create the format',
    description: 'We work out the idea, format, and voice with you and your team.',
    agency: 'With an agency, you only get what they make.',
  },
  {
    day: '30',
    title: 'Train the team',
    description: 'Your team starts leading production, and we coach them through each episode until they’re confident.',
    agency: 'With an agency, your team never learns how.',
  },
  {
    day: '60',
    title: 'Set up workflows',
    description:
      'We put the templates, quality checks and publishing schedule in place, and write them down so nothing depends on us.',
    agency: 'With an agency, your team watches from the sidelines.',
  },
  {
    day: '90',
    title: 'Hand it over',
    description: 'Your team runs it on its own, and each new episode costs less to make than the last.',
    agency: 'With an agency, your team only signs off on their work.',
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
    description: 'Narrative and conversation podcasts. Format, research, recording, edit, mix and release.',
  },
  {
    name: 'Video',
    description:
      'Long-form interviews, documentaries and short-form. Research and script through shoot, edit, finishing and Shorts.',
  },
  {
    name: 'Creative consulting',
    description: 'Content strategy, format and IP development, editorial direction, and building your in-house team.',
  },
];
