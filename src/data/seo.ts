/**
 * Site-wide SEO facts: brand, company and share-image details used by the
 * <head> (components/head/Seo.astro) and robots.txt. Per-page titles and
 * descriptions live on each page's <BaseLayout> tag.
 */
import { team } from './site';

/** The only host search engines may index. Every other deploy (GitHub Pages previews) is noindex. */
export const PRODUCTION_HOSTNAME = 'cozm.in';

export const isProductionSite = (site: URL | undefined): boolean => site?.hostname === PRODUCTION_HOSTNAME;

export const seo = {
  siteName: 'COZM',
  legalName: 'COZM Entertainment Private Limited',
  defaultTitle: 'Cozm — Original media for India’s top 10%',
  defaultDescription:
    'Cozm is a media studio in India that builds original podcasts, documentaries and video essays with brands, for India’s top 10%.',
  locale: 'en_IN',
  lang: 'en-IN',
  /** Sand, the page background. */
  themeColor: '#e7dbc9',
  ogImage: '/og.jpg',
  ogImageAlt: 'COZM — Original media for India’s top 10%',
  /** Square logo for JSON-LD (Google wants ≥112×112). */
  logo: '/icon-512.png',
  address: { addressLocality: 'Indore', addressRegion: 'Madhya Pradesh', addressCountry: 'IN' },
  founder: {
    name: team.name,
    sameAs: Object.values(team.social),
  },
  /** COZM's own profiles (Instagram, LinkedIn page, YouTube…). None are known yet. */
  sameAs: [] as string[],
};
