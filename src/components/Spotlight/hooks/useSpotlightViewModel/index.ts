import type { ISpotlightProps } from '@/components/Spotlight/types';
import { useCallback, useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

export const useSpotlightViewModel = (props: ISpotlightProps) => {
  const { overlayPress, allowTargetInteraction, onPress } = props;
  const screen = useWindowDimensions();

  /** The scrim border must reach the diagonal so no corner is ever left bright. */
  const scrimSpread = useMemo(
    () => Math.ceil(Math.max(screen.width, screen.height)),
    [screen.width, screen.height],
  );

  const handlePress = useCallback(() => {
    if (overlayPress === 'none') return;
    onPress();
  }, [overlayPress, onPress]);

  return {
    screen,
    scrimSpread,
    handlePress,
    isPressable: overlayPress !== 'none',
    usesTouchStrips: allowTargetInteraction,
  };
};
