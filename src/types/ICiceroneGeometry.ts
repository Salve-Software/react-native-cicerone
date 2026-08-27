import type { ICiceroneRect } from './ICiceroneRect';

export interface ICiceroneGeometry {
  hole: ICiceroneRect;
  holeRadius: number;
  /** Sits outside the hole by the step padding, leaving that band dimmed. */
  ring: ICiceroneRect;
  ringRadius: number;
}
