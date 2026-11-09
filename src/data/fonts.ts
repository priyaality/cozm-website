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

export const DEFAULT_FONT = 'Arimo';

export const fontOptions: FontOption[] = [
  { name: 'Arimo', fallback: 'sans-serif' },
  { name: 'Inter', google: 'Inter:wght@400;500;600', fallback: 'sans-serif' },
  { name: 'Inter Tight', google: 'Inter+Tight:wght@400;500;600', fallback: 'sans-serif' },
  { name: 'DM Sans', google: 'DM+Sans:wght@400;500;600', fallback: 'sans-serif' },
  { name: 'Space Grotesk', google: 'Space+Grotesk:wght@400;500;600', fallback: 'sans-serif' },
  { name: 'IBM Plex Sans', google: 'IBM+Plex+Sans:wght@400;500;600', fallback: 'sans-serif' },
  { name: 'Fraunces', google: 'Fraunces:wght@400;500;600', fallback: 'serif' },
  { name: 'Source Serif 4', google: 'Source+Serif+4:wght@400;500;600', fallback: 'serif' },
  { name: 'Playfair Display', google: 'Playfair+Display:wght@400;500;600', fallback: 'serif' },
];
