import { useEffect } from 'react';
import {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { ANIMATION } from '@/constants';
import { SPARKLE } from '@/components/Spotlight/constants';

export const useReanimatedStyles = (index: number) => {
  const pulse = useSharedValue(0);

  useEffect(() => {
    pulse.value = withDelay(
      SPARKLE.delays[index] ?? 0,
      withRepeat(
        withTiming(1, {
          duration: ANIMATION.sparkleDuration / 2,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true,
      ),
    );
  }, [index, pulse]);

  const sparkleStyle = useAnimatedStyle(() => ({
    opacity: pulse.value,
    transform: [
      { rotate: '45deg' },
      { scale: interpolate(pulse.value, [0, 1], [SPARKLE.minScale, SPARKLE.maxScale]) },
    ],
  }));

  return { sparkleStyle };
};
