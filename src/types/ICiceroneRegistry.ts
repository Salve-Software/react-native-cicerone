import type { RefObject } from 'react';
import type { HostInstance } from 'react-native';
import type { ICiceroneScrollHandle } from './ICiceroneScrollHandle';

export interface ICiceroneRegistry {
  registerTarget: (id: string, ref: RefObject<HostInstance | null>) => () => void;
  registerScroll: (id: string, handle: ICiceroneScrollHandle) => () => void;
}
