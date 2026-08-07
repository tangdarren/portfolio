import type { Metadata } from 'next';
import { Suspense } from 'react';

import ProjectsPage from '@/views/ProjectsPage';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Projects | Darren Christopher Tang',
  description:
    'Full-stack, AI, financial technology, and extended reality projects by Darren Christopher Tang.',
  path: '/projects',
});

function ProjectsFallback() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center text-mist-300"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="font-mono text-xs uppercase tracking-[0.2em]">
        Loading<span className="animate-blink">_</span>
      </span>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<ProjectsFallback />}>
      <ProjectsPage />
    </Suspense>
  );
}
