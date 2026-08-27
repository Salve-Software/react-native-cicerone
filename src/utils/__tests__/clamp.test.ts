import { describe, expect, it } from '@jest/globals';
import { clamp } from '@/utils/clamp';

describe('clamp', () => {
  it('Returns the value untouched when it is inside the range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('Lifts a value below the floor', () => {
    expect(clamp(-3, 0, 10)).toBe(0);
  });

  it('Caps a value above the ceiling', () => {
    expect(clamp(42, 0, 10)).toBe(10);
  });
});
