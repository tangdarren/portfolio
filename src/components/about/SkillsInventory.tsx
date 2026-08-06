'use client';

import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { SKILL_GROUPS } from '@/data/skills';

export default function SkillsInventory() {
  const reduce = useReducedMotion();
  const categories = useMemo(
    () => ['All', ...SKILL_GROUPS.map((g) => g.category)],
    [],
  );
  const [active, setActive] = useState<string>('All');

  const visible =
    active === 'All'
      ? SKILL_GROUPS
      : SKILL_GROUPS.filter((g) => g.category === active);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={isActive}
              className={[
                'rounded-md border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors',
                isActive
                  ? 'border-accent-cyan bg-accent-cyan text-white shadow-panel'
                  : 'border-ink-600 bg-ink-900 text-mist-300 hover:border-accent-cyan/50 hover:bg-brand-50 hover:text-mist-100',
              ].join(' ')}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((group, i) => (
          <motion.div
            key={group.category}
            className="panel p-4"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display text-sm font-semibold text-mist-50">
                {group.category}
              </h3>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist-400">
                {group.items.length}
              </span>
            </div>
            <ul className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li key={item} className="tag">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
