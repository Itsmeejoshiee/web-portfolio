import { useState } from 'react';
import { useClampPx } from '../three/clampPx';
import { CONTACT_BLOB_RADII, ORGANIC_BLOB_RADII } from '../three/radii';
import { useIsMobile } from '../hooks/useIsMobile';
import { StickerCanvas } from '../three/StickerCanvas';
import { StickerShape } from '../three/StickerShape';

// Desktop-only — on mobile, HeroSection renders HeroNameAccent/HeroButtonsAccent
// inline with specific text lines instead (see HeroSection.jsx), since a full
// overlay cluster has no viewport-relative position that stays clear of
// full-width mobile text.
function HeroBlobs({ accent, accentTint, swatchC, swatchD }) {
  const shape1 = useClampPx(140, 18, 260);
  const shape2 = useClampPx(70, 9, 120);
  const shape3Width = useClampPx(52, 7, 90);
  const shape3Height = useClampPx(110, 14, 190);
  const shape4 = useClampPx(40, 5, 70);
  const shape5 = useClampPx(18, 2.4, 32);
  const shape6 = useClampPx(20, 2.6, 36);

  return (
    <>
      <StickerShape
        kind="blob"
        width={shape1}
        height={shape1}
        radii={ORGANIC_BLOB_RADII}
        fill={accent}
        edges={{ top: '8%', right: '6%' }}
        anim={{ type: 'wobble', duration: 8, delay: 0 }}
      />
      <StickerShape
        kind="circle"
        width={shape2}
        height={shape2}
        fill={accentTint}
        edges={{ top: '64%', right: '20%' }}
        anim={{ type: 'float', duration: 9, delay: 0.8 }}
      />
      <StickerShape
        kind="pill"
        width={shape3Width}
        height={shape3Height}
        fill={swatchC}
        edges={{ top: '20%', right: '30%' }}
        anim={{ type: 'float', duration: 8, delay: 1.6 }}
      />
      <StickerShape
        kind="square"
        width={shape4}
        height={shape4}
        fill={swatchD}
        edges={{ top: '52%', right: '11%' }}
        anim={{ type: 'wobble', duration: 10, delay: 1 }}
      />
      <StickerShape
        kind="circle"
        width={shape5}
        height={shape5}
        fill={swatchD}
        edges={{ top: '47%', right: '23%' }}
        anim={{ type: 'float', duration: 7, delay: 0.4 }}
      />
      <StickerShape
        kind="circle"
        width={shape6}
        height={shape6}
        fill={accent}
        edges={{ top: '55%', right: '26%' }}
        anim={{ type: 'wobble', duration: 9, delay: 1.3 }}
      />
    </>
  );
}

// Small fixed-size decorative accent groups for mobile, meant to sit inline
// next to a specific short/stable line of text (see HeroSection.jsx) rather
// than overlay the whole header. Box size never changes with viewport, so —
// unlike the full cluster — geometry only needs verifying once, not per
// breakpoint. Every slot always renders (3 for the name line, 2 for the
// buttons row); only kind/color/movement are randomized. Each slot's `top`
// offset is >= FLOAT_LIFT (the larger of StickerShape.jsx's
// WOBBLE_LIFT/FLOAT_LIFT) so it can't clip regardless of which animation it's
// randomly given, and slots are spaced to clear even if every one of them
// randomly becomes the widest kind (square) — see the accompanying collision
// math used to pick these numbers.
const ACCENT_KINDS = ['circle', 'square', 'blob'];
const ACCENT_ANIMS = ['float', 'wobble'];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Randomizes shape kind, color, and movement for each slot — once per mount,
// not per render, so the shapes don't jump around on every re-render.
function useAccentConfig(slots, colors) {
  const [config] = useState(() => {
    const palette = shuffle(colors);
    return slots.map((slot, i) => ({
      ...slot,
      kind: ACCENT_KINDS[Math.floor(Math.random() * ACCENT_KINDS.length)],
      fill: palette[i % palette.length],
      anim: {
        type: ACCENT_ANIMS[Math.floor(Math.random() * ACCENT_ANIMS.length)],
        duration: 5 + Math.random() * 4,
        delay: Math.random() * 1.5,
      },
    }));
  });
  return config;
}

function AccentBox({ boxWidth, boxHeight, shapes }) {
  return (
    <div className="relative flex-none" style={{ width: boxWidth, height: boxHeight }} aria-hidden="true">
      <StickerCanvas>
        {shapes.map((s, i) => (
          <StickerShape
            key={i}
            kind={s.kind}
            width={s.size}
            height={s.size}
            radii={s.kind === 'blob' ? ORGANIC_BLOB_RADII : undefined}
            fill={s.fill}
            edges={{ top: s.top, left: s.left }}
            anim={s.anim}
          />
        ))}
      </StickerCanvas>
    </div>
  );
}

const NAME_ACCENT_SLOTS = [
  { size: 26, top: 17, left: 4 },
  { size: 16, top: 17, left: 50 },
  { size: 13, top: 17, left: 82 },
];
const BUTTONS_ACCENT_SLOTS = [
  { size: 24, top: 17, left: 4 },
  { size: 13, top: 17, left: 46 },
];

export function HeroNameAccent({ accent, accentTint, swatchC, swatchD }) {
  const shapes = useAccentConfig(NAME_ACCENT_SLOTS, [accent, accentTint, swatchC, swatchD]);
  return <AccentBox boxWidth={100} boxHeight={56} shapes={shapes} />;
}

export function HeroButtonsAccent({ accent, accentTint, swatchC, swatchD }) {
  const shapes = useAccentConfig(BUTTONS_ACCENT_SLOTS, [accent, accentTint, swatchC, swatchD]);
  return <AccentBox boxWidth={66} boxHeight={46} shapes={shapes} />;
}

function ContactBlob({ accent }) {
  const isMobile = useIsMobile();
  const size = useClampPx(isMobile ? 56 : 72, isMobile ? 9 : 9, isMobile ? 90 : 120);
  const right = useClampPx(8, 12, isMobile ? 100 : 180);

  return (
    <StickerShape
      kind="blob"
      width={size}
      height={size}
      radii={CONTACT_BLOB_RADII}
      fill={accent}
      edges={{ top: 60, right }}
      anim={{ type: 'wobble', duration: 8, delay: 0 }}
    />
  );
}

export function BlobCluster({ placement, accent, accentTint, swatchC, swatchD }) {
  return (
    <StickerCanvas>
      {placement === 'contact' ? (
        <ContactBlob accent={accent} />
      ) : (
        <HeroBlobs accent={accent} accentTint={accentTint} swatchC={swatchC} swatchD={swatchD} />
      )}
    </StickerCanvas>
  );
}
