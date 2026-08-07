'use client';

import { CheckCircle2 } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import type { Achievement } from '@/data/experience';

interface AchievementCardProps {
  achievement: Achievement;
  index?: number;
}

export default function AchievementCard({
  achievement,
  index = 0,
}: AchievementCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="panel panel-hover p-4"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-brand-100 bg-brand-50 text-accent-cyan">
          <CheckCircle2 className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-cyan">
            Highlight
          </p>
          <h3 className="mt-0.5 text-sm font-semibold text-mist-50">
            {achievement.title}
          </h3>
          <p className="text-sm text-mist-300">{achievement.detail}</p>
          {achievement.meta && (
            <p className="mt-1 font-mono text-[11px] text-mist-400">
              {achievement.meta}
            </p>
          )}
        </div>
      </div>
    </motion.article>
  );
}
