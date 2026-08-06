import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

import PageTransition from '@/components/layout/PageTransition';
import SEO from '@/components/layout/SEO';

export default function NotFoundPage() {
  return (
    <PageTransition>
      <SEO
        title="404 · Not Found | Darren Christopher Tang"
        description="The page you're looking for doesn't exist."
        noindex
      />

      <div className="container-page flex min-h-[60vh] items-center py-16">
        <div className="panel mx-auto max-w-xl p-8 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-cyan">
            Error · 404
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-mist-50">
            Page not found
          </h1>
          <p className="mt-3 text-sm text-mist-300">
            The route you followed doesn't exist. It may have been moved, or the
            URL may contain a typo.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <Link to="/" className="btn-primary">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <Link to="/projects" className="btn-secondary">
              <Compass className="h-4 w-4" />
              Browse Projects
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
