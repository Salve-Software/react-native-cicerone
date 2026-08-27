import type { ITourCardProps } from '@/components/TourCard/types';
import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { formatStepLabel } from '@/utils';

export const useTourCardViewModel = (props: ITourCardProps, measuredHeight: number) => {
  const { step, index, total, isLast, labels, palette, layout, placement } = props;
  const screen = useWindowDimensions();

  const label = useMemo(() => {
    if (step.label) return step.label;
    if (total <= 1) return labels.stepSingle;
    return formatStepLabel(labels.step, index + 1, total);
  }, [step.label, total, labels.step, labels.stepSingle, index]);

  const anchorY = useMemo(() => {
    if (placement === 'bottom') return layout.top ?? 0;
    return screen.height - (layout.bottom ?? 0);
  }, [placement, layout.top, layout.bottom, screen.height]);

  const heightOffset = placement === 'bottom' ? 0 : measuredHeight;

  return {
    label,
    anchorY,
    heightOffset,
    buttonLabel: isLast ? labels.last : labels.next,
    isHighlight: step.variant === 'highlight',
    hasGradient: !!palette.cardBackgroundGradient,
  };
};
