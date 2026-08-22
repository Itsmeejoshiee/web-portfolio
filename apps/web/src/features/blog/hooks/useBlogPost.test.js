import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useBlogPost } from './useBlogPost';
import { api } from '../../../shared/api/apiClient';

vi.mock('../../../shared/api/apiClient', () => ({
  api: { get: vi.fn() },
}));

describe('useBlogPost', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not fetch when id is undefined (create mode has no post yet)', () => {
    renderHook(() => useBlogPost(undefined));

    expect(api.get).not.toHaveBeenCalled();
  });

  it('fetches the post by id when one is given', () => {
    api.get.mockResolvedValueOnce({ id: 5, title: 'A post' });

    renderHook(() => useBlogPost(5));

    expect(api.get).toHaveBeenCalledWith('/blog-posts/5');
  });
});
