import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, Github, Info } from 'lucide-react';

import type { Project } from '@/data/projects';
import ProjectThumbnail from './ProjectThumbnail';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
  index?: number;
  featured?: boolean;
}

const PLACEHOLDER = 'PLACEHOLDER_URL';

function LinkButton({
  href,
  children,
  variant = 'secondary',
  ariaLabel,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  ariaLabel?: string;
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
        {children}
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={base}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}

export default function ProjectCard({
  project,
  onOpenDetails,
  index = 0,
  featured = false,
}: ProjectCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className={[
        'group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/5 bg-ink-900/70 shadow-panel transition-all hover:-translate-y-0.5 hover:border-accent-cyan/30 hover:bg-ink-800/80',
        featured ? 'lg:col-span-2' : '',
      ].join(' ')}
    >
      <ProjectThumbnail project={project} featured={featured} />

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {project.categories.slice(0, 3).map((c) => (
            <span
              key={c}
              className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-mist-300"
            >
              {c}
            </span>
          ))}
        </div>

        <h3 className="font-display text-lg font-semibold text-mist-50">
          {project.name}
        </h3>
        <p className="mt-1 text-sm text-mist-300">{project.summary}</p>
        <p className="mt-3 text-sm text-mist-400">{project.description}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 6).map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}
          {project.technologies.length > 6 && (
            <li className="tag">+{project.technologies.length - 6}</li>
          )}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => onOpenDetails(project)}
            className="btn-primary"
            aria-label={`View details for ${project.name}`}
          >
            <Info className="h-4 w-4" />
            Details
          </button>
          <LinkButton
            href={project.githubUrl}
            ariaLabel={`GitHub repository for ${project.name}`}
          >
            <Github className="h-4 w-4" />
            GitHub
          </LinkButton>
          <LinkButton
            href={project.liveUrl}
            ariaLabel={`Live demo of ${project.name}`}
          >
            <ExternalLink className="h-4 w-4" />
            Live Demo
          </LinkButton>
        </div>
      </div>
    </motion.article>
  );
}
