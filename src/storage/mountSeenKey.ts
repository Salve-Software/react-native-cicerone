import { STORAGE } from './constants';

export const mountSeenKey = (tourKey: string) => `${STORAGE.seenKeyPrefix}${tourKey}`;
