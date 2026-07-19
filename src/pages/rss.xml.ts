import type { APIRoute } from 'astro';
import { getBlogPosts } from '@/services/wordpress';

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export const GET: APIRoute = async ({ site }) => {
  const { items } = await getBlogPosts({ perPage: 50 });
  const base = site?.toString().replace(/\/$/, '') ?? '';

  const entries = items
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${base}/updates/${post.slug}</link>
      <guid isPermaLink="true">${base}/updates/${post.slug}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${escapeXml(post.author.name)}</author>
    </item>`,
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>REDI Sites — Latest Updates</title>
    <link>${base}/updates</link>
    <description>News, insights, and announcements from REDI Sites and the Site Selectors Guild.</description>
    <language>en-us</language>${entries}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
