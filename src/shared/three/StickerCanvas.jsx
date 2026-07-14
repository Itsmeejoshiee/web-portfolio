import { Canvas } from '@react-three/fiber';

const CANVAS_STYLE = { position: 'absolute', inset: 0, pointerEvents: 'none' };

export function StickerCanvas({ children }) {
  return (
    <Canvas
      aria-hidden="true"
      style={CANVAS_STYLE}
      orthographic
      camera={{ position: [0, 0, 100], zoom: 1, near: 0.1, far: 1000 }}
      gl={{ alpha: true }}
    >
      {children}
    </Canvas>
  );
}
