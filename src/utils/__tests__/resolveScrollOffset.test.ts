import type { ICiceroneRect } from '@/types';
import { describe, expect, it } from '@jest/globals';
import { resolveScrollOffset } from '@/utils/resolveScrollOffset';

const viewport: ICiceroneRect = { x: 0, y: 100, width: 400, height: 600 };

describe('resolveScrollOffset', () => {
  it('Leaves a comfortably visible target alone', () => {
    const target: ICiceroneRect = { x: 0, y: 300, width: 100, height: 50 };

    expect(resolveScrollOffset(target, viewport, 0, 2000).needsScroll).toBe(false);
  });

  it('Centres a target sitting below the viewport', () => {
    const target: ICiceroneRect = { x: 0, y: 900, width: 100, height: 100 };

    expect(resolveScrollOffset(target, viewport, 0, 2000)).toEqual({
      needsScroll: true,
      offset: 550,
    });
  });

  it('Centres a target sitting above the viewport', () => {
    const target: ICiceroneRect = { x: 0, y: -200, width: 100, height: 100 };

    expect(resolveScrollOffset(target, viewport, 800, 2000)).toEqual({
      needsScroll: true,
      offset: 250,
    });
  });

  it('Scrolls a target that is only partially visible at the bottom edge', () => {
    const target: ICiceroneRect = { x: 0, y: 660, width: 100, height: 60 };

    expect(resolveScrollOffset(target, viewport, 0, 2000).needsScroll).toBe(true);
  });

  it('Never scrolls past the top of the content', () => {
    const target: ICiceroneRect = { x: 0, y: -500, width: 100, height: 50 };

    expect(resolveScrollOffset(target, viewport, 100, 2000).offset).toBe(0);
  });

  it('Never scrolls past the bottom of the content', () => {
    const target: ICiceroneRect = { x: 0, y: 2000, width: 100, height: 50 };

    expect(resolveScrollOffset(target, viewport, 0, 900).offset).toBe(300);
  });

  it('Reports no scroll when the target is off-screen but the content cannot move', () => {
    const target: ICiceroneRect = { x: 0, y: 900, width: 100, height: 50 };

    expect(resolveScrollOffset(target, viewport, 0, 600).needsScroll).toBe(false);
  });

  it('Treats a target inside the margin band as not visible', () => {
    const target: ICiceroneRect = { x: 0, y: 110, width: 100, height: 50 };

    expect(resolveScrollOffset(target, viewport, 500, 2000).needsScroll).toBe(true);
  });
});
