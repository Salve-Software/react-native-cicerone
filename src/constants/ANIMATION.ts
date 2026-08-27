/** Durations and curves taken from the Rotuz clickable prototype. */
export const ANIMATION = {
  easeOutExpo: [0.22, 1, 0.36, 1],
  holeDuration: 550,
  cardInDuration: 550,
  cardOutDuration: 300,
  scrimInDuration: 450,
  scrimOutDuration: 340,
  ringInDuration: 620,
  /** Half cycle: rtzGlow runs 2.2s round trip. */
  glowPulseDuration: 1100,
  highlightGlowDuration: 900,
  sparkleDuration: 1600,
  sheenDuration: 2600,
  startDelay: 800,
} as const;

/** rtzBalOut: drops and shrinks slightly as it fades. */
export const CARD_EXIT = {
  toTranslateY: 14,
  toScale: 0.92,
} as const;

/** The prototype peaks at 60% of the way in, then settles back. */
export const CARD_ENTRANCE = {
  fromTranslateY: 16,
  fromScale: 0.9,
  overshootTranslateY: -4,
  overshootScale: 1.015,
} as const;
