'use client';

import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import ProjectCard from '@/components/projects/ProjectCard';
import ProjectFilters from '@/components/projects/ProjectFilters';
import {
  PROJECTS,
  getGalleryLanguageFilters,
  getGalleryToolFilters,
  projectMatchesTechnologyFilters,
} from '@/data/projects';

function parseListParam(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
}

function toggleTool(list: string[], value: string): string[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value].sort((a, b) => a.localeCompare(b));
}

export default function ProjectsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const languageOptions = useMemo(() => getGalleryLanguageFilters(), []);
  const toolOptions = useMemo(() => getGalleryToolFilters(), []);

  const selectedLanguage = useMemo(() => {
    const singular = searchParams.get('language')?.trim();
    if (singular && languageOptions.includes(singular)) return singular;

    // Legacy multi-language URLs: keep the first valid language only.
    const legacy = parseListParam(searchParams.get('languages')).find((item) =>
      languageOptions.includes(item),
    );
    return legacy ?? null;
  }, [searchParams, languageOptions]);

  const selectedTools = useMemo(() => {
    const requested = parseListParam(searchParams.get('tools'));
    return requested.filter((item) => toolOptions.includes(item));
  }, [searchParams, toolOptions]);

  const updateFilters = (language: string | null, tools: string[]) => {
    const next = new URLSearchParams(searchParams.toString());
    // Legacy gallery params are no longer used.
    next.delete('category');
    next.delete('q');
    next.delete('sort');
    next.delete('languages');

    if (language) next.set('language', language);
    else next.delete('language');

    if (tools.length > 0) next.set('tools', tools.join(','));
    else next.delete('tools');

    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const filtered = useMemo(() => {
    const list = PROJECTS.filter((project) =>
      projectMatchesTechnologyFilters(project, selectedLanguage, selectedTools),
    );

    list.sort((a, b) => {
      const featuredDelta =
        Number(Boolean(b.featured)) - Number(Boolean(a.featured));
      if (featuredDelta !== 0) return featuredDelta;
      return a.name.localeCompare(b.name);
    });
    return list;
  }, [selectedLanguage, selectedTools]);

  return (
    <div className="projects-gallery">
      <div className="container-page py-10 sm:py-12">
        <header className="text-center">
          <h1 className="projects-gallery-title">Projects</h1>
        </header>

        <div className="mt-5 flex justify-center sm:mt-6">
          <ProjectFilters
            languages={languageOptions}
            tools={toolOptions}
            selectedLanguage={selectedLanguage}
            selectedTools={selectedTools}
            onSelectLanguage={(language) =>
              updateFilters(
                selectedLanguage === language ? null : language,
                selectedTools,
              )
            }
            onToggleTool={(tool) =>
              updateFilters(selectedLanguage, toggleTool(selectedTools, tool))
            }
            onClear={() => updateFilters(null, [])}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="projects-empty mt-8 p-8 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--pg-wood-mid)]">
              No projects match these filters
            </p>
            <button
              type="button"
              onClick={() => updateFilters(null, [])}
              className="projects-filter-chip mt-5"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <ul className="mt-8 grid list-none gap-5 sm:mt-9 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {filtered.map((project) => (
              <li key={project.id} className="min-w-0">
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
