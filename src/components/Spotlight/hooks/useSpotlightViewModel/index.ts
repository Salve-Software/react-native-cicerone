import type { ISpotlightProps } from '@/components/Spotlight/types';
import { useCallback, useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

export const useSpotlightViewModel = (props: ISpotlightProps) => {
  const { geometry, overlayPress, allowTargetInteraction, onPress } = props;
  const screen = useWindowDimensions();

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
    screen,
    touchStrips,
    handlePress,
    isPressable: overlayPress !== 'none',
    usesTouchStrips: allowTargetInteraction,
  };
};
