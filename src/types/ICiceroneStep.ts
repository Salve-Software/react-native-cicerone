import type { ICiceronePlacement } from './ICiceronePlacement';
import type { ICiceroneStepVariant } from './ICiceroneStepVariant';

export interface ICiceroneStep {
  id: string;
  title: string;
  text: string;
  padding?: number;
  radius?: number | 'circle';
  variant?: ICiceroneStepVariant;
  label?: string;
  placement?: ICiceronePlacement;
  before?: () => void | Promise<void>;
  beforeDelay?: number;
}
