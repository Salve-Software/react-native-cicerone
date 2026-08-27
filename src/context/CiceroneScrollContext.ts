import type { ICiceroneScrollContextValue } from '@/types';
import { createContext } from 'react';

/** Lets a `Target` discover its scrollable area without being told. */
export const CiceroneScrollContext = createContext<ICiceroneScrollContextValue | null>(
  null,
);
