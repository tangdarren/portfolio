import type { MetadataRoute } from 'next';

import { getSitemapPaths } from '@/config/seoAssets';
import { resolveSiteUrl } from '@/config/site';
import { toAbsoluteUrl } from '@/lib/url';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

  return getSitemapPaths().map((path) => ({
    url: toAbsoluteUrl(siteUrl, path === '/' ? '/' : path),
    changeFrequency: path === '/contact' ? 'yearly' : 'monthly',
    priority:
      path === '/' ? 1 : path.startsWith('/projects/') ? 0.7 : 0.8,
  }));
}
