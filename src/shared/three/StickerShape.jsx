import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { edgesToXY } from './layout';
import { buildCircleShape, buildOrganicShape, buildPillShape, buildRectShape } from './shapeGeometry';

const BORDER_WIDTH = 3;
const WOBBLE_DEG = 6;
const WOBBLE_LIFT = 10;
const FLOAT_LIFT = 14;

function buildShape(kind, width, height, radii) {
  switch (kind) {
    case 'circle':
      return buildCircleShape(Math.min(width, height));
    case 'pill':
      return buildPillShape(width, height);
    case 'blob':
      return buildOrganicShape(width, height, radii);
    case 'square':
    default:
      return buildRectShape(width, height, 0);
  }
}

// Renders one flat "sticker" — a solid box-shadow copy, an ink border copy,
// and the color fill stacked on top — animated the same way the source's
// `dopWobble`/`dopFloat` CSS keyframes drive it. Both keyframes fully replace
// the `transform` property while running, so any static rotation on the
// source shape never actually renders; wobble always swings ±6deg from 0,
// and float never rotates.
export function StickerShape({
  kind,
  width,
  height,
  radii,
  fill,
  showBorder = true,
  borderColor = '#2C2418',
  shadowColor = '#2C2418',
  shadowOpacity = 1,
  shadowOffset = [6, -6],
  edges,
  anim,
}) {
  const groupRef = useRef();
  const { size } = useThree();

  const [x, y] = useMemo(() => edgesToXY(size, edges, width, height), [size, edges, width, height]);

  const fillGeometry = useMemo(() => {
    const inset = showBorder ? BORDER_WIDTH * 2 : 0;
    return new THREE.ShapeGeometry(buildShape(kind, width - inset, height - inset, radii));
  }, [kind, width, height, radii, showBorder]);
  const borderGeometry = useMemo(
    () => new THREE.ShapeGeometry(buildShape(kind, width, height, radii)),
    [kind, width, height, radii],
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    if (!anim) {
      groupRef.current.position.set(x, y, 0);
      return;
    }

    const t = Math.max(clock.getElapsedTime() - (anim.delay || 0), 0);
    const phase = (t / anim.duration) * Math.PI * 2;
    const lift = anim.type === 'wobble' ? WOBBLE_LIFT : FLOAT_LIFT;

    groupRef.current.position.set(x, y + lift * (0.5 - 0.5 * Math.cos(phase)), 0);
    groupRef.current.rotation.z = anim.type === 'wobble' ? THREE.MathUtils.degToRad(WOBBLE_DEG) * Math.sin(phase) : 0;
  });

  return (
    <group ref={groupRef} position={[x, y, 0]}>
      <mesh geometry={borderGeometry} position={[shadowOffset[0], shadowOffset[1], -0.2]}>
        <meshBasicMaterial color={shadowColor} transparent={shadowOpacity < 1} opacity={shadowOpacity} />
      </mesh>
      {showBorder ? (
        <mesh geometry={borderGeometry} position={[0, 0, -0.1]}>
          <meshBasicMaterial color={borderColor} />
        </mesh>
      ) : null}
      <mesh geometry={fillGeometry}>
        <meshBasicMaterial color={fill} />
      </mesh>
    </group>
  );
}
