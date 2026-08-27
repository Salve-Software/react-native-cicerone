import type { ICiceroneOverlayProps } from '@/components/CiceroneOverlay/types';
import { describe, expect, it, jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-native';
import { CICERONE, DEFAULT_THEME } from '@/constants';
import { useCiceroneOverlayViewModel } from '@/components/CiceroneOverlay/hooks/useCiceroneOverlayViewModel';

const mountProps = (
  overrides: Partial<ICiceroneOverlayProps> = {},
): ICiceroneOverlayProps => ({
  geometry: {
    hole: { x: 10, y: 20, width: 100, height: 50 },
    holeRadius: 12,
    ring: { x: 5, y: 15, width: 110, height: 60 },
    ringRadius: 18,
  },
  step: { id: 'reticle', title: 'Scan in bulk', text: '...' },
  index: 0,
  total: 3,
  isFirst: true,
  isLast: false,
  isExiting: false,
  next: jest.fn(),
  previous: jest.fn(),
  skip: jest.fn(),
  stop: jest.fn(),
  options: { children: null, steps: [] },
  ...overrides,
});

describe('useCiceroneOverlayViewModel', () => {
  describe('theme', () => {
    it('Falls back to the shipped palette when nothing is overridden', async () => {
      const { result } = await renderHook(() =>
        useCiceroneOverlayViewModel(mountProps()),
      );

      expect(result.current.theme.ring).toBe(DEFAULT_THEME.ring);
    });

    it('Merges a partial card palette instead of replacing it wholesale', async () => {
      const { result } = await renderHook(() =>
        useCiceroneOverlayViewModel(
          mountProps({
            options: {
              children: null,
              steps: [],
              theme: { card: { title: '#ff0000' } },
            },
          }),
        ),
      );

      expect(result.current.theme.card.title).toBe('#ff0000');
      expect(result.current.theme.card.buttonBackground).toBe(
        DEFAULT_THEME.card.buttonBackground,
      );
    });
  });

  describe('palette', () => {
    it('Serves the default palette to a default step', async () => {
      const { result } = await renderHook(() =>
        useCiceroneOverlayViewModel(mountProps()),
      );

      expect(result.current.palette).toEqual(DEFAULT_THEME.card);
      expect(result.current.isHighlight).toBe(false);
    });

    it('Swaps to the highlight palette for a highlight step', async () => {
      const { result } = await renderHook(() =>
        useCiceroneOverlayViewModel(
          mountProps({ step: { id: 'x', title: 'y', text: 'z', variant: 'highlight' } }),
        ),
      );

      expect(result.current.palette).toEqual(DEFAULT_THEME.highlight);
      expect(result.current.isHighlight).toBe(true);
    });
  });

  describe('onOverlayPress', () => {
    it('Advances the tour by default, like the prototype', async () => {
      const next = jest.fn();
      const { result } = await renderHook(() =>
        useCiceroneOverlayViewModel(mountProps({ next })),
      );

      result.current.onOverlayPress();

      expect(next).toHaveBeenCalledTimes(1);
    });

    it('Skips the tour when the overlay is configured to skip', async () => {
      const next = jest.fn();
      const skip = jest.fn();
      const { result } = await renderHook(() =>
        useCiceroneOverlayViewModel(
          mountProps({
            next,
            skip,
            options: { children: null, steps: [], overlayPress: 'skip' },
          }),
        ),
      );

      result.current.onOverlayPress();

      expect(skip).toHaveBeenCalledTimes(1);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('cardWidth', () => {
    it('Uses the prototype width unless the consumer overrides it', async () => {
      const { result } = await renderHook(() =>
        useCiceroneOverlayViewModel(mountProps()),
      );

      expect(result.current.cardWidth).toBe(CICERONE.cardWidth);
    });

    it('Honours an explicit card width', async () => {
      const { result } = await renderHook(() =>
        useCiceroneOverlayViewModel(
          mountProps({ options: { children: null, steps: [], cardWidth: 320 } }),
        ),
      );

      expect(result.current.cardWidth).toBe(320);
    });
  });
});
