import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { ICiceroneCardProps } from './ICiceroneCardProps';
import type { ICiceroneGeometry } from './ICiceroneGeometry';
import type { ICiceroneLabels } from './ICiceroneLabels';
import type { ICiceroneOverlayPress } from './ICiceroneOverlayPress';
import type { ICiceroneStep } from './ICiceroneStep';
import type { ICiceroneStopReason } from './ICiceroneStopReason';
import type { ICiceroneThemeOverride } from './ICiceroneThemeOverride';

export interface ICiceroneProviderProps {
  children: ReactNode;
  steps: ICiceroneStep[];
  /** Defaults to `true`, and still starts the tour if it turns true after mount. */
  autoStart?: boolean;
  /** Milliseconds to wait before starting. Defaults to `800`. */
  startDelay?: number;
  theme?: ICiceroneThemeOverride;
  labels?: Partial<ICiceroneLabels>;
  /** Defaults to `'next'`. `'none'` stops the overlay from taking presses at all. */
  overlayPress?: ICiceroneOverlayPress;
  /** Defaults to `false`. `true` rings the hole with strips so the target stays pressable. */
  allowTargetInteraction?: boolean;
  /** Replaces the card wholesale. The spotlight stays. */
  renderCard?: (props: ICiceroneCardProps) => ReactNode;
  /** Drawn inside the hole, under the scrim, and never takes touches. */
  renderBackdrop?: (props: { geometry: ICiceroneGeometry }) => ReactNode;
  onStart?: () => void;
  onStepChange?: (index: number, step: ICiceroneStep) => void;
  onStop?: (reason: ICiceroneStopReason) => void;
  /** Ignored when `renderCard` is set. */
  cardStyle?: StyleProp<ViewStyle>;
  /** Defaults to `284`. */
  cardWidth?: number;
}
