import { PROJECTS, hasCaseStudy } from '@/data/projects';
import { SITE_STATIC_ROUTES } from '@/config/site';

import { ClientOnly } from './client';

/**
 * Pre-render known portfolio URLs for static export while the React Router
 * app continues to own client-side routing during the incremental migration.
 */
export function generateStaticParams() {
  const staticSlugs = SITE_STATIC_ROUTES.map((route) => {
    if (route === '/') return { slug: [''] };
    return { slug: route.replace(/^\//, '').split('/') };
  });

  const caseStudySlugs = PROJECTS.filter(hasCaseStudy).map((project) => ({
    slug: ['projects', project.id],
  }));

  return [...staticSlugs, ...caseStudySlugs];
}

export default function Page() {
  return <ClientOnly />;
}
