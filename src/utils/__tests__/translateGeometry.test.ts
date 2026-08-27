import type { ICiceroneGeometry } from '@/types';
import { describe, expect, it } from '@jest/globals';
import { translateGeometry } from '@/utils/translateGeometry';

const geometry: ICiceroneGeometry = {
  hole: { x: 100, y: 200, width: 80, height: 40 },
  holeRadius: 12,
  ring: { x: 90, y: 190, width: 100, height: 60 },
  ringRadius: 18,
};

describe('translateGeometry', () => {
  it('Returns the same object when the overlay sits at the window origin', () => {
    expect(translateGeometry(geometry, { x: 0, y: 0 })).toBe(geometry);
  });

  it('Pulls both rects back by the overlay origin', () => {
    const moved = translateGeometry(geometry, { x: 10, y: 98 });

    expect(moved.hole).toEqual({ x: 90, y: 102, width: 80, height: 40 });
    expect(moved.ring).toEqual({ x: 80, y: 92, width: 100, height: 60 });
  });

  it('Leaves the radii alone, since a shift does not resize anything', () => {
    const moved = translateGeometry(geometry, { x: 10, y: 98 });

    expect(moved.holeRadius).toBe(geometry.holeRadius);
    expect(moved.ringRadius).toBe(geometry.ringRadius);
  });
});
