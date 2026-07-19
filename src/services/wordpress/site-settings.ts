import type { SiteSettings } from '@/types/wordpress';
import seed from '@/content/seed/site-settings.json';
import { wpFetch } from './client';

export async function getSiteSettings(): Promise<SiteSettings> {
  const remote = await wpFetch<SiteSettings>('/wp-json/redi/v1/site-settings');
  const settings = remote ?? (seed as SiteSettings);
  return {
    ...settings,
    footer: {
      ...settings.footer,
      copyright: settings.footer.copyright.replace('{year}', String(new Date().getFullYear())),
    },
  };
}
