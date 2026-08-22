import { useApiResource } from '../../../shared/hooks/useApiResource';

export function useBlogPost(id) {
  const { data: post, loading, error } = useApiResource(id ? `/blog-posts/${id}` : null);
  return { post, loading, error };
}
