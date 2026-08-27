import { useEffect } from 'react';
import {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { ANIMATION } from '@/constants';
import { SHEEN } from '@/components/TourCard/constants';

export const useReanimatedStyles = (cardWidth: number) => {
  const sweep = useSharedValue(0);

  useEffect(() => {
    sweep.value = withRepeat(
      withTiming(1, {
        duration: ANIMATION.sheenDuration,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      false,
    );
  }, [sweep]);

  const sheenStyle = useAnimatedStyle(() => ({
    transform: [
      { skewX: `${SHEEN.skew}deg` },
      {
        translateX: interpolate(
          sweep.value,
          [0, 1],
          [(SHEEN.from / 100) * cardWidth, (SHEEN.to / 100) * cardWidth],
        ),
      },
    ],
  }));

  return { sheenStyle };
};
