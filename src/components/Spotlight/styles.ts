import type { ICiceroneTheme } from '@/types';
import { StyleSheet } from 'react-native';
import { SPOTLIGHT } from './constants';

export const useStyles = (theme: ICiceroneTheme) =>
  StyleSheet.create({
    root: StyleSheet.absoluteFillObject,
    scrim: {
      position: 'absolute',
      borderColor: theme.scrim,
      backgroundColor: 'transparent',
    },
    backdrop: {
      position: 'absolute',
      overflow: 'hidden',
    },
    ring: {
      position: 'absolute',
      borderWidth: theme.ringWidth,
      borderColor: theme.ring,
    },
    glow: {
      position: 'absolute',
      borderWidth: theme.ringWidth,
      borderColor: theme.ringGlow,
      shadowColor: theme.ring,
      shadowOpacity: 1,
      shadowRadius: SPOTLIGHT.glowShadowRadius,
      shadowOffset: { width: 0, height: 0 },
      elevation: 12,
    },
    sparkleAnchor: {
      position: 'absolute',
    },
    touchStrip: {
      position: 'absolute',
      left: 0,
      right: 0,
    },
    touchStripTop: {
      top: 0,
    },
    touchSide: {
      position: 'absolute',
      left: 0,
    },
  });
