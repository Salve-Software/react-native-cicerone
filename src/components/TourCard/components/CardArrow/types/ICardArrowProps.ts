import type { ICiceronePlacement } from '@/types';

export interface ICardArrowProps {
  placement: ICiceronePlacement;
  /** Arrow centre, relative to the card's left edge. */
  left: number;
  color: string;
}
