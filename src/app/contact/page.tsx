import type { Metadata } from 'next';

import ContactPage from '@/views/ContactPage';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Contact | Darren Christopher Tang',
  description:
    'Get in touch with Darren Christopher Tang about software engineering opportunities, projects, and collaborations.',
  path: '/contact',
});

export default function Page() {
  return <ContactPage />;
}
