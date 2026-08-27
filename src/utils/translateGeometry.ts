import type { ICiceroneGeometry, ICiceroneRect } from '@/types';

const shift = (rect: ICiceroneRect, x: number, y: number): ICiceroneRect => ({
  ...rect,
  x: rect.x - x,
  y: rect.y - y,
});

/**
 * Targets are measured in window coordinates, but the overlay is only absolute
 * within whatever contains the provider. Anything short of the window origin —
 * a header, a sheet, Storybook's chrome — offsets every hole by that much.
 */
export const translateGeometry = (
  geometry: ICiceroneGeometry,
  origin: { x: number; y: number },
): ICiceroneGeometry => {
  if (origin.x === 0 && origin.y === 0) return geometry;

  return {
    ...geometry,
    hole: shift(geometry.hole, origin.x, origin.y),
    ring: shift(geometry.ring, origin.x, origin.y),
  };
};
