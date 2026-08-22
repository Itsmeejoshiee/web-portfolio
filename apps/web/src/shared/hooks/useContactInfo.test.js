import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useContactInfo } from './useContactInfo';
import { api } from '../api/apiClient';

vi.mock('../api/apiClient', () => ({
  api: { get: vi.fn() },
}));

describe('useContactInfo', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns the single seeded contact row once the API resolves', async () => {
    api.get.mockResolvedValueOnce([
      { id: 1, body: 'Say hi.', ctaLabel: 'hey@joshgorospe.dev', ctaUrl: 'mailto:hey@joshgorospe.dev' },
    ]);

    const { result } = renderHook(() => useContactInfo());

    await waitFor(() => expect(result.current).not.toBeNull());

    expect(result.current).toMatchObject({ body: 'Say hi.', ctaLabel: 'hey@joshgorospe.dev' });
    expect(api.get).toHaveBeenCalledWith('/contact');
  });

  it('returns null when the request fails', async () => {
    api.get.mockRejectedValueOnce(new Error('network down'));

    const { result } = renderHook(() => useContactInfo());

    await waitFor(() => expect(api.get).toHaveBeenCalled());
    expect(result.current).toBeNull();
  });
});
