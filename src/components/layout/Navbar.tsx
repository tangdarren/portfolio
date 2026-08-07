'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

import { NAV_ITEMS } from '@/data/navigation';
import Monogram from './Monogram';

function isNavItemActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-colors',
        scrolled
          ? 'border-b border-ink-600 bg-ink-950/85 backdrop-blur-md'
          : 'border-b border-transparent bg-ink-950/60 backdrop-blur-sm',
      ].join(' ')}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="Darren Christopher Tang — Home"
          onClick={closeMenu}
        >
          <Monogram />
          <span className="hidden font-display text-sm font-semibold tracking-tight text-mist-50 sm:inline">
            Darren Christopher Tang
          </span>
          <span className="font-display text-sm font-semibold tracking-tight text-mist-50 sm:hidden">
            Darren C. Tang
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 md:flex"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = isNavItemActive(pathname, item.to);
            return (
              <Link
                key={item.to}
                href={item.to}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'relative rounded-md px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors',
                  isActive
                    ? 'text-accent-cyan'
                    : 'text-mist-300 hover:text-mist-50',
                ].join(' ')}
              >
                <span>{item.label}</span>
                <span
                  aria-hidden
                  className={[
                    'pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left transition-transform duration-300',
                    isActive
                      ? 'scale-x-100 bg-accent-cyan/70'
                      : 'scale-x-0 bg-accent-cyan/50',
                  ].join(' ')}
                />
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="btn-ghost md:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-navigation"
          className="md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="border-t border-ink-600 bg-ink-900/95 backdrop-blur">
            <nav
              aria-label="Mobile"
              className="container-page flex flex-col gap-1 py-3"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = isNavItemActive(pathname, item.to);
                return (
                  <Link
                    key={item.to}
                    href={item.to}
                    onClick={closeMenu}
                    aria-current={isActive ? 'page' : undefined}
                    className={[
                      'rounded-md px-3 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors',
                      isActive
                        ? 'bg-brand-50 text-accent-cyan'
                        : 'text-mist-300 hover:bg-brand-50/70 hover:text-mist-50',
                    ].join(' ')}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
