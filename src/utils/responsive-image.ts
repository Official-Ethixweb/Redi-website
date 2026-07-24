/**
 * Full-bleed hero/section backgrounds that render at up to their native
 * width with no container cap (`object-cover` over the whole section) ship
 * pre-generated `-640w`/`-1024w`/`-1600w` webp variants alongside the
 * original — this maps each one to its native width so a phone doesn't
 * download the same file a 2600px desktop monitor does.
 */
const RESPONSIVE_HERO_IMAGES: Record<string, number> = {
  '/images/hero/home-hero-bg.webp': 2600,
  '/images/hero/about-hero-bg.webp': 2600,
  '/images/hero/approach-hero-bg.webp': 2600,
  '/images/hero/construction-hero-bg.webp': 2600,
  '/images/hero/locations-hero-bg.webp': 2600,
  '/images/hero/mission-vision-bg.webp': 2600,
  '/images/hero/testimonial-bg.webp': 2600,
  '/images/hero/cta-guidance-bg.webp': 2600,
  '/images/hero/cta-invest-bg.webp': 2172,
  '/images/sections/business-model.webp': 1542,
  '/images/blog/article-hero.webp': 2600,
};

const RESPONSIVE_WIDTHS = [640, 1024, 1600] as const;

/** Returns a `srcset` string for images registered above; `undefined` for anything else (renders as a plain `src`, unchanged). */
export function heroSrcSet(url: string): string | undefined {
  const nativeWidth = RESPONSIVE_HERO_IMAGES[url];
  if (!nativeWidth) return undefined;

  const dot = url.lastIndexOf('.');
  const base = url.slice(0, dot);
  const ext = url.slice(dot);
  const widths = RESPONSIVE_WIDTHS.filter((w) => w < nativeWidth);

  return [...widths.map((w) => `${base}-${w}w${ext} ${w}w`), `${url} ${nativeWidth}w`].join(', ');
}
