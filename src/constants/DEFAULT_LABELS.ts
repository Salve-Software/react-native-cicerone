import type { ICiceroneLabels } from '@/types';

/** English defaults, since the lib ships publicly; override via `labels`. */
export const DEFAULT_LABELS: ICiceroneLabels = {
  step: 'TIP {{current}} OF {{total}}',
  stepSingle: 'TIP',
  next: 'Next',
  last: 'Got it',
  skip: 'Skip',
};
