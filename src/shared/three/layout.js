function resolveEdge(value, containerDimension) {
  if (typeof value === 'string' && value.endsWith('%')) {
    return (parseFloat(value) / 100) * containerDimension;
  }
  return value;
}

// Converts CSS-style absolute-position edges (top/right/bottom/left, px or %)
// into a three.js [x, y] centered on an origin-center, y-up orthographic scene
// sized to match the container's pixel dimensions.
export function edgesToXY({ width, height }, edges, shapeWidth, shapeHeight) {
  const top = edges.top !== undefined ? resolveEdge(edges.top, height) : undefined;
  const bottom = edges.bottom !== undefined ? resolveEdge(edges.bottom, height) : undefined;
  const left = edges.left !== undefined ? resolveEdge(edges.left, width) : undefined;
  const right = edges.right !== undefined ? resolveEdge(edges.right, width) : undefined;

  const topEdge = top !== undefined ? top : height - bottom - shapeHeight;
  const leftEdge = left !== undefined ? left : width - right - shapeWidth;

  const x = leftEdge + shapeWidth / 2 - width / 2;
  const y = height / 2 - (topEdge + shapeHeight / 2);

  return [x, y];
}
