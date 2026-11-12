# Cozm website

Marketing site for COZM. Astro 7 + Tailwind CSS 4, static output. Designed in Figma
([Cozm Website Redesign](https://www.figma.com/design/EVC2DVH02obpAmjhNYzdJI/Cozm-Website-Redesign?node-id=105-2326)).

```sh
bun install
bun dev          # http://localhost:4321
bun run build    # static site in dist/
```

## Scripts

`dev` · `build` · `preview` · `check` (astro check) · `lint` (oxlint) · `format` / `format:check` (oxfmt) ·
`cf:deploy` / `cf:preview` (wrangler)

## Deploy

- **Now:** GitHub Pages at https://priyaality.github.io/cozm-website/, on every push to `main`
  (`.github/workflows/deploy.yml`, built with `SITE_URL` / `BASE_PATH` for the sub-path).
- **Later:** Cloudflare Workers static assets at https://cozm.in (`wrangler.jsonc`, `public/_headers`).
  The default build already targets `https://cozm.in` at `/`.

Internal links go through `withBase()` (`src/lib/paths.ts`) so they work under either base.
`ci.yml` runs check, lint, format:check and build on PRs and pushes to `main`.

## Tokens

All in `src/styles/global.css` (`@theme`), each a CSS variable and a Tailwind utility: colours (`ink`, `sand`,
`paper`, …), fonts (`font-body` Instrument Sans, `font-heading` Literata, `font-mono` IBM Plex Mono, `font-hand`
Caveat), the `text-*` type scale, spacing, and the 12-column grid (`grid-12`, `grid-split` for 7/5).

## Components (`src/components`)

- `ui/`: `Button`, `Logo`, `NavLinks`, `Section`, `ProjectList` + `ProjectDetails` (/work, /originals), `NotifyForm`
- `Header`, `Footer`, `FeaturedWork` (`WorkRow` → `WorkCard`), `MediaFeature`, `ServicesTicker`, `ScrollWordReveal`,
  `HorizontalScroll`
- `hero/`: `HeroPlayer` (+ `PlayerCard`, `NowPlaying`), the home intro; video in `public/video/`
- `script/`: `ScriptPage`, `ScriptRevision` (the revised "agency script")
- Page sections: `approach/`, `about/`, `work/WorkShowcase`, `originals/OriginalsShowcase`
- `head/Fonts`, `dev/FontPicker*` (font picker)

Copy (nav, services, projects, hero labels) lives in `src/data/site.ts`.
