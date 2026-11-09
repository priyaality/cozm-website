// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages project site: https://priyaality.github.io/cozm-website/
  // (internal links go through withBase() in src/lib/paths.ts).
  site: 'https://priyaality.github.io',
  base: '/cozm-website',
  vite: {
    plugins: [tailwindcss()]
  }
});