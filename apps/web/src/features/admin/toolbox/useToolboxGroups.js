import { useCallback, useEffect, useState } from 'react';
import { adminApi } from '../api/adminApiClient';

export function useAdminToolboxGroups() {
  const [groups, setGroups] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savingId, setSavingId] = useState(null);
  const [saveError, setSaveError] = useState(null);

  const refresh = useCallback(() => {
    setLoading(true);
    setError(null);
    adminApi
      .get('/toolbox-groups')
      .then(setGroups)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- refresh() fetches the groups on mount
    refresh();
  }, [refresh]);

  const saveItems = useCallback(async (id, items) => {
    setSavingId(id);
    setSaveError(null);
    try {
      const updated = await adminApi.patch(`/toolbox-groups/${id}`, { items });
      setGroups((prev) => prev.map((group) => (group.id === id ? updated : group)));
    } catch (err) {
      setSaveError(err);
    } finally {
      setSavingId(null);
    }
  }, []);

  return { groups, loading, error, savingId, saveError, saveItems };
}
