import type { ICiceronePlacement } from './ICiceronePlacement';
import type { ICiceroneStepVariant } from './ICiceroneStepVariant';

export interface ICiceroneStep {
  /** Matches the `id` of a `Cicerone.Target` mounted in the tree. */
  id: string;
  title: string;
  text: string;
  /** Gap between target and ring, in px. */
  padding?: number;
  /** `'circle'` rounds by half of the shortest side. */
  radius?: number | 'circle';
  variant?: ICiceroneStepVariant;
  /** Without it, falls back to the step counter. */
  label?: string;
  /** Overrides the screen-half rule. */
  placement?: ICiceronePlacement;
  /** Runs before measuring — opens a sheet holding the target, say. */
  before?: () => void | Promise<void>;
  /** Wait after `before`, for its animation to settle. */
  beforeDelay?: number;
}
