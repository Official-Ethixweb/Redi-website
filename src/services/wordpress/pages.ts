import seed from '@/content/seed/pages.json';
import { wpFetch } from './client';

export type PageCopy = typeof seed;

let cache: PageCopy | null = null;

/** Static rich-copy blocks for each route (ACF flexible-content style), keyed by page. */
export async function getPageCopy(): Promise<PageCopy> {
  if (cache) return cache;
  const remote = await wpFetch<PageCopy>('/wp-json/redi/v1/page-copy');
  cache = remote ?? (seed as PageCopy);
  return cache;
}
