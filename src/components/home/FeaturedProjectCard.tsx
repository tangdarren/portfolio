import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import {
  projectCaseStudyPath,
  type Project,
} from '@/data/projects';

interface FeaturedProjectCardProps {
  project: Project;
  index?: number;
}

const MAX_TECH = 4;

export default function FeaturedProjectCard({
  project,
  index = 0,
}: FeaturedProjectCardProps) {
  const reduce = useReducedMotion();
  const caseStudyPath = projectCaseStudyPath(project.id);
  const technologies = project.technologies.slice(0, MAX_TECH);
  const extraTechCount = Math.max(
    0,
    project.technologies.length - technologies.length,
  );

  return (
    <motion.article
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: reduce ? 0.01 : 0.4,
        delay: reduce ? 0 : index * 0.05,
      }}
      className="panel panel-hover flex h-full flex-col p-5"
    >
      <div className="mb-3 flex flex-wrap gap-1.5">
        {project.categories.slice(0, 2).map((category) => (
          <span
            key={category}
            className="rounded-md border border-brand-100 bg-brand-50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-cyan"
          >
            {category}
          </span>
        ))}
      </div>

      <h3 className="break-words font-display text-lg font-semibold text-mist-50">
        <Link
          to={caseStudyPath}
          className="transition-colors hover:text-accent-cyan focus-visible:outline-none"
        >
          {project.name}
        </Link>
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-mist-300">
        {project.summary}
      </p>

      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
        {technologies.map((tech) => (
          <li key={tech} className="tag max-w-full break-words">
            {tech}
          </li>
        ))}
        {extraTechCount > 0 && <li className="tag">+{extraTechCount}</li>}
      </ul>

      <div className="mt-5 pt-1">
        <Link
          to={caseStudyPath}
          className="btn-primary"
          aria-label={`View case study for ${project.name}`}
        >
          <BookOpen className="h-4 w-4" />
          View Case Study
        </Link>
      </div>
    </motion.article>
  );
}
