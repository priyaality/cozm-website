/**
 * Fonts offered by the font picker (src/components/dev/FontPicker.astro).
 *
 * `google` is the Google Fonts css2 family spec (weights 400–600, which is all
 * the type tokens use); the default, Arimo, is self-hosted (fontsource) and
 * needs no request. `fallback` is the generic family after it.
 */
export interface FontOption {
  name: string;
  google?: string;
  fallback: 'sans-serif' | 'serif';
}

export type FontRole = 'heading' | 'body';

export const DEFAULT_FONT = 'Arimo';

const arimo: FontOption = { name: 'Arimo', fallback: 'sans-serif' };
const google = (name: string, fallback: FontOption['fallback']): FontOption => ({
  name,
  google: `${name.replace(/ /g, '+')}:wght@400;500;600`,
  fallback,
});

/** The choices for each role, in the order the picker lists them. */
export const fontsByRole: Record<FontRole, FontOption[]> = {
  heading: [
    arimo,
    google('Playfair Display', 'serif'),
    google('Literata', 'serif'),
    google('EB Garamond', 'serif'),
    google('Fraunces', 'serif'),
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
