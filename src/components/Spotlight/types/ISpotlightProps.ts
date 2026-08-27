import type { ReactNode } from 'react';
import type { ICiceroneGeometry, ICiceroneOverlayPress, ICiceroneTheme } from '@/types';

export interface ISpotlightProps {
  geometry: ICiceroneGeometry;
  theme: ICiceroneTheme;
  isHighlight: boolean;
  isExiting: boolean;
  overlayPress: ICiceroneOverlayPress;
  allowTargetInteraction: boolean;
  onPress: () => void;
  renderBackdrop?: (props: { geometry: ICiceroneGeometry }) => ReactNode;
}
