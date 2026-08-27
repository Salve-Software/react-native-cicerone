import type { ICiceroneRect } from '@/types';
import { describe, expect, it } from '@jest/globals';
import { resolvePlacement } from '@/utils/resolvePlacement';

const ring: ICiceroneRect = { x: 100, y: 200, width: 80, height: 40 };

describe('resolvePlacement', () => {
  it('Puts the card below a target sitting in the top half', () => {
    expect(resolvePlacement({ ...ring, y: 100 }, 800)).toBe('bottom');
  });

  it('Puts the card above a target sitting in the bottom half', () => {
    expect(resolvePlacement({ ...ring, y: 600 }, 800)).toBe('top');
  });

  it('Decides by the target centre, not by its top edge', () => {
    const straddling: ICiceroneRect = { x: 0, y: 380, width: 10, height: 200 };

    expect(resolvePlacement(straddling, 800)).toBe('top');
  });

  it('Honours a forced placement over the screen-half rule', () => {
    expect(resolvePlacement({ ...ring, y: 100 }, 800, 'top')).toBe('top');
  });
});
