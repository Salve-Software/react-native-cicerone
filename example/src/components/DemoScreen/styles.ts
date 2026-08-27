import { StyleSheet } from 'react-native';
import { DEMO } from '~/constants';

export const useStyles = () =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: DEMO.background },
    content: { padding: 20, paddingBottom: 140 },
    header: { marginBottom: 28 },
    wordmark: { color: DEMO.text, fontSize: 30, fontWeight: '800', letterSpacing: -1 },
    wordmarkDot: { color: DEMO.accent },
    tagline: { color: DEMO.muted, fontSize: 13, marginTop: 4 },

    reticle: {
      height: DEMO.reticleHeight,
      borderRadius: 28,
      borderWidth: 2,
      borderColor: DEMO.border,
      backgroundColor: DEMO.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    reticleLabel: { color: DEMO.muted, fontSize: 12, letterSpacing: 1.5 },

    row: { flexDirection: 'row', alignItems: 'center', gap: 14 },
    scanButton: {
      width: DEMO.scanButtonSize,
      height: DEMO.scanButtonSize,
      borderRadius: DEMO.scanButtonSize / 2,
      backgroundColor: DEMO.accent,
      alignItems: 'center',
      justifyContent: 'center',
    },
    scanGlyph: { color: '#ffffff', fontSize: 26, fontWeight: '800' },
    rowHint: { color: DEMO.muted, fontSize: 13, flex: 1 },

    card: {
      backgroundColor: DEMO.surface,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: DEMO.border,
      padding: 16,
    },
    cardTitle: { color: DEMO.text, fontSize: 15, fontWeight: '700' },
    cardText: { color: DEMO.muted, fontSize: 13, marginTop: 4, lineHeight: 19 },

    score: {
      width: DEMO.scoreSize,
      height: DEMO.scoreSize,
      borderRadius: DEMO.scoreSize / 2,
      borderWidth: 6,
      borderColor: DEMO.accent,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: DEMO.surface,
    },
    scoreValue: { color: DEMO.text, fontSize: 34, fontWeight: '800' },
    scoreLabel: { color: DEMO.muted, fontSize: 11, letterSpacing: 1.2 },

    premium: {
      backgroundColor: DEMO.surfaceAlt,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: DEMO.gold,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    premiumTitle: { color: DEMO.gold, fontSize: 15, fontWeight: '800' },
    premiumText: { color: DEMO.muted, fontSize: 12, marginTop: 2 },

    spacer: { height: 560, justifyContent: 'center', alignItems: 'center' },
    spacerText: { color: DEMO.border, fontSize: 12, letterSpacing: 1.4 },

    footer: {
      position: 'absolute',
      left: 20,
      right: 20,
      bottom: 34,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: DEMO.surface,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: DEMO.border,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    footerLabel: { color: DEMO.muted, fontSize: 12 },
    restart: {
      backgroundColor: DEMO.accent,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 9,
    },
    restartLabel: { color: '#ffffff', fontSize: 13, fontWeight: '800' },
  });
