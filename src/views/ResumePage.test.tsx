import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ResumePage from '@/views/ResumePage';
import { RESUME_PDF_PATH } from '@/data/socials';
import { renderWithProviders } from '@/test/render';

describe('ResumePage', () => {
  it('renders the resume viewer chrome, native PDF embed, and download actions', async () => {
    renderWithProviders(<ResumePage />, { initialPath: '/resume' });

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: 'Resume Viewer',
      }),
    ).toBeInTheDocument();

    const downloads = screen.getAllByRole('link', { name: /download/i });
    expect(downloads.length).toBeGreaterThanOrEqual(1);
    for (const link of downloads) {
      expect(link).toHaveAttribute('href', RESUME_PDF_PATH);
      expect(link).toHaveAttribute('download', 'Darren_Tang_Resume.pdf');
    }

    const embed = screen.getByTitle('Darren Tang résumé PDF');
    expect(embed.tagName).toBe('IFRAME');
    expect(embed).toHaveAttribute(
      'src',
      `${RESUME_PDF_PATH}#view=Fit`,
    );

    expect(screen.queryByText(/loading resume/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/RÉSUMÉ/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/View Full Screen/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/full-stack and AI-focused/i),
    ).not.toBeInTheDocument();
  });
});
