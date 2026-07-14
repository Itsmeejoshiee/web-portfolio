import { useClampPx } from '../three/clampPx';
import { CONTACT_BLOB_RADII, ORGANIC_BLOB_RADII } from '../three/radii';
import { StickerCanvas } from '../three/StickerCanvas';
import { StickerShape } from '../three/StickerShape';

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

function ContactBlob({ accent }) {
  const size = useClampPx(72, 9, 120);
  const right = useClampPx(8, 12, 180);

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
