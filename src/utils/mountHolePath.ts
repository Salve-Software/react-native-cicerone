import type { ICiceroneRect } from '@/types';

/**
 * The screen rect followed by a rounded-rect subpath. Filled even-odd, the inner
 * subpath punches the hole, so the cut-out gets true rounded corners.
 */
export const mountHolePath = (
  hole: ICiceroneRect,
  radius: number,
  screenWidth: number,
  screenHeight: number,
) => {
  'worklet';
  const r = Math.max(Math.min(radius, hole.width / 2, hole.height / 2), 0);
  const { x, y, width: w, height: h } = hole;

  const outer = `M0,0 H${screenWidth} V${screenHeight} H0 Z`;
  const inner =
    `M${x + r},${y} ` +
    `H${x + w - r} A${r},${r} 0 0 1 ${x + w},${y + r} ` +
    `V${y + h - r} A${r},${r} 0 0 1 ${x + w - r},${y + h} ` +
    `H${x + r} A${r},${r} 0 0 1 ${x},${y + h - r} ` +
    `V${y + r} A${r},${r} 0 0 1 ${x + r},${y} Z`;

  return `${outer} ${inner}`;
};
