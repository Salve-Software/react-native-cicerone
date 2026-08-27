import type { ICiceroneStep } from '@salve-software/react-native-cicerone';

/** Mirrors the Rotuz scanner tour: static targets, a scrolled one, and the upsell. */
export const TOUR_STEPS: ICiceroneStep[] = [
  {
    id: 'reticle',
    title: 'Scan in bulk',
    text: 'Run several products in a row without stopping — every read is automatic and lands in your list.',
    padding: 26,
    radius: 28,
  },
  {
    id: 'scanbtn',
    title: 'Scanner always at hand',
    text: 'This button opens the scanner from anywhere in the app.',
    padding: 5,
    radius: 'circle',
  },
  {
    id: 'history',
    title: 'Your history',
    text: 'Everything you scan is stored on the device — no account, no login. This target sits below the fold, so the tour scrolls to it.',
    padding: 8,
    radius: 24,
  },
  {
    id: 'score',
    title: 'The Rotuz Score',
    text: 'From 0 (avoid) to 100 (excellent): nutrition, processing and additives in a single number.',
    padding: 8,
    radius: 32,
  },
  {
    id: 'premium',
    title: 'Rotuz Premium',
    text: 'Search without scanning, work offline in the shop, and get healthier alternatives for every product.',
    padding: 6,
    radius: 20,
    variant: 'highlight',
    label: 'ROTUZ PREMIUM',
  },
];
