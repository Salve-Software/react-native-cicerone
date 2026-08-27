import { StyleSheet } from 'react-native';
import { CICERONE } from '@/constants';

export const useStyles = () =>
  StyleSheet.create({
    arrow: {
      position: 'absolute',
      width: CICERONE.arrowSize,
      height: CICERONE.arrowSize,
      borderRadius: 3,
      transform: [{ rotate: '45deg' }],
    },
    bottom: { top: -CICERONE.arrowOverlap },
    top: { bottom: -CICERONE.arrowOverlap },
  });
