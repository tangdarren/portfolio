import { Briefcase, GraduationCap, MapPin } from 'lucide-react';

export default function ProfileCard() {
  return (
    <div className="panel grid gap-6 p-6 md:grid-cols-[220px_minmax(0,1fr)] md:p-8">
      <div className="mx-auto md:mx-0">
        <div
          className="relative h-40 w-40 overflow-hidden rounded-xl border border-white/10 bg-ink-800 md:h-52 md:w-52"
          role="img"
          aria-label="Professional portrait placeholder"
        >
          <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-ink-700 to-ink-900">
            <span className="font-display text-5xl font-semibold text-mist-100/80">
              DT
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 border-t border-white/5 bg-ink-950/60 px-3 py-1.5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-mist-400">
            portrait · placeholder
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold text-mist-50 sm:text-3xl">
            Darren Christopher Tang
          </h2>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-accent-cyan">
            Full-Stack Engineer · AI Agent Engineer
          </p>
        </div>

        <p className="text-sm leading-relaxed text-mist-200 sm:text-base">
          I'm a software engineer focused on building reliable full-stack
          products, AI-powered tools, and workflow automation systems. I am
          currently pursuing a Master of Science in Computer Science at Santa
          Clara University after earning my Bachelor of Science in Computer
          Science from the University of Wisconsin–Madison.
        </p>

        <p className="text-sm leading-relaxed text-mist-300 sm:text-base">
          I enjoy turning complex requirements into practical software that
          improves real workflows. My interests include full-stack engineering,
          AI agents, applied AI, automation, financial technology, and
          data-driven applications.
        </p>

        <div className="mt-1 flex flex-wrap gap-2">
          <span className="tag">
            <GraduationCap className="mr-1.5 h-3 w-3 text-accent-cyan" />
            MSCS · Santa Clara
          </span>
          <span className="tag">
            <GraduationCap className="mr-1.5 h-3 w-3 text-accent-cyan" />
            BSCS · UW–Madison
          </span>
          <span className="tag">
            <Briefcase className="mr-1.5 h-3 w-3 text-accent-cyan" />
            Currently at Veracyte
          </span>
          <span className="tag">
            <MapPin className="mr-1.5 h-3 w-3 text-accent-cyan" />
            Bay Area, CA
          </span>
        </div>
      </div>
    </div>
  );
}
