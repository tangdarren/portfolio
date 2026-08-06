import { Helmet } from 'react-helmet-async';

import {
  SITE_DEFAULT_DESCRIPTION,
  SITE_DEFAULT_OG_IMAGE,
  SITE_NAME,
  resolveSiteUrl,
} from '@/config/site';
import { toAbsoluteUrl } from '@/lib/url';

interface SEOProps {
  title: string;
  description?: string;
  path?: string;
  /** Site-relative or absolute image used for Open Graph / Twitter cards. */
  image?: string;
  /** When true, asks crawlers not to index the page (e.g. 404). */
  noindex?: boolean;
}

export default function SEO({
  title,
  description,
  path,
  image,
  noindex = false,
}: SEOProps) {
  const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
  const finalDescription = description ?? SITE_DEFAULT_DESCRIPTION;
  const canonical = path ? toAbsoluteUrl(siteUrl, path) : undefined;
  const absoluteImage = toAbsoluteUrl(
    siteUrl,
    image?.trim() ? image : SITE_DEFAULT_OG_IMAGE,
  );

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={finalDescription} />
      {canonical && <link rel="canonical" href={canonical} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={finalDescription} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:image" content={absoluteImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={absoluteImage} />
    </Helmet>
  );
}
