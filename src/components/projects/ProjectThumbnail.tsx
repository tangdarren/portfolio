import { useMemo } from 'react';

import type { Project } from '@/data/projects';

interface ProjectThumbnailProps {
  project: Project;
  featured?: boolean;
}

/**
 * Deterministic, per-project abstract thumbnail.
 * Uses SVG geometry so the site ships with no bitmap assets, but replaces cleanly
 * once a real screenshot exists (see ProjectCard for the image slot).
 */
export default function ProjectThumbnail({
  project,
  featured = false,
}: ProjectThumbnailProps) {
  const palette = useMemo(() => paletteFromId(project.id), [project.id]);

  return (
    <div
      className={[
        'relative w-full overflow-hidden border-b border-white/5 bg-ink-950/60',
        featured ? 'aspect-[16/7]' : 'aspect-[16/9]',
      ].join(' ')}
      role="img"
      aria-label={`${project.name} — abstract preview graphic`}
    >
      <svg
        viewBox="0 0 400 200"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id={`bg-${project.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={palette.bgFrom} />
            <stop offset="100%" stopColor={palette.bgTo} />
          </linearGradient>
          <linearGradient id={`accent-${project.id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={palette.accent} stopOpacity="0.9" />
            <stop offset="100%" stopColor={palette.accent} stopOpacity="0.25" />
          </linearGradient>
        </defs>

        <rect width="400" height="200" fill={`url(#bg-${project.id})`} />

        {/* Grid overlay */}
        <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={(i + 1) * (400 / 13)}
              y1="0"
              x2={(i + 1) * (400 / 13)}
              y2="200"
            />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={(i + 1) * (200 / 7)}
              x2="400"
              y2={(i + 1) * (200 / 7)}
            />
          ))}
        </g>

        {/* Signature shapes */}
        <g opacity="0.95">
          {palette.shapes.map((shape, i) => (
            <ShapeGlyph
              key={i}
              shape={shape}
              accent={`url(#accent-${project.id})`}
              accentSolid={palette.accent}
            />
          ))}
        </g>

        {/* Corner ident */}
        <g transform="translate(16 16)">
          <rect
            x="0"
            y="0"
            width="82"
            height="20"
            rx="4"
            fill="rgba(11,18,32,0.6)"
            stroke="rgba(148,163,184,0.2)"
          />
          <text
            x="10"
            y="14"
            fill={palette.accent}
            fontFamily="ui-monospace, SFMono-Regular, monospace"
            fontSize="10"
            letterSpacing="1.6"
          >
            {project.id.slice(0, 10).toUpperCase()}
          </text>
        </g>
      </svg>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
    </div>
  );
}

interface Shape {
  kind: 'rect' | 'circle' | 'line';
  x: number;
  y: number;
  w?: number;
  h?: number;
  r?: number;
  x2?: number;
  y2?: number;
}

interface Palette {
  bgFrom: string;
  bgTo: string;
  accent: string;
  shapes: Shape[];
}

function ShapeGlyph({
  shape,
  accent,
  accentSolid,
}: {
  shape: Shape;
  accent: string;
  accentSolid: string;
}) {
  if (shape.kind === 'rect') {
    return (
      <rect
        x={shape.x}
        y={shape.y}
        width={shape.w ?? 40}
        height={shape.h ?? 40}
        rx="6"
        fill={accent}
        stroke={accentSolid}
        strokeOpacity="0.6"
      />
    );
  }
  if (shape.kind === 'circle') {
    return (
      <circle
        cx={shape.x}
        cy={shape.y}
        r={shape.r ?? 22}
        fill="none"
        stroke={accentSolid}
        strokeOpacity="0.6"
        strokeWidth="1.5"
      />
    );
  }
  return (
    <line
      x1={shape.x}
      y1={shape.y}
      x2={shape.x2 ?? shape.x + 60}
      y2={shape.y2 ?? shape.y}
      stroke={accentSolid}
      strokeOpacity="0.8"
      strokeWidth="2"
      strokeLinecap="round"
    />
  );
}

function paletteFromId(id: string): Palette {
  // Simple deterministic hash → palette / shape pick.
  const h = Array.from(id).reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 7);
  const palettes: Omit<Palette, 'shapes'>[] = [
    { bgFrom: '#0b1220', bgTo: '#0e1a2e', accent: '#5eead4' },
    { bgFrom: '#0b1220', bgTo: '#111a2c', accent: '#7dd3fc' },
    { bgFrom: '#0c1526', bgTo: '#0b1220', accent: '#86efac' },
    { bgFrom: '#0b1220', bgTo: '#13223d', accent: '#a5b4fc' },
    { bgFrom: '#0a111e', bgTo: '#0b1220', accent: '#fca5a5' },
  ];

  const base = palettes[Math.abs(h) % palettes.length];

  const shapeSets: Shape[][] = [
    [
      { kind: 'rect', x: 60, y: 80, w: 90, h: 40 },
      { kind: 'rect', x: 170, y: 60, w: 60, h: 60 },
      { kind: 'line', x: 60, y: 150, x2: 340, y2: 150 },
    ],
    [
      { kind: 'circle', x: 120, y: 100, r: 40 },
      { kind: 'circle', x: 230, y: 100, r: 24 },
      { kind: 'line', x: 60, y: 160, x2: 340, y2: 160 },
    ],
    [
      { kind: 'rect', x: 70, y: 60, w: 260, h: 20 },
      { kind: 'rect', x: 70, y: 90, w: 180, h: 20 },
      { kind: 'rect', x: 70, y: 120, w: 220, h: 20 },
    ],
    [
      { kind: 'rect', x: 60, y: 60, w: 60, h: 60 },
      { kind: 'rect', x: 140, y: 60, w: 60, h: 60 },
      { kind: 'rect', x: 220, y: 60, w: 60, h: 60 },
      { kind: 'rect', x: 300, y: 60, w: 40, h: 60 },
    ],
    [
      { kind: 'line', x: 40, y: 140, x2: 360, y2: 60 },
      { kind: 'circle', x: 200, y: 100, r: 34 },
    ],
  ];

  return { ...base, shapes: shapeSets[Math.abs(h) % shapeSets.length] };
}
