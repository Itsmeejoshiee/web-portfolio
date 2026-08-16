import { useEffect, useState } from 'react';
import { api } from '../api/apiClient';

export function useToolboxGroups() {
  const [groups, setGroups] = useState(null);

  useEffect(() => {
    api
      .get('/toolbox-groups')
      .then(setGroups)
      .catch((err) => {
        // Falls back to each category's hardcoded skill list — logged so an API outage
        // or bad VITE_API_URL doesn't look like intentional content forever.
        console.error('Failed to load toolbox groups:', err);
      });
  }, []);

  return groups;
}
