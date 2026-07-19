# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 portfolio website for Tetsuya Maeda, a Fullstack Developer based in Vancouver, Canada. The portfolio showcases expertise in developing AI-powered systems, data analytics pipelines, and end-to-end software solutions. Professional background includes 5+ years of experience delivering factory automation systems, data visualization platforms, real-time analytics dashboards, and leading Agile development teams as a Scrum Master. Technical stack includes Python, SQL, TypeScript, C#, Azure, Docker, Next.js, and Power BI. The site is built with TypeScript, React 19, and Tailwind CSS, using shadcn/ui components.

The site is the personal portfolio of Tetsuya Maeda; **MaePace** is the umbrella brand (屋号) it operates under. Brand assets and the canonical decision record live in `docs/brand/` and `public/brand/` — read `docs/brand/maepace.md` before touching anything brand-related. The site is served from `maepace.com`, with other apps planned on subdomains.

**Important**: This project is configured with `ignoreDuringBuilds: true` for both ESLint and TypeScript in next.config.mjs. Builds will not fail on type or lint errors, so you must check type-safety yourself rather than relying on the build.

## Development Commands

```bash
# Start development server (Next dev server — fastest loop)
pnpm dev

# Build for production
pnpm build

# Run linter
pnpm lint

# Build + run on the real Cloudflare Workers runtime (workerd) locally.
# Use this before deploying — behaviour differs from `pnpm dev`.
pnpm preview

# Build + deploy to Cloudflare Workers manually.
# `run` is NOT optional here: `pnpm deploy` is pnpm's own workspace-deploy
# builtin and fails with ERR_PNPM_CANNOT_DEPLOY.
pnpm run deploy

# Regenerate Cloudflare binding types into cloudflare-env.d.ts
pnpm cf-typegen
```

## Project Structure

This is a single-page application with all content consolidated into one page (`app/page.tsx`). The site uses Next.js App Router architecture:

- **`app/`** - Next.js App Router directory
  - `layout.tsx` - Root layout with fonts (Inter + Noto Sans JP), metadata, Navigation component, and dark mode theme
  - `page.tsx` - Single-page portfolio containing all sections: Home/Hero, About, Projects, and Others
  - `globals.css` - Global styles and Tailwind CSS configuration

- **`components/`** - React components
  - `navigation.tsx` - Fixed top navigation bar with mobile menu (uses client-side state)
  - `page-header.tsx` - Reusable section header component
  - `particle-background.tsx` - Animated canvas-based particle effect with connections (client component)
  - `optimized-image.tsx` - Next.js Image wrapper with loading states and blur placeholder
  - `ui/` - shadcn/ui component library (Button, Card, Badge, Input, Textarea, etc.)

- **`lib/`** - Utilities
  - `utils.ts` - Contains `cn()` function for merging Tailwind classes

- **`public/`** - Static assets including profile photo and project images

## Architecture Notes

### Single-Page Design
The site consolidates all content (About, Projects, Others sections) into a single page file (`app/page.tsx`) for simplified maintenance. Each section has an `id` attribute (`#home`, `#about`, `#projects`, `#other`) for anchor-based navigation.

### Data Structure
All portfolio data (skills, certifications, hobbies, projects) is defined as JavaScript objects directly within `app/page.tsx`. When updating content:
- Skills are organized into `languages`, `frameworks`, and `tools`
- Projects include `id`, `title`, `description`, `tech`, `link`, and `image` fields
- Certifications include `name`, `issuer`, and `date`
- Hobbies include `icon` (Lucide React component), `name`, and `description`

### Styling and Theming
- Uses Tailwind CSS v4 with dark mode enabled by default (see `<html className="dark">` in layout.tsx)
- shadcn/ui components configured with "new-york" style and neutral base color
- Custom animations defined in globals.css: `animate-slide-up`, `animate-gradient`, etc.
- Path alias `@/*` maps to project root for clean imports

### Image Optimization
- All images use the `OptimizedImage` component wrapper (loading states, blur placeholders, error handling)
- Images are stored in `/public/` directory
- **`next/image` runtime optimization does not work on Cloudflare Workers.** Next's optimizer depends on `sharp`, which cannot run in workerd — requests to `/_next/image?url=...&w=640` return the original file untouched. `next.config.mjs` therefore sets `images.unoptimized: true` so nothing pretends otherwise.
- **Consequence: optimize images before committing them.** Convert to WebP and resize to the largest size actually rendered. Do not commit multi-megabyte PNGs — there is no build step that will shrink them.
  ```bash
  magick source.png -resize 1024x1024 -quality 82 -define webp:method=6 public/name.webp
  ```

### Client vs Server Components
- Most components are server components by default
- Client components (marked with `"use client"`): `navigation.tsx`, `particle-background.tsx`, `optimized-image.tsx`
- Use client components only when needed for state, effects, or browser APIs

## Deployment — Cloudflare Workers

The site runs on Cloudflare Workers via [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare), which adapts the Next build output into a Worker.

- `wrangler.jsonc` — Worker config. `main` points at the generated `.open-next/worker.js`; static assets are served from `.open-next/assets` via the `ASSETS` binding. `nodejs_compat` is required.
- `open-next.config.ts` — adapter config (currently defaults).
- `.open-next/` and `.wrangler/` are build output and are gitignored. Never commit them.
- Deploys run automatically through **Workers Builds** on push. `pnpm run deploy` exists for manual/emergency deploys.

Verify changes with `pnpm preview` rather than only `pnpm dev` — `pnpm dev` runs the Node dev server, which does not share workerd's constraints (the `next/image` gap above is exactly the kind of difference it hides).

**This project no longer uses Vercel or v0.dev.** Both were dropped when the site moved to Cloudflare. If you find leftover references to either (in `README.md`, `.vercel`, or config), they are stale and safe to remove.

## Package Manager

Use `pnpm`. `pnpm-lock.yaml` is the only lockfile — do not create `package-lock.json`. Some native dependencies (`workerd`, `esbuild`, `sharp`, `@tailwindcss/oxide`) need to run install scripts; they are allowlisted under `pnpm.onlyBuiltDependencies` in `package.json`. If you add a dependency that ships a postinstall, add it there or it will be silently skipped.
