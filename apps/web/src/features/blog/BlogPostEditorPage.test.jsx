import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { BlogPostEditorPage } from './BlogPostEditorPage';

vi.mock('@tiptap/react', () => ({
  useEditor: () => ({
    getHTML: () => '<p>mock content</p>',
    commands: { setContent: vi.fn() },
    isActive: () => false,
    chain: () => ({ focus: () => ({ run: vi.fn() }) }),
  }),
  EditorContent: () => <div data-testid="tiptap-editor" />,
}));
vi.mock('@tiptap/starter-kit', () => ({ default: {} }));
vi.mock('@tiptap/extension-link', () => ({ default: {} }));

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/admin/blog-posts/new']}>
      <Routes>
        <Route path="/admin/blog-posts/new" element={<BlogPostEditorPage mode="create" />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('BlogPostEditorPage', () => {
  it('reflects the title field in the live preview as you type', async () => {
    const user = userEvent.setup();
    renderPage();

    const titleInput = screen.getByLabelText(/title/i);
    await user.type(titleInput, 'My New Post');

    expect(screen.getByRole('heading', { name: /My New Post/ })).toBeInTheDocument();
  });
});
