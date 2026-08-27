export interface IScrollDecision {
  needsScroll: boolean;
  /** Absolute offset asked of the ScrollView. Only meaningful with `needsScroll`. */
  offset: number;
}
