import { useApiResourceWithFallbackLogging } from './useApiResourceWithFallbackLogging';

export function useExperience() {
  const { data } = useApiResourceWithFallbackLogging('/experience', 'experience entries');
  return data;
}
