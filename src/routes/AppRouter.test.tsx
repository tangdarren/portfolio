import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderApp } from '@/test/render';

describe('App routes', () => {
  it('renders main routes successfully', async () => {
    const routes: Array<{ path: string; heading: string | RegExp }> = [
      { path: '/', heading: /Darren Christopher/i },
      { path: '/about', heading: 'About Me' },
      { path: '/projects', heading: 'Projects' },
      { path: '/resume', heading: 'Resume' },
      { path: '/contact', heading: 'Contact' },
    ];

    for (const route of routes) {
      const { unmount } = renderApp(route.path);
      expect(
        await screen.findByRole('heading', { level: 1, name: route.heading }),
      ).toBeInTheDocument();
      unmount();
    }
  });

  it('displays the 404 page for unknown routes', async () => {
    renderApp('/this-route-does-not-exist');

    expect(
      await screen.findByRole('heading', { name: /page not found/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /back to home/i }),
    ).toBeInTheDocument();
  });
});
