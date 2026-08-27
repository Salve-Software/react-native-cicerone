import type { ITourCardProps } from '@/components/TourCard/types';
import { describe, expect, it, jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-native';
import { DEFAULT_LABELS, DEFAULT_THEME } from '@/constants';
import { useTourCardViewModel } from '@/components/TourCard/hooks/useTourCardViewModel';

const mountProps = (overrides: Partial<ITourCardProps> = {}): ITourCardProps => ({
  step: { id: 'reticle', title: 'Scan in bulk', text: '...' },
  index: 0,
  total: 3,
  isFirst: true,
  isLast: false,
  placement: 'bottom',
  palette: DEFAULT_THEME.card,
  labels: DEFAULT_LABELS,
  layout: { left: 0, top: 0, arrowLeft: 10 },
  width: 284,
  next: jest.fn(),
  previous: jest.fn(),
  skip: jest.fn(),
  stop: jest.fn(),
  ...overrides,
});

describe('useTourCardViewModel', () => {
  describe('label', () => {
    it('Counts the steps when the tour has more than one', async () => {
      const { result } = await renderHook(() =>
        useTourCardViewModel(mountProps({ index: 1, total: 3 })),
      );

      expect(result.current.label).toBe('TIP 2 OF 3');
    });

    it('Drops the counter for a single-step tour', async () => {
      const { result } = await renderHook(() =>
        useTourCardViewModel(mountProps({ total: 1, isLast: true })),
      );

      expect(result.current.label).toBe('TIP');
    });

    it('Prefers an explicit step label over the counter', async () => {
      const { result } = await renderHook(() =>
        useTourCardViewModel(
          mountProps({
            step: { id: 'premium', title: 'x', text: 'y', label: 'ROTUZ PREMIUM' },
          }),
        ),
      );

      expect(result.current.label).toBe('ROTUZ PREMIUM');
    });
  });

  describe('buttonLabel', () => {
    it('Reads "Next" while there are steps left', async () => {
      const { result } = await renderHook(() => useTourCardViewModel(mountProps()));

      expect(result.current.buttonLabel).toBe(DEFAULT_LABELS.next);
    });

    it('Turns into the closing label on the last step', async () => {
      const { result } = await renderHook(() =>
        useTourCardViewModel(mountProps({ isLast: true })),
      );

      expect(result.current.buttonLabel).toBe(DEFAULT_LABELS.last);
    });
  });

  describe('isHighlight', () => {
    it('Is false for a default step', async () => {
      const { result } = await renderHook(() => useTourCardViewModel(mountProps()));

      expect(result.current.isHighlight).toBe(false);
    });

    it('Is true once the step asks for the highlight variant', async () => {
      const { result } = await renderHook(() =>
        useTourCardViewModel(
          mountProps({ step: { id: 'x', title: 'y', text: 'z', variant: 'highlight' } }),
        ),
      );

      expect(result.current.isHighlight).toBe(true);
    });
  });

  describe('hasGradient', () => {
    it('Is false for a solid palette', async () => {
      const { result } = await renderHook(() => useTourCardViewModel(mountProps()));

      expect(result.current.hasGradient).toBe(false);
    });

    it('Is true when the palette declares a second stop', async () => {
      const { result } = await renderHook(() =>
        useTourCardViewModel(mountProps({ palette: DEFAULT_THEME.highlight })),
      );

      expect(result.current.hasGradient).toBe(true);
    });
  });
});
