import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return undefined;

    // Wait a frame for the new route's DOM to paint before measuring it.
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);

  return null;
}
