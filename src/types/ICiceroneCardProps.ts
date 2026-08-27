import type { ICiceroneCardPalette } from './ICiceroneCardPalette';
import type { ICiceroneLabels } from './ICiceroneLabels';
import type { ICiceronePlacement } from './ICiceronePlacement';
import type { ICiceroneStep } from './ICiceroneStep';

export interface ICiceroneCardProps {
  step: ICiceroneStep;
  index: number;
  total: number;
  isFirst: boolean;
  isLast: boolean;
  placement: ICiceronePlacement;
  palette: ICiceroneCardPalette;
  labels: ICiceroneLabels;
  next: () => void;
  previous: () => void;
  skip: () => void;
  stop: () => void;
}
