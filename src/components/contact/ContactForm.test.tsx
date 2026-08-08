import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import ContactForm from '@/components/contact/ContactForm';
import { renderWithProviders } from '@/test/render';

describe('ContactForm fallback', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('opens mailto when no contact endpoint is configured', async () => {
    vi.stubEnv('NEXT_PUBLIC_CONTACT_ENDPOINT', '');
    const user = userEvent.setup();
    const locationSpy = vi
      .spyOn(window, 'location', 'get')
      .mockReturnValue({
        ...window.location,
        href: 'http://localhost/',
      } as Location);
    let assignedHref = '';
    Object.defineProperty(window.location, 'href', {
      configurable: true,
      get: () => assignedHref || 'http://localhost/',
      set: (value: string) => {
        assignedHref = value;
      },
    });

    renderWithProviders(<ContactForm />);

    await user.type(screen.getByLabelText(/your name/i), 'Alex Recruiter');
    await user.type(screen.getByLabelText(/your email/i), 'alex@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Role discussion');
    await user.type(
      screen.getByLabelText(/your message/i),
      'Interested in chatting about an upcoming full-stack role.',
    );

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(assignedHref).toMatch(/^mailto:tang\.darren@gmail\.com\?/);
      expect(assignedHref).toContain('subject=Role');
      expect(assignedHref).toContain('body=Interested');
    });

    expect(
      await screen.findByText(/opening your email application/i),
    ).toBeInTheDocument();

    locationSpy.mockRestore();
  });

  it('shows validation errors before attempting to send', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(
      await screen.findByText(/please fix the highlighted fields/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();
  });

  it('treats subject as optional', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    expect(screen.getByLabelText(/^subject$/i)).not.toBeRequired();

    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(
      await screen.findByText(/please enter your name/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/please add a subject/i),
    ).not.toBeInTheDocument();
  });
});

