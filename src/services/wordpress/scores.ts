import type { ScoreTier } from '@/types/wordpress';
import tiersSeed from '@/content/seed/score-tiers.json';
import criteriaSeed from '@/content/seed/scoring-criteria.json';
import { wpFetch } from './client';

interface ScoringCriteriaData {
  weights: { id: string; label: string; weightPercent: number; color: string }[];
  primaryCriteria: string[];
  eligibility: string[];
}

export async function getScoreTiers(): Promise<ScoreTier[]> {
  const remote = await wpFetch<ScoreTier[]>('/wp-json/redi/v1/score-tiers');
  return remote ?? (tiersSeed as ScoreTier[]);
}

export async function getScoringCriteria(): Promise<ScoringCriteriaData> {
  const remote = await wpFetch<ScoringCriteriaData>('/wp-json/redi/v1/scoring-criteria');
  return remote ?? (criteriaSeed as ScoringCriteriaData);
}
