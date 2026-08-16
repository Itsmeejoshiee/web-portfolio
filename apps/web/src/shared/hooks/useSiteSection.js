import { useEffect, useState } from 'react';
import { api } from '../api/apiClient';

// Several components on the same page (e.g. Hero, Contact, Toolbox intro on the home
// page) each need one row from the same small /site-sections list. This shares a single
// in-flight request across all of them instead of firing one GET per component.
let sectionsPromise = null;

function fetchSections() {
  if (!sectionsPromise) {
    sectionsPromise = api.get('/site-sections').catch((err) => {
      sectionsPromise = null;
      throw err;
    });
  }
  return sectionsPromise;
}

export function useSiteSection(key) {
  const [section, setSection] = useState(null);

  useEffect(() => {
    fetchSections()
      .then((sections) => {
        setSection(sections.find((s) => s.section === key) ?? null);
      })
      .catch((err) => {
        // Falls back to the component's hardcoded placeholder copy — logged so an API
        // outage or bad VITE_API_URL doesn't look like intentional content forever.
        console.error(`Failed to load site section "${key}":`, err);
      });
  }, [key]);

  return section;
}
