/**
 * Fonts offered by the font picker (src/components/dev/FontPicker.astro).
 *
 * The picker is off in production builds (see src/components/dev/enabled.ts).
 *
 * The defaults — Plus Jakarta Sans for headings, DM Sans for body — are
 * self-hosted (src/components/head/Fonts.astro) and set in global.css, so
 * every visitor gets them; "Reset to defaults" in the picker goes back to them.
 * The other options load only when picked, from Fontshare (`fontshare` is the
 * css API spec) or Google Fonts (`google`, the css2 family spec).
 *
 * Fontshare fonts load as their variable version (`slug@1`, upright; the site
 * has no italics), one file covering the family's whole weight range, so any
 * weight works, e.g. headings at 550. Every family here has one. (Asking for
 * fixed weights instead, e.g. `slug@400,500`, returns static files, and
 * Fontshare quietly swaps in a different font for weights a family lacks.)
 *
 * Every option uses the site's existing type styles (sizes, line heights,
 * letter-spacing, heading weight 550). A font can override:
 *   headingWeights — weights for display / headline / title
 *   headingOpsz    — optical size to pin (fonts with an opsz axis)
 */
export interface FontOption {
  name: string;
  /** CSS family name when it differs from `name`. */
  family?: string;
  google?: string;
  fontshare?: string;
  fallback: 'sans-serif' | 'serif';
  headingWeights?: { display: number; headline: number; title: number };
  headingOpsz?: number;
}

export type FontRole = 'heading' | 'body';

export const DEFAULT_FONTS: Record<FontRole, string> = { heading: 'Plus Jakarta Sans', body: 'DM Sans' };

/** Self-hosted (the defaults): already on every page, nothing to load. */
const plusJakartaSans: FontOption = {
  name: 'Plus Jakarta Sans',
  family: 'Plus Jakarta Sans Variable',
  fallback: 'sans-serif',
};
const dmSans: FontOption = { name: 'DM Sans', family: 'DM Sans Variable', fallback: 'sans-serif' };

/** A Fontshare family, variable (`@1`). Its API slug is the name in kebab case unless given. */
const fontshare = (name: string, fallback: FontOption['fallback'], slug?: string): FontOption => ({
  name,
  fontshare: `${slug ?? name.toLowerCase().replace(/ /g, '-')}@1`,
  fallback,
});

/** The choices for each role, in the order the picker lists them. */
export const fontsByRole: Record<FontRole, FontOption[]> = {
  heading: [
    fontshare('Epilogue', 'sans-serif'),
    plusJakartaSans,
    fontshare('Sora', 'sans-serif'),
    fontshare('Bespoke Serif', 'serif'),
    fontshare('Zodiak', 'serif'),
    fontshare('Ranade', 'sans-serif'),
    fontshare('Cabinet Grotesk', 'sans-serif'),
    fontshare('Karma', 'serif'),
    fontshare('Quicksand', 'sans-serif'),
  ],
  body: [
    plusJakartaSans,
    fontshare('General Sans', 'sans-serif'),
    fontshare('Epilogue', 'sans-serif'),
    fontshare('Quicksand', 'sans-serif'),
    fontshare('Satoshi', 'sans-serif'),
    dmSans,
    fontshare('Manrope', 'sans-serif'),
  ],
};
