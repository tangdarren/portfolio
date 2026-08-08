'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';

import {
  hasCaseStudy,
  projectCaseStudyPath,
  type Project,
} from '@/data/projects';
import { isValidHttpUrl } from '@/lib/url';
import ProjectThumbnail from './ProjectThumbnail';

interface ProjectCardProps {
  project: Project;
}

function ActionLink({
  href,
  children,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  ariaLabel: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={ariaLabel}
      className="projects-card-action"
      onClick={(event) => event.stopPropagation()}
    >
      {children}
    </a>
  );
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const caseStudyHref = hasCaseStudy(project)
    ? projectCaseStudyPath(project.id)
    : null;
  const githubUrl = isValidHttpUrl(project.githubUrl)
    ? project.githubUrl
    : undefined;
  const liveUrl = isValidHttpUrl(project.liveUrl) ? project.liveUrl : undefined;
  const tech = project.technologies.slice(0, 5);
  const extraTech = Math.max(0, project.technologies.length - tech.length);

  const body = (
    <>
      <ProjectThumbnail project={project} />
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <h2 className="projects-card-title break-words">{project.name}</h2>
        <p className="projects-card-summary">{project.summary}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {tech.map((item) => (
            <li key={item} className="projects-card-tag">
              {item}
            </li>
          ))}
          {extraTech > 0 && (
            <li className="projects-card-tag">+{extraTech}</li>
          )}
        </ul>
      </div>
    </>
  );

  return (
    <article className="projects-card group flex h-full flex-col">
      {caseStudyHref ? (
        <Link
          href={caseStudyHref}
          className="flex min-h-0 flex-1 flex-col outline-none"
          aria-label={`View case study for ${project.name}`}
        >
          {body}
        </Link>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col">{body}</div>
      )}

      {(githubUrl || liveUrl) && (
        <div className="flex flex-wrap items-center gap-2 border-t border-[var(--pg-wood-border)] px-4 py-3 sm:px-5">
          {githubUrl && (
            <ActionLink
              href={githubUrl}
              ariaLabel={`GitHub repository for ${project.name}`}
            >
              <Github className="h-3.5 w-3.5" aria-hidden />
              GitHub
            </ActionLink>
          )}
          {liveUrl && (
            <ActionLink
              href={liveUrl}
              ariaLabel={`Live site for ${project.name}`}
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              Live
            </ActionLink>
          )}
        </div>
      )}
    </article>
  );
}
