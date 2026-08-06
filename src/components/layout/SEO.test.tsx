import { waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import SEO from '@/components/layout/SEO';
import {
  SITE_DEFAULT_OG_IMAGE,
  resolveSiteUrl,
} from '@/config/site';
import { toAbsoluteUrl } from '@/lib/url';

describe('SEO metadata', () => {
  it('emits absolute canonical and social image URLs', async () => {
    const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
    const imagePath = '/projects/demo/cover.png';

    render(
      <HelmetProvider>
        <SEO
          title="Case Study | Darren Christopher Tang"
          description="A focused project summary."
          path="/projects/demo"
          image={imagePath}
        />
      </HelmetProvider>,
    );

    await waitFor(() => {
      expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
        'href',
        toAbsoluteUrl(siteUrl, '/projects/demo'),
      );
    });

    const absoluteImage = toAbsoluteUrl(siteUrl, imagePath);
    expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute(
      'content',
      absoluteImage,
    );
    expect(document.querySelector('meta[name="twitter:image"]')).toHaveAttribute(
      'content',
      absoluteImage,
    );
  });

  it('falls back to the default social preview image', async () => {
    const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

    render(
      <HelmetProvider>
        <SEO title="Home | Darren Christopher Tang" path="/" />
      </HelmetProvider>,
    );

    const absoluteImage = toAbsoluteUrl(siteUrl, SITE_DEFAULT_OG_IMAGE);

    await waitFor(() => {
      expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute(
        'content',
        absoluteImage,
      );
    });
  });

  it('marks pages as noindex when requested', async () => {
    render(
      <HelmetProvider>
        <SEO title="404" description="Missing" noindex />
      </HelmetProvider>,
    );

    await waitFor(() => {
      expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
        'content',
        'noindex, nofollow',
      );
    });
  });
});
