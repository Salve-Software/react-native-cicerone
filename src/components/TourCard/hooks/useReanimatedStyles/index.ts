import type { IUseReanimatedStylesProps } from './types';
import { useEffect } from 'react';
import {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ANIMATION, CARD_ENTRANCE, CARD_EXIT } from '@/constants';

/** Built once: a new object each render would restart every effect using it. */
const EASE_OUT_EXPO = Easing.bezier(...ANIMATION.easeOutExpo);

export const useReanimatedStyles = (props: IUseReanimatedStylesProps) => {
  const { left, anchorY, heightOffset, index, isExiting } = props;

  const entry = useSharedValue(0);
  const appear = useSharedValue(0);
  const x = useSharedValue(left);
  const y = useSharedValue(anchorY);
  const exit = useSharedValue(0);
  const hasSettled = useSharedValue(false);

  useEffect(() => {
    const move = (value: number) =>
      hasSettled.value
        ? withTiming(value, { duration: ANIMATION.holeDuration, easing: EASE_OUT_EXPO })
        : value;

    x.value = move(left);
    y.value = move(anchorY);
    hasSettled.value = true;
  }, [left, anchorY, hasSettled, x, y]);

  /**
   * The rise and the settle replay each step, as the prototype does by
   * alternating rtzBalA/rtzBalB. The fade does not: the card slides across the
   * screen at the same time, and fading out on the way reads as a blink.
   */
  useEffect(() => {
    entry.value = 0;
    entry.value = withTiming(1, {
      duration: ANIMATION.cardInDuration,
      easing: EASE_OUT_EXPO,
    });
  }, [index, entry]);

  useEffect(() => {
    appear.value = withTiming(1, { duration: ANIMATION.cardInDuration });
  }, [appear]);

  useEffect(() => {
    if (!isExiting) return;
    exit.value = withTiming(1, { duration: ANIMATION.cardOutDuration });
  }, [isExiting, exit]);

  /** rtzBalA: rises past its resting spot at 60%, then settles back. */
  const cardStyle = useAnimatedStyle(() => ({
    left: x.value,
    top: y.value - heightOffset,
    opacity: appear.value * (1 - exit.value),
    transform: [
      {
        translateY:
          interpolate(
            entry.value,
            [0, 0.6, 1],
            [CARD_ENTRANCE.fromTranslateY, CARD_ENTRANCE.overshootTranslateY, 0],
          ) +
          exit.value * CARD_EXIT.toTranslateY,
      },
      {
        scale:
          interpolate(
            entry.value,
            [0, 0.6, 1],
            [CARD_ENTRANCE.fromScale, CARD_ENTRANCE.overshootScale, 1],
          ) * interpolate(exit.value, [0, 1], [1, CARD_EXIT.toScale]),
      },
    ],
  }));

  return { cardStyle };
};
