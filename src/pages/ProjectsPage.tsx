import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import PageTransition from '@/components/layout/PageTransition';
import PageHeader from '@/components/layout/PageHeader';
import SEO from '@/components/layout/SEO';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectDetails from '@/components/projects/ProjectDetails';
import ProjectFilters from '@/components/projects/ProjectFilters';
import {
  PROJECTS,
  PROJECT_FILTERS,
  isProjectFilter,
  type Project,
  type ProjectFilter,
} from '@/data/projects';

export default function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const filter: ProjectFilter = isProjectFilter(categoryParam)
    ? categoryParam
    : 'All';

  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const setFilter = (next: ProjectFilter) => {
    if (next === 'All') {
      setSearchParams({}, { replace: true });
      return;
    }
    setSearchParams({ category: next }, { replace: true });
  };

  const filtered = useMemo(() => {
    if (filter === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.categories.includes(filter));
  }, [filter]);

  const counts = useMemo(() => {
    const c: Partial<Record<ProjectFilter, number>> = { All: PROJECTS.length };
    for (const f of PROJECT_FILTERS) {
      if (f === 'All') continue;
      c[f] = PROJECTS.filter((p) => p.categories.includes(f)).length;
    }
    return c;
  }, []);

  return (
    <PageTransition>
      <SEO
        title="Projects | Darren Christopher Tang"
        description="Full-stack, AI, financial technology, and extended reality projects by Darren Christopher Tang."
        path="/projects"
      />

      <div className="container-page py-10 sm:py-14">
        <PageHeader
          eyebrow="Projects"
          title="Projects"
          description="A filterable catalog of applications, AI systems, financial tools, and immersive experiences I've built."
        />

        <div className="mt-8">
          <ProjectFilters
            filters={PROJECT_FILTERS}
            active={filter}
            onChange={setFilter}
            counts={counts}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="panel mt-10 p-10 text-center text-mist-300">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-mist-400">
              No results
            </p>
            <p className="mt-2">
              No projects match this filter yet. Try another category.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenDetails={setActiveProject}
                index={i}
                featured={project.featured}
                filter={filter}
              />
            ))}
          </div>
        )}
      </div>

      <ProjectDetails
        project={activeProject}
        onClose={() => setActiveProject(null)}
        filter={filter}
      />
    </PageTransition>
  );
}
