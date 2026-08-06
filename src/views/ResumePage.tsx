'use client';

import PageHeader from '@/components/layout/PageHeader';
import SEO from '@/components/layout/SEO';
import ResumeViewer from '@/components/resume/ResumeViewer';

export default function ResumePage() {
  return (
    <>
      <SEO
        title="Resume | Darren Christopher Tang"
        description="View or download the résumé of Darren Christopher Tang — full-stack and AI agent engineer."
        path="/resume"
      />

      <div className="container-page py-10 sm:py-14">
        <PageHeader
          eyebrow="Résumé"
          title="Resume"
          description="Full-stack and AI-focused software engineer with experience building internal business applications, automation tools, financial dashboards, and AI-powered workflows."
        />

        <div className="mt-10">
          <ResumeViewer />
        </div>

        <p className="mt-4 text-xs text-mist-400">
          Tip: if the embedded preview doesn't render on your device, use{' '}
          <span className="text-mist-200">View Full Screen</span> or{' '}
          <span className="text-mist-200">Download PDF</span> above.
        </p>
      </div>
    </>
  );
}
