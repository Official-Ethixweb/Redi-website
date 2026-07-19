import type { TeamMember } from '@/types/wordpress';
import seed from '@/content/seed/team.json';
import { wpFetch } from './client';

export async function getTeamMembers(): Promise<TeamMember[]> {
  const remote = await wpFetch<TeamMember[]>('/wp-json/wp/v2/team_member?_embed');
  const members = remote ?? (seed as TeamMember[]);
  return [...members].sort((a, b) => a.order - b.order);
}
