/**
 * The "What we do" versions being compared on the home page (see WhatWeDo.astro).
 * Listed here so the section and its switcher (in the font picker's panel,
 * src/components/dev/FontPickerPanel.astro) share them.
 */
export const wwdVersions = [
  { id: 'cards', label: 'Cards' },
  { id: 'lines', label: 'Lines' },
  { id: 'accordion', label: 'Accordion' },
] as const;

export type WwdVersion = (typeof wwdVersions)[number]['id'];

/** Shown by default, and the only one in production builds. */
export const defaultWwdVersion: WwdVersion = 'cards';
