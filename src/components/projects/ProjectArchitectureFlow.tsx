import { ArrowDown, ArrowRight } from 'lucide-react';

import type { ProjectArchitectureStage } from '@/data/projects';

interface ProjectArchitectureFlowProps {
  stages: ProjectArchitectureStage[];
  title?: string;
}

/**
 * Lightweight sequence of connected architecture / workflow stages.
 * Works for system layers, request flows, agent pipelines, and user journeys.
 */
export default function ProjectArchitectureFlow({
  stages,
  title = 'Architecture',
}: ProjectArchitectureFlowProps) {
  if (stages.length === 0) return null;

  return (
    <section aria-labelledby="architecture-heading">
      <h2
        id="architecture-heading"
        className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-cyan"
      >
        {title}
      </h2>

      <ol className="mt-4 flex flex-col gap-0 md:flex-row md:items-stretch md:gap-0">
        {stages.map((stage, index) => {
          const isLast = index === stages.length - 1;
          return (
            <li
              key={`${stage.title}-${index}`}
              className="flex min-w-0 flex-1 flex-col md:flex-row md:items-stretch"
            >
              <article className="panel flex h-full flex-1 flex-col p-4">
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-brand-100 bg-brand-50 font-mono text-[11px] text-accent-cyan"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-sm font-semibold text-mist-50">
                      {stage.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-mist-300">
                      {stage.description}
                    </p>
                    {stage.technologies && stage.technologies.length > 0 && (
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {stage.technologies.map((tech) => (
                          <li key={tech} className="tag">
                            {tech}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </article>

              {!isLast && (
                <>
                  <div
                    className="flex items-center justify-center py-2 text-mist-400 md:hidden"
                    aria-hidden
                  >
                    <ArrowDown className="h-4 w-4" />
                  </div>
                  <div
                    className="hidden shrink-0 items-center px-2 text-mist-400 md:flex"
                    aria-hidden
                  >
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
