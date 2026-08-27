export interface ICardLayout {
  left: number;
  top?: number;
  /** Used above the target, where the card height is not known yet. */
  bottom?: number;
  /** Arrow centre, relative to the card's left edge. */
  arrowLeft: number;
}
