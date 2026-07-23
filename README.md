# REDI Sites

**Client:** Site Selectors Guild (parent company: Strata Platforms)

## What this project is

REDI Sites (Readiness Evaluation for Development and Investment) is the marketing website for a national site-readiness rating program administered by the Site Selectors Guild. It presents the REDI Score methodology, a searchable database of certified commercial development sites, the Guild's mission and team, and lead-generation flows (contact, site registration, member sign-in) for investors, developers, and site selectors.

## Tech stack

| Concern         | Choice                                                               |
| --------------- | -------------------------------------------------------------------- |
| Framework       | Astro 7 (static-first, React islands for interactive components)     |
| Language        | TypeScript (strict)                                                  |
| Styling         | Tailwind CSS v4 (`@theme` design tokens in `src/styles/global.css`)  |
| CMS             | Headless WordPress (REST + ACF shapes) with local seed-JSON fallback |
| Forms           | React Hook Form + Zod + Cloudflare Turnstile + Resend                |
| Animation       | Framer Motion (islands), CSS transitions elsewhere                   |
| Icons           | lucide (static SVG in Astro, `lucide-react` in islands)              |
| Fonts           | Bevan, Oswald Variable, Nunito Variable via Fontsource               |
| Package manager | pnpm                                                                 |
| Deployment      | Vercel (`@astrojs/vercel`); Node adapter used for local builds       |
| Quality         | ESLint, Prettier, Husky, lint-staged, commitlint, `astro check`      |

## How to set it up locally

1. Install Node.js `>=22.12.0` and [pnpm](https://pnpm.io/installation).
2. Clone the repo and install dependencies:
   ```bash
   pnpm install
   ```
3. Copy the environment template and fill in any values you have access to:
   ```bash
   cp .env.example .env
   ```
   Every variable is optional — with none set, the site renders fully from the local seed content in `src/content/seed/`, and the contact form logs submissions to the console instead of emailing.
4. Start the dev server:
   ```bash
   pnpm dev
   ```
   The site runs at `http://localhost:4321`.
5. Before committing, run:
   ```bash
   pnpm lint
   pnpm format
   pnpm build   # runs `astro check` + a production build
   ```

## Environment variables needed

Defined in `.env.example` (copy to `.env`, never commit real values):

| Variable                     | Purpose                                                                                        |
| ---------------------------- | ---------------------------------------------------------------------------------------------- |
| `WORDPRESS_API_URL`          | Headless WordPress origin. Unset → site renders from seed content.                             |
| `RESEND_API_KEY`             | Sends contact-form emails via Resend. Unset → submissions are logged only.                     |
| `CONTACT_TO_EMAIL`           | Inbox that contact-form submissions are forwarded to.                                          |
| `TURNSTILE_SECRET_KEY`       | Server-side Cloudflare Turnstile verification (contact form bot protection).                   |
| `PUBLIC_TURNSTILE_SITE_KEY`  | Client-side Turnstile widget key. Unset → widget is hidden and server verification is skipped. |
| `PUBLIC_GOOGLE_MAPS_API_KEY` | Enables the live Google Map on the Sites page. Unset → a static map capture is used instead.   |

## Deployment notes

- Deploys to **Vercel** via `@astrojs/vercel`. Environment variables above must be set in the Vercel project's dashboard (Settings → Environment Variables) — they are not read from `.env` in production.
- Windows local dev/build quirk: the Vercel adapter's packaging step needs symlink permissions Windows typically lacks, so `astro.config.mjs` automatically falls back to the Node adapter for local builds unless `process.env.VERCEL` is set (Vercel's own build environment sets this, so production builds are unaffected).
- `astro check` requires TypeScript 5.x — TypeScript 7 breaks it; keep the pinned `typescript` version in `package.json` until that's verified compatible.
- No other manual deploy steps — pushing to `main` is picked up by Vercel's Git integration.

## Key contacts

| Role            | Name  | Contact                                       |
| --------------- | ----- | --------------------------------------------- |
| Project manager | Amar  | [amar@ethixweb.com](mailto:amar@ethixweb.com) |
| Lead dev        | Akash |                                               |
| Developer       | Yash  |                                               |

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
