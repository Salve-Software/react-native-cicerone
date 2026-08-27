import { StyleSheet } from 'react-native';
import { SHEEN } from '@/components/TourCard/constants';

export const useStyles = () =>
  StyleSheet.create({
    sheen: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      backgroundColor: 'rgba(255,255,255,.15)',
      transform: [{ skewX: `${SHEEN.skew}deg` }],
    },
  });
