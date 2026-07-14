import { useEffect, useState } from 'react';

// Same 640px cutoff as Nav's `sm` collapse, so "mobile mode" means one
// consistent thing across the nav and the decorative sticker layer.
export function useIsMobile(breakpoint = 640) {
  const query = `(max-width: ${breakpoint - 1}px)`;
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return isMobile;
}
