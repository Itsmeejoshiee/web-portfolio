import { useClampPx } from '../../../shared/three/clampPx';
import { THREE_COLORS } from '../../../shared/three/colors';
import { ORGANIC_BLOB_RADII } from '../../../shared/three/radii';
import { useIsMobile } from '../../../shared/hooks/useIsMobile';
import { RingSticker } from '../../../shared/three/RingSticker';
import { StickerCanvas } from '../../../shared/three/StickerCanvas';
import { StickerShape } from '../../../shared/three/StickerShape';

const SHADOW_BLACK = { shadowColor: '#000000', shadowOpacity: 0.4 };

// Below 640px the corner-bleed blob/ring sit closer together relative to a
// narrow section, and the square sticker crowds the centered text — so
// mobile shrinks the two corner shapes and drops the square entirely.
function StudioShapes() {
  const isMobile = useIsMobile();
  const blobSize = useClampPx(isMobile ? 140 : 200, 26, isMobile ? 220 : 380);
  const ringSize = useClampPx(isMobile ? 80 : 120, 14, isMobile ? 140 : 200);
  const squareSize = useClampPx(40, 5, 70);

  return (
    <>
      <StickerShape
        kind="blob"
        width={blobSize}
        height={blobSize}
        radii={ORGANIC_BLOB_RADII}
        fill={THREE_COLORS.accent}
        showBorder={false}
        shadowOffset={[10, -10]}
        {...SHADOW_BLACK}
        edges={{ top: -60, right: -40 }}
        anim={{ type: 'wobble', duration: 10, delay: 0 }}
      />
      <RingSticker
        diameter={ringSize}
        strokeWidth={28}
        color={THREE_COLORS.periwinkle}
        shadowOffset={[8, -8]}
        {...SHADOW_BLACK}
        edges={{ bottom: -80, left: '8%' }}
      />
      {isMobile ? null : (
        <StickerShape
          kind="square"
          width={squareSize}
          height={squareSize}
          fill={THREE_COLORS.mintBg}
          showBorder={false}
          shadowOffset={[5, -5]}
          {...SHADOW_BLACK}
          edges={{ top: '20%', left: '14%' }}
          anim={{ type: 'float', duration: 9, delay: 1 }}
        />
      )}
    </>
  );
}

export function StudioComingSoon() {
  return (
    <section id="studio" className="relative overflow-hidden bg-ink text-paper">
      <StickerCanvas>
        <StudioShapes />
      </StickerCanvas>
      <div className="relative mx-auto max-w-[1160px] px-6 py-32 text-center">
        <p className="mb-6 font-mono text-xs tracking-[0.14em] text-faint uppercase">02 · the studio</p>
        <h2 className="mb-4 font-display text-[clamp(44px,6vw,72px)] font-semibold tracking-[-0.01em] text-paper">
          manawari labs<span className="text-accent">.</span>
        </h2>
        <p className="mb-8 text-[17px] text-paper">
          <em className="text-peach italic">manawari</em> — Filipino for <strong>make it happen</strong>.
        </p>
        <p className="font-display text-[clamp(19px,2.2vw,24px)] font-medium text-peach">
          something is taking shape here<span className="text-accent">.</span>
        </p>
      </div>
    </section>
  );
}
