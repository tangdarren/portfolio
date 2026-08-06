'use client';

import PageHeader from '@/components/layout/PageHeader';
import ProfileCard from '@/components/about/ProfileCard';
import AchievementCard from '@/components/about/AchievementCard';
import ExperienceTimeline from '@/components/about/ExperienceTimeline';
import SkillsInventory from '@/components/about/SkillsInventory';
import { ACHIEVEMENTS } from '@/data/experience';

export default function AboutPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <PageHeader
        eyebrow="About"
        title="About Me"
        description="Background, experience, education, and the skills I use to ship reliable software."
      />

      <div className="mt-10">
        <ProfileCard />
      </div>

      <section className="mt-16" aria-labelledby="highlights-title">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Highlights</p>
            <h2 id="highlights-title" className="mt-2 section-title">
              Education and Career Highlights
            </h2>
          </div>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-mist-400 sm:inline">
            {String(ACHIEVEMENTS.length).padStart(2, '0')} entries
          </span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((a, i) => (
            <AchievementCard key={a.title} achievement={a} index={i} />
          ))}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="experience-title">
        <div className="mb-6">
          <p className="eyebrow">Experience</p>
          <h2 id="experience-title" className="mt-2 section-title">
            Experience
          </h2>
        </div>
        <ExperienceTimeline />
      </section>

      <section className="mt-16" aria-labelledby="skills-title">
        <div className="mb-6">
          <p className="eyebrow">Skills</p>
          <h2 id="skills-title" className="mt-2 section-title">
            Skills
          </h2>
        </div>
        <SkillsInventory />
      </section>
    </div>
  );
}
