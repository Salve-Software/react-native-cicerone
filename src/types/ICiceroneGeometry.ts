import type { ICiceroneRect } from './ICiceroneRect';

export interface ICiceroneGeometry {
  hole: ICiceroneRect;
  holeRadius: number;
  ring: ICiceroneRect;
  ringRadius: number;
}
