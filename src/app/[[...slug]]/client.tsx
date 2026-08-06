'use client';

import dynamic from 'next/dynamic';

const SpaApp = dynamic(() => import('../../SpaApp'), { ssr: false });

export function ClientOnly() {
  return <SpaApp />;
}
