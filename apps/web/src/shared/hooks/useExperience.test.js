import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useExperience } from './useExperience';
import { api } from '../api/apiClient';

vi.mock('../api/apiClient', () => ({
  api: { get: vi.fn() },
}));

describe('useExperience', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns the list of experience entries once the API resolves', async () => {
    api.get.mockResolvedValueOnce([{ id: 1, track: 'professional', title: 'Senior Engineer' }]);

    const { result } = renderHook(() => useExperience());

    await waitFor(() => expect(result.current).not.toBeNull());

    expect(result.current).toEqual([{ id: 1, track: 'professional', title: 'Senior Engineer' }]);
    expect(api.get).toHaveBeenCalledWith('/experience');
  });

  it('returns null when the request fails', async () => {
    api.get.mockRejectedValueOnce(new Error('network down'));

    const { result } = renderHook(() => useExperience());

    await waitFor(() => expect(api.get).toHaveBeenCalled());
    expect(result.current).toBeNull();
  });
});
