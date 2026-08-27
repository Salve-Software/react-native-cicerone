import type { ICardLayout, ICiceronePlacement, ICiceroneRect } from '@/types';
import { CICERONE } from '@/constants';
import { clamp } from './clamp';

/** Unlike the prototype the card follows the target, so the arrow moves on clamp. */
export const resolveCardLayout = (
  ring: ICiceroneRect,
  placement: ICiceronePlacement,
  cardWidth: number,
  screenWidth: number,
  screenHeight: number,
): ICardLayout => {
  const targetCenterX = ring.x + ring.width / 2;
  const maxLeft = Math.max(
    CICERONE.cardScreenMargin,
    screenWidth - cardWidth - CICERONE.cardScreenMargin,
  );
  const left = clamp(targetCenterX - cardWidth / 2, CICERONE.cardScreenMargin, maxLeft);

  const arrowLeft = clamp(
    targetCenterX - left,
    CICERONE.arrowSize,
    Math.max(CICERONE.arrowSize, cardWidth - CICERONE.arrowSize),
  );

  if (placement === 'bottom') {
    return { left, top: ring.y + ring.height + CICERONE.cardOffset, arrowLeft };
  }

  return { left, bottom: screenHeight - ring.y + CICERONE.cardOffset, arrowLeft };
};
