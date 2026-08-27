import { useEffect } from 'react';
import {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ANIMATION, CARD_ENTRANCE } from '@/constants';

export const useReanimatedStyles = () => {
  const entry = useSharedValue(0);

  useEffect(() => {
    entry.value = withTiming(1, {
      duration: ANIMATION.cardInDuration,
      easing: Easing.bezier(...ANIMATION.easeOutExpo),
    });
  }, [entry]);

  /** rtzBalA: rises past its resting spot at 60%, then settles back. */
  const cardStyle = useAnimatedStyle(() => ({
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
