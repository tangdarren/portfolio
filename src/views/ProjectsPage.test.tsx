import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import ProjectsPage from '@/views/ProjectsPage';
import {
  PROJECTS,
  getGalleryLanguageFilters,
  getGalleryToolFilters,
  hasCaseStudy,
  projectCaseStudyPath,
  projectMatchesTechnologyFilters,
} from '@/data/projects';
import { getLocationProbe, renderWithProviders } from '@/test/render';

describe('ProjectsPage gallery', () => {
  it('renders the projects heading, tech filters, and case-study card links', async () => {
    renderWithProviders(<ProjectsPage />, { initialPath: '/projects' });

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Projects' }),
    ).toBeInTheDocument();

    expect(screen.queryByText(/portfolio/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/selected applications/i),
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'Languages' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Tools' })).toBeInTheDocument();

    for (const project of PROJECTS) {
      if (!hasCaseStudy(project)) continue;
      expect(
        screen.getByRole('link', {
          name: `View case study for ${project.name}`,
        }),
      ).toHaveAttribute('href', projectCaseStudyPath(project.id));
    }
  });

  it('exposes only languages and simplified tools used by current projects', () => {
    expect(getGalleryLanguageFilters()).toEqual([
      'Java',
      'Python',
      'TypeScript',
    ]);
    expect(getGalleryToolFilters()).toEqual([
      'React',
      'Spring Boot',
      'FastAPI',
      'Docker',
      'Firebase',
      'PostgreSQL',
      'Vite',
      'Azure DevOps',
    ]);

    for (const language of getGalleryLanguageFilters()) {
      expect(
        PROJECTS.some((project) =>
          projectMatchesTechnologyFilters(project, language, []),
        ),
      ).toBe(true);
    }

    for (const tool of getGalleryToolFilters()) {
      expect(
        PROJECTS.some((project) =>
          projectMatchesTechnologyFilters(project, null, [tool]),
        ),
      ).toBe(true);
    }
  });

  it('does not expose overly specific tool filters', async () => {
    renderWithProviders(<ProjectsPage />, { initialPath: '/projects' });

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Projects' }),
    ).toBeInTheDocument();

    for (const label of [
      'Alembic',
      'Alpha Vantage API',
      'Flyway',
      'Gmail API',
      'SQLAlchemy',
      'Cloud Storage',
      'Vector Database',
      'WebSpatial',
      'Firestore',
      'Azure Pipelines',
    ]) {
      expect(
        screen.queryByRole('button', { name: label }),
      ).not.toBeInTheDocument();
    }
  });

  it('keeps languages single-select and tools multi-select in the URL', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProjectsPage />, { initialPath: '/projects' });

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Projects' }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'TypeScript' }));

    await waitFor(() => {
      expect(getLocationProbe().search).toContain('language=TypeScript');
    });

    await user.click(screen.getByRole('button', { name: 'Python' }));

    await waitFor(() => {
      const { search } = getLocationProbe();
      expect(search).toContain('language=Python');
      expect(search).not.toContain('TypeScript');
    });

    expect(screen.getByRole('button', { name: 'Python' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'TypeScript' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );

    await user.click(screen.getByRole('button', { name: 'FastAPI' }));
    await user.click(screen.getByRole('button', { name: 'Docker' }));

    await waitFor(() => {
      const { search } = getLocationProbe();
      expect(search).toContain('language=Python');
      expect(search).toContain('tools=');
      expect(search).toContain('Docker');
      expect(search).toContain('FastAPI');
    });

    await user.click(screen.getByRole('button', { name: 'Python' }));

    await waitFor(() => {
      const { search } = getLocationProbe();
      expect(search).not.toContain('language=');
      expect(search).toContain('tools=');
    });
  });

  it('maps Firebase-related stack tags when filtering', async () => {
    renderWithProviders(<ProjectsPage />, {
      initialPath: '/projects?tools=Firebase',
    });

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Projects' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', {
        name: /View case study for ExpenSense/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('link', {
        name: /View case study for MusicBloom/i,
      }),
    ).not.toBeInTheDocument();
  });

  it('restores selected technology filters from URL search parameters', async () => {
    renderWithProviders(<ProjectsPage />, {
      initialPath: '/projects?language=Python&tools=FastAPI',
    });

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Projects' }),
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Python' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'FastAPI' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(
      screen.getByRole('link', {
        name: /View case study for MusicBloom/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('link', {
        name: /View case study for ExpenSense/i,
      }),
    ).not.toBeInTheDocument();
  });

  it('shows Clear only when filters are active and clears the URL', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProjectsPage />, { initialPath: '/projects' });

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Projects' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Clear' }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Java' }));

    const clear = await screen.findByRole('button', { name: 'Clear' });
    await user.click(clear);

    await waitFor(() => {
      expect(getLocationProbe()).toEqual({
        pathname: '/projects',
        search: '',
      });
    });
  });
});
