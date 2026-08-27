import { describe, expect, it } from '@jest/globals';
import { mountHolePath } from '@/utils/mountHolePath';

const hole = { x: 100, y: 200, width: 80, height: 40 };

describe('mountHolePath', () => {
  it('Opens with the full screen, which even-odd then punches through', () => {
    expect(mountHolePath(hole, 10, 400, 800)).toMatch(/^M0,0 H400 V800 H0 Z /);
  });

  it('Draws four arcs, one per rounded corner', () => {
    const arcs = mountHolePath(hole, 10, 400, 800).match(/A10,10/g);

    expect(arcs).toHaveLength(4);
  });

  it('Clamps the radius to half the shortest side, so the arcs cannot cross', () => {
    expect(mountHolePath(hole, 999, 400, 800)).toContain('A20,20');
  });

  it('Never emits a negative radius for a collapsed hole', () => {
    expect(mountHolePath({ ...hole, width: 0, height: 0 }, 10, 400, 800)).toContain(
      'A0,0',
    );
  });

  it('Places the hole where the geometry says', () => {
    const path = mountHolePath(hole, 0, 400, 800);

    expect(path).toContain('M100,200');
    expect(path).toContain('H180');
  });
});
