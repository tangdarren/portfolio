import { PROJECTS, hasCaseStudy } from '../data/projects';
import { SITE_STATIC_ROUTES } from './site';
import { toAbsoluteUrl } from '../lib/url';

/** All indexable paths: static routes plus project case-study pages. */
export function getSitemapPaths(): string[] {
  const caseStudyPaths = PROJECTS.filter(hasCaseStudy).map(
    (project) => `/projects/${project.id}`,
  );
  return [...SITE_STATIC_ROUTES, ...caseStudyPaths];
}

export function buildRobotsTxt(siteUrl: string): string {
  const sitemapUrl = toAbsoluteUrl(siteUrl, '/sitemap.xml');
  return [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${sitemapUrl}`,
    '',
  ].join('\n');
}

export function buildSitemapXml(siteUrl: string, paths = getSitemapPaths()): string {
  const urls = paths
    .map((path) => {
      const loc = toAbsoluteUrl(siteUrl, path === '/' ? '/' : path);
      const priority =
        path === '/' ? '1.0' : path.startsWith('/projects/') ? '0.7' : '0.8';
      const changefreq = path === '/contact' ? 'yearly' : 'monthly';

      return [
        '  <url>',
        `    <loc>${escapeXml(loc)}</loc>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '',
  ].join('\n');
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
