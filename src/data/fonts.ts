/**
 * Fonts offered by the font picker (src/components/dev/FontPicker.astro).
 *
 * `google` is the Google Fonts css2 family spec (weights 400–600, which is all
 * the type tokens use); the default, Arimo, is self-hosted (fontsource) and
 * needs no request. `fallback` is the generic family after it.
 *
 * Fonts with an optical-size axis (Literata, Fraunces) load it too; the browser
 * then picks the cut for each text size (font-optical-sizing: auto), so large
 * headings get the high-contrast display design, as in Figma.
 *
 * `displayWeight`: weight for the display style when this is
 * the heading font (the tokens' 600 suits Arimo; Figma sets the serifs Regular).
 */
export interface FontOption {
  name: string;
  google?: string;
  fallback: 'sans-serif' | 'serif';
  displayWeight?: number;
}

export type FontRole = 'heading' | 'body';

export const DEFAULT_FONT = 'Arimo';

const arimo: FontOption = { name: 'Arimo', fallback: 'sans-serif' };
const google = (
  name: string,
  fallback: FontOption['fallback'],
  options: { opsz?: string; displayWeight?: number } = {},
): FontOption => ({
  name,
  google: options.opsz
    ? `${name.replace(/ /g, '+')}:opsz,wght@${options.opsz},400..600`
    : `${name.replace(/ /g, '+')}:wght@400;500;600`,
  fallback,
  displayWeight: options.displayWeight,
});

/** The choices for each role, in the order the picker lists them. */
export const fontsByRole: Record<FontRole, FontOption[]> = {
  heading: [
    arimo,
    google('Playfair Display', 'serif', { displayWeight: 400 }),
    google('Literata', 'serif', { opsz: '7..72', displayWeight: 400 }),
    google('EB Garamond', 'serif', { displayWeight: 400 }),
    google('Fraunces', 'serif', { opsz: '9..144', displayWeight: 400 }),
  ],
  body: [
    arimo,
    google('Instrument Sans', 'sans-serif'),
    google('Jost', 'sans-serif'),
    google('DM Sans', 'sans-serif'),
    google('Raleway', 'sans-serif'),
    google('Manrope', 'sans-serif'),
  ],
};
