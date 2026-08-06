import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import {
  PROJECTS,
  getProjectById,
  hasCaseStudy,
} from '@/data/projects';
import ProjectCaseStudyPage from '@/views/ProjectCaseStudyPage';

type ProjectPageProps = {
  params: Promise<{ projectId: string }>;
};

export function generateStaticParams() {
  return PROJECTS.filter(hasCaseStudy).map((project) => ({
    projectId: project.id,
  }));
}

function CaseStudyFallback() {
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

export default async function Page({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const project = getProjectById(projectId);

  if (!project || !hasCaseStudy(project)) {
    notFound();
  }

  return (
    <Suspense fallback={<CaseStudyFallback />}>
      <ProjectCaseStudyPage project={project} />
    </Suspense>
  );
}
