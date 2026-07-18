import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Activity, Cpu, GitBranch, Terminal } from 'lucide-react';

/**
 * A refined, original developer-dashboard visual.
 * Uses pure SVG + Tailwind, no external image assets.
 */
export default function DashboardVisual() {
  const reduce = useReducedMotion();

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
        className="pointer-events-none absolute -inset-6 rounded-2xl bg-gradient-to-tr from-accent-cyan/10 via-transparent to-accent-blue/10 blur-2xl"
      />

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative overflow-hidden rounded-xl border border-white/10 bg-ink-900/85 shadow-panel"
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-white/5 bg-ink-850/80 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist-400">
            command_center — main
          </span>
          <span className="font-mono text-[10px] text-mist-400">v1.0.0</span>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-2">
          {/* Status card */}
          <div className="panel col-span-2 flex items-center justify-between gap-3 p-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-accent-cyan/10 text-accent-cyan">
                <Activity className="h-4 w-4" />
              </span>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist-400">
                  System status
                </p>
                <p className="text-sm text-mist-100">All services nominal</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-green/30 bg-accent-green/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-accent-green">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
              Healthy
            </span>
          </div>

          {/* Deploys card */}
          <div className="panel p-3">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist-400">
                Deploys
              </p>
              <GitBranch className="h-3.5 w-3.5 text-mist-400" />
            </div>
            <p className="mt-2 font-display text-2xl font-semibold text-mist-50">
              14
            </p>
            <p className="mt-0.5 text-[11px] text-mist-400">this week</p>
          </div>

          {/* Uptime card */}
          <div className="panel p-3">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist-400">
                Uptime
              </p>
              <Cpu className="h-3.5 w-3.5 text-mist-400" />
            </div>
            <p className="mt-2 font-display text-2xl font-semibold text-mist-50">
              99.98<span className="text-mist-400 text-base">%</span>
            </p>
            <p className="mt-0.5 text-[11px] text-mist-400">rolling 30 days</p>
          </div>

          {/* Chart card */}
          <div className="panel col-span-2 p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist-400">
                Throughput
              </p>
              <span className="font-mono text-[10px] text-accent-cyan">
                +12.4%
              </span>
            </div>
            <svg
              viewBox={`0 0 ${sparkline.w} ${sparkline.h}`}
              className="h-16 w-full"
              role="img"
              aria-label="Throughput sparkline"
            >
              <defs>
                <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgb(94, 234, 212)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="rgb(94, 234, 212)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon points={sparkline.area} fill="url(#sparkFill)" />
              <polyline
                points={sparkline.points}
                fill="none"
                stroke="rgb(94, 234, 212)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Terminal card */}
          <div className="panel col-span-2 p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-mist-400">
                <Terminal className="h-3.5 w-3.5" />
                shell
              </p>
              <span className="font-mono text-[10px] text-mist-400">zsh</span>
            </div>
            <div className="rounded-md border border-white/5 bg-ink-950/70 p-3 font-mono text-[12px] leading-relaxed text-mist-200">
              <p>
                <span className="text-accent-cyan">›</span>{' '}
                <span className="text-mist-100">build</span>{' '}
                <span className="text-mist-400">portfolio --release</span>
              </p>
              <p className="text-mist-400">compiling components ✓</p>
              <p className="text-mist-400">
                bundling assets ✓{' '}
                <span className="text-accent-green">ready in 812ms</span>
              </p>
              <p>
                <span className="text-accent-cyan">›</span>{' '}
                <span className="text-mist-100">deploy</span>{' '}
                <span className="text-mist-400">--target production</span>
                {!reduce && (
                  <span className="ml-1 inline-block h-3.5 w-1.5 translate-y-[2px] animate-blink bg-mist-100" />
                )}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating side badge */}
      <div className="pointer-events-none absolute -right-3 -top-3 hidden rounded-md border border-white/10 bg-ink-900/90 px-2.5 py-1 shadow-panel sm:block">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist-300">
          live_view
        </span>
      </div>
    </div>
  );
}
