import { Helmet } from 'react-helmet-async';

import { toAbsoluteUrl } from '@/lib/url';

interface SEOProps {
  title: string;
  description?: string;
  path?: string;
  /** Site-relative or absolute image used for Open Graph / Twitter cards. */
  image?: string;
}

const SITE_NAME = 'Darren Christopher Tang';
const DEFAULT_DESCRIPTION =
  'Portfolio of Darren Christopher Tang — a full-stack and AI agent engineer building practical applications, automation systems, and financial tools.';
const CANONICAL_ORIGIN = 'https://example.com';

export default function SEO({ title, description, path, image }: SEOProps) {
  const finalDescription = description ?? DEFAULT_DESCRIPTION;
  const canonical = path ? `${CANONICAL_ORIGIN}${path}` : undefined;
  const absoluteImage = image
    ? toAbsoluteUrl(CANONICAL_ORIGIN, image)
    : undefined;

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={finalDescription} />
      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={finalDescription} />
      {canonical && <meta property="og:url" content={canonical} />}
      {absoluteImage && <meta property="og:image" content={absoluteImage} />}

      <meta
        name="twitter:card"
        content={absoluteImage ? 'summary_large_image' : 'summary'}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={finalDescription} />
      {absoluteImage && <meta name="twitter:image" content={absoluteImage} />}
    </Helmet>
  );
}
