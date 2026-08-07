'use client';

import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

interface NavigationCardProps {
  eyebrow: string;
  title: string;
  description: string;
  to: string;
  icon: LucideIcon;
  index?: number;
}

export default function NavigationCard({
  eyebrow,
  title,
  description,
  to,
  icon: Icon,
  index = 0,
}: NavigationCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        href={to}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-ink-600 bg-ink-900 p-5 shadow-panel transition-all hover:-translate-y-0.5 hover:border-accent-cyan/50 hover:shadow-card"
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-brand-100 bg-brand-50 text-accent-cyan">
              <Icon className="h-4 w-4" />
            </span>
            <ArrowUpRight className="h-4 w-4 text-mist-400 transition-colors group-hover:text-accent-cyan" />
          </div>

          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-mist-400">
            {eyebrow}
          </p>
          <h3 className="mt-1 font-display text-lg font-semibold text-mist-50">
            {title}
          </h3>
          <p className="mt-2 text-sm text-mist-300">{description}</p>
        </div>

        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
        />
      </Link>
    </motion.div>
  );
}
