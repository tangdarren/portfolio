import { SOCIAL_LINKS } from '@/data/socials';

export default function SocialLinks() {
  return (
    <ul className="grid gap-3 sm:grid-cols-3">
      {SOCIAL_LINKS.map(({ label, href, handle, icon: Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer noopener' : undefined}
            className="group flex items-center gap-3 rounded-md border border-ink-600 bg-ink-900 px-3 py-3 transition-colors hover:border-accent-cyan/50 hover:bg-brand-50 hover:shadow-panel"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-brand-100 bg-brand-50 text-accent-cyan">
              <Icon className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-mist-400">
                {label}
              </span>
              <span className="block truncate text-sm text-mist-100">
                {handle}
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
