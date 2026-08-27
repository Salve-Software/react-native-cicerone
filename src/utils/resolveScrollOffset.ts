import type { ICiceroneRect, IScrollDecision } from '@/types';
import { SCROLL } from './constants';

/** Centring an already visible target would make the screen jump for nothing. */
export const resolveScrollOffset = (
  target: ICiceroneRect,
  viewport: ICiceroneRect,
  currentOffset: number,
  contentHeight: number,
  margin: number = SCROLL.visibilityMargin,
): IScrollDecision => {
  const isVisible =
    target.y >= viewport.y + margin &&
    target.y + target.height <= viewport.y + viewport.height - margin;

  if (isVisible) return { needsScroll: false, offset: currentOffset };

  const targetCenter = target.y + target.height / 2;
  const viewportCenter = viewport.y + viewport.height / 2;
  const maxOffset = Math.max(0, contentHeight - viewport.height);
  const offset = clampOffset(currentOffset + (targetCenter - viewportCenter), maxOffset);

  return { needsScroll: offset !== currentOffset, offset };
};

const clampOffset = (offset: number, maxOffset: number) =>
  Math.min(Math.max(offset, 0), maxOffset);
