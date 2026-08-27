import type { ICiceroneGeometry, ICiceroneTheme } from '@/types';

export interface ISpotlightScrimProps {
  geometry: ICiceroneGeometry;
  theme: ICiceroneTheme;
  isExiting: boolean;
  screen: { width: number; height: number };
}
