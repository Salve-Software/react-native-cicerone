import type { ICiceroneCardPalette } from '@/types';
import { StyleSheet } from 'react-native';
import { TOUR_BUTTON, TOUR_CARD } from './constants';

export const useStyles = (palette: ICiceroneCardPalette) =>
  StyleSheet.create({
    root: {
      position: 'absolute',
    },
    card: {
      overflow: 'hidden',
      borderRadius: TOUR_CARD.radius,
      paddingTop: TOUR_CARD.paddingTop,
      paddingHorizontal: TOUR_CARD.paddingHorizontal,
      paddingBottom: TOUR_CARD.paddingBottom,
      backgroundColor: palette.cardBackground,
      shadowColor: '#000000',
      shadowOpacity: TOUR_CARD.shadowOpacity,
      shadowRadius: TOUR_CARD.shadowRadius,
      shadowOffset: { width: 0, height: TOUR_CARD.shadowOffsetY },
      elevation: 16,
    },
    gradient: {
      ...StyleSheet.absoluteFillObject,
      opacity: 0.9,
    },
    label: {
      fontSize: TOUR_CARD.labelFontSize,
      fontWeight: '800',
      letterSpacing: TOUR_CARD.labelLetterSpacing,
      marginBottom: TOUR_CARD.labelMarginBottom,
      color: palette.label,
    },
    title: {
      fontSize: TOUR_CARD.titleFontSize,
      fontWeight: '800',
      letterSpacing: TOUR_CARD.titleLetterSpacing,
      marginBottom: TOUR_CARD.titleMarginBottom,
      color: palette.title,
    },
    text: {
      fontSize: TOUR_CARD.textFontSize,
      lineHeight: TOUR_CARD.textLineHeight,
      fontWeight: '600',
      color: palette.text,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: TOUR_CARD.actionsMarginTop,
    },
    skip: {
      fontSize: TOUR_CARD.skipFontSize,
      fontWeight: '800',
      paddingVertical: 8,
      color: palette.skip,
    },
    button: {
      borderRadius: TOUR_BUTTON.radius,
      paddingVertical: TOUR_BUTTON.paddingVertical,
      paddingHorizontal: TOUR_BUTTON.paddingHorizontal,
      backgroundColor: palette.buttonBackground,
      shadowColor: '#000000',
      shadowOpacity: 0.25,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 6 },
      elevation: 6,
    },
    buttonPressed: {
      transform: [{ scale: TOUR_BUTTON.pressedScale }],
    },
    buttonLabel: {
      fontSize: TOUR_BUTTON.fontSize,
      fontWeight: '800',
      color: palette.buttonText,
    },
  });
