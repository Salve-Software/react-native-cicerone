import { describe, expect, it } from '@jest/globals';
import { resolveCardLayout } from '@/utils/resolveCardLayout';

describe('resolveCardLayout', () => {
  it('Centres the card on the target and anchors its top when placed below', () => {
    const layout = resolveCardLayout(
      { x: 150, y: 200, width: 100, height: 40 },
      'bottom',
      200,
      400,
      800,
    );

    expect(layout.left).toBe(100);
    expect(layout.top).toBe(258);
    expect(layout.bottom).toBeUndefined();
  });

  it('Anchors the bottom when placed above, since the card height is unknown', () => {
    const layout = resolveCardLayout(
      { x: 150, y: 600, width: 100, height: 40 },
      'top',
      200,
      400,
      800,
    );

    expect(layout.bottom).toBe(218);
    expect(layout.top).toBeUndefined();
  });

  it('Points the arrow at the card centre while the card still fits', () => {
    const layout = resolveCardLayout(
      { x: 150, y: 200, width: 100, height: 40 },
      'bottom',
      200,
      400,
      800,
    );

    expect(layout.arrowLeft).toBe(100);
  });

  it('Clamps the card inside the screen margins for a target near the edge', () => {
    const layout = resolveCardLayout(
      { x: 280, y: 200, width: 40, height: 40 },
      'bottom',
      200,
      400,
      800,
    );

    expect(layout.left).toBe(184);
  });

  it('Slides the arrow off the card centre so it keeps pointing at a clamped target', () => {
    const layout = resolveCardLayout(
      { x: 280, y: 200, width: 40, height: 40 },
      'bottom',
      200,
      400,
      800,
    );

    expect(layout.arrowLeft).toBe(116);
  });

  it('Keeps the arrow off the card corner when the target sits past the margin', () => {
    const layout = resolveCardLayout(
      { x: 0, y: 200, width: 40, height: 40 },
      'bottom',
      200,
      400,
      800,
    );

    expect(layout.arrowLeft).toBe(14);
  });
});
