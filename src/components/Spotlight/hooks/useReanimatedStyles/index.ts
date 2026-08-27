import type { ICiceroneGeometry } from '@/types';
import { useEffect } from 'react';
import {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { ANIMATION } from '@/constants';
import { SPOTLIGHT } from '@/components/Spotlight/constants';

export interface IUseReanimatedStylesProps {
  geometry: ICiceroneGeometry;
  scrimSpread: number;
  ringColor: string;
  isHighlight: boolean;
  isExiting: boolean;
}

export const useReanimatedStyles = (props: IUseReanimatedStylesProps) => {
  const { geometry, scrimSpread, ringColor, isHighlight, isExiting } = props;
  const easing = Easing.bezier(...ANIMATION.easeOutExpo);

  const holeX = useSharedValue(geometry.hole.x);
  const holeY = useSharedValue(geometry.hole.y);
  const holeWidth = useSharedValue(geometry.hole.width);
  const holeHeight = useSharedValue(geometry.hole.height);
  const holeRadius = useSharedValue(geometry.holeRadius);

  const ringX = useSharedValue(geometry.ring.x);
  const ringY = useSharedValue(geometry.ring.y);
  const ringWidth = useSharedValue(geometry.ring.width);
  const ringHeight = useSharedValue(geometry.ring.height);
  const ringRadius = useSharedValue(geometry.ringRadius);

  const fade = useSharedValue(0);
  const ringEntry = useSharedValue(0);
  const pulse = useSharedValue(0);
  // The first step appears in place; only from the second on does the hole slide.
  const hasSettled = useSharedValue(false);

  useEffect(() => {
    const move = (value: number) =>
      hasSettled.value
        ? withTiming(value, { duration: ANIMATION.holeDuration, easing })
        : value;

    holeX.value = move(geometry.hole.x);
    holeY.value = move(geometry.hole.y);
    holeWidth.value = move(geometry.hole.width);
    holeHeight.value = move(geometry.hole.height);
    holeRadius.value = move(geometry.holeRadius);
    ringX.value = move(geometry.ring.x);
    ringY.value = move(geometry.ring.y);
    ringWidth.value = move(geometry.ring.width);
    ringHeight.value = move(geometry.ring.height);
    ringRadius.value = move(geometry.ringRadius);

    if (!hasSettled.value) {
      hasSettled.value = true;
      fade.value = withTiming(1, { duration: ANIMATION.scrimInDuration });
      ringEntry.value = withTiming(1, { duration: ANIMATION.ringInDuration, easing });
    }
  }, [
    geometry,
    easing,
    fade,
    hasSettled,
    holeHeight,
    holeRadius,
    holeWidth,
    holeX,
    holeY,
    ringEntry,
    ringHeight,
    ringRadius,
    ringWidth,
    ringX,
    ringY,
  ]);

  useEffect(() => {
    if (!isExiting) return;
    fade.value = withTiming(0, { duration: ANIMATION.scrimOutDuration });
  }, [isExiting, fade]);

  useEffect(() => {
    const duration = isHighlight
      ? ANIMATION.highlightGlowDuration
      : ANIMATION.glowPulseDuration;

    pulse.value = withDelay(
      ANIMATION.ringInDuration,
      withRepeat(
        withTiming(1, { duration, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      ),
    );
  }, [isHighlight, pulse]);

  /**
   * Positioned with a transform, not left/top: layout props go through the
   * shadow tree on every frame, transforms do not.
   */
  const scrimStyle = useAnimatedStyle(() => ({
    width: holeWidth.value + scrimSpread * 2,
    height: holeHeight.value + scrimSpread * 2,
    borderRadius: holeRadius.value + scrimSpread,
    opacity: fade.value,
    transform: [
      { translateX: holeX.value - scrimSpread },
      { translateY: holeY.value - scrimSpread },
    ],
  }));

  const holeStyle = useAnimatedStyle(() => ({
    width: holeWidth.value,
    height: holeHeight.value,
    borderRadius: holeRadius.value,
    transform: [{ translateX: holeX.value }, { translateY: holeY.value }],
  }));

  const ringStyle = useAnimatedStyle(() => ({
    width: ringWidth.value,
    height: ringHeight.value,
    borderRadius: ringRadius.value,
    opacity: fade.value * interpolate(ringEntry.value, [0, 0.7, 1], [0, 1, 1]),
    borderColor: isHighlight
      ? interpolateColor(pulse.value, [0, 1], [ringColor, SPOTLIGHT.highlightRingColor])
      : ringColor,
    transform: [
      { translateX: ringX.value },
      { translateY: ringY.value },
      {
        scale: interpolate(
          ringEntry.value,
          [0, 0.7, 1],
          [SPOTLIGHT.ringInScale, SPOTLIGHT.ringOvershootScale, 1],
        ),
      },
      {
        rotate: `${interpolate(
          ringEntry.value,
          [0, 0.7, 1],
          [SPOTLIGHT.ringInRotate, SPOTLIGHT.ringOvershootRotate, 0],
        )}deg`,
      },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    width: ringWidth.value,
    height: ringHeight.value,
    borderRadius: ringRadius.value,
    opacity:
      fade.value *
      interpolate(
        pulse.value,
        [0, 1],
        [SPOTLIGHT.glowMinOpacity, SPOTLIGHT.glowMaxOpacity],
      ),
    transform: [
      { translateX: ringX.value },
      { translateY: ringY.value },
      { scale: interpolate(pulse.value, [0, 1], [1, SPOTLIGHT.glowMaxScale]) },
    ],
  }));

  /** Sparkle offsets are relative to the ring, so they need its box. */
  const sparkleAnchorStyle = useAnimatedStyle(() => ({
    width: ringWidth.value,
    height: ringHeight.value,
    opacity: fade.value,
    transform: [{ translateX: ringX.value }, { translateY: ringY.value }],
  }));

  return { scrimStyle, holeStyle, ringStyle, glowStyle, sparkleAnchorStyle };
};
