import { Download, FileText } from 'lucide-react';

import { RESUME_PDF_PATH } from '@/data/socials';

export default function ResumePanel() {
  return (
    <div className="panel p-5">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-brand-100 bg-brand-50 text-accent-cyan">
          <FileText className="h-4 w-4" />
        </span>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent-cyan">
            Resume
          </p>
          <h3 className="mt-0.5 font-display text-lg font-semibold text-mist-50">
            Résumé
          </h3>
          <p className="mt-1 text-sm text-mist-300">
            Grab a copy of my current résumé or preview it in the browser.
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={RESUME_PDF_PATH}
          target="_blank"
          rel="noreferrer noopener"
          className="btn-secondary"
        >
          <FileText className="h-4 w-4" />
          View Resume
        </a>
        <a
          href={RESUME_PDF_PATH}
          download="Darren_Tang_Resume.pdf"
          className="btn-primary"
        >
          <Download className="h-4 w-4" />
          Download Resume
        </a>
      </div>
    </div>
  );
}
