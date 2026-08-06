/** Shared site metadata for SEO, Open Graph, and build-time assets. */

export const SITE_NAME = 'Darren Christopher Tang';

export const SITE_DEFAULT_DESCRIPTION =
  'Portfolio of Darren Christopher Tang — a full-stack and AI agent engineer building practical applications, automation systems, and financial tools.';

/** Default social-preview image (site-relative path under `public/`). */
export const SITE_DEFAULT_OG_IMAGE = '/og-image.svg';

/** Static app routes included in the sitemap (excluding the 404 catch-all). */
export const SITE_STATIC_ROUTES = [
  '/',
  '/about',
  '/projects',
  '/resume',
  '/contact',
] as const;

const LOCAL_DEV_ORIGIN = 'http://localhost:3000';

/** Normalize a configured origin, falling back to the local Next.js URL. */
export function resolveSiteUrl(envValue?: string | null): string {
  const trimmed = envValue?.trim().replace(/\/$/, '');
  if (trimmed) return trimmed;
  return LOCAL_DEV_ORIGIN;
}
