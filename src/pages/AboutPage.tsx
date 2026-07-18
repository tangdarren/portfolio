import PageTransition from '@/components/layout/PageTransition';
import PageHeader from '@/components/layout/PageHeader';
import SEO from '@/components/layout/SEO';
import ProfileCard from '@/components/about/ProfileCard';
import AchievementCard from '@/components/about/AchievementCard';
import ExperienceTimeline from '@/components/about/ExperienceTimeline';
import SkillsInventory from '@/components/about/SkillsInventory';
import { ACHIEVEMENTS } from '@/data/experience';

export default function AboutPage() {
  return (
    <PageTransition>
      <SEO
        title="Character Stats | Darren Christopher Tang"
        description="Background, experience, education, and technical skills of Darren Christopher Tang."
        path="/about"
      />

      <div className="container-page py-10 sm:py-14">
        <PageHeader
          eyebrow="About"
          title="Character Stats"
          description="Background, experience, education, and the toolkit I use to ship reliable software."
        />

        <div className="mt-10">
          <ProfileCard />
        </div>

        <section className="mt-16" aria-labelledby="achievement-title">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Milestones</p>
              <h2 id="achievement-title" className="mt-2 section-title">
                Achievement Unlocked
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
            <p className="eyebrow">Timeline</p>
            <h2 id="experience-title" className="mt-2 section-title">
              Experience
            </h2>
          </div>
          <ExperienceTimeline />
        </section>

        <section className="mt-16" aria-labelledby="skills-title">
          <div className="mb-6">
            <p className="eyebrow">Toolkit</p>
            <h2 id="skills-title" className="mt-2 section-title">
              Skills Inventory
            </h2>
          </div>
          <SkillsInventory />
        </section>
      </div>
    </PageTransition>
  );
}
