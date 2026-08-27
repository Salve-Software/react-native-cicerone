import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { ICiceroneCardProps } from './ICiceroneCardProps';
import type { ICiceroneGeometry } from './ICiceroneGeometry';
import type { ICiceroneLabels } from './ICiceroneLabels';
import type { ICiceroneOverlayPress } from './ICiceroneOverlayPress';
import type { ICiceroneStep } from './ICiceroneStep';
import type { ICiceroneStopReason } from './ICiceroneStopReason';
import type { ICiceroneStorage } from './ICiceroneStorage';
import type { ICiceroneTheme } from './ICiceroneTheme';

export interface ICiceroneProviderProps {
  children: ReactNode;
  steps: ICiceroneStep[];
  /** Without it, the tour is not remembered across sessions. */
  tourKey?: string;
  /** Only fires for a tour that has not been seen. */
  autoStart?: boolean;
  startDelay?: number;
  theme?: Partial<ICiceroneTheme>;
  labels?: Partial<ICiceroneLabels>;
  overlayPress?: ICiceroneOverlayPress;
  /** Lets the press reach the target instead of the overlay capturing it. */
  allowTargetInteraction?: boolean;
  renderCard?: (props: ICiceroneCardProps) => ReactNode;
  /** Drawn behind the scrim, inside the cut-out — for plugging in a blur. */
  renderBackdrop?: (props: { geometry: ICiceroneGeometry }) => ReactNode;
  onStart?: () => void;
  onStepChange?: (index: number, step: ICiceroneStep) => void;
  onStop?: (reason: ICiceroneStopReason) => void;
  cardStyle?: StyleProp<ViewStyle>;
  cardWidth?: number;
  /** Where to keep what was already seen. Without it, state dies with the app. */
  storage?: ICiceroneStorage;
}
