import { useEffect, useState } from 'react';
import { api } from '../../../shared/api/apiClient';

export function useBlogPost(id) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- resets state before fetching a new id
    setLoading(true);
    setError(null);
    api
      .get(`/blog-posts/${id}`)
      .then(setPost)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [id]);

  return { post, loading, error };
}
