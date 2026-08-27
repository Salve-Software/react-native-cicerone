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
  left: number;
  top: number;
  index: number;
  isPlaced: boolean;
}

export const useReanimatedStyles = (props: IUseReanimatedStylesProps) => {
  const { left, top, index, isPlaced } = props;
  const easing = Easing.bezier(...ANIMATION.easeOutExpo);

  const entry = useSharedValue(0);
  const x = useSharedValue(left);
  const y = useSharedValue(top);
  const hasSettled = useSharedValue(false);

  useEffect(() => {
    if (!isPlaced) return;

    const move = (value: number) =>
      hasSettled.value
        ? withTiming(value, { duration: ANIMATION.holeDuration, easing })
        : value;

    x.value = move(left);
    y.value = move(top);
    hasSettled.value = true;
  }, [left, top, isPlaced, easing, hasSettled, x, y]);

  // Replayed every step: the prototype alternates rtzBalA/rtzBalB to re-trigger it.
  useEffect(() => {
    if (!isPlaced) return;
    entry.value = 0;
    entry.value = withTiming(1, { duration: ANIMATION.cardInDuration, easing });
  }, [index, isPlaced, entry, easing]);

  /** rtzBalA: rises past its resting spot at 60%, then settles back. */
  const cardStyle = useAnimatedStyle(() => ({
    left: x.value,
    top: y.value,
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
