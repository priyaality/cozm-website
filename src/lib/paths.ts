/**
 * `base` comes from BASE_PATH in astro.config.mjs: '/' in production (https://cozm.in) and
 * '/cozm-website' on the GitHub Pages preview (https://priyaality.github.io/cozm-website/).
 * Internal links and files in public/ are written root-relative in the code ('/work',
 * '/video/hero.mp4'); these helpers add or remove the base, and are no-ops at the root.
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
