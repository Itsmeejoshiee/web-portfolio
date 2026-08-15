import { StudioComingSoon } from './StudioComingSoon';
import { StudioLive } from './StudioLive';

// Studio hasn't launched yet — flip to true once Haraya Labs goes live.
const STUDIO_LIVE = false;

export function StudioSection() {
  return STUDIO_LIVE ? <StudioLive /> : <StudioComingSoon />;
}
