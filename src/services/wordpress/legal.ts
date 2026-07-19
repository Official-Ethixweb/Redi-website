import type { LegalSection } from '@/types/wordpress';
import seed from '@/content/seed/legal.json';
import { wpFetch } from './client';

export async function getLegalSections(): Promise<LegalSection[]> {
  const remote = await wpFetch<LegalSection[]>('/wp-json/redi/v1/legal');
  return remote ?? (seed as LegalSection[]);
}
