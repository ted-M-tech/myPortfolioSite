# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The personal portfolio of Tetsuya Maeda ("Ted") — a fullstack developer in Vancouver, Canada,
working across factory automation, real-time data analytics and AI. **MaePace** is the umbrella
brand (屋号) the site operates under; it is served from `maepace.com`, with other apps planned
on subdomains.

Built with **Astro 7**, output as a static site, served as **Cloudflare Workers static assets**.
There is no UI framework and no animation library. Total client JS is ~2.5 KB.

## Commands

```bash
pnpm dev        # Astro dev server — http://localhost:4321
pnpm check      # astro check (types + template diagnostics)
pnpm build      # emit dist/
pnpm preview    # build, then serve dist/ through workerd — matches production
pnpm run deploy # manual deploy. `run` is NOT optional (see gotchas)
```

## Editing content

**All copy, numbers, links and pricing live in `src/data/profile.ts`.** Components hold layout
only. When changing what the site *says*, that is the one file to touch — do not scatter strings
back into components, and do not make an exception "just for this section".

Bilingual fields are `{ ja, en }`. Both languages are rendered into the markup and CSS shows one
(`[data-lang]` in `global.css`), so the page stays readable with JS disabled.

## Architecture

```
src/
  data/profile.ts       all content
  layouts/Base.astro    head, meta, JSON-LD, language bootstrap
  components/           one per section; layout only
  scripts/              lang.ts / reveal.ts / hero-field.ts
  styles/tokens.css     brand tokens
  styles/global.css     reset + shared classes
```

## Decisions worth not re-litigating

- **No adapter.** `@astrojs/cloudflare` forces `output: 'server'`, which would mean sprinkling
  `prerender` everywhere to undo it. `wrangler.jsonc` deliberately has **no `main`** — that is
  what makes it assets-only, with no Worker code to run or maintain.
- **No animation library.** Reveals use IntersectionObserver; the hero is a hand-written 2D canvas.
  CSS `animation-timeline: view()` was tried and **rejected**: `animation-range` is sensitive to
  element height and to whether an ancestor is a scroll container, and when conditions line up the
  progress never advances, leaving elements stuck at `opacity: 0`. It made whole sections vanish.
  IntersectionObserver behaves identically everywhere, which is cheaper to own.
- **Icons are inlined** (`components/Icon.astro`) rather than loaded from the lucide CDN — that
  would be an external script with no SRI, plus a network round trip for a dozen glyphs.
- **Project cards use no photography.** Most real output (plant control screens, internal SaaS)
  cannot be shown. Generic stock imagery would misrepresent the work, so `ProjectPanel.astro`
  draws the logo's stride motif instead.

## Gotchas

- **Never put `overflow-x: hidden` on `body`.** It makes body a scroll container and breaks
  viewport-relative scroll behaviour. Let whichever element overflows clip itself.
- **`pnpm run deploy`, not `pnpm deploy`.** `deploy` is pnpm's own workspace-deploy builtin and
  fails with `ERR_PNPM_CANNOT_DEPLOY`.
- **The hero canvas must not spawn concurrent rAF loops.** `hero-field.ts` guards with a
  `looping` flag and stops on both IntersectionObserver and `visibilitychange`; an unguarded
  restart path can freeze the renderer.

## Deployment

Push to `main` → **Workers Builds** builds and deploys automatically.
Build command `pnpm build`, deploy command `pnpm exec wrangler deploy`.

`www` → apex is a Cloudflare **Redirect Rule**, not code — there is no Worker to put it in.

## Brand

`docs/brand/maepace.md` is canonical for the name, logo meaning and usage rules. Assets are in
`public/brand/` with `fill="currentColor"`. **Do not tilt, distort, recolour beyond a single
tone, or lengthen the tail.** Read the doc before touching anything brand-related.

## History

This repo previously held a Next.js site synced from v0.dev and deployed on Vercel. All of that
was removed. If you find references to Next.js, v0.dev, Vercel, or `@opennextjs/cloudflare`, they
are stale.
