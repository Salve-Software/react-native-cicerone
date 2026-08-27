import type { ICiceroneOverlayProps } from './types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Spotlight } from '@/components/Spotlight';
import { TourCard } from '@/components/TourCard';
import { useCiceroneOverlayViewModel } from './hooks/useCiceroneOverlayViewModel';

export const CiceroneOverlay: React.FC<ICiceroneOverlayProps> = (props) => {
  const { options, isExiting } = props;
  const {
    theme,
    isHighlight,
    cardWidth,
    layout,
    cardProps,
    geometry,
    screen,
    rootRef,
    onRootLayout,
    overlayPress,
    onOverlayPress,
    allowTargetInteraction,
  } = useCiceroneOverlayViewModel(props);

  return (
    <View
      ref={rootRef}
      style={StyleSheet.absoluteFill}
      pointerEvents="box-none"
      onLayout={onRootLayout}
    >
      <Spotlight
        geometry={geometry}
        theme={theme}
        isHighlight={isHighlight}
        isExiting={isExiting}
        screen={screen}
        overlayPress={overlayPress}
        allowTargetInteraction={allowTargetInteraction}
        onPress={onOverlayPress}
        renderBackdrop={options.renderBackdrop}
      />

      {options.renderCard ? (
        options.renderCard(cardProps)
      ) : (
        <TourCard
          {...cardProps}
          layout={layout}
          width={cardWidth}
          containerHeight={screen.height}
          isExiting={isExiting}
          style={options.cardStyle}
        />
      )}
    </View>
  );
};
