import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import Navbar from '@/components/layout/Navbar';
import { renderWithProviders } from '@/test/render';

describe('Navbar mobile menu', () => {
  it('opens, closes, and responds to Escape', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Navbar />);

    const openButton = screen.getByRole('button', { name: /open menu/i });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(openButton);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByRole('navigation', { name: /mobile/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /close menu/i }),
    ).toHaveAttribute('aria-expanded', 'true');

    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
    expect(
      screen.getByRole('button', { name: /open menu/i }),
    ).toHaveAttribute('aria-expanded', 'false');

    await user.click(screen.getByRole('button', { name: /open menu/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /close menu/i }));

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
