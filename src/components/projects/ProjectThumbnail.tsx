import Image from 'next/image';
import { useMemo } from 'react';

import type { Project } from '@/data/projects';

interface ProjectThumbnailProps {
  project: Project;
}

/**
 * Image-first project preview. Uses `project.image` or the first screenshot
 * when available; otherwise a warm deterministic abstract fallback.
 */
export default function ProjectThumbnail({ project }: ProjectThumbnailProps) {
  const palette = useMemo(() => paletteFromId(project.id), [project.id]);
  const photo =
    project.image ??
    project.screenshots?.[0]?.src ??
    project.caseStudy?.screenshots?.[0]?.src;
  const photoAlt =
    project.screenshots?.[0]?.alt ??
    project.caseStudy?.screenshots?.[0]?.alt ??
    `${project.name} preview`;

  return (
    <div
      className="projects-card-media relative aspect-[16/10] w-full overflow-hidden"
      role={photo ? undefined : 'img'}
      aria-label={photo ? undefined : `${project.name} — preview graphic`}
    >
      {photo ? (
        <Image
          src={photo}
          alt={photoAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      ) : (
        <svg
          viewBox="0 0 400 250"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id={`pg-bg-${project.id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={palette.bgFrom} />
              <stop offset="100%" stopColor={palette.bgTo} />
            </linearGradient>
          </defs>
          <rect width="400" height="250" fill={`url(#pg-bg-${project.id})`} />
          <g opacity="0.9">
            {palette.shapes.map((shape, i) => (
              <ShapeGlyph
                key={i}
                shape={shape}
                fill={palette.accent}
                stroke={palette.stroke}
              />
            ))}
          </g>
        </svg>
      )}
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
  stroke: string;
  shapes: Shape[];
}

function ShapeGlyph({
  shape,
  fill,
  stroke,
}: {
  shape: Shape;
  fill: string;
  stroke: string;
}) {
  if (shape.kind === 'rect') {
    return (
      <rect
        x={shape.x}
        y={shape.y}
        width={shape.w ?? 40}
        height={shape.h ?? 40}
        fill={fill}
        stroke={stroke}
        strokeWidth="3"
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
        stroke={stroke}
        strokeWidth="3"
      />
    );
  }
  return (
    <line
      x1={shape.x}
      y1={shape.y}
      x2={shape.x2 ?? shape.x + 60}
      y2={shape.y2 ?? shape.y}
      stroke={stroke}
      strokeWidth="3"
      strokeLinecap="square"
    />
  );
}

function paletteFromId(id: string): Palette {
  const h = Array.from(id).reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 7);
  const palettes: Omit<Palette, 'shapes'>[] = [
    {
      bgFrom: '#7eb8e8',
      bgTo: '#c9e4f7',
      accent: '#f0e2c4',
      stroke: '#5b3a22',
    },
    {
      bgFrom: '#8fbc8f',
      bgTo: '#d4e8c8',
      accent: '#f4e8d0',
      stroke: '#3f5c2e',
    },
    {
      bgFrom: '#d4a574',
      bgTo: '#f0d9b5',
      accent: '#fff6e4',
      stroke: '#6b3e26',
    },
    {
      bgFrom: '#6a9bcf',
      bgTo: '#b8d4ef',
      accent: '#e8d4a8',
      stroke: '#2f4a6b',
    },
    {
      bgFrom: '#c4a484',
      bgTo: '#efe0c8',
      accent: '#fff8ec',
      stroke: '#5a4030',
    },
  ];

  const base = palettes[Math.abs(h) % palettes.length];
  const shapeSets: Shape[][] = [
    [
      { kind: 'rect', x: 48, y: 70, w: 100, h: 48 },
      { kind: 'rect', x: 170, y: 54, w: 70, h: 70 },
      { kind: 'line', x: 48, y: 180, x2: 340, y2: 180 },
    ],
    [
      { kind: 'circle', x: 130, y: 110, r: 46 },
      { kind: 'circle', x: 240, y: 110, r: 28 },
      { kind: 'line', x: 50, y: 190, x2: 350, y2: 190 },
    ],
    [
      { kind: 'rect', x: 60, y: 58, w: 280, h: 24 },
      { kind: 'rect', x: 60, y: 96, w: 200, h: 24 },
      { kind: 'rect', x: 60, y: 134, w: 240, h: 24 },
    ],
    [
      { kind: 'rect', x: 56, y: 60, w: 64, h: 64 },
      { kind: 'rect', x: 140, y: 60, w: 64, h: 64 },
      { kind: 'rect', x: 224, y: 60, w: 64, h: 64 },
      { kind: 'rect', x: 308, y: 60, w: 40, h: 64 },
    ],
  ];

  return { ...base, shapes: shapeSets[Math.abs(h) % shapeSets.length] };
}
