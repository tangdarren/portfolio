import { motion, useReducedMotion } from 'framer-motion';

import { EXPERIENCE } from '@/data/experience';

export default function ExperienceTimeline() {
  const reduce = useReducedMotion();

  return (
    <ol className="relative border-l border-white/10 pl-6">
      {EXPERIENCE.map((entry, i) => (
        <motion.li
          key={`${entry.company}-${entry.role}`}
          className="relative mb-8 last:mb-0"
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
        >
          <span
            aria-hidden
            className="absolute -left-[29px] top-1.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border border-white/10 bg-ink-900"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
          </span>

          <div className="panel p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-lg font-semibold text-mist-50">
                {entry.company}
              </h3>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-cyan">
                {entry.role}
              </span>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-mist-200">
              {entry.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-mist-400"
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
