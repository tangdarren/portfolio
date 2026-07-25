import { loadEnv, type Plugin } from 'vite';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

import {
  SITE_DEFAULT_DESCRIPTION,
  SITE_DEFAULT_OG_IMAGE,
  SITE_NAME,
  resolveSiteUrl,
} from './src/config/site';
import { buildRobotsTxt, buildSitemapXml } from './src/config/seoAssets';
import { toAbsoluteUrl } from './src/lib/url';

function portfolioSeoPlugin(siteUrl: string): Plugin {
  const ogImageUrl = toAbsoluteUrl(siteUrl, SITE_DEFAULT_OG_IMAGE);
  const robotsTxt = buildRobotsTxt(siteUrl);
  const sitemapXml = buildSitemapXml(siteUrl);

  return {
    name: 'portfolio-seo',
    transformIndexHtml(html) {
      return html
        .replaceAll('__SITE_URL__', siteUrl)
        .replaceAll('__SITE_NAME__', SITE_NAME)
        .replaceAll('__SITE_DESCRIPTION__', SITE_DEFAULT_DESCRIPTION)
        .replaceAll('__OG_IMAGE_URL__', ogImageUrl);
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/robots.txt') {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end(robotsTxt);
          return;
        }
        if (req.url === '/sitemap.xml') {
          res.setHeader('Content-Type', 'application/xml; charset=utf-8');
          res.end(sitemapXml);
          return;
        }
        next();
      });
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: robotsTxt,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: sitemapXml,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = resolveSiteUrl(env.VITE_SITE_URL);

  return {
    plugins: [react(), portfolioSeoPlugin(siteUrl)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5173,
      open: false,
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
    },
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      css: false,
      env: {
        VITE_SITE_URL: 'https://portfolio.test',
      },
    },
  };
});
