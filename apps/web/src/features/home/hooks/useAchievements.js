import { useApiResource } from '../../../shared/hooks/useApiResource';

export function useAchievements() {
  const { data: achievements, loading, error } = useApiResource('/achievements');
  return { achievements, loading, error };
}
