'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { EXPERIENCE } from '@/data/experience';

export default function ExperienceTimeline() {
  const reduce = useReducedMotion();

  return (
    <ol className="relative border-l-2 border-ink-600 pl-6">
      {EXPERIENCE.map((entry, i) => (
        <motion.li
          key={`${entry.company}-${entry.role}`}
          className="relative mb-8 last:mb-0"
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: reduce ? 0.01 : 0.4, delay: reduce ? 0 : i * 0.05 }}
        >
          <span
            aria-hidden
            className="absolute -left-[30px] top-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-ink-600 bg-ink-900 shadow-panel"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
          </span>

          <div className="panel p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <h3 className="font-display text-lg font-semibold text-mist-50">
                {entry.role}
              </h3>
              {entry.dates && (
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-cyan">
                  {entry.dates}
                </span>
              )}
            </div>
            <p className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-sm text-mist-300">
              <span className="font-medium text-mist-100">{entry.company}</span>
              {entry.location && (
                <>
                  <span aria-hidden className="text-mist-500">
                    ·
                  </span>
                  <span>{entry.location}</span>
                </>
              )}
            </p>
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
