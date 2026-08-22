import { useApiResource } from '../../../shared/hooks/useApiResource';

export function useProjects() {
  const { data: projects, loading, error } = useApiResource('/projects');
  return { projects, loading, error };
}
