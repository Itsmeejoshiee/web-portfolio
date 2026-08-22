import { useApiResourceWithFallbackLogging } from './useApiResourceWithFallbackLogging';

export function useContactInfo() {
  const { data } = useApiResourceWithFallbackLogging('/contact', 'contact info');
  return data?.[0] ?? null;
}
