import type { ICardLayout, ICiceronePlacement } from '@/types';
import { useEffect } from 'react';
import {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ANIMATION, CARD_ENTRANCE } from '@/constants';

export interface IUseReanimatedStylesProps {
  layout: ICardLayout;
  placement: ICiceronePlacement;
  index: number;
}

export const useReanimatedStyles = (props: IUseReanimatedStylesProps) => {
  const { layout, placement, index } = props;
  const easing = Easing.bezier(...ANIMATION.easeOutExpo);

  const entry = useSharedValue(0);
  const left = useSharedValue(layout.left);
  const top = useSharedValue(layout.top ?? 0);
  const bottom = useSharedValue(layout.bottom ?? 0);
  const isBottom = useSharedValue(placement === 'bottom');
  const hasSettled = useSharedValue(false);

  useEffect(() => {
    const nextIsBottom = placement === 'bottom';
    // Crossing the target means changing anchor, so sliding would read as a jump.
    const slides = hasSettled.value && isBottom.value === nextIsBottom;
    const move = (value: number) =>
      slides ? withTiming(value, { duration: ANIMATION.holeDuration, easing }) : value;

    left.value = move(layout.left);
    if (layout.top !== undefined) top.value = move(layout.top);
    if (layout.bottom !== undefined) bottom.value = move(layout.bottom);

    isBottom.value = nextIsBottom;
    hasSettled.value = true;
  }, [layout, placement, easing, bottom, hasSettled, isBottom, left, top]);

  // Replayed every step: the prototype alternates rtzBalA/rtzBalB to re-trigger it.
  useEffect(() => {
    entry.value = 0;
    entry.value = withTiming(1, { duration: ANIMATION.cardInDuration, easing });
  }, [index, entry, easing]);

  /** rtzBalA: rises past its resting spot at 60%, then settles back. */
  const cardStyle = useAnimatedStyle(() => ({
    left: left.value,
    top: isBottom.value ? top.value : undefined,
    bottom: isBottom.value ? undefined : bottom.value,
    opacity: interpolate(entry.value, [0, 0.6, 1], [0, 1, 1]),
    transform: [
      {
        translateY: interpolate(
          entry.value,
          [0, 0.6, 1],
          [CARD_ENTRANCE.fromTranslateY, CARD_ENTRANCE.overshootTranslateY, 0],
        ),
      },
      {
        scale: interpolate(
          entry.value,
          [0, 0.6, 1],
          [CARD_ENTRANCE.fromScale, CARD_ENTRANCE.overshootScale, 1],
        ),
      },
    ],
  }));

  return { cardStyle };
};
