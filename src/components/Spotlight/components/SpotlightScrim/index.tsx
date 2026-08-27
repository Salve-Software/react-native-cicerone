import type { ISpotlightScrimProps } from './types';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { useReanimatedProps } from './hooks/useReanimatedProps';

const AnimatedPath = Animated.createAnimatedComponent(Path);

/**
 * One even-odd path instead of a view with a screen-wide border: the border made
 * iOS regenerate a bitmap on the main thread on every prop update.
 */
export const SpotlightScrim: React.FC<ISpotlightScrimProps> = (props) => {
  const { theme, screen } = props;
  const { scrimAnimatedProps } = useReanimatedProps(props);

  return (
    <Svg
      style={StyleSheet.absoluteFill}
      width={screen.width}
      height={screen.height}
      pointerEvents="none"
    >
      <AnimatedPath
        animatedProps={scrimAnimatedProps}
        fill={theme.scrim}
        fillRule="evenodd"
      />
    </Svg>
  );
};
