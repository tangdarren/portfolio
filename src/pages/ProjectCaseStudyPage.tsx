import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';

import PageTransition from '@/components/layout/PageTransition';
import PageHeader from '@/components/layout/PageHeader';
import SEO from '@/components/layout/SEO';
import { getProjectById, type Project } from '@/data/projects';
import NotFoundPage from '@/pages/NotFoundPage';

function isValidHttpUrl(value?: string): value is string {
  if (!value?.trim()) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export default function ProjectCaseStudyPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? getProjectById(projectId) : undefined;

  if (!project) {
    return <NotFoundPage />;
  }

  return (
    <PageTransition>
      <SEO
        title={`${project.name} | Darren Christopher Tang`}
        description={project.summary}
        path={`/projects/${project.id}`}
      />

      <div className="container-page py-10 sm:py-14">
        <ProjectCaseStudyShell project={project} />
      </div>
    </PageTransition>
  );
}

function ProjectCaseStudyShell({ project }: { project: Project }) {
  const caseStudy = project.caseStudy;
  const screenshots = caseStudy?.screenshots ?? project.screenshots;
  const githubUrl = isValidHttpUrl(project.githubUrl)
    ? project.githubUrl
    : undefined;
  const liveUrl = isValidHttpUrl(project.liveUrl) ? project.liveUrl : undefined;
  const hasMeta = Boolean(
    caseStudy?.role || caseStudy?.timeline || caseStudy?.status,
  );

  return (
    <>
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-mist-300 transition-colors hover:text-accent-cyan"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Builds Gallery
      </Link>

      <div className="mt-6">
        <PageHeader
          eyebrow="Case Study"
          title={project.name}
          description={project.summary}
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.categories.map((category) => (
          <span
            key={category}
            className="rounded-md border border-brand-100 bg-brand-50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-cyan"
          >
            {category}
          </span>
        ))}
      </div>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <li key={tech} className="tag">
            {tech}
          </li>
        ))}
      </ul>

      {hasMeta && (
        <dl className="panel mt-8 grid gap-5 p-5 sm:grid-cols-3 sm:gap-6">
          {caseStudy?.role && (
            <MetaItem label="Role">{caseStudy.role}</MetaItem>
          )}
          {caseStudy?.timeline && (
            <MetaItem label="Context">{caseStudy.timeline}</MetaItem>
          )}
          {caseStudy?.status && (
            <MetaItem label="Status">{caseStudy.status}</MetaItem>
          )}
        </dl>
      )}

      {(githubUrl || liveUrl) && (
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-secondary"
              aria-label={`GitHub repository for ${project.name}`}
            >
              <Github className="h-4 w-4" />
              Repository
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-primary"
              aria-label={`Live demo of ${project.name}`}
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          )}
        </div>
      )}

      {caseStudy?.challenge && (
        <CaseSection title="Challenge">{caseStudy.challenge}</CaseSection>
      )}
      {caseStudy?.approach && (
        <CaseSection title="Approach">{caseStudy.approach}</CaseSection>
      )}
      {caseStudy?.outcome && (
        <CaseSection title="Outcome">{caseStudy.outcome}</CaseSection>
      )}

      {caseStudy?.architecture && caseStudy.architecture.length > 0 && (
        <CaseSection title="Architecture">
          <BulletList items={caseStudy.architecture} />
        </CaseSection>
      )}

      {caseStudy?.lessonsLearned && caseStudy.lessonsLearned.length > 0 && (
        <CaseSection title="Lessons learned">
          <BulletList items={caseStudy.lessonsLearned} />
        </CaseSection>
      )}

      {screenshots && screenshots.length > 0 && (
        <CaseSection title="Screenshots">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {screenshots.map((shot) => (
              <div
                key={shot.src}
                className="overflow-hidden rounded-md border border-ink-600 bg-ink-800/70"
              >
                <img
                  src={shot.src}
                  alt={shot.alt}
                  loading="lazy"
                  className="h-auto w-full object-cover"
                />
              </div>
            ))}
          </div>
        </CaseSection>
      )}
    </>
  );
}

function MetaItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-cyan">
        {label}
      </dt>
      <dd className="mt-2 text-sm leading-relaxed text-mist-200">{children}</dd>
    </div>
  );
}

function CaseSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-cyan">
        {title}
      </h2>
      <div className="mt-3 text-sm leading-relaxed text-mist-200">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span
            aria-hidden
            className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-accent-cyan"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
