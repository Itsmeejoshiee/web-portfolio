import { useEffect, useState } from 'react';
import { api } from '../api/apiClient';

// Shared fetch-on-mount shape used by every simple read hook (blog posts, a single
// blog post by id, toolbox groups, ...). Re-fetches whenever `path` changes, and
// exposes `setData` so a caller that also mutates (e.g. after a PATCH) can update
// local state without a second round-trip. A falsy `path` (e.g. no id yet, as in a
// "create new" form) skips the fetch entirely rather than requesting a bad URL.
export function useApiResource(path) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!path) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reflects the skipped fetch
      setLoading(false);
      return;
    }
    let alive = true;
    setLoading(true);
    setError(null);
    api
      .get(path)
      .then((result) => {
        if (alive) setData(result);
      })
      .catch((err) => {
        if (alive) setError(err);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [path]);

  return { data, setData, loading, error };
}
