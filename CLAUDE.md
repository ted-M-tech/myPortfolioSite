# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 portfolio website for Ted - Tetsuya Maeda (Software Developer / Data Engineer). The site is built with TypeScript, React 19, and Tailwind CSS, using shadcn/ui components. It's configured to be automatically synced with v0.dev and deployed on Vercel.

**Important**: This project is configured with `ignoreDuringBuilds: true` for both ESLint and TypeScript in next.config.mjs. These settings exist to facilitate rapid development with v0.dev, but you should still aim to write type-safe, lint-compliant code.

## Development Commands

```bash
# Start development server
pnpm dev        # or npm run dev

# Build for production
pnpm build      # or npm run build

# Start production server
pnpm start      # or npm run start

# Run linter
pnpm lint       # or npm run lint
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
- All images use the `OptimizedImage` component wrapper
- Component includes loading states, blur placeholders, and error handling
- Images are stored in `/public/` directory
- Next.js image optimization is enabled with WebP/AVIF formats

### Client vs Server Components
- Most components are server components by default
- Client components (marked with `"use client"`): `navigation.tsx`, `particle-background.tsx`, `optimized-image.tsx`
- Use client components only when needed for state, effects, or browser APIs

## v0.dev Integration

This project is synced with v0.dev (https://v0.dev/chat/projects/oWFHgKzbaFO). Changes made in v0.dev are automatically pushed to this repository. When making manual edits:
- Understand that v0.dev syncs may overwrite local changes
- Coordinate with the deployment workflow to avoid conflicts
- The README.md emphasizes v0.dev as the primary development interface

## Package Manager

This project uses `pnpm` (evidenced by `pnpm-lock.yaml`), though `npm` is also supported via `package-lock.json`. Prefer `pnpm` for consistency with the project setup.
