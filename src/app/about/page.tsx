import type { Metadata } from 'next';

import AboutPage from '@/views/AboutPage';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'About Me | Darren Christopher Tang',
  description:
    'Background, experience, education, and technical skills of Darren Christopher Tang.',
  path: '/about',
});

export default function Page() {
  return <AboutPage />;
}
