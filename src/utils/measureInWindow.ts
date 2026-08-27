import type { RefObject } from 'react';
import type { HostInstance } from 'react-native';
import type { ICiceroneRect } from '@/types';

export const measureInWindow = (ref: RefObject<HostInstance | null>) =>
  new Promise<ICiceroneRect | null>((resolve) => {
    const node = ref.current;
    if (!node) return resolve(null);

    node.measureInWindow((x, y, width, height) => {
      // Android reports 0x0 until the view has been through layout.
      if (width === 0 && height === 0) return resolve(null);
      resolve({ x, y, width, height });
    });
  });
