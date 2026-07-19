import type { AdvantageItem } from '@/types/wordpress';
import seed from '@/content/seed/advantages.json';
import { wpFetch } from './client';

export async function getAdvantages(): Promise<AdvantageItem[]> {
  const remote = await wpFetch<AdvantageItem[]>('/wp-json/redi/v1/advantages');
  return remote ?? (seed as AdvantageItem[]);
}
