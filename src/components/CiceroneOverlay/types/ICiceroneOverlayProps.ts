import type { ICiceroneGeometry, ICiceroneProviderProps, ICiceroneStep } from '@/types';

export interface ICiceroneOverlayProps {
  geometry: ICiceroneGeometry;
  step: ICiceroneStep;
  index: number;
  total: number;
  isFirst: boolean;
  isLast: boolean;
  next: () => void;
  previous: () => void;
  skip: () => void;
  stop: () => void;
  options: ICiceroneProviderProps;
}
