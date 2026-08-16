import { useEffect, useState } from 'react';
import { api } from '../../../shared/api/apiClient';

export function useBlogPosts() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get('/blog-posts')
      .then(setPosts)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading, error };
}
