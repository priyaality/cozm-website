import type { APIRoute } from 'astro';
import { isProductionSite } from '../data/seo';
import { withBase } from '../lib/paths';

/**
 * robots.txt — open to every crawler on the production host (cozm.in), with the
 * sitemap; closed everywhere else (GitHub Pages previews) so a preview can't be
 * indexed alongside the real site. Pages also carry a matching robots meta.
 */
export const GET: APIRoute = ({ site }) => {
  const body = isProductionSite(site)
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL(withBase('/sitemap-index.xml'), site).href}\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
