import { StyleSheet } from 'react-native';
import { DEMO } from '~/constants';

const CIRCLE_SIZE = 84;

export const useStyles = () =>
  StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: 'flex-start',
      paddingTop: 96,
      paddingHorizontal: 24,
    },
    rootBottom: { justifyContent: 'flex-end', paddingBottom: 96, paddingTop: 0 },
    /** A Target is a View; in a column it stretches unless told to hug. */
    hug: { alignSelf: 'flex-start' },
    card: {
      height: 132,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: DEMO.border,
      backgroundColor: DEMO.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    circle: {
      width: CIRCLE_SIZE,
      height: CIRCLE_SIZE,
      borderRadius: CIRCLE_SIZE / 2,
      backgroundColor: DEMO.accent,
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: { color: DEMO.muted, fontSize: 12, letterSpacing: 1.6, fontWeight: '700' },
    replay: {
      alignSelf: 'flex-start',
      marginTop: 20,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 10,
      backgroundColor: DEMO.surfaceAlt,
    },
    replayLabel: { color: DEMO.text, fontSize: 13, fontWeight: '700' },
  });
