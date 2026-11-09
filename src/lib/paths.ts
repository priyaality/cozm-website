/**
 * The site is served from a sub-path on GitHub Pages
 * (https://priyaality.github.io/cozm-website/), set as `base` in
 * astro.config.mjs. Internal links and files in public/ are written root-relative
 * in the code ('/work', '/video/hero.mp4'); these helpers add or remove the base.
 * Images imported through astro:assets get the base automatically.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** '/work' → '/cozm-website/work'. External URLs, '#…' and relative paths are left alone. */
export const withBase = (path: string): string =>
  path.startsWith('/') && !path.startsWith('//') ? `${BASE}${path}` : path;

/** '/cozm-website/work/' → '/work' ('/' for the home page). */
export const withoutBase = (pathname: string): string => {
  const path = BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  return path.replace(/\/$/, '') || '/';
};
