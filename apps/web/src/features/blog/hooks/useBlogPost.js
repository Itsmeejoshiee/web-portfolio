import { useApiResource } from '../../../shared/hooks/useApiResource';

export function useBlogPost(id) {
  const { data: post, loading, error } = useApiResource(`/blog-posts/${id}`);
  return { post, loading, error };
}
