import type { MetadataRoute } from 'next';

import { resolveSiteUrl } from '@/config/site';
import { toAbsoluteUrl } from '@/lib/url';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: toAbsoluteUrl(siteUrl, '/sitemap.xml'),
  };
}
