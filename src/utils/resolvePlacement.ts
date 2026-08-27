import type { ICiceronePlacement, ICiceroneRect } from '@/types';

/** A target in the top half gets the card below it, and the other way around. */
export const resolvePlacement = (
  ring: ICiceroneRect,
  screenHeight: number,
  forced?: ICiceronePlacement,
): ICiceronePlacement => {
  if (forced) return forced;
  return ring.y + ring.height / 2 < screenHeight / 2 ? 'bottom' : 'top';
};
