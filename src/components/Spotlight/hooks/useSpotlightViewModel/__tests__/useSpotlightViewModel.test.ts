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
    it('Reaches at least the longest screen side, so no corner is left bright', async () => {
      const { result } = await renderHook(() => useSpotlightViewModel(mountProps()));

      expect(result.current.scrimSpread).toBeGreaterThanOrEqual(
        Math.max(result.current.screen.width, result.current.screen.height),
      );
    });
  });
});
