import type { Metadata } from 'next';

import NotFoundPage from '@/views/NotFoundPage';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '404 · Not Found | Darren Christopher Tang',
  description: "The page you're looking for doesn't exist.",
  path: '/404',
  noindex: true,
});

export default function NotFound() {
  return <NotFoundPage />;
}
