import { describe, it, expect, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { BlogPostEditorPage } from './BlogPostEditorPage';

const editorStub = vi.hoisted(() => ({ activeBold: false, onTransaction: null }));

vi.mock('@tiptap/react', () => ({
  useEditor: (options) => {
    editorStub.onTransaction = options.onTransaction;
    return {
      getHTML: () => '<p>mock content</p>',
      commands: { setContent: vi.fn() },
      isActive: (type) => (type === 'bold' ? editorStub.activeBold : false),
      chain: () => ({ focus: () => ({ run: vi.fn() }) }),
    };
  },
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
  it('shows the edit form by default, with the preview available in its own tab', () => {
    renderPage();

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.queryByTestId('tiptap-editor')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /edit/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: /preview/i })).toHaveAttribute('aria-selected', 'false');
  });

  it('reflects the title field in the live preview after switching to the Preview tab', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByLabelText(/title/i), 'My New Post');
    await user.click(screen.getByRole('tab', { name: /preview/i }));

    expect(screen.getByRole('heading', { name: /My New Post/ })).toBeInTheDocument();
    expect(screen.queryByLabelText(/title/i)).not.toBeInTheDocument();
  });

  it('updates the toolbar active state when the cursor moves, without any content change', () => {
    editorStub.activeBold = false;
    renderPage();

    expect(screen.getByRole('button', { name: /^bold$/i })).toHaveAttribute('aria-pressed', 'false');

    editorStub.activeBold = true;
    act(() => {
      editorStub.onTransaction?.();
    });

    expect(screen.getByRole('button', { name: /^bold$/i })).toHaveAttribute('aria-pressed', 'true');
  });
});
