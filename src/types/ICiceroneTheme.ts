import type { ICiceroneCardPalette } from './ICiceroneCardPalette';

export interface ICiceroneTheme {
  scrim: string;
  ring: string;
  ringGlow: string;
  ringWidth: number;
  card: ICiceroneCardPalette;
  highlight: ICiceroneCardPalette;
}
