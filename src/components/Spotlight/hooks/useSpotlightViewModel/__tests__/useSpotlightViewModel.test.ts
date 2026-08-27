import type { ISpotlightProps } from '@/components/Spotlight/types';
import { describe, expect, it, jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-native';
import { Dimensions } from 'react-native';
import { DEFAULT_THEME } from '@/constants';
import { useSpotlightViewModel } from '@/components/Spotlight/hooks/useSpotlightViewModel';

const mountProps = (overrides: Partial<ISpotlightProps> = {}): ISpotlightProps => ({
  geometry: {
    hole: { x: 10, y: 20, width: 100, height: 50 },
    holeRadius: 12,
    ring: { x: 5, y: 15, width: 110, height: 60 },
    ringRadius: 18,
  },
  theme: DEFAULT_THEME,
  isHighlight: false,
  isExiting: false,
  overlayPress: 'next',
  allowTargetInteraction: false,
  onPress: jest.fn(),
  ...overrides,
});

describe('useSpotlightViewModel', () => {
  describe('handlePress', () => {
    it('Forwards the press when the overlay reacts', async () => {
      const onPress = jest.fn();
      const { result } = await renderHook(() =>
        useSpotlightViewModel(mountProps({ onPress })),
      );

      result.current.handlePress();

      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('Does NOT forward the press when the overlay is inert', async () => {
      const onPress = jest.fn();
      const { result } = await renderHook(() =>
        useSpotlightViewModel(mountProps({ onPress, overlayPress: 'none' })),
      );

      result.current.handlePress();

      expect(onPress).not.toHaveBeenCalled();
    });
  });

  describe('isPressable', () => {
    it('Is false only for the inert overlay', async () => {
      const { result } = await renderHook(() =>
        useSpotlightViewModel(mountProps({ overlayPress: 'none' })),
      );

      expect(result.current.isPressable).toBe(false);
    });

    it('Is true when the overlay skips on press', async () => {
      const { result } = await renderHook(() =>
        useSpotlightViewModel(mountProps({ overlayPress: 'skip' })),
      );

      expect(result.current.isPressable).toBe(true);
    });
  });

  describe('usesTouchStrips', () => {
    it('Splits the touch layer only when the target stays interactive', async () => {
      const { result } = await renderHook(() =>
        useSpotlightViewModel(mountProps({ allowTargetInteraction: true })),
      );

      expect(result.current.usesTouchStrips).toBe(true);
    });

    it('Keeps one full-screen layer when the target is not interactive', async () => {
      const { result } = await renderHook(() => useSpotlightViewModel(mountProps()));

      expect(result.current.usesTouchStrips).toBe(false);
    });
  });

  describe('scrimSpread', () => {
    it('Reaches the far screen corner, not just the far edge', async () => {
      const screen = Dimensions.get('window');
      const hole = { x: 20, y: 430, width: 74, height: 74 };
      const holeRadius = 37;
      const { result } = await renderHook(() =>
        useSpotlightViewModel(
          mountProps({ geometry: { ...mountProps().geometry, hole, holeRadius } }),
        ),
      );

      // The outer edge curves, so the arc centre is the hole's own corner centre.
      const needed =
        Math.max(
          Math.hypot(hole.x + holeRadius, hole.y + holeRadius),
          Math.hypot(
            screen.width - (hole.x + hole.width - holeRadius),
            hole.y + holeRadius,
          ),
          Math.hypot(
            hole.x + holeRadius,
            screen.height - (hole.y + hole.height - holeRadius),
          ),
          Math.hypot(
            screen.width - (hole.x + hole.width - holeRadius),
            screen.height - (hole.y + hole.height - holeRadius),
          ),
        ) - holeRadius;

      expect(result.current.scrimSpread).toBeGreaterThanOrEqual(needed);
    });

    it('Reaches every screen edge from the hole, or a corner would stay bright', async () => {
      const screen = Dimensions.get('window');
      const hole = { x: 10, y: 20, width: 100, height: 50 };
      const { result } = await renderHook(() =>
        useSpotlightViewModel(
          mountProps({ geometry: { ...mountProps().geometry, hole } }),
        ),
      );

      const needed = Math.max(
        hole.x,
        screen.width - (hole.x + hole.width),
        hole.y,
        screen.height - (hole.y + hole.height),
      );

      expect(result.current.scrimSpread).toBeGreaterThanOrEqual(needed);
    });

    it('Does NOT stretch to the screen diagonal for a centred hole', async () => {
      const hole = {
        x: Dimensions.get('window').width / 2 - 50,
        y: Dimensions.get('window').height / 2 - 25,
        width: 100,
        height: 50,
      };
      const { result } = await renderHook(() =>
        useSpotlightViewModel(
          mountProps({ geometry: { ...mountProps().geometry, hole } }),
        ),
      );

      expect(result.current.scrimSpread).toBeLessThan(Dimensions.get('window').height);
    });
  });

  describe('touchStrips', () => {
    it('Surrounds the hole without covering it', async () => {
      const hole = { x: 10, y: 20, width: 100, height: 50 };
      const { result } = await renderHook(() =>
        useSpotlightViewModel(
          mountProps({ geometry: { ...mountProps().geometry, hole } }),
        ),
      );
      const { top, bottom, left, right } = result.current.touchStrips;

      expect(top.height).toBe(hole.y);
      expect(bottom.top).toBe(hole.y + hole.height);
      expect(left.width).toBe(hole.x);
      expect(right.left).toBe(hole.x + hole.width);
    });

    it('Clamps to zero for a hole hanging off the top left', async () => {
      const hole = { x: -30, y: -40, width: 100, height: 50 };
      const { result } = await renderHook(() =>
        useSpotlightViewModel(
          mountProps({ geometry: { ...mountProps().geometry, hole } }),
        ),
      );

      expect(result.current.touchStrips.top.height).toBe(0);
      expect(result.current.touchStrips.left.width).toBe(0);
    });
  });
});
