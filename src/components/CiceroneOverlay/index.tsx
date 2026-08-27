import type { ICiceroneOverlayProps } from './types';
import React from 'react';
import { Spotlight } from '@/components/Spotlight';
import { TourCard } from '@/components/TourCard';
import { useCiceroneOverlayViewModel } from './hooks/useCiceroneOverlayViewModel';

export const CiceroneOverlay: React.FC<ICiceroneOverlayProps> = (props) => {
  const { geometry, options, isExiting } = props;
  const {
    theme,
    isHighlight,
    cardWidth,
    layout,
    cardProps,
    overlayPress,
    onOverlayPress,
    allowTargetInteraction,
  } = useCiceroneOverlayViewModel(props);

  return (
    <>
      <Spotlight
        geometry={geometry}
        theme={theme}
        isHighlight={isHighlight}
        isExiting={isExiting}
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
          isExiting={isExiting}
          style={options.cardStyle}
        />
      )}
    </>
  );
};
