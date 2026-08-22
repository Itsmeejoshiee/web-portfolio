import { useEffect } from 'react';
import { useApiResource } from './useApiResource';

// Shared by every hook that has a hardcoded placeholder to fall back to (contact info,
// experience entries, toolbox groups, ...): fetch `path`, and log rather than throw
// when it fails, so an API outage or bad VITE_API_URL doesn't look like intentional
// content forever — the caller's fallback copy just stays on screen instead.
export function useApiResourceWithFallbackLogging(path, label) {
  const { data, error } = useApiResource(path);

  useEffect(() => {
    if (error) console.error(`Failed to load ${label}:`, error);
  }, [error, label]);

  return { data, error };
}
