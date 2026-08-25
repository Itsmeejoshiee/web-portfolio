import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EditorToolbar } from './EditorToolbar';

function createChainSpy() {
  const calls = [];
  const chain = {};
  ['focus', 'toggleBold', 'toggleItalic', 'toggleHeading', 'toggleBulletList', 'toggleOrderedList', 'toggleBlockquote', 'run'].forEach(
    (method) => {
      chain[method] = (...args) => {
        calls.push([method, ...args]);
        return chain;
      };
    },
  );
  return { chain, calls };
}

function createEditorStub(activeMap = {}) {
  const { chain, calls } = createChainSpy();
  const editor = {
    isActive: (type, attrs) => Boolean(activeMap[attrs ? `${type}:${attrs.level}` : type]),
    chain: () => chain,
  };
  return { editor, calls };
}

describe('EditorToolbar', () => {
  it('exposes each formatting control with an accessible name', () => {
    const { editor } = createEditorStub();
    render(<EditorToolbar editor={editor} />);

    expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /italic/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /heading 2/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /bullet list/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /quote/i })).toBeInTheDocument();
  });

  it('invokes the matching editor command when a button is clicked', async () => {
    const user = userEvent.setup();
    const { editor, calls } = createEditorStub();
    render(<EditorToolbar editor={editor} />);

    await user.click(screen.getByRole('button', { name: /bold/i }));

    expect(calls.map(([method]) => method)).toEqual(['focus', 'toggleBold', 'run']);
  });

  it('marks a button pressed when the editor reports it active', () => {
    const { editor } = createEditorStub({ bold: true });
    render(<EditorToolbar editor={editor} />);

    expect(screen.getByRole('button', { name: /bold/i })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: /italic/i })).toHaveAttribute('aria-pressed', 'false');
  });
});
