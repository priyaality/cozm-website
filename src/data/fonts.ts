/**
 * Fonts offered by the font picker (src/components/dev/FontPicker.astro).
 *
 * The defaults — Literata for headings, Instrument Sans for body — are
 * self-hosted (fontsource, imported in BaseLayout) and set in global.css, so
 * every visitor gets them. Arimo is self-hosted too. The rest load from Google
 * Fonts only when picked; `google` is the css2 family spec.
 *
 * Heading styles (display, headline, title) are tuned for the default,
 * Literata: Regular weight and its display optical size, so small headings
 * look like large ones. A heading font can override that:
 *   headingWeights — weights for display / headline / title (Arimo: 600/500/600,
 *                    its Figma weights)
 *   headingOpsz    — optical size to pin (fonts with an opsz axis)
 */
export interface FontOption {
  name: string;
  /** CSS family name when it differs from `name` (the variable fontsource builds). */
  family?: string;
  google?: string;
  fallback: 'sans-serif' | 'serif';
  headingWeights?: { display: number; headline: number; title: number };
  headingOpsz?: number;
}

export type FontRole = 'heading' | 'body';

export const DEFAULT_FONTS: Record<FontRole, string> = { heading: 'Literata', body: 'Instrument Sans' };

const google = (
  name: string,
  fallback: FontOption['fallback'],
  options: { opsz?: string; headingOpsz?: number } = {},
): FontOption => ({
  name,
  google: options.opsz
    ? `${name.replace(/ /g, '+')}:opsz,wght@${options.opsz},400..600`
    : `${name.replace(/ /g, '+')}:wght@400;500;600`,
  fallback,
  headingOpsz: options.headingOpsz,
});

const arimo = (role: FontRole): FontOption => ({
  name: 'Arimo',
  fallback: 'sans-serif',
  headingWeights: role === 'heading' ? { display: 600, headline: 500, title: 600 } : undefined,
});

/** The choices for each role, default first, in the order the picker lists them. */
export const fontsByRole: Record<FontRole, FontOption[]> = {
  heading: [
    { name: 'Literata', family: 'Literata Variable', fallback: 'serif' },
    arimo('heading'),
    google('Playfair Display', 'serif'),
    google('EB Garamond', 'serif'),
    google('Fraunces', 'serif', { opsz: '9..144', headingOpsz: 144 }),
  ],
  body: [
    { name: 'Instrument Sans', family: 'Instrument Sans Variable', fallback: 'sans-serif' },
    arimo('body'),
    google('Jost', 'sans-serif'),
    google('DM Sans', 'sans-serif'),
    google('Raleway', 'sans-serif'),
    google('Manrope', 'sans-serif'),
  ],
};
