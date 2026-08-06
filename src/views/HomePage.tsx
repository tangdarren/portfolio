'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, FolderKanban, Mail, ScrollText, User } from 'lucide-react';

import SEO from '@/components/layout/SEO';
import Hero from '@/components/home/Hero';
import NavigationCard from '@/components/home/NavigationCard';
import FeaturedProjectCard from '@/components/home/FeaturedProjectCard';
import { PROJECTS } from '@/data/projects';

const CARDS = [
  {
    eyebrow: 'About',
    title: 'About Me',
    description:
      'Learn about my background, experience, education, and technical skills.',
    to: '/about',
    icon: User,
  },
  {
    eyebrow: 'Projects',
    title: 'Projects',
    description:
      'Explore full-stack applications, AI systems, financial tools, and immersive projects.',
    to: '/projects',
    icon: FolderKanban,
  },
  {
    eyebrow: 'Resume',
    title: 'Resume',
    description: 'View or download my complete professional résumé.',
    to: '/resume',
    icon: ScrollText,
  },
  {
    eyebrow: 'Contact',
    title: 'Contact',
    description:
      'Contact me about software engineering opportunities and collaborations.',
    to: '/contact',
    icon: Mail,
  },
];

const MAX_FEATURED = 3;

export default function HomePage() {
  const featuredProjects = useMemo(
    () => PROJECTS.filter((project) => project.featured).slice(0, MAX_FEATURED),
    [],
  );

  return (
    <>
      <SEO
        title="Home | Darren Christopher Tang"
        description="Full-stack and AI agent engineer. Explore projects, résumé, and background."
        path="/"
      />

      <Hero />

      <section className="container-page pb-16" aria-labelledby="home-nav-title">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Explore</p>
            <h2 id="home-nav-title" className="mt-2 section-title">
              Choose a destination
            </h2>
          </div>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-mist-400 sm:inline">
            04 sections
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => (
            <NavigationCard key={card.to} {...card} index={i} />
          ))}
        </div>
      </section>

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
