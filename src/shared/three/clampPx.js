import { useEffect, useState } from 'react';

function computeClamp(minPx, vw, maxPx) {
  const vwPx = (window.innerWidth * vw) / 100;
  return Math.min(maxPx, Math.max(minPx, vwPx));
}

// Mirrors CSS clamp(minPx, Xvw, maxPx) reactively, since the sticker sizes in
// the source design are viewport-relative rather than container-relative.
export function useClampPx(minPx, vw, maxPx) {
  const [px, setPx] = useState(() => computeClamp(minPx, vw, maxPx));

  useEffect(() => {
    const onResize = () => setPx(computeClamp(minPx, vw, maxPx));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [minPx, vw, maxPx]);

  return px;
}
