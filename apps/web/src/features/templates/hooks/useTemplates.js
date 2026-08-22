import { useApiResource } from '../../../shared/hooks/useApiResource';

export function useTemplates() {
  const { data: templates, loading, error } = useApiResource('/templates');
  return { templates, loading, error };
}
