# REDI Sites

Marketing website for **REDI Sites** (Readiness Evaluation for Development and Investment) — the Site Selectors Guild's national standard for assessing commercial site readiness.

Built with Astro 5+, TypeScript (strict), Tailwind CSS v4, React islands, and a headless-WordPress-ready content layer.

## Stack

| Concern    | Choice                                                              |
| ---------- | ------------------------------------------------------------------- |
| Framework  | Astro (static-first, React islands for interactive components)      |
| Styling    | Tailwind CSS v4 (`@theme` design tokens in `src/styles/global.css`) |
| CMS        | Headless WordPress (REST + ACF shapes) with local seed fallback     |
| Forms      | React Hook Form + Zod + Cloudflare Turnstile + Resend               |
| Animation  | Framer Motion (islands), CSS transitions elsewhere                  |
| Icons      | lucide (static SVG in Astro, `lucide-react` in islands)             |
| Fonts      | Bevan, Oswald Variable, Nunito Variable via Fontsource              |
| Deployment | Vercel (`@astrojs/vercel`); Node adapter for local builds           |
| Quality    | ESLint, Prettier, Husky, lint-staged, commitlint, `astro check`     |

## Getting started

```bash
pnpm install
pnpm dev          # dev server on :4321
pnpm build        # astro check + production build
pnpm preview      # serve the production build
pnpm lint         # eslint
pnpm format       # prettier --write
```

Copy `.env.example` to `.env` and fill in what you have. Everything is optional — with no env vars the site renders fully from seed content and the contact form logs instead of emailing.

## Content layer

Components never import seed JSON directly; they call typed services in `src/services/wordpress/`. Each service tries the WordPress REST API (`WORDPRESS_API_URL`) first and falls back to `src/content/seed/*.json`, which mirrors the exact WP/ACF response shapes (custom post types: `property`, `team_member`, `testimonial`, `partner`; options endpoints under `/wp-json/redi/v1/*`). Pointing at a live WP instance is a config change, not a code change.

## Design source

The Figma file for this project could not be shared with API access, so the build was produced from full-page design exports (the `*.png` files in the repo root) — colors were pixel-sampled from those exports and the type was matched to the closest Google Fonts (Bevan / Oswald / Nunito). Image assets were extracted from the exports; text, logos, and UI chrome were rebuilt as real HTML/CSS. When Figma access becomes available, tokens in `src/styles/global.css` + `src/lib/tokens/` are the single place to reconcile any drift.

## Structure

```
src/
  components/
    layout/       BaseLayout, Seo
    navigation/   Navbar
    footer/       Footer
    sections/     Page sections (heroes, carousels, browsers, CTAs)
    cards/        PropertyCard, TeamCard, BlogCard, ScoreTierCard, AdvantageCard
    forms/        ContactForm, SetPasswordForm (React islands)
    ui/           Button, Badge, Icon, Logo, SectionHeading + cva variants
  services/wordpress/   Typed CMS client + per-type services
  content/seed/         WP-shaped fallback content
  lib/                  tokens, utils, validation schemas
  pages/                Routes (+ /api/contact, rss.xml)
  styles/               global.css (Tailwind v4 theme = design tokens)
  types/                wordpress.ts domain types
```

## Routes

`/` · `/about` · `/approach` · `/sites` · `/updates` (SSR: search/sort) · `/updates/[slug]` · `/contact` · `/legal` · `/set-password` · `/sign-in` · `/register` · `/api/contact` · `/rss.xml` · sitemap
