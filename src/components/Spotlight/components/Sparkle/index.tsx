import type { ISparkleProps } from './types';
import React from 'react';
import Animated from 'react-native-reanimated';
import { SPARKLE } from '@/components/Spotlight/constants';
import { useReanimatedStyles } from './hooks/useReanimatedStyles';
import { useStyles } from './styles';

export const Sparkle: React.FC<ISparkleProps> = (props) => {
  const { index, color, position } = props;
  const styles = useStyles();
  const { sparkleStyle } = useReanimatedStyles(index);
  const size = SPARKLE.sizes[index] ?? 10;

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.sparkle,
        { width: size, height: size, backgroundColor: color },
        position,
        sparkleStyle,
      ]}
    />
  );
};
