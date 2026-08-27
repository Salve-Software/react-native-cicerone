import type { ICiceroneStep } from './ICiceroneStep';

export interface ICiceroneController {
  isRunning: boolean;
  step: ICiceroneStep | null;
  index: number;
  total: number;
  isFirst: boolean;
  isLast: boolean;
  start: () => void;
  stop: () => void;
  next: () => void;
  previous: () => void;
  skip: () => void;
  goTo: (index: number) => void;
}
