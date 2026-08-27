import type { ITourCardProps } from '@/components/TourCard/types';
import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { formatStepLabel } from '@/utils';

export const useTourCardViewModel = (props: ITourCardProps, measuredHeight: number) => {
  const { step, index, total, isLast, labels, palette, layout, placement } = props;
  const screen = useWindowDimensions();

  /** The counter hides itself on a single-step tour. */
  const label = useMemo(() => {
    if (step.label) return step.label;
    if (total <= 1) return labels.stepSingle;
    return formatStepLabel(labels.step, index + 1, total);
  }, [step.label, total, labels.step, labels.stepSingle, index]);

  /**
   * Anchored by the top even when the card sits above the target: setting `top`
   * and `bottom` together with no height stretches the card between them, and an
   * animated style cannot clear the anchor it stopped using.
   */
  const anchorTop = useMemo(() => {
    if (placement === 'bottom') return layout.top ?? 0;
    return screen.height - (layout.bottom ?? 0) - measuredHeight;
  }, [placement, layout.top, layout.bottom, screen.height, measuredHeight]);

  return {
    label,
    anchorTop,
    buttonLabel: isLast ? labels.last : labels.next,
    isHighlight: step.variant === 'highlight',
    hasGradient: !!palette.cardBackgroundGradient,
    // Placing an unmeasured card above a target would put it in the wrong spot.
    isPlaced: placement === 'bottom' || measuredHeight > 0,
  };
};
