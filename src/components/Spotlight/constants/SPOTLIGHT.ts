/** Ring glow and entrance, taken from the clickable prototype. */
export const SPOTLIGHT = {
  glowMinOpacity: 0.35,
  glowMaxOpacity: 0.75,
  glowMaxScale: 1.06,
  glowShadowRadius: 18,
  /** Slack on the scrim spread, so rounding can never expose a screen edge. */
  scrimMargin: 2,
  ringInScale: 0.35,
  ringInRotate: -100,
  ringOvershootScale: 1.09,
  ringOvershootRotate: 8,
  /** rtzPremRing pulses the ring towards this at the peak. */
  highlightRingColor: '#ffd970',
} as const;

export const SPARKLE = {
  sizes: [11, 8, 12, 8],
  delays: [0, 400, 800, 1200],
  minScale: 0.25,
  maxScale: 1.15,
} as const;
