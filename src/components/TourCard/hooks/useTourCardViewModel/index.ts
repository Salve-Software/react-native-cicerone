import type { ITourCardProps } from '@/components/TourCard/types';
import { useMemo } from 'react';
import { formatStepLabel } from '@/utils';

export const useTourCardViewModel = (props: ITourCardProps) => {
  const { step, index, total, isLast, labels, palette } = props;

  /** The counter hides itself on a single-step tour. */
  const label = useMemo(() => {
    if (step.label) return step.label;
    if (total <= 1) return labels.stepSingle;
    return formatStepLabel(labels.step, index + 1, total);
  }, [step.label, total, labels.step, labels.stepSingle, index]);

  const buttonLabel = isLast ? labels.last : labels.next;
  const isHighlight = step.variant === 'highlight';
  const hasGradient = !!palette.cardBackgroundGradient;

  return { label, buttonLabel, isHighlight, hasGradient };
};
