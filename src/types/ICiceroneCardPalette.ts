export interface ICiceroneCardPalette {
  cardBackground: string;
  /** Second gradient stop. Omitted, the card is a solid colour. */
  cardBackgroundGradient?: string;
  arrowBackground: string;
  label: string;
  title: string;
  text: string;
  skip: string;
  buttonBackground: string;
  buttonText: string;
}
