import type { ICiceroneContextValue } from '@/types';
import { createContext } from 'react';

export const CiceroneContext = createContext<ICiceroneContextValue | null>(null);
