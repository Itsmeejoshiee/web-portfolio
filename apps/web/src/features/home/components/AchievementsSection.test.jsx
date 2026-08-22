import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AchievementsSection } from './AchievementsSection';
import { useAchievements } from '../hooks/useAchievements';

vi.mock('../hooks/useAchievements', () => ({
  useAchievements: vi.fn(),
}));

function achievement(id, featured) {
  return { id, title: `Achievement ${id}`, event: 'Event · 2024', description: 'x', category: 'hackathon', featured };
}

describe('AchievementsSection', () => {
  it('only renders featured achievements', () => {
    useAchievements.mockReturnValue({
      achievements: [achievement(1, true), achievement(2, false), achievement(3, true)],
    });

    render(
      <MemoryRouter>
        <AchievementsSection />
      </MemoryRouter>,
    );

    expect(screen.getByText('Achievement 1')).toBeInTheDocument();
    expect(screen.queryByText('Achievement 2')).not.toBeInTheDocument();
    expect(screen.getByText('Achievement 3')).toBeInTheDocument();
  });

  it('caps the featured list at 3 even if more are marked featured', () => {
    useAchievements.mockReturnValue({
      achievements: [1, 2, 3, 4, 5].map((id) => achievement(id, true)),
    });

    render(
      <MemoryRouter>
        <AchievementsSection />
      </MemoryRouter>,
    );

    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3);
  });
});
