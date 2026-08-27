import type { ICiceroneRect } from '@/types';
import type { ISpotlightProps } from '@/components/Spotlight/types';
import { useCallback, useMemo, useRef } from 'react';
import { useWindowDimensions } from 'react-native';
import { SPOTLIGHT } from '@/components/Spotlight/constants';

/** How far the scrim has to reach from the hole to cover every screen edge. */
const reachOf = (hole: ICiceroneRect, width: number, height: number) =>
  Math.max(
    hole.x,
    width - (hole.x + hole.width),
    hole.y,
    height - (hole.y + hole.height),
  );

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
    const reach = reachOf(geometry.hole, screen.width, screen.height);
    const spread =
      Math.ceil(Math.max(reach, previousReach.current)) + SPOTLIGHT.scrimMargin;
    previousReach.current = reach;
    return spread;
  }, [geometry.hole, screen.width, screen.height]);

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
