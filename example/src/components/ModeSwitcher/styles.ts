import { StyleSheet } from 'react-native';
import { DEMO } from '~/constants';

export const useStyles = () =>
  StyleSheet.create({
    root: {
      flexDirection: 'row',
      gap: 6,
      padding: 6,
      backgroundColor: DEMO.surface,
      borderTopWidth: 1,
      borderTopColor: DEMO.border,
    },
    tab: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 12,
      alignItems: 'center',
    },
    tabActive: { backgroundColor: DEMO.accent },
    label: { color: DEMO.muted, fontSize: 13, fontWeight: '700' },
    labelActive: { color: '#ffffff' },
  });
