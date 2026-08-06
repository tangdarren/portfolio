import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import {
  PROJECTS,
  getProjectById,
  hasCaseStudy,
} from '@/data/projects';
import ProjectCaseStudyPage from '@/views/ProjectCaseStudyPage';
import { createPageMetadata, getProjectShareImage } from '@/lib/metadata';

type ProjectPageProps = {
  params: Promise<{ projectId: string }>;
};

export function generateStaticParams() {
  return PROJECTS.filter(hasCaseStudy).map((project) => ({
    projectId: project.id,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { projectId } = await params;
  const project = getProjectById(projectId);

  if (!project || !hasCaseStudy(project)) {
    return createPageMetadata({
      title: '404 · Not Found | Darren Christopher Tang',
      description: "The page you're looking for doesn't exist.",
      path: `/projects/${projectId}`,
      noindex: true,
    });
  }

  return createPageMetadata({
    title: `${project.name} | Darren Christopher Tang`,
    description: project.summary,
    path: `/projects/${project.id}`,
    image: getProjectShareImage(project),
  });
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
