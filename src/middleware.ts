import { defineMiddleware } from 'astro:middleware';

/**
 * Security headers for SSR responses (updates listing, contact API, and any
 * future dynamic route). Prerendered pages served by Vercel's CDN get the
 * same headers from vercel.json — keep the two lists in sync.
 */
const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  // 'unsafe-inline' script-src is required by Astro's island hydration
  // scripts and inline JSON-LD.
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self'",
    'frame-src https://app.locationone.com https://forms.monday.com',
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join('; '),
};

export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  for (const [header, value] of Object.entries(SECURITY_HEADERS)) {
    if (!response.headers.has(header)) response.headers.set(header, value);
  }
  return response;
});
