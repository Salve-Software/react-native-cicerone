import type { RefObject } from 'react';
import type { HostInstance } from 'react-native';

export interface ICiceroneScrollHandle {
  scrollTo: (options: { y: number; animated: boolean }) => void;
  containerRef: RefObject<HostInstance | null>;
  getOffset: () => number;
  getContentHeight: () => number;
}
