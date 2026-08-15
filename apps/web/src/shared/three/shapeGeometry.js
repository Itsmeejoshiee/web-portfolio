import * as THREE from 'three';

export function buildRectShape(width, height, radius = 0) {
  const w = width / 2;
  const h = height / 2;
  const r = Math.min(radius, w, h);

  const shape = new THREE.Shape();
  shape.moveTo(-w + r, h);
  shape.lineTo(w - r, h);
  shape.quadraticCurveTo(w, h, w, h - r);
  shape.lineTo(w, -h + r);
  shape.quadraticCurveTo(w, -h, w - r, -h);
  shape.lineTo(-w + r, -h);
  shape.quadraticCurveTo(-w, -h, -w, -h + r);
  shape.lineTo(-w, h - r);
  shape.quadraticCurveTo(-w, h, -w + r, h);
  return shape;
}

export function buildPillShape(width, height) {
  return buildRectShape(width, height, Math.min(width, height) / 2);
}

export function buildCircleShape(diameter) {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, diameter / 2, 0, Math.PI * 2, false);
  return shape;
}

// radii: [topLeftX, topRightX, bottomRightX, bottomLeftX, topLeftY, topRightY, bottomRightY, bottomLeftY]
// as fractions (0..1) of width/height per corner — mirrors the CSS
// `border-radius: h1 h2 h3 h4 / v1 v2 v3 v4` elliptical-corner syntax.
export function buildOrganicShape(width, height, radii) {
  const w = width / 2;
  const h = height / 2;
  const [tlXp, trXp, brXp, blXp, tlYp, trYp, brYp, blYp] = radii;
  const tlX = tlXp * width;
  const trX = trXp * width;
  const brX = brXp * width;
  const blX = blXp * width;
  const tlY = tlYp * height;
  const trY = trYp * height;
  const brY = brYp * height;
  const blY = blYp * height;

  const shape = new THREE.Shape();
  shape.moveTo(-w + tlX, h);
  shape.lineTo(w - trX, h);
  shape.quadraticCurveTo(w, h, w, h - trY);
  shape.lineTo(w, -h + brY);
  shape.quadraticCurveTo(w, -h, w - brX, -h);
  shape.lineTo(-w + blX, -h);
  shape.quadraticCurveTo(-w, -h, -w, -h + blY);
  shape.lineTo(-w, h - tlY);
  shape.quadraticCurveTo(-w, h, -w + tlX, h);
  return shape;
}

export function buildRingShape(diameter, strokeWidth) {
  const outerR = diameter / 2;
  const innerR = Math.max(outerR - strokeWidth, 0);

  const shape = new THREE.Shape();
  shape.absarc(0, 0, outerR, 0, Math.PI * 2, false);

  const hole = new THREE.Path();
  hole.absarc(0, 0, innerR, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  return shape;
}
