import { WORDPRESS_API_URL } from 'astro:env/server';

/**
 * Thin fetch wrapper around the WP REST API (`/wp-json/wp/v2/...` and any
 * custom ACF-backed routes). Returns `null` when no backend is configured so
 * service functions can fall back to local seed data — see each file in
 * `src/services/wordpress/` for the fallback logic.
 */
export async function wpFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
  if (!WORDPRESS_API_URL) return null;

  const base = WORDPRESS_API_URL.replace(/\/+$/, '');
  const url = `${base}${path.startsWith('/') ? path : `/${path}`}`;

  try {
    const res = await fetch(url, {
      ...init,
      headers: { Accept: 'application/json', ...init?.headers },
    });
    if (!res.ok) {
      console.error(`[wordpress] ${url} responded ${res.status}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error(`[wordpress] failed to fetch ${url}`, err);
    return null;
  }
}

export const isWordPressConnected = Boolean(WORDPRESS_API_URL);
