import type { ReactElement, ReactNode } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, useLocation } from 'react-router-dom';

import App from '@/App';

function LocationProbe() {
  const location = useLocation();
  return (
    <div
      data-testid="location"
      data-pathname={location.pathname}
      data-search={location.search}
      hidden
    />
  );
}

interface ProvidersProps {
  children: ReactNode;
  initialEntries?: string[];
}

function Providers({ children, initialEntries = ['/'] }: ProvidersProps) {
  return (
    <HelmetProvider>
      <MemoryRouter initialEntries={initialEntries}>
        <LocationProbe />
        {children}
      </MemoryRouter>
    </HelmetProvider>
  );
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { initialEntries?: string[] },
) {
  const { initialEntries, ...renderOptions } = options ?? {};
  return render(ui, {
    wrapper: ({ children }) => (
      <Providers initialEntries={initialEntries}>{children}</Providers>
    ),
    ...renderOptions,
  });
}

/** Render the full app at a route (supports search params). */
export function renderApp(initialEntry = '/') {
  return renderWithProviders(<App />, { initialEntries: [initialEntry] });
}

export function getLocationProbe() {
  const node = document.querySelector('[data-testid="location"]');
  if (!(node instanceof HTMLElement)) {
    throw new Error('Location probe not found');
  }
  return {
    pathname: node.dataset.pathname ?? '',
    search: node.dataset.search ?? '',
  };
}
