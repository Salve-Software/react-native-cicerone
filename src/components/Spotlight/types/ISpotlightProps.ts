import type { ReactNode } from 'react';
import type { ICiceroneGeometry, ICiceroneOverlayPress, ICiceroneTheme } from '@/types';

export interface ISpotlightProps {
  geometry: ICiceroneGeometry;
  theme: ICiceroneTheme;
  isHighlight: boolean;
  isExiting: boolean;
  /** The overlay's own box, which is the window only when it sits at the root. */
  screen: { width: number; height: number };
  overlayPress: ICiceroneOverlayPress;
  allowTargetInteraction: boolean;
  onPress: () => void;
  renderBackdrop?: (props: { geometry: ICiceroneGeometry }) => ReactNode;
}
