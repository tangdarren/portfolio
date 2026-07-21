import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';

import PageTransition from '@/components/layout/PageTransition';
import PageHeader from '@/components/layout/PageHeader';
import SEO from '@/components/layout/SEO';
import { getProjectById } from '@/data/projects';
import NotFoundPage from '@/pages/NotFoundPage';

export default function ProjectCaseStudyPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? getProjectById(projectId) : undefined;

  if (!project) {
    return <NotFoundPage />;
  }

  const caseStudy = project.caseStudy;
  const screenshots = caseStudy?.screenshots ?? project.screenshots;

  return (
    <PageTransition>
      <SEO
        title={`${project.name} | Darren Christopher Tang`}
        description={project.summary}
        path={`/projects/${project.id}`}
      />

      <div className="container-page py-10 sm:py-14">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-mist-300 transition-colors hover:text-accent-cyan"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Projects
        </Link>

        <div className="mt-6">
          <PageHeader
            eyebrow="Case Study"
            title={project.name}
            description={project.description}
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.categories.map((category) => (
            <span
              key={category}
              className="rounded-md border border-brand-100 bg-brand-50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-cyan"
            >
              {category}
            </span>
          ))}
        </div>

        {(project.githubUrl || project.liveUrl) && (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-secondary"
              >
                <Github className="h-4 w-4" />
                Repository
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-primary"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            )}
          </div>
        )}

        {(caseStudy?.role ||
          caseStudy?.timeline ||
          caseStudy?.status) && (
          <dl className="panel mt-10 grid gap-4 p-5 sm:grid-cols-3">
            {caseStudy.role && (
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-cyan">
                  Role
                </dt>
                <dd className="mt-2 text-sm text-mist-200">{caseStudy.role}</dd>
              </div>
            )}
            {caseStudy.timeline && (
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-cyan">
                  Timeline
                </dt>
                <dd className="mt-2 text-sm text-mist-200">
                  {caseStudy.timeline}
                </dd>
              </div>
            )}
            {caseStudy.status && (
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-cyan">
                  Status
                </dt>
                <dd className="mt-2 text-sm text-mist-200">{caseStudy.status}</dd>
              </div>
            )}
          </dl>
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
            <ul className="space-y-1.5">
              {caseStudy.architecture.map((step) => (
                <li key={step} className="flex gap-2">
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-accent-cyan"
                  />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </CaseSection>
        )}

        {caseStudy?.lessonsLearned && caseStudy.lessonsLearned.length > 0 && (
          <CaseSection title="Lessons learned">
            <ul className="space-y-1.5">
              {caseStudy.lessonsLearned.map((lesson) => (
                <li key={lesson} className="flex gap-2">
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-accent-cyan"
                  />
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </CaseSection>
        )}

        <CaseSection title="Technologies">
          <ul className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <li key={tech} className="tag">
                {tech}
              </li>
            ))}
          </ul>
        </CaseSection>

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
      </div>
    </PageTransition>
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
      <div className="mt-3 text-sm text-mist-200">{children}</div>
    </section>
  );
}
