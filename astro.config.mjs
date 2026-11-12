// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Production is https://cozm.in at the root. The GitHub Pages deploy overrides both
// (SITE_URL=https://priyaality.github.io BASE_PATH=/cozm-website); internal links go
// through withBase() in src/lib/paths.ts so they follow `base`.
const site = process.env.SITE_URL || 'https://cozm.in';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  // build.inlineStylesheets stays at its default ('auto' → external): the one shared stylesheet is
  // ~52KB (~10KB gzipped). Inlining it would double every page's HTML and push the home page past
  // the first TCP round trip anyway, while an external file is cached across all five pages.
  integrations: [
    sitemap({
      filter: (page) => !/\/404\/?$/.test(new URL(page).pathname),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
