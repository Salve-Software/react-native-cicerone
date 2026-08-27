import type { ICiceroneRect } from '@/types';
import { describe, expect, it } from '@jest/globals';
import { CICERONE } from '@/constants';
import { resolveGeometry } from '@/utils/resolveGeometry';

const target: ICiceroneRect = { x: 100, y: 200, width: 80, height: 40 };

describe('resolveGeometry', () => {
  it('Keeps the hole tight to the target and pushes the ring out by the padding', () => {
    const { hole, ring } = resolveGeometry(target, { padding: 10 });

    expect(hole).toEqual(target);
    expect(ring).toEqual({ x: 90, y: 190, width: 100, height: 60 });
  });

  it('Floors both radii so a square target does not become a hard box', () => {
    const { holeRadius, ringRadius } = resolveGeometry(target, { padding: 0, radius: 0 });

    expect(holeRadius).toBe(CICERONE.minHoleRadius);
    expect(ringRadius).toBe(CICERONE.minRingRadius);
  });

  it('Derives the ring radius from the target radius plus the padding', () => {
    const { holeRadius, ringRadius } = resolveGeometry(target, {
      padding: 6,
      radius: 28,
    });

    expect(holeRadius).toBe(27);
    expect(ringRadius).toBe(34);
  });

  it('Rounds each rect by its own shortest side when the step asks for a circle', () => {
    const square: ICiceroneRect = { x: 0, y: 0, width: 60, height: 60 };
    const { holeRadius, ringRadius } = resolveGeometry(square, {
      padding: 5,
      radius: 'circle',
    });

    expect(holeRadius).toBe(30);
    expect(ringRadius).toBe(35);
  });

  it('Falls back to the default padding when the step omits it', () => {
    const { ring } = resolveGeometry(target, {});

    expect(ring.width).toBe(target.width + CICERONE.stepPadding * 2);
  });
});
