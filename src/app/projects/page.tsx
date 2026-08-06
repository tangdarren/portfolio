import { Suspense } from 'react';

import ProjectsPage from '@/views/ProjectsPage';

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
