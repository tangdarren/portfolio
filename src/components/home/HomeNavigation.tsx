'use client';

import { FolderKanban, Mail, ScrollText, User } from 'lucide-react';

import NavigationCard from '@/components/home/NavigationCard';

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

export default function HomeNavigation() {
  return (
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
  );
}
