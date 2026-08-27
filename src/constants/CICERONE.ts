/** Geometry taken from the Rotuz clickable prototype. */
export const CICERONE = {
  stepPadding: 8,
  /** Floors, so a square-cornered target does not read as a hard box. */
  minRingRadius: 16,
  minHoleRadius: 15,
  cardOffset: 18,
  cardWidth: 284,
  cardScreenMargin: 16,
  arrowSize: 14,
  /** Overlaps the card edge, otherwise the seam shows. */
  arrowOverlap: 6,
} as const;
