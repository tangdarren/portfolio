import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

import { NAV_ITEMS } from '@/data/navigation';
import Monogram from './Monogram';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

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

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-colors',
        scrolled
          ? 'border-b border-white/5 bg-ink-950/85 backdrop-blur-md'
          : 'border-b border-transparent bg-ink-950/40 backdrop-blur-sm',
      ].join(' ')}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          className="group flex items-center gap-3"
          aria-label="Darren Christopher Tang — Home"
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
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                [
                  'relative rounded-md px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors',
                  isActive
                    ? 'text-accent-cyan'
                    : 'text-mist-300 hover:text-mist-50',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
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
                </>
              )}
            </NavLink>
          ))}
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
          <div className="border-t border-white/5 bg-ink-950/95 backdrop-blur">
            <nav
              aria-label="Mobile"
              className="container-page flex flex-col gap-1 py-3"
            >
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    [
                      'rounded-md px-3 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors',
                      isActive
                        ? 'bg-accent-cyan/10 text-accent-cyan'
                        : 'text-mist-200 hover:bg-white/[0.04] hover:text-mist-50',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
