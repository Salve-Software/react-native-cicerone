import type { ISpotlightProps } from './types';
import React from 'react';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Sparkles } from './components/Sparkles';
import { useReanimatedStyles } from './hooks/useReanimatedStyles';
import { useSpotlightViewModel } from './hooks/useSpotlightViewModel';
import { useStyles } from './styles';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Spotlight: React.FC<ISpotlightProps> = (props) => {
  const { geometry, theme, isHighlight, renderBackdrop } = props;
  const { screen, scrimSpread, handlePress, isPressable, usesTouchStrips } =
    useSpotlightViewModel(props);
  const styles = useStyles(theme);
  const {
    scrimStyle,
    holeStyle,
    ringStyle,
    glowStyle,
    sparkleAnchorStyle,
    touchTopStyle,
    touchBottomStyle,
    touchLeftStyle,
    touchRightStyle,
  } = useReanimatedStyles({
    geometry,
    scrimSpread,
    ringColor: theme.ring,
    isHighlight,
    screen,
  });

  return (
    <View style={styles.root} pointerEvents="box-none">
      {!!renderBackdrop && (
        <Animated.View
          style={[styles.backdrop, holeStyle]}
          pointerEvents="none"
          testID="cicerone-backdrop"
        >
          {renderBackdrop({ geometry })}
        </Animated.View>
      )}

      <Animated.View style={[styles.scrim, scrimStyle]} pointerEvents="none" />
      <Animated.View style={[styles.glow, glowStyle]} pointerEvents="none" />
      <Animated.View style={[styles.ring, ringStyle]} pointerEvents="none" />

      {isHighlight && (
        <Animated.View
          style={[styles.sparkleAnchor, sparkleAnchorStyle]}
          pointerEvents="none"
        >
          <Sparkles color={theme.highlight.label} />
        </Animated.View>
      )}

      {isPressable &&
        (usesTouchStrips ? (
          <>
            <AnimatedPressable
              style={[styles.touchStrip, styles.touchStripTop, touchTopStyle]}
              onPress={handlePress}
              testID="cicerone-touch-top"
            />
            <AnimatedPressable
              style={[styles.touchStrip, touchBottomStyle]}
              onPress={handlePress}
              testID="cicerone-touch-bottom"
            />
            <AnimatedPressable
              style={[styles.touchSide, touchLeftStyle]}
              onPress={handlePress}
              testID="cicerone-touch-left"
            />
            <AnimatedPressable
              style={[styles.touchSide, touchRightStyle]}
              onPress={handlePress}
              testID="cicerone-touch-right"
            />
          </>
        ) : (
          <Pressable
            style={styles.root}
            onPress={handlePress}
            testID="cicerone-overlay-press"
          />
        ))}
    </View>
  );
};
