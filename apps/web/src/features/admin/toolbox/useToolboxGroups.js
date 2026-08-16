import { useCallback, useState } from 'react';
import { adminApi } from '../api/adminApiClient';
import { useApiResource } from '../../../shared/hooks/useApiResource';

export function useAdminToolboxGroups() {
  const { data: groups, setData: setGroups, loading, error } = useApiResource('/toolbox-groups');
  const [savingId, setSavingId] = useState(null);
  const [saveError, setSaveError] = useState(null);

  const saveItems = useCallback(
    async (id, items) => {
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
    },
    [setGroups],
  );

  return { groups, loading, error, savingId, saveError, saveItems };
}
