import type { ITourCardProps } from '@/components/TourCard/types';
import { useMemo } from 'react';
import { formatStepLabel } from '@/utils';

export const useTourCardViewModel = (props: ITourCardProps, measuredHeight: number) => {
  const {
    step,
    index,
    total,
    isLast,
    labels,
    palette,
    layout,
    placement,
    containerHeight,
  } = props;

  const label = useMemo(() => {
    if (step.label) return step.label;
    if (total <= 1) return labels.stepSingle;
    return formatStepLabel(labels.step, index + 1, total);
  }, [step.label, total, labels.step, labels.stepSingle, index]);

  const anchorY = useMemo(() => {
    if (placement === 'bottom') return layout.top ?? 0;
    return containerHeight - (layout.bottom ?? 0);
  }, [placement, layout.top, layout.bottom, containerHeight]);

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
