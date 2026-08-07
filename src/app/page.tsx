import type { Metadata } from 'next';

import HomePage from '@/views/HomePage';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Home | Darren Christopher Tang',
  description:
    'Full-stack and AI agent engineer. Explore projects, résumé, and background.',
  path: '/',
});

export default function Page() {
  return <HomePage />;
}
