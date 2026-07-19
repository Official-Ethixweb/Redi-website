import type { Property } from '@/types/wordpress';
import seed from '@/content/seed/properties.json';
import { wpFetch } from './client';

export async function getProperties(): Promise<Property[]> {
  const remote = await wpFetch<Property[]>('/wp-json/wp/v2/property?_embed');
  return remote ?? (seed as Property[]);
}

export async function getFeaturedProperties(limit = 6): Promise<Property[]> {
  const all = await getProperties();
  return all.filter((p) => p.featured).slice(0, limit);
}

export async function getPropertyBySlug(slug: string): Promise<Property | undefined> {
  const all = await getProperties();
  return all.find((p) => p.slug === slug);
}
