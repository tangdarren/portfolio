import type { Metadata } from 'next';

import ResumePage from '@/views/ResumePage';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Resume | Darren Christopher Tang',
  description:
    'View or download the résumé of Darren Christopher Tang — full-stack and AI agent engineer.',
  path: '/resume',
});

export default function Page() {
  return <ResumePage />;
}
