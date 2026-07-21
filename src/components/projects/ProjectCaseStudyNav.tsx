import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, GalleryHorizontalEnd } from 'lucide-react';

import {
  getCaseStudyNeighbors,
  projectCaseStudyPath,
  projectsGalleryPath,
  type Project,
  type ProjectFilter,
} from '@/data/projects';

interface ProjectCaseStudyNavProps {
  project: Project;
  filter?: ProjectFilter;
}

export default function ProjectCaseStudyNav({
  project,
  filter = 'All',
}: ProjectCaseStudyNavProps) {
  const { previous, next } = getCaseStudyNeighbors(project.id, filter);
  const galleryPath = projectsGalleryPath(filter);

  return (
    <nav
      aria-label="Case study navigation"
      className="mt-14 border-t border-ink-600 pt-8"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch sm:justify-between">
        {previous ? (
          <Link
            to={projectCaseStudyPath(previous.id, filter)}
            className="panel panel-hover flex min-w-0 flex-1 flex-col gap-1 p-4"
          >
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-mist-400">
              <ArrowLeft className="h-3.5 w-3.5" />
              Previous
            </span>
            <span className="truncate font-display text-sm font-semibold text-mist-50">
              {previous.name}
            </span>
          </Link>
        ) : (
          <div className="hidden flex-1 sm:block" />
        )}

        <Link
          to={galleryPath}
          className="btn-secondary self-center"
        >
          <GalleryHorizontalEnd className="h-4 w-4" />
          Builds Gallery
        </Link>

        {next ? (
          <Link
            to={projectCaseStudyPath(next.id, filter)}
            className="panel panel-hover flex min-w-0 flex-1 flex-col gap-1 p-4 text-right sm:items-end"
          >
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-mist-400">
              Next
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
            <span className="truncate font-display text-sm font-semibold text-mist-50">
              {next.name}
            </span>
          </Link>
        ) : (
          <div className="hidden flex-1 sm:block" />
        )}
      </div>
    </nav>
  );
}
