import { useEffect } from 'react';
import { useApiResource } from './useApiResource';

export function useToolboxGroups() {
  const { data: groups, error } = useApiResource('/toolbox-groups');

  useEffect(() => {
    // Falls back to each category's hardcoded skill list — logged so an API outage
    // or bad VITE_API_URL doesn't look like intentional content forever.
    if (error) console.error('Failed to load toolbox groups:', error);
  }, [error]);

  return groups;
}
