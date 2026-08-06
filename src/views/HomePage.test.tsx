import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PROJECTS } from '@/data/projects';
import { renderApp } from '@/test/render';

describe('HomePage featured projects', () => {
  it('links featured projects to their case studies', async () => {
    renderApp('/');

    const featured = PROJECTS.filter((project) => project.featured).slice(0, 3);
    expect(featured.length).toBeGreaterThan(0);

    expect(
      await screen.findByRole('heading', { name: /featured projects/i }),
    ).toBeInTheDocument();

    for (const project of featured) {
      const caseStudyLink = screen.getByRole('link', {
        name: `View case study for ${project.name}`,
      });
      expect(caseStudyLink).toHaveAttribute(
        'href',
        `/projects/${project.id}`,
      );

      expect(
        screen.getByRole('link', { name: project.name }),
      ).toHaveAttribute('href', `/projects/${project.id}`);
    }
  });
});
