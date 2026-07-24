import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Activity, Briefcase, FolderKanban, Terminal } from 'lucide-react';

import { EXPERIENCE } from '@/data/experience';
import { PROJECTS } from '@/data/projects';

/**
 * A refined, original developer-dashboard visual.
 * Uses pure SVG + Tailwind, no external image assets.
 * Metrics are derived from portfolio data — not invented ops claims.
 */
export default function DashboardVisual() {
  const reduce = useReducedMotion();

  const experienceCount = EXPERIENCE.length;
  const featuredProjectCount = useMemo(
    () => PROJECTS.filter((project) => project.featured).length,
    [],
  );

  // Simple, deterministic sparkline points for a calm chart.
  const sparkline = useMemo(() => {
    const values = [22, 28, 26, 34, 30, 40, 38, 46, 44, 52, 48, 58, 54, 62];
    const w = 260;
    const h = 68;
    const stepX = w / (values.length - 1);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const points = values
      .map((v, i) => {
        const x = i * stepX;
        const y = h - ((v - min) / (max - min || 1)) * h;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
    const area = `0,${h} ${points} ${w},${h}`;
    return { points, area, w, h };
  }, []);

  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-2xl bg-gradient-to-tr from-brand-100/60 via-transparent to-accent-blue/10 blur-2xl"
      />

      <motion.div
        aria-hidden
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 0.2, duration: reduce ? 0.01 : 0.5 }}
        className="relative overflow-hidden rounded-xl border border-ink-600 bg-ink-900 shadow-card"
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-ink-600 bg-ink-850 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-ink-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink-500" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist-400">
            command_center — main
          </span>
          <span className="font-mono text-[10px] text-mist-400">v1.0.0</span>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-2">
          {/* Focus card */}
          <div className="panel col-span-2 flex items-center justify-between gap-3 border-ink-600 bg-ink-850/60 p-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-50 text-accent-cyan">
                <Activity className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist-400">
                  Current focus
                </p>
                <p className="truncate text-sm text-mist-100">
                  AI agents and full-stack systems
                </p>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-accent-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
              Active
            </span>
          </div>

          {/* Experience card */}
          <div className="panel border-ink-600 bg-ink-900 p-3">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist-400">
                Experience
              </p>
              <Briefcase className="h-3.5 w-3.5 text-mist-400" />
            </div>
            <p className="mt-2 font-display text-2xl font-semibold text-mist-50">
              {String(experienceCount).padStart(2, '0')}
            </p>
            <p className="mt-0.5 text-[11px] text-mist-400">
              professional roles
            </p>
          </div>

          {/* Featured projects card */}
          <div className="panel border-ink-600 bg-ink-900 p-3">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist-400">
                Featured
              </p>
              <FolderKanban className="h-3.5 w-3.5 text-mist-400" />
            </div>
            <p className="mt-2 font-display text-2xl font-semibold text-mist-50">
              {String(featuredProjectCount).padStart(2, '0')}
            </p>
            <p className="mt-0.5 text-[11px] text-mist-400">featured projects</p>
          </div>

          {/* Education / areas card */}
          <div className="panel col-span-2 border-ink-600 bg-ink-900 p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist-400">
                Education
              </p>
              <span className="truncate font-mono text-[10px] text-accent-cyan">
                MS CSE · SCU · 2027
              </span>
            </div>
            <svg
              viewBox={`0 0 ${sparkline.w} ${sparkline.h}`}
              className="h-16 w-full"
              role="img"
              aria-label="Decorative portfolio chart"
            >
              <defs>
                <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgb(37, 99, 235)" stopOpacity="0.30" />
                  <stop offset="100%" stopColor="rgb(37, 99, 235)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon points={sparkline.area} fill="url(#sparkFill)" />
              <polyline
                points={sparkline.points}
                fill="none"
                stroke="rgb(37, 99, 235)"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-mist-400">
              Primary areas · AI · Full-stack · Automation
            </p>
          </div>

          {/* Terminal card */}
          <div className="panel col-span-2 border-ink-600 bg-ink-900 p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-mist-400">
                <Terminal className="h-3.5 w-3.5" />
                shell
              </p>
              <span className="font-mono text-[10px] text-mist-400">zsh</span>
            </div>
            <div className="rounded-md border border-ink-600 bg-ink-800/70 p-3 font-mono text-[12px] leading-relaxed text-mist-200">
              <p>
                <span className="text-accent-cyan">›</span>{' '}
                <span className="text-mist-100">build</span>{' '}
                <span className="text-mist-400">portfolio --release</span>
              </p>
              <p className="text-mist-400">compiling pages ✓</p>
              <p className="text-mist-400">
                typecheck + lint ✓{' '}
                <span className="text-accent-green">ready to ship</span>
              </p>
              <p>
                <span className="text-accent-cyan">›</span>{' '}
                <span className="text-mist-100">open</span>{' '}
                <span className="text-mist-400">builds gallery</span>
                {!reduce && (
                  <span className="ml-1 inline-block h-3.5 w-1.5 translate-y-[2px] animate-blink bg-mist-200" />
                )}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating side badge */}
      <div className="pointer-events-none absolute -right-3 -top-3 hidden rounded-md border border-ink-600 bg-ink-900 px-2.5 py-1 shadow-panel sm:block">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist-300">
          portfolio
        </span>
      </div>
    </div>
  );
}
