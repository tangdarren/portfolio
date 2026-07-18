import { Download, FileText, Maximize2 } from 'lucide-react';

import { RESUME_PDF_PATH } from '@/data/socials';

interface ResumeViewerProps {
  path?: string;
}

export default function ResumeViewer({ path = RESUME_PDF_PATH }: ResumeViewerProps) {
  return (
    <div className="panel overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 bg-ink-850/60 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-accent-cyan">
            <FileText className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-mist-50">
              Darren_Tang_Resume.pdf
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist-400">
              PDF · embedded preview
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href={path}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-secondary"
          >
            <Maximize2 className="h-4 w-4" />
            View Full Screen
          </a>
          <a href={path} download className="btn-primary">
            <Download className="h-4 w-4" />
            Download PDF
          </a>
        </div>
      </div>

      <div className="relative">
        <object
          data={path}
          type="application/pdf"
          className="h-[70vh] w-full min-h-[520px] bg-ink-950"
          aria-label="Résumé PDF embedded viewer"
        >
          <ResumeFallback path={path} />
        </object>
      </div>
    </div>
  );
}

function ResumeFallback({ path }: { path: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-mist-400">
        Preview unavailable
      </p>
      <p className="max-w-md text-sm text-mist-200">
        Your browser can't display the embedded PDF. You can open or download the
        résumé directly using the links below.
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
        <a href={path} target="_blank" rel="noreferrer noopener" className="btn-secondary">
          <Maximize2 className="h-4 w-4" />
          Open in new tab
        </a>
        <a href={path} download className="btn-primary">
          <Download className="h-4 w-4" />
          Download PDF
        </a>
      </div>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-mist-500">
        {path}
      </p>
    </div>
  );
}
