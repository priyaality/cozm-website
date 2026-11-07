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

/** Hero background video. Drop the file at public/video/hero.mp4 (optionally a poster image too). */
export const heroVideo = {
  src: '/video/hero.mp4',
  type: 'video/mp4',
  poster: undefined as string | undefined,
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
  overlay?: 'solid' | 'gradient';
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
    overlay: 'gradient',
  },
];
