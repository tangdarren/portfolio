'use client';

import { useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';

import PageHeader from '@/components/layout/PageHeader';
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

type ProjectSort = 'featured' | 'name';

const DEFAULT_SORT: ProjectSort = 'featured';

function isProjectSort(value: string | null | undefined): value is ProjectSort {
  return value === 'featured' || value === 'name';
}

function matchesQuery(project: Project, query: string): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  const haystack = [
    project.name,
    project.summary,
    project.description,
    ...project.categories,
    ...project.technologies,
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(normalized);
}

function sortProjects(projects: Project[], sort: ProjectSort): Project[] {
  const next = [...projects];
  if (sort === 'name') {
    next.sort((a, b) => a.name.localeCompare(b.name));
    return next;
  }

  next.sort((a, b) => {
    const featuredDelta = Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    if (featuredDelta !== 0) return featuredDelta;
    return a.name.localeCompare(b.name);
  });
  return next;
}

export default function ProjectsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const queryParam = searchParams.get('q') ?? '';
  const sortParam = searchParams.get('sort');

  const filter: ProjectFilter = isProjectFilter(categoryParam)
    ? categoryParam
    : 'All';
  const sort: ProjectSort = isProjectSort(sortParam) ? sortParam : DEFAULT_SORT;
  const query = queryParam;

  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const updateParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(updates)) {
      const shouldDelete =
        value === null ||
        value === '' ||
        (key === 'category' && value === 'All') ||
        (key === 'sort' && value === DEFAULT_SORT);

      if (shouldDelete) next.delete(key);
      else next.set(key, value);
    }

    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const setFilter = (next: ProjectFilter) => {
    updateParams({ category: next });
  };

  const setQuery = (next: string) => {
    updateParams({ q: next });
  };

  const setSort = (next: ProjectSort) => {
    updateParams({ sort: next });
  };

  const clearFilters = () => {
    router.replace(pathname, { scroll: false });
  };

  const filtersActive =
    filter !== 'All' || query.trim() !== '' || sort !== DEFAULT_SORT;

  const filtered = useMemo(() => {
    const byCategory =
      filter === 'All'
        ? PROJECTS
        : PROJECTS.filter((project) => project.categories.includes(filter));

    const byQuery = byCategory.filter((project) => matchesQuery(project, query));
    return sortProjects(byQuery, sort);
  }, [filter, query, sort]);

  const counts = useMemo(() => {
    const c: Partial<Record<ProjectFilter, number>> = { All: PROJECTS.length };
    for (const f of PROJECT_FILTERS) {
      if (f === 'All') continue;
      c[f] = PROJECTS.filter((p) => p.categories.includes(f)).length;
    }
    return c;
  }, []);

  const resultLabel =
    filtered.length === 1
      ? '1 project'
      : `${filtered.length} projects`;

  return (
    <>
      <div className="container-page py-10 sm:py-14">
        <PageHeader
          eyebrow="Projects"
          title="Projects"
          description="A filterable catalog of applications, AI systems, financial tools, and immersive experiences I've built."
        />

        <div className="mt-8 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Search projects</span>
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist-400"
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name, tech, or category"
                autoComplete="off"
                className="w-full rounded-md border border-ink-600 bg-ink-900 py-2.5 pl-9 pr-3 text-sm text-mist-100 placeholder:text-mist-500 transition-colors focus:border-accent-cyan focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            </label>

            <label className="flex shrink-0 items-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist-400">
                Sort
              </span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as ProjectSort)}
                className="rounded-md border border-ink-600 bg-ink-900 px-3 py-2.5 text-sm text-mist-100 transition-colors focus:border-accent-cyan focus:outline-none focus:ring-2 focus:ring-brand-100"
                aria-label="Sort projects"
              >
                <option value="featured">Featured first</option>
                <option value="name">Name A–Z</option>
              </select>
            </label>
          </div>

          <ProjectFilters
            filters={PROJECT_FILTERS}
            active={filter}
            onChange={setFilter}
            counts={counts}
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist-400"
              aria-live="polite"
            >
              Showing {resultLabel}
              {filtersActive ? ' · filtered' : ''}
            </p>

            {filtersActive && (
              <button
                type="button"
                onClick={clearFilters}
                className="btn-ghost"
              >
                <X className="h-4 w-4" />
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="panel mt-10 p-10 text-center text-mist-300">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-mist-400">
              No results
            </p>
            <p className="mt-2">
              No projects match your current search or filters. Try a different
              query, category, or reset everything.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="btn-secondary mt-5"
            >
              <X className="h-4 w-4" />
              Clear Filters
            </button>
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
    </>
  );
}
