import type { MetadataRoute } from 'next';

import { getSiteUrl, getSitemapPaths } from '@/config/site';
import { toAbsoluteUrl } from '@/lib/url';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return getSitemapPaths().map((path) => ({
    url: toAbsoluteUrl(siteUrl, path === '/' ? '/' : path),
    changeFrequency: path === '/contact' ? 'yearly' : 'monthly',
    priority:
      path === '/' ? 1 : path.startsWith('/projects/') ? 0.7 : 0.8,
  }));
}
