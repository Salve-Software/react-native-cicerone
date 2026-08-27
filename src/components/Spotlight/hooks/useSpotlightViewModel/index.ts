import type { ICiceroneRect } from '@/types';
import type { ISpotlightProps } from '@/components/Spotlight/types';
import { useCallback, useMemo, useRef } from 'react';
import { useWindowDimensions } from 'react-native';
import { SPOTLIGHT } from '@/components/Spotlight/constants';

/**
 * The scrim is a border, so its outer edge curves at the corners: reaching every
 * screen edge is not enough, it has to reach every screen *corner* too. The arc
 * is centred on the hole's own corner centre, with radius holeRadius + spread.
 */
const reachOf = (
  hole: ICiceroneRect,
  holeRadius: number,
  width: number,
  height: number,
) => {
  const left = hole.x + holeRadius;
  const right = hole.x + hole.width - holeRadius;
  const top = hole.y + holeRadius;
  const bottom = hole.y + hole.height - holeRadius;

  const corners =
    Math.max(
      Math.hypot(left, top),
      Math.hypot(width - right, top),
      Math.hypot(left, height - bottom),
      Math.hypot(width - right, height - bottom),
    ) - holeRadius;

  const edges = Math.max(
    hole.x,
    width - (hole.x + hole.width),
    hole.y,
    height - (hole.y + hole.height),
  );

  return Math.max(corners, edges);
};

export const useSpotlightViewModel = (props: ISpotlightProps) => {
  const { geometry, overlayPress, allowTargetInteraction, onPress } = props;
  const screen = useWindowDimensions();
  const previousReach = useRef(0);

  /**
   * Sized to this step instead of the screen diagonal: the scrim is a border, so
   * every extra pixel of spread is rasterised on every frame of the transition.
   * Distances are linear in the hole, so covering both ends covers the whole path.
   */
  const scrimSpread = useMemo(() => {
    const reach = reachOf(
      geometry.hole,
      geometry.holeRadius,
      screen.width,
      screen.height,
    );
    const spread =
      Math.ceil(Math.max(reach, previousReach.current)) + SPOTLIGHT.scrimMargin;
    previousReach.current = reach;
    return spread;
  }, [geometry.hole, geometry.holeRadius, screen.width, screen.height]);

  /** Invisible, so they are placed once per step rather than driven every frame. */
  const touchStrips = useMemo(() => {
    const { x, y, width, height } = geometry.hole;
    return {
      top: { height: Math.max(y, 0) },
      bottom: { top: y + height, height: Math.max(screen.height - y - height, 0) },
      left: { top: y, height, width: Math.max(x, 0) },
      right: {
        top: y,
        height,
        left: x + width,
        width: Math.max(screen.width - x - width, 0),
      },
    };
  }, [geometry.hole, screen.width, screen.height]);

  const handlePress = useCallback(() => {
    if (overlayPress === 'none') return;
    onPress();
  }, [overlayPress, onPress]);

  return {
    scrimSpread,
    touchStrips,
    handlePress,
    isPressable: overlayPress !== 'none',
    usesTouchStrips: allowTargetInteraction,
  };
};
