import type { ICiceroneGeometry } from '@/types';
import { useEffect } from 'react';
import {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ANIMATION } from '@/constants';
import { mountHolePath } from '@/utils';

/** Built once: a new object each render would restart every effect using it. */
const EASE_OUT_EXPO = Easing.bezier(...ANIMATION.easeOutExpo);

export interface IUseReanimatedPropsProps {
  geometry: ICiceroneGeometry;
  isExiting: boolean;
  screen: { width: number; height: number };
}

export const useReanimatedProps = (props: IUseReanimatedPropsProps) => {
  const { geometry, isExiting, screen } = props;

  const x = useSharedValue(geometry.hole.x);
  const y = useSharedValue(geometry.hole.y);
  const width = useSharedValue(geometry.hole.width);
  const height = useSharedValue(geometry.hole.height);
  const radius = useSharedValue(geometry.holeRadius);
  const fade = useSharedValue(0);
  // The first step appears in place; only from the second on does the hole slide.
  const hasSettled = useSharedValue(false);

  useEffect(() => {
    const move = (value: number) =>
      hasSettled.value
        ? withTiming(value, { duration: ANIMATION.holeDuration, easing: EASE_OUT_EXPO })
        : value;

    x.value = move(geometry.hole.x);
    y.value = move(geometry.hole.y);
    width.value = move(geometry.hole.width);
    height.value = move(geometry.hole.height);
    radius.value = move(geometry.holeRadius);

    if (!hasSettled.value) {
      hasSettled.value = true;
      fade.value = withTiming(1, { duration: ANIMATION.scrimInDuration });
    }
  }, [geometry, fade, hasSettled, height, radius, width, x, y]);

  useEffect(() => {
    if (!isExiting) return;
    fade.value = withTiming(0, { duration: ANIMATION.scrimOutDuration });
  }, [isExiting, fade]);

  const scrimAnimatedProps = useAnimatedProps(() => ({
    d: mountHolePath(
      { x: x.value, y: y.value, width: width.value, height: height.value },
      radius.value,
      screen.width,
      screen.height,
    ),
    opacity: fade.value,
  }));

  return { scrimAnimatedProps };
};
