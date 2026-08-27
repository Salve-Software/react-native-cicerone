/** Geometry and typography taken from the Rotuz clickable prototype. */
export const TOUR_CARD = {
  radius: 20,
  paddingTop: 17,
  paddingHorizontal: 18,
  paddingBottom: 14,
  labelFontSize: 10,
  /** .13em at the prototype's 10px label. */
  labelLetterSpacing: 1.3,
  labelMarginBottom: 6,
  titleFontSize: 17.5,
  /** -.01em at the prototype's 17.5px title. */
  titleLetterSpacing: -0.18,
  titleMarginBottom: 5,
  textFontSize: 13.5,
  /** 1.5 line-height at the prototype's 13.5px body. */
  textLineHeight: 20,
  actionsMarginTop: 13,
  skipFontSize: 12.5,
  shadowRadius: 30,
  shadowOffsetY: 24,
  shadowOpacity: 0.4,
} as const;

export const TOUR_BUTTON = {
  fontSize: 13,
  radius: 12,
  paddingVertical: 10,
  paddingHorizontal: 18,
  pressedScale: 0.96,
} as const;

export const SHEEN = {
  widthRatio: 0.55,
  skew: -18,
  from: -170,
  to: 300,
} as const;
