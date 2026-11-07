# Cozm website

Astro + Tailwind CSS v4 build of the Cozm homepage from the Figma file
[Cozm Website Redesign](https://www.figma.com/design/EVC2DVH02obpAmjhNYzdJI/Cozm-Website-Redesign?node-id=105-2326).

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## Design tokens

All tokens live in `src/styles/global.css` (`@theme`). Each one is both a CSS variable and a Tailwind utility.

| Group   | Tokens |
| ------- | ------ |
| Colour  | `ink` `sand` `paper` `graphite` `black` `ink-muted` (70%) `ink-faint` (40%) `scrim` (60%) |
| Font    | `font-sans` (Arimo), `font-mono` (IBM Plex Mono), `font-hand` (Caveat, stand-in for Figma Hand) |
| Type    | `text-display` `text-headline` `text-statement` `text-title` `text-body` `text-label` `text-eyebrow` `text-nav` `text-caption` |
| Spacing | `gutter` (80px) `section` (80px) `column-gap` (16px) `nav` (85px fixed header) |
| Effect  | `drop-shadow-paper` |
| Layout  | 12-column grid (80px margins, 16px gaps). `grid-12`, and `grid-split` for the 7/5 split; column 8 is the right-hand keyline |

## Components

- `ui/Button`: `primary` / `secondary` / `inverse` variants, `lg` / `sm` sizes
- `ui/Logo`, `ui/NavLinks`, `ui/Section`
- `Header` (fixed; turns into a sand bar once the hero scrolls away), `Footer`
- `hero/HeroPlayer` (+ `PlayerCard`, `NowPlaying`): intro where a music-player card fades in, expands until its thumbnail (the hero video) fills the viewport, then plays muted with a "now playing" card and a scroll-down button. Video file goes at `public/video/hero.mp4`; labels live in `heroVideo` in `src/data/site.ts`
- `ServicesTicker`: infinite horizontal marquee
- `ScrollWordReveal`: statement copy that fades in word by word as the page scrolls (uses `motion`); the first paragraph is fully lit when the section top reaches mid-viewport (`landAt`, default 0.5) and every word is lit once 70% of the section has scrolled out (`completeAt`, default 0.7)
- `MediaFeature`: bordered media card with a bottom-right CTA (media goes in the `media` slot)
- `WorkCard`, `WorkRow`: full-bleed featured-work tiles in 7:5 / 5:7 rows, with card text on grid lines
- `script/ScriptPage`, `script/ScriptRevision`: the revised "agency script"

Content (nav, services, featured work) lives in `src/data/site.ts`.
