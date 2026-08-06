'use client';

import PageTransition from '@/components/layout/PageTransition';

/** Remounts on navigation so enter transitions still run under the App Router. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
