/**
 * The font picker (FontPicker.astro + FontPickerHead.astro) is a design-review
 * tool: it lets you try other heading/body fonts at runtime. It's on in
 * `astro dev` and in any build run with PUBLIC_FONT_PICKER=true (the GitHub
 * Pages review deploy sets it; see .github/workflows/deploy.yml), and off in
 * production builds (cozm.in):
 *
 *   PUBLIC_FONT_PICKER=true bun run build
 *
 * When off, none of its markup, scripts or font list (src/data/fonts.ts) reach
 * the page.
 */
export const fontPickerEnabled = import.meta.env.DEV || import.meta.env.PUBLIC_FONT_PICKER === 'true';
