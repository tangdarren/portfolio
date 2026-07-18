import { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';

import type { Project } from '@/data/projects';

interface ProjectDetailsProps {
  project: Project | null;
  onClose: () => void;
}

const PLACEHOLDER = 'PLACEHOLDER_URL';

export default function ProjectDetails({
  project,
  onClose,
}: ProjectDetailsProps) {
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Close on Escape + trap body scroll
  useEffect(() => {
    if (!project) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = original;
      previouslyFocused?.focus?.();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-mist-50/40 backdrop-blur-sm sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          aria-hidden={false}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-details-title"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-ink-600 bg-ink-900 shadow-card sm:rounded-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-ink-600 bg-ink-850 px-6 py-4">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent-cyan">
                  Project · Details
                </p>
                <h2
                  id="project-details-title"
                  className="mt-1 font-display text-xl font-semibold text-mist-50 sm:text-2xl"
                >
                  {project.name}
                </h2>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                className="btn-ghost -mr-2"
                aria-label="Close project details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="flex flex-wrap gap-2">
                {project.categories.map((c) => (
                  <span
                    key={c}
                    className="rounded-md border border-brand-100 bg-brand-50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-cyan"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-mist-200">{project.description}</p>

              <Section title="Problem">
                <p>{project.details.problem}</p>
              </Section>

              <Section title="Solution">
                <p>{project.details.solution}</p>
              </Section>

              <Section title="Key features">
                <ul className="space-y-1.5">
                  {project.details.keyFeatures.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span
                        aria-hidden
                        className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-accent-cyan"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title="Technical decisions">
                <ul className="space-y-1.5">
                  {project.details.technicalDecisions.map((d) => (
                    <li key={d} className="flex gap-2">
                      <span
                        aria-hidden
                        className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-accent-cyan"
                      />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title="Technologies">
                <ul className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <li key={t} className="tag">
                      {t}
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title="Screenshots">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[0, 1].map((i) => (
                    <div
                      key={i}
                      className="flex aspect-[16/10] items-center justify-center rounded-md border border-dashed border-ink-600 bg-ink-800/70 font-mono text-[11px] uppercase tracking-[0.2em] text-mist-400"
                    >
                      screenshot placeholder
                    </div>
                  ))}
                </div>
              </Section>
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-ink-600 bg-ink-850 px-6 py-4">
              <ModalLink
                href={project.githubUrl}
                label="Repository"
                icon={<Github className="h-4 w-4" />}
              />
              <ModalLink
                href={project.liveUrl}
                label="Live demo"
                icon={<ExternalLink className="h-4 w-4" />}
                variant="primary"
              />
              <div className="grow" />
              <button
                type="button"
                onClick={onClose}
                className="btn-ghost"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6">
      <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-cyan">
        {title}
      </h3>
      <div className="mt-2 text-sm text-mist-200">{children}</div>
    </section>
  );
}

function ModalLink({
  href,
  label,
  icon,
  variant = 'secondary',
}: {
  href?: string;
  label: string;
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary';
}) {
  const disabled = !href || href === PLACEHOLDER;
  const base = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  if (disabled) {
    return (
      <span
        className={`${base} cursor-not-allowed opacity-50`}
        aria-disabled="true"
        title="Link coming soon"
      >
        {icon}
        {label}
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={base}
    >
      {icon}
      {label}
    </a>
  );
}
