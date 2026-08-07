import type { MetadataRoute } from 'next';

import { getSiteUrl } from '@/config/site';
import { toAbsoluteUrl } from '@/lib/url';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: toAbsoluteUrl(siteUrl, '/sitemap.xml'),
  };
}
