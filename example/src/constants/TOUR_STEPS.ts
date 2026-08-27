import type { ICiceroneStep } from '@salve-software/react-native-cicerone';

/** One step per thing worth seeing: both shapes, a scrolled target, the flip, the highlight. */
export const TOUR_STEPS: ICiceroneStep[] = [
  {
    id: 'panel',
    title: 'One element at a time',
    text: 'The screen dims, a hole opens around the target, and the card takes whichever side has more room.',
    padding: 26,
    radius: 28,
  },
  {
    id: 'fab',
    title: 'Round holes',
    text: "Set radius to 'circle' and the hole rounds by half the shortest side, whatever the element measures.",
    padding: 5,
    radius: 'circle',
  },
  {
    id: 'list',
    title: 'Below the fold',
    text: 'This target was off screen a second ago. Inside a Cicerone.ScrollView the tour scrolls to it, then measures once the scroll settles.',
    padding: 8,
    radius: 24,
  },
  {
    id: 'stat',
    title: 'The card flips',
    text: 'There is no room underneath down here, so the card went above the target and the arrow moved with it.',
    padding: 8,
    radius: 32,
  },
  {
    id: 'upgrade',
    title: 'Highlight steps',
    text: 'Mark a step as highlight and it gets its own palette, a sheen across the card and sparkles around the ring.',
    padding: 6,
    radius: 20,
    variant: 'highlight',
    label: 'HIGHLIGHT',
  },
];
