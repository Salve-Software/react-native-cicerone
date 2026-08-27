import { CiceroneProvider } from './providers/CiceroneProvider';
import { CiceroneScrollView } from './components/CiceroneScrollView';
import { Target } from './components/Target';

export { CiceroneProvider } from './providers/CiceroneProvider';
export { CiceroneScrollView } from './components/CiceroneScrollView';
export { Target } from './components/Target';
export { TourCard } from './components/TourCard';
export { useCicerone } from './hooks';
export { createMemoryStorage } from './storage';
export { CICERONE, DEFAULT_LABELS, DEFAULT_THEME } from './constants';
export type * from './types';

/** Reads as `<Cicerone.Target>` at the call site. */
export const Cicerone = {
  Provider: CiceroneProvider,
  Target,
  ScrollView: CiceroneScrollView,
};
