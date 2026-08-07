import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import Hero from '@/components/home/Hero';
import HomeNavigation from '@/components/home/HomeNavigation';
import FeaturedProjectCard from '@/components/home/FeaturedProjectCard';
import { PROJECTS } from '@/data/projects';

const MAX_FEATURED = 3;

const featuredProjects = PROJECTS.filter((project) => project.featured).slice(
  0,
  MAX_FEATURED,
);

export default function HomePage() {
  return (
    <>
      <Hero />

      <HomeNavigation />

      {featuredProjects.length > 0 && (
        <section
          className="container-page pb-24"
          aria-labelledby="featured-projects-title"
        >
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 id="featured-projects-title" className="mt-2 section-title">
                Featured Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="btn-secondary group"
              aria-label="View all projects"
            >
              View All Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, i) => (
              <FeaturedProjectCard
                key={project.id}
                project={project}
                index={i}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
