'use client';

interface ProjectFiltersProps {
  languages: readonly string[];
  tools: readonly string[];
  selectedLanguage: string | null;
  selectedTools: readonly string[];
  onSelectLanguage: (language: string) => void;
  onToggleTool: (tool: string) => void;
  onClear: () => void;
}

function FilterChip({
  label,
  selected,
  onToggle,
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      className={[
        'projects-filter-chip',
        selected ? 'projects-filter-chip-active' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {label}
    </button>
  );
}

export default function ProjectFilters({
  languages,
  tools,
  selectedLanguage,
  selectedTools,
  onSelectLanguage,
  onToggleTool,
  onClear,
}: ProjectFiltersProps) {
  const hasActiveFilters =
    Boolean(selectedLanguage) || selectedTools.length > 0;

  return (
    <div className="projects-tech-filters w-full max-w-3xl">
      <div className="space-y-3.5">
        {languages.length > 0 && (
          <section
            aria-labelledby="projects-filter-languages"
            className="text-center"
          >
            <h2
              id="projects-filter-languages"
              className="projects-filter-section-label"
            >
              Languages
            </h2>
            <div
              className="mt-2 flex flex-wrap justify-center gap-1.5"
              role="group"
              aria-label="Filter by language"

            >
              {languages.map((language) => (
                <FilterChip
                  key={language}
                  label={language}
                  selected={selectedLanguage === language}
                  onToggle={() => onSelectLanguage(language)}
                />
              ))}
            </div>
          </section>
        )}

        {tools.length > 0 && (
          <section
            aria-labelledby="projects-filter-tools"
            className="text-center"
          >
            <h2
              id="projects-filter-tools"
              className="projects-filter-section-label"
            >
              Tools
            </h2>
            <div
              className="mt-2 flex flex-wrap justify-center gap-1.5"
              role="group"
              aria-label="Filter by tool"
            >
              {tools.map((tool) => (
                <FilterChip
                  key={tool}
                  label={tool}
                  selected={selectedTools.includes(tool)}
                  onToggle={() => onToggleTool(tool)}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {hasActiveFilters && (
        <div className="mt-3 text-center">
          <button
            type="button"
            onClick={onClear}
            className="projects-filter-clear"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
