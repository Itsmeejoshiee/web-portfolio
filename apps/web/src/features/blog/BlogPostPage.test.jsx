import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { BlogPostPage } from './BlogPostPage';
import { useBlogPost } from './hooks/useBlogPost';

vi.mock('./hooks/useBlogPost', () => ({
  useBlogPost: vi.fn(),
}));

function renderAtPost(id) {
  return render(
    <MemoryRouter initialEntries={[`/blog/${id}`]}>
      <Routes>
        <Route path="/blog/:id" element={<BlogPostPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('BlogPostPage', () => {
  it('renders stored HTML content as real elements, not escaped text', () => {
    useBlogPost.mockReturnValue({
      post: {
        id: 1,
        title: 'Shipping Faster',
        date: '2024-06-15',
        tag: 'process',
        readTimeMinutes: 6,
        content: '<p>Intro paragraph.</p><p>Second <strong>bold</strong> paragraph.</p>',
      },
      loading: false,
      error: null,
    });

    renderAtPost(1);

    expect(screen.getByText('Intro paragraph.')).toBeInTheDocument();
    expect(screen.getByText('bold').tagName).toBe('STRONG');
  });
});
