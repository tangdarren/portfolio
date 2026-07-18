import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  path?: string;
}

const SITE_NAME = 'Darren Christopher Tang';
const DEFAULT_DESCRIPTION =
  'Portfolio of Darren Christopher Tang — a full-stack and AI agent engineer building practical applications, automation systems, and financial tools.';
const CANONICAL_ORIGIN = 'https://example.com';

export default function SEO({ title, description, path }: SEOProps) {
  const finalDescription = description ?? DEFAULT_DESCRIPTION;
  const canonical = path ? `${CANONICAL_ORIGIN}${path}` : undefined;

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

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={finalDescription} />
    </Helmet>
  );
}
