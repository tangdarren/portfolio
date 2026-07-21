import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, ExternalLink, Github, Info } from 'lucide-react';

import {
  hasCaseStudy,
  projectCaseStudyPath,
  type Project,
  type ProjectFilter,
} from '@/data/projects';
import ProjectThumbnail from './ProjectThumbnail';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
  index?: number;
  featured?: boolean;
  filter?: ProjectFilter;
}

function ExternalLinkButton({
  href,
  children,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="btn-ghost"
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
  filter = 'All',
}: ProjectCardProps) {
  const reduce = useReducedMotion();
  const showCaseStudy = hasCaseStudy(project);

  return (
    <motion.article
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className={[
        'group relative flex h-full flex-col overflow-hidden rounded-xl border border-ink-600 bg-ink-900 shadow-panel transition-all hover:-translate-y-0.5 hover:border-accent-cyan/50 hover:shadow-card',
        featured ? 'lg:col-span-2' : '',
      ].join(' ')}
    >
      <ProjectThumbnail project={project} featured={featured} />

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {project.categories.slice(0, 3).map((c) => (
            <span
              key={c}
              className="rounded-md border border-brand-100 bg-brand-50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-cyan"
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
          {showCaseStudy && (
            <Link
              to={projectCaseStudyPath(project.id, filter)}
              className="btn-primary"
              aria-label={`View case study for ${project.name}`}
            >
              <BookOpen className="h-4 w-4" />
              View Case Study
            </Link>
          )}
          <button
            type="button"
            onClick={() => onOpenDetails(project)}
            className={showCaseStudy ? 'btn-secondary' : 'btn-primary'}
            aria-label={`View quick details for ${project.name}`}
          >
            <Info className="h-4 w-4" />
            Details
          </button>
          {project.githubUrl && (
            <ExternalLinkButton
              href={project.githubUrl}
              ariaLabel={`GitHub repository for ${project.name}`}
            >
              <Github className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only">GitHub</span>
            </ExternalLinkButton>
          )}
          {project.liveUrl && (
            <ExternalLinkButton
              href={project.liveUrl}
              ariaLabel={`Live demo of ${project.name}`}
            >
              <ExternalLink className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only">Live</span>
            </ExternalLinkButton>
          )}
        </div>
      </div>
    </motion.article>
  );
}
