import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ExperienceSection } from './ExperienceSection';
import { useExperience } from '../../../shared/hooks/useExperience';

vi.mock('../../../shared/hooks/useExperience', () => ({
  useExperience: vi.fn(),
}));

describe('ExperienceSection', () => {
  it('renders live professional and community entries split by track', () => {
    useExperience.mockReturnValue([
      {
        id: 1,
        track: 'professional',
        title: 'Senior Engineer',
        organization: 'Acme Corp',
        startDate: 'Jan 2023',
        endDate: null,
        location: 'Manila, Philippines',
        summary: 'Led the platform team.',
      },
      {
        id: 2,
        track: 'community',
        title: 'Mentor',
        organization: 'Dev Community',
        startDate: 'Mar 2022',
        endDate: 'Dec 2023',
        summary: 'Mentored early-career developers.',
      },
    ]);

    render(<ExperienceSection />);

    expect(screen.getByText('Senior Engineer · Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('Mentor · Dev Community')).toBeInTheDocument();
  });

  it('does not render a category badge for community entries', () => {
    useExperience.mockReturnValue([
      {
        id: 1,
        track: 'community',
        title: 'Mentor',
        organization: 'Dev Community',
        startDate: 'Mar 2022',
        endDate: null,
        summary: 'Mentors early-career developers.',
      },
    ]);

    render(<ExperienceSection />);

    expect(screen.queryByText('mentorship')).not.toBeInTheDocument();
    expect(screen.queryByText('community', { selector: 'span' })).not.toBeInTheDocument();
  });

  it('falls back to placeholder entries when there is no live data', () => {
    useExperience.mockReturnValue(null);

    render(<ExperienceSection />);

    expect(screen.getAllByRole('heading', { level: 4 }).length).toBeGreaterThan(0);
  });

  it('falls back per column when live data only covers one track', () => {
    useExperience.mockReturnValue([
      {
        id: 1,
        track: 'professional',
        title: 'Senior Engineer',
        organization: 'Acme Corp',
        startDate: 'Jan 2023',
        endDate: null,
        location: 'Manila, Philippines',
        summary: 'Led the platform team.',
      },
    ]);

    render(<ExperienceSection />);

    expect(screen.getByText('Senior Engineer · Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('Community Organizer · Dev Community PH')).toBeInTheDocument();
    expect(screen.getByText('Volunteer Mentor · Code for Good')).toBeInTheDocument();
  });
});
