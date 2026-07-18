import type { ProjectCategory } from '@/data/projects';

export type ProjectFilter = 'All' | ProjectCategory;

interface ProjectFiltersProps {
  filters: readonly ProjectFilter[];
  active: ProjectFilter;
  onChange: (filter: ProjectFilter) => void;
  counts?: Partial<Record<ProjectFilter, number>>;
}

export default function ProjectFilters({
  filters,
  active,
  onChange,
  counts,
}: ProjectFiltersProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="tablist"
      aria-label="Project filters"
    >
      {filters.map((filter) => {
        const isActive = active === filter;
        const count = counts?.[filter];
        return (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(filter)}
            className={[
              'inline-flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors',
              isActive
                ? 'border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan'
                : 'border-white/10 bg-white/[0.02] text-mist-300 hover:border-white/20 hover:text-mist-100',
            ].join(' ')}
          >
            <span>{filter}</span>
            {typeof count === 'number' && (
              <span
                className={[
                  'rounded px-1.5 py-0.5 text-[10px]',
                  isActive
                    ? 'bg-accent-cyan/15 text-accent-cyan'
                    : 'bg-white/[0.04] text-mist-400',
                ].join(' ')}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
