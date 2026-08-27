import type { ICiceroneTheme } from '@/types';

/** Palette taken from the clickable prototype. */
export const DEFAULT_THEME: ICiceroneTheme = {
  scrim: 'rgba(11,18,13,.55)',
  ring: '#5fd694',
  ringGlow: 'rgba(95,214,148,.5)',
  ringWidth: 2.5,
  card: {
    cardBackground: '#fffdf8',
    arrowBackground: '#fffdf8',
    label: '#1f7042',
    title: '#1e2b20',
    text: '#5f6d5c',
    skip: '#a5ac9a',
    buttonBackground: '#2e9e5b',
    buttonText: '#ffffff',
  },
  highlight: {
    cardBackground: '#1f7042',
    cardBackgroundGradient: '#143b26',
    arrowBackground: '#1d5c38',
    label: '#ffd970',
    title: '#ffffff',
    text: 'rgba(255,255,255,.85)',
    skip: 'rgba(255,255,255,.55)',
    buttonBackground: '#ffd970',
    buttonText: '#1e2b20',
  },
};
