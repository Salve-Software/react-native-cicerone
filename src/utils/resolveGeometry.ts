import type { ICiceroneGeometry, ICiceroneRect, ICiceroneStep } from '@/types';
import { CICERONE } from '@/constants';

/** The dimmed band left between hole and ring is what makes the halo. */
export const resolveGeometry = (
  target: ICiceroneRect,
  step: Pick<ICiceroneStep, 'padding' | 'radius'>,
): ICiceroneGeometry => {
  const padding = step.padding ?? CICERONE.stepPadding;
  const ring: ICiceroneRect = {
    x: target.x - padding,
    y: target.y - padding,
    width: target.width + padding * 2,
    height: target.height + padding * 2,
  };

  if (step.radius === 'circle') {
    return {
      hole: target,
      holeRadius: Math.min(target.width, target.height) / 2,
      ring,
      ringRadius: Math.min(ring.width, ring.height) / 2,
    };
  }

  const radius = step.radius ?? 0;

  return {
    hole: target,
    holeRadius: Math.max(radius - 1, CICERONE.minHoleRadius),
    ring,
    ringRadius: Math.max(radius, CICERONE.minRingRadius) + padding,
  };
};
