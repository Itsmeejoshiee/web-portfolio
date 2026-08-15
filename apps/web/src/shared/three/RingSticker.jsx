import { useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { edgesToXY } from './layout';
import { buildRingShape } from './shapeGeometry';

// A static ring/annulus sticker (source: `border: Npx solid <color>;
// border-radius: 50%`, no ink outline, no animation).
export function RingSticker({ diameter, strokeWidth, color, shadowColor = '#000000', shadowOpacity = 0.4, shadowOffset = [8, -8], edges }) {
  const { size } = useThree();
  const [x, y] = useMemo(() => edgesToXY(size, edges, diameter, diameter), [size, edges, diameter]);
  const geometry = useMemo(() => new THREE.ShapeGeometry(buildRingShape(diameter, strokeWidth)), [diameter, strokeWidth]);

  return (
    <group position={[x, y, 0]}>
      <mesh geometry={geometry} position={[shadowOffset[0], shadowOffset[1], -0.1]}>
        <meshBasicMaterial color={shadowColor} transparent opacity={shadowOpacity} />
      </mesh>
      <mesh geometry={geometry}>
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}
