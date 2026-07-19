import type { Testimonial } from '@/types/wordpress';
import seed from '@/content/seed/testimonials.json';
import { wpFetch } from './client';

export async function getTestimonials(): Promise<Testimonial[]> {
  const remote = await wpFetch<Testimonial[]>('/wp-json/wp/v2/testimonial?_embed');
  return remote ?? (seed as Testimonial[]);
}
