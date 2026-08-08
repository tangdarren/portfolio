import { RESUME_PDF_PATH } from '@/data/socials';

interface ResumeViewerProps {
  path?: string;
}

export default function ResumeViewer({
  path = RESUME_PDF_PATH,
}: ResumeViewerProps) {
  return (
    <div className="resume-viewer-shell">
      <header className="resume-viewer-header">
        <h1 className="resume-viewer-title">Resume Viewer</h1>
        <a
          href={path}
          download="Darren_Tang_Resume.pdf"
          className="resume-download-btn"
        >
          Download PDF
        </a>
      </header>

      <div className="resume-viewer-frame">
        <iframe
          src={`${path}#view=Fit`}
          title="Darren Tang résumé PDF"
          className="resume-pdf-embed"
        />
      </div>

      <p className="resume-viewer-fallback">
        Can&apos;t view the PDF?{' '}
        <a href={path} download="Darren_Tang_Resume.pdf">
          Download it here
        </a>
        .
      </p>
    </div>
  );
}
