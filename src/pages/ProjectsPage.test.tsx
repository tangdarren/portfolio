import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { getLocationProbe, renderApp } from '@/test/render';

function categoryTab(label: string) {
  return screen.getByRole('tab', {
    name: (_accessibleName, element) =>
      element.querySelector('span')?.textContent === label,
  });
}

describe('ProjectsPage URL filters', () => {
  it('updates and preserves category, search, and sort in the URL', async () => {
    const user = userEvent.setup();
    renderApp('/projects');

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Projects' }),
    ).toBeInTheDocument();

    await user.click(categoryTab('AI'));

    await waitFor(() => {
      expect(getLocationProbe().search).toContain('category=AI');
    });

    const search = screen.getByRole('searchbox', { name: /search projects/i });
    await user.clear(search);
    await user.type(search, 'expense');

    await waitFor(() => {
      const { search: params } = getLocationProbe();
      expect(params).toContain('category=AI');
      expect(params).toContain('q=expense');
    });

    await user.selectOptions(
      screen.getByRole('combobox', { name: /sort projects/i }),
      'name',
    );

    await waitFor(() => {
      const { search: params } = getLocationProbe();
      expect(params).toContain('category=AI');
      expect(params).toContain('q=expense');
      expect(params).toContain('sort=name');
    });

    expect(
      screen.getByRole('heading', { name: /ExpenSense/i }),
    ).toBeInTheDocument();
  });

  it('restores filters from URL search parameters', async () => {
    renderApp('/projects?category=AI&q=expense&sort=name');

    expect(await screen.findByRole('heading', { level: 1, name: 'Projects' })).toBeInTheDocument();
    expect(categoryTab('AI')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('searchbox', { name: /search projects/i })).toHaveValue(
      'expense',
    );
    expect(screen.getByRole('combobox', { name: /sort projects/i })).toHaveValue(
      'name',
    );
    expect(
      screen.getByRole('heading', { name: /ExpenSense/i }),
    ).toBeInTheDocument();
  });

  it('clears filters and resets the URL', async () => {
    const user = userEvent.setup();
    renderApp('/projects?category=AI&q=test&sort=name');

    const clearButtons = await screen.findAllByRole('button', {
      name: /clear filters/i,
    });

    await user.click(clearButtons[0]);

    await waitFor(() => {
      expect(getLocationProbe()).toEqual({
        pathname: '/projects',
        search: '',
      });
    });
  });
});
