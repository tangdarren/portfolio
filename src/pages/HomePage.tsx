import { FolderKanban, Mail, ScrollText, User } from 'lucide-react';

import PageTransition from '@/components/layout/PageTransition';
import SEO from '@/components/layout/SEO';
import Hero from '@/components/home/Hero';
import NavigationCard from '@/components/home/NavigationCard';

const CARDS = [
  {
    eyebrow: 'About',
    title: 'Character Stats',
    description:
      'Learn about my background, experience, education, and technical skills.',
    to: '/about',
    icon: User,
  },
  {
    eyebrow: 'Projects',
    title: 'Builds Gallery',
    description:
      'Explore full-stack applications, AI systems, financial tools, and immersive projects.',
    to: '/projects',
    icon: FolderKanban,
  },
  {
    eyebrow: 'Resume',
    title: 'Resume Viewer',
    description: 'View or download my complete professional résumé.',
    to: '/resume',
    icon: ScrollText,
  },
  {
    eyebrow: 'Contact',
    title: 'Trading Post',
    description:
      'Contact me about software engineering opportunities and collaborations.',
    to: '/contact',
    icon: Mail,
  },
];

export default function HomePage() {
  return (
    <PageTransition>
      <SEO
        title="Home | Darren Christopher Tang"
        description="Full-stack and AI agent engineer. Explore projects, résumé, and background."
        path="/"
      />

      <Hero />

      <section className="container-page pb-24">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Navigation</p>
            <h2 className="mt-2 section-title">Choose a destination</h2>
          </div>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-mist-400 sm:inline">
            04 modules
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => (
            <NavigationCard key={card.to} {...card} index={i} />
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
