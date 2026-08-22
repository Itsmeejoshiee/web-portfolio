import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PostBody } from './PostBody';

describe('PostBody', () => {
  it('renders the title, date, tag, and content HTML', () => {
    const post = {
      title: 'Shipping Faster',
      date: '2024-06-15',
      tag: 'process',
      readTimeMinutes: 6,
      content: '<p>Intro paragraph.</p><p>Second <strong>bold</strong> paragraph.</p>',
    };

    render(<PostBody post={post} />);

    expect(screen.getByRole('heading', { name: /Shipping Faster/ })).toBeInTheDocument();
    expect(screen.getByText('process')).toBeInTheDocument();
    expect(screen.getByText('Intro paragraph.')).toBeInTheDocument();
    expect(screen.getByText('bold').tagName).toBe('STRONG');
  });
});
