import type { Partner } from '@/types/wordpress';
import seed from '@/content/seed/partners.json';
import { wpFetch } from './client';

export async function getPartners(): Promise<Partner[]> {
  const remote = await wpFetch<Partner[]>('/wp-json/wp/v2/partner?_embed');
  return remote ?? (seed as Partner[]);
}
