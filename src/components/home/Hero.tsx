import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';

import { SOCIAL_LINKS } from '@/data/socials';
import DashboardVisual from './DashboardVisual';

export default function Hero() {
  const reduce = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: 0.05 },
    },
  };
  const itemVariants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="container-page pt-8 pb-16 sm:pt-14 sm:pb-20">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="flex flex-col gap-6"
        >
          <motion.span variants={itemVariants} className="eyebrow">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent-cyan"
            />
            Portfolio · v1.0
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-mist-50 sm:text-5xl md:text-6xl"
          >
            Darren Christopher{' '}
            <span className="text-accent-cyan">Tang</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="font-mono text-xs uppercase tracking-[0.24em] text-mist-300"
          >
            Software Engineer · AI Agent Engineer · Full-Stack Engineer
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="max-w-xl text-base text-mist-200 sm:text-lg"
          >
            I build practical full-stack applications, AI-powered tools, and
            automation systems that solve real business problems.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3"
          >
            <Link to="/projects" className="btn-primary group">
              Explore Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link to="/resume" className="btn-secondary">
              <FileText className="h-4 w-4" />
              View Resume
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-2 flex items-center gap-3"
            aria-label="Social links"
          >
            {SOCIAL_LINKS.map(({ label, href, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer noopener' : undefined}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-ink-600 bg-ink-900 text-mist-300 transition-colors hover:border-accent-cyan/50 hover:bg-brand-50 hover:text-accent-cyan"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <DashboardVisual />
        </motion.div>
      </div>
    </section>
  );
}
