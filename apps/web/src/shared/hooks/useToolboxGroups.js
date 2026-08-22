import { useApiResourceWithFallbackLogging } from './useApiResourceWithFallbackLogging';

export function useToolboxGroups() {
  const { data } = useApiResourceWithFallbackLogging('/toolbox-groups', 'toolbox groups');
  return data;
}
