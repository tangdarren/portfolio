import { Link } from 'react-router-dom';

import { NAV_ITEMS } from '@/data/navigation';
import { SOCIAL_LINKS } from '@/data/socials';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-white/5 bg-ink-950/60">
      <div className="container-page grid gap-8 py-10 md:grid-cols-3">
        <div>
          <p className="font-display text-sm font-semibold text-mist-50">
            Darren Christopher Tang
          </p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-mist-400">
            Full-Stack · AI Agent Engineer
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-4 gap-y-2 md:justify-center">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist-300 transition-colors hover:text-mist-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:justify-end">
          {SOCIAL_LINKS.map(({ label, href, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer noopener' : undefined}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-mist-200 transition-colors hover:border-accent-cyan/40 hover:text-accent-cyan"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-4 text-[11px] text-mist-400 md:flex-row md:items-center">
          <span className="font-mono uppercase tracking-[0.18em]">
            © {year} Darren Christopher Tang
          </span>
          <span className="font-mono uppercase tracking-[0.18em]">
            Built with React · TypeScript · Tailwind
          </span>
        </div>
      </div>
    </footer>
  );
}
