import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { ICiceroneCardProps } from './ICiceroneCardProps';
import type { ICiceroneGeometry } from './ICiceroneGeometry';
import type { ICiceroneLabels } from './ICiceroneLabels';
import type { ICiceroneOverlayPress } from './ICiceroneOverlayPress';
import type { ICiceroneStep } from './ICiceroneStep';
import type { ICiceroneStopReason } from './ICiceroneStopReason';
import type { ICiceroneStorage } from './ICiceroneStorage';
import type { ICiceroneThemeOverride } from './ICiceroneThemeOverride';

export interface ICiceroneProviderProps {
  children: ReactNode;
  steps: ICiceroneStep[];
  tourKey?: string;
  autoStart?: boolean;
  startDelay?: number;
  theme?: ICiceroneThemeOverride;
  labels?: Partial<ICiceroneLabels>;
  overlayPress?: ICiceroneOverlayPress;
  allowTargetInteraction?: boolean;
  renderCard?: (props: ICiceroneCardProps) => ReactNode;
  renderBackdrop?: (props: { geometry: ICiceroneGeometry }) => ReactNode;
  onStart?: () => void;
  onStepChange?: (index: number, step: ICiceroneStep) => void;
  onStop?: (reason: ICiceroneStopReason) => void;
  cardStyle?: StyleProp<ViewStyle>;
  cardWidth?: number;
  storage?: ICiceroneStorage;
}
