import type { ICardSheenProps } from './types';
import React from 'react';
import Animated from 'react-native-reanimated';
import { SHEEN } from '@/components/TourCard/constants';
import { useReanimatedStyles } from './hooks/useReanimatedStyles';
import { useStyles } from './styles';

export const CardSheen: React.FC<ICardSheenProps> = (props) => {
  const { cardWidth } = props;
  const styles = useStyles();
  const { sheenStyle } = useReanimatedStyles(cardWidth);

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.sheen, { width: cardWidth * SHEEN.widthRatio }, sheenStyle]}
    />
  );
};
