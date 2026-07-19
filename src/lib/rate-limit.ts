interface RateLimitOptions {
  /** Max requests allowed inside the window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
}

interface RateLimitResult {
  allowed: boolean;
  /** Seconds until the caller may retry (only meaningful when blocked). */
  retryAfterSeconds: number;
}

const buckets = new Map<string, number[]>();
const MAX_KEYS = 10_000;

/**
 * Sliding-window in-memory rate limiter. Per-instance only (serverless
 * instances each keep their own window) — treat it as abuse damping on top of
 * Turnstile, not as a hard global guarantee.
 */
export function rateLimit(key: string, { limit, windowMs }: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const cutoff = now - windowMs;

  // Opportunistic cleanup so the map cannot grow without bound.
  if (buckets.size > MAX_KEYS) {
    for (const [k, hits] of buckets) {
      if (hits.every((t) => t < cutoff)) buckets.delete(k);
    }
  }

  const hits = (buckets.get(key) ?? []).filter((t) => t >= cutoff);

  if (hits.length >= limit) {
    const oldest = Math.min(...hits);
    buckets.set(key, hits);
    return { allowed: false, retryAfterSeconds: Math.ceil((oldest + windowMs - now) / 1000) };
  }

  hits.push(now);
  buckets.set(key, hits);
  return { allowed: true, retryAfterSeconds: 0 };
}
