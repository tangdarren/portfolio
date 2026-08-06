import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';

/**
 * Client-only SPA shell for the Next.js catch-all entry.
 * Providers live here (not in `App`) so Vitest can mount `App` under MemoryRouter.
 */
export default function SpaApp() {
  return (
    <StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </StrictMode>
  );
}
