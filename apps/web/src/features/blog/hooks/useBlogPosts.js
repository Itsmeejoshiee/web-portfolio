import { useApiResource } from '../../../shared/hooks/useApiResource';

export function useBlogPosts() {
  const { data: posts, loading, error } = useApiResource('/blog-posts');
  return { posts, loading, error };
}
