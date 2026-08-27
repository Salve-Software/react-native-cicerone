import { StyleSheet } from 'react-native';
import { DEMO } from '~/constants';

export const useStyles = () =>
  StyleSheet.create({
    root: { marginBottom: 28 },
    title: {
      color: DEMO.text,
      fontSize: 18,
      fontWeight: '800',
      letterSpacing: -0.2,
    },
    subtitle: { color: DEMO.muted, fontSize: 13, marginTop: 2, marginBottom: 14 },
  });
