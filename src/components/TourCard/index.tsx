import type { ITourCardProps } from './types';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { CardArrow } from './components/CardArrow';
import { CardSheen } from './components/CardSheen';
import { useReanimatedStyles } from './hooks/useReanimatedStyles';
import { useTourCardViewModel } from './hooks/useTourCardViewModel';
import { useStyles } from './styles';

/** Swappable wholesale through `renderCard`. */
export const TourCard: React.FC<ITourCardProps> = (props) => {
  const { step, palette, placement, layout, width, labels, next, skip, style } = props;
  const [height, setHeight] = useState(0);
  const { label, anchorTop, buttonLabel, isHighlight, hasGradient, isPlaced } =
    useTourCardViewModel(props, height);
  const styles = useStyles(palette);
  const { cardStyle } = useReanimatedStyles({
    left: layout.left,
    top: anchorTop,
    index: props.index,
    isPlaced,
  });

  return (
    <Animated.View
      style={[styles.root, { width }, cardStyle]}
      onLayout={(event) => setHeight(event.nativeEvent.layout.height)}
      testID="cicerone-card"
    >
      <CardArrow
        placement={placement}
        left={layout.arrowLeft}
        color={palette.arrowBackground}
      />

      <View style={[styles.card, style]}>
        {hasGradient && (
          <View
            pointerEvents="none"
            style={[styles.gradient, { backgroundColor: palette.cardBackgroundGradient }]}
          />
        )}
        {isHighlight && <CardSheen cardWidth={width} />}

        <Text style={styles.label}>{label}</Text>
        <Text style={styles.title}>{step.title}</Text>
        <Text style={styles.text}>{step.text}</Text>

        <View style={styles.actions}>
          <Pressable onPress={skip} accessibilityRole="button" testID="cicerone-skip">
            <Text style={styles.skip}>{labels.skip}</Text>
          </Pressable>

          <Pressable
            onPress={next}
            accessibilityRole="button"
            testID="cicerone-next"
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          >
            <Text style={styles.buttonLabel}>{buttonLabel}</Text>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
};
