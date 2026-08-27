import type { ICiceroneCardPalette } from './ICiceroneCardPalette';

/** Palettes merge field by field, so a subset is enough to reskin one. */
export interface ICiceroneThemeOverride {
  scrim?: string;
  ring?: string;
  ringGlow?: string;
  ringWidth?: number;
  card?: Partial<ICiceroneCardPalette>;
  highlight?: Partial<ICiceroneCardPalette>;
}
