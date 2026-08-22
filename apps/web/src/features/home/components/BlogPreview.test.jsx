import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BlogPreview } from './BlogPreview';
import { useBlogPosts } from '../../blog/hooks/useBlogPosts';

vi.mock('../../blog/hooks/useBlogPosts', () => ({
  useBlogPosts: vi.fn(),
}));

function postAt(id, date) {
  return { id, title: `Post ${id}`, date, readTimeMinutes: 5, tag: 'notes' };
}

describe('BlogPreview', () => {
  it('shows only the 3 most recent posts by date, newest first', () => {
    useBlogPosts.mockReturnValue({
      posts: [
        postAt(1, '2024-01-01'),
        postAt(2, '2024-06-01'),
        postAt(3, '2024-03-01'),
        postAt(4, '2024-05-01'),
        postAt(5, '2024-02-01'),
      ],
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <BlogPreview />
      </MemoryRouter>,
    );

    const titles = screen.getAllByText(/^Post \d$/).map((el) => el.textContent);
    expect(titles).toEqual(['Post 2', 'Post 4', 'Post 3']);
  });
});
