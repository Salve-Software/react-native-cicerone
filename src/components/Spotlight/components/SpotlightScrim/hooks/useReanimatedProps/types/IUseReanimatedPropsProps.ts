import type { ICiceroneGeometry } from '@/types';

export interface IUseReanimatedPropsProps {
  geometry: ICiceroneGeometry;
  isExiting: boolean;
  screen: { width: number; height: number };
}
