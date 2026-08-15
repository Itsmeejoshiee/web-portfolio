import { useCallback, useState } from 'react';
import { adminApi } from '../api/adminApiClient';

export function useResourceMutations(resourceKey) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const create = useCallback(
    async (values) => {
      setSubmitting(true);
      setError(null);
      try {
        return await adminApi.post(`/${resourceKey}`, values);
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setSubmitting(false);
      }
    },
    [resourceKey],
  );

  const update = useCallback(
    async (id, values) => {
      setSubmitting(true);
      setError(null);
      try {
        return await adminApi.patch(`/${resourceKey}/${id}`, values);
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setSubmitting(false);
      }
    },
    [resourceKey],
  );

  const remove = useCallback(
    async (id) => {
      setSubmitting(true);
      setError(null);
      try {
        return await adminApi.remove(`/${resourceKey}/${id}`);
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setSubmitting(false);
      }
    },
    [resourceKey],
  );

  return { create, update, remove, submitting, error };
}
