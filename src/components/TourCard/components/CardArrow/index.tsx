import type { ICardArrowProps } from './types';
import React from 'react';
import { View } from 'react-native';
import { CICERONE } from '@/constants';
import { useStyles } from './styles';

export const CardArrow: React.FC<ICardArrowProps> = (props) => {
  const { placement, left, color } = props;
  const styles = useStyles();

  return (
    <View
      pointerEvents="none"
      style={[
        styles.arrow,
        { backgroundColor: color, left: left - CICERONE.arrowSize / 2 },
        placement === 'bottom' ? styles.bottom : styles.top,
      ]}
    />
  );
};
