import type { Metadata, Viewport } from 'next';

import AppProviders from '@/components/providers/AppProviders';
import SiteShell from '@/components/layout/SiteShell';
import {
  SITE_DEFAULT_DESCRIPTION,
  SITE_NAME,
} from '@/config/site';

import '../index.css';

export const metadata: Metadata = {
  title: `${SITE_NAME} — Full-Stack & AI Agent Engineer`,
  description: SITE_DEFAULT_DESCRIPTION,
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#F7FAFC',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div id="root">
          <AppProviders>
            <SiteShell>{children}</SiteShell>
          </AppProviders>
        </div>
      </body>
    </html>
  );
}
