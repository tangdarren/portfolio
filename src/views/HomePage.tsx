import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NAV_BUTTONS = [
  {
    label: 'About',
    href: '/about',
    src: '/hero/nav-about.png',
  },
  {
    label: 'Projects',
    href: '/projects',
    src: '/hero/nav-projects.png',
  },
  {
    label: 'Resume',
    href: '/resume',
    src: '/hero/nav-resume.png',
  },
  {
    label: 'Contact',
    href: '/contact',
    src: '/hero/nav-contact.png',
  },
] as const;

/** Static base / mid-ground sky layers (576×324). */
const SKY_STATIC_LAYERS = [
  '/hero/sky/1.png',
  '/hero/sky/2.png',
  '/hero/sky/3.png',
] as const;

/**
 * Drifting upper cloud layers. Each track is [tile][gap][tile][gap] and
 * translates -50% for a seamless right→left loop with a brief empty beat.
 */
const SKY_DRIFT_LAYERS = [
  {
    src: '/hero/sky/4.png',
    zIndex: 3,
    duration: '40s',
    delay: '0s',
    gap: '18vw',
  },
  {
    src: '/hero/sky/5.png',
    zIndex: 4,
    duration: '50s',
    delay: '-28s',
    gap: '24vw',
  },
] as const;

/**
 * Sizes/gaps unchanged from the current baseline.
 * Desktop (>=1024px): each layer is absolutely anchored at an explicit vh center.
 * Below 1024px: prior flex-column stack is preserved.
 */
const heroVars = {
  '--hero-wordmark-w': 'clamp(24rem, 88vw, 64rem)',
  '--hero-banner-w': 'clamp(17rem, 60vw, 40rem)',
  '--hero-nav-size': 'clamp(5.5rem, 16.5vw, 12rem)',
  /* ~8% wider than prior clamp(0.5rem, 2vw, 1.5rem) */
  '--hero-nav-gap': 'clamp(0.54rem, 2.16vw, 1.62rem)',
  '--hero-banner-pull':
    'calc(-0.025 * var(--hero-wordmark-w) - 0.005 * var(--hero-banner-w) + 0.28rem)',
  '--hero-nav-pull': 'calc(-0.012 * var(--hero-nav-size) + 0.32rem)',
} as CSSProperties;

export default function HomePage() {
  return (
    <section
      aria-label="Home"
      className="relative h-[100svh] w-full overflow-hidden bg-[#0077c3] px-[clamp(0.75rem,3vw,2rem)]"
      style={heroVars}
    >
      {/* Layered sky — 1–3 static; 4–5 seamless horizontal drift tracks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {SKY_STATIC_LAYERS.map((src, index) => (
          <div
            key={src}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${src})`,
              imageRendering: 'pixelated',
              zIndex: index,
            }}
          />
        ))}

        {SKY_DRIFT_LAYERS.map(({ src, zIndex, duration, delay, gap }) => (
          <div
            key={src}
            className="absolute inset-0 overflow-hidden"
            style={{ zIndex }}
          >
            {/* Reduced motion: single static cover frame (no drift). */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat motion-safe:hidden"
              style={{
                backgroundImage: `url(${src})`,
                imageRendering: 'pixelated',
              }}
            />

            <div
              className="absolute top-0 hidden h-full will-change-transform motion-safe:flex motion-safe:animate-hero-cloud-drift"
              style={{
                animationDuration: duration,
                animationDelay: delay,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
              }}
            >
              {[0, 1].map((copy) => (
                <div key={copy} className="flex h-full shrink-0">
                  <div
                    className="h-full w-screen shrink-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${src})`,
                      imageRendering: 'pixelated',
                    }}
                  />
                  <div className="h-full shrink-0" style={{ width: gap }} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h1 className="sr-only">Darren Tang</h1>

      {/*
        Mobile/tablet: flex stack (previous behavior).
        Desktop: `contents` so children position against the hero section.
      */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center leading-none max-[1023px]:-translate-y-[clamp(0.5rem,6vh,3.25rem)] min-[1024px]:contents">
        <div
          className="max-w-none shrink-0 leading-none min-[1024px]:absolute min-[1024px]:left-1/2 min-[1024px]:top-[33.5vh] min-[1024px]:z-10 min-[1024px]:-translate-x-1/2 min-[1024px]:-translate-y-1/2"
          style={{ width: 'var(--hero-wordmark-w)' }}
        >
          <Image
            src="/hero/darren-tang-wordmark.png"
            alt="Darren Tang"
            width={1024}
            height={192}
            priority
            sizes="(max-width: 768px) 88vw, 64rem"
            className="block h-auto w-full max-w-none"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>

        <div
          className="max-w-none shrink-0 leading-none min-[1024px]:absolute min-[1024px]:left-1/2 min-[1024px]:top-[50vh] min-[1024px]:z-10 min-[1024px]:-translate-x-1/2 min-[1024px]:-translate-y-1/2 max-[1023px]:[margin-top:var(--hero-banner-pull)]"
          style={{ width: 'var(--hero-banner-w)' }}
        >
          <Image
            src="/hero/software-engineer-banner.png"
            alt="Software Engineer"
            width={1024}
            height={129}
            priority
            sizes="(max-width: 768px) 60vw, 40rem"
            className="block h-auto w-full max-w-none"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>

        <nav
          aria-label="Home sections"
          className="flex w-full flex-nowrap items-center justify-center leading-none min-[1024px]:absolute min-[1024px]:left-1/2 min-[1024px]:top-[78vh] min-[1024px]:z-10 min-[1024px]:w-auto min-[1024px]:-translate-x-1/2 min-[1024px]:-translate-y-1/2 max-[1023px]:[margin-top:var(--hero-nav-pull)]"
          style={{ gap: 'var(--hero-nav-gap)' }}
        >
          {NAV_BUTTONS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className="hero-nav-btn relative block shrink-0 leading-none"
              style={{ width: 'var(--hero-nav-size)' }}
            >
              <Image
                src={item.src}
                alt=""
                width={843}
                height={834}
                sizes="12rem"
                className="block h-auto w-full"
                style={{ imageRendering: 'pixelated' }}
              />
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
