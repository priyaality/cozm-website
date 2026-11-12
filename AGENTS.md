# Agent notes

- Package manager is **bun** (`bun install`, `bun dev`, `bun run <script>`). No npm/pnpm lockfiles.
- The design is client-approved: changes must keep the site looking and behaving identically unless asked.
- Copy lives in `src/data/site.ts`; tokens in `src/styles/global.css`.
- Write internal links root-relative and pass them through `withBase()` (`src/lib/paths.ts`); the GitHub Pages
  build runs under `/cozm-website`.
- Verify before committing: `bun run check`, `bun run lint`, `bun run format:check`, `bun run build`.
- Dev server: `bun dev --background` (manage with `astro dev stop|status|logs`).
- Astro docs: https://docs.astro.build
