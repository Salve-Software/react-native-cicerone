import type { ICiceroneContextValue } from '@/types';
import { useContext } from 'react';
import { CiceroneContext } from '@/context';

export const useCicerone = (): ICiceroneContextValue => {
  const context = useContext(CiceroneContext);

  if (!context) {
    throw new Error('useCicerone must be used inside a <CiceroneProvider>.');
  }

  return context;
};
