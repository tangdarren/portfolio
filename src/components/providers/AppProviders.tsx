'use client';

import { HelmetProvider } from 'react-helmet-async';
import type { ReactNode } from 'react';

export default function AppProviders({ children }: { children: ReactNode }) {
  return <HelmetProvider>{children}</HelmetProvider>;
}
