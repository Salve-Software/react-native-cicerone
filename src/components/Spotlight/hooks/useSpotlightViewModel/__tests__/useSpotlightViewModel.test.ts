import type { ISpotlightProps } from '@/components/Spotlight/types';
import { describe, expect, it, jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-native';
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
  screen: { width: 400, height: 800 },
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

  describe('touchStrips', () => {
    it('Measures against the overlay box, not the window it may be nested in', async () => {
      const hole = { x: 10, y: 20, width: 100, height: 50 };
      const { result } = await renderHook(() =>
        useSpotlightViewModel(
          mountProps({
            geometry: { ...mountProps().geometry, hole },
            screen: { width: 300, height: 400 },
          }),
        ),
      );

      expect(result.current.touchStrips.bottom.height).toBe(400 - hole.y - hole.height);
      expect(result.current.touchStrips.right.width).toBe(300 - hole.x - hole.width);
    });

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
