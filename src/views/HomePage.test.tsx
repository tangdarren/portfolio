import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import HomePage from '@/views/HomePage';
import { renderWithProviders } from '@/test/render';

describe('HomePage hero landing', () => {
  it('renders the wordmark, banner, and navigation links', () => {
    renderWithProviders(<HomePage />, { initialPath: '/' });

    expect(
      screen.getByRole('heading', { level: 1, name: /darren tang/i }),
    ).toBeInTheDocument();
    expect(screen.getByAltText('Darren Tang')).toBeInTheDocument();
    expect(screen.getByAltText('Software Engineer')).toBeInTheDocument();

    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about',
    );
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute(
      'href',
      '/projects',
    );
    expect(screen.getByRole('link', { name: 'Resume' })).toHaveAttribute(
      'href',
      '/resume',
    );
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute(
      'href',
      '/contact',
    );
  });
});
