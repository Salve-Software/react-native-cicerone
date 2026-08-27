import type { ISpotlightProps } from '@/components/Spotlight/types';
import React from 'react';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Sparkles } from '@/components/Spotlight/components/Sparkles';
import { SpotlightScrim } from '@/components/Spotlight/components/SpotlightScrim';
import { useReanimatedStyles } from '@/components/Spotlight/hooks/useReanimatedStyles';
import { useSpotlightViewModel } from '@/components/Spotlight/hooks/useSpotlightViewModel';
import { useStyles } from '@/components/Spotlight/styles';

export const Spotlight: React.FC<ISpotlightProps> = (props) => {
  const { geometry, theme, isHighlight, isExiting, renderBackdrop } = props;
  const { screen, touchStrips, handlePress, isPressable, usesTouchStrips } =
    useSpotlightViewModel(props);
  const styles = useStyles(theme);
  const { holeStyle, ringStyle, glowStyle, sparkleAnchorStyle } =
    useReanimatedStyles({
      geometry,
      ringColor: theme.ring,
      isHighlight,
      isExiting,
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

      <SpotlightScrim
        geometry={geometry}
        theme={theme}
        isExiting={isExiting}
        screen={screen}
      />
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
        !isExiting &&
        (usesTouchStrips ? (
          <>
            <Pressable
              style={[styles.touchStrip, styles.touchStripTop, touchStrips.top]}
              onPress={handlePress}
              testID="cicerone-touch-top"
            />
            <Pressable
              style={[styles.touchStrip, touchStrips.bottom]}
              onPress={handlePress}
              testID="cicerone-touch-bottom"
            />
            <Pressable
              style={[styles.touchSide, touchStrips.left]}
              onPress={handlePress}
              testID="cicerone-touch-left"
            />
            <Pressable
              style={[styles.touchSide, touchStrips.right]}
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
