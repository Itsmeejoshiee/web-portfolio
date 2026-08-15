import { useCallback, useEffect, useState } from 'react';
import { adminApi } from '../api/adminApiClient';

export function useResourceList(resourceKey) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(() => {
    setLoading(true);
    setError(null);
    adminApi
      .get(`/${resourceKey}`)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [resourceKey]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- refresh() fetches the list on mount
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}
