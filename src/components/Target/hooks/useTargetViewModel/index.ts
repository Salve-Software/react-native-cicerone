import type { ITargetProps } from '@/components/Target/types';
import type { HostInstance } from 'react-native';
import { useContext, useEffect, useRef } from 'react';
import { CiceroneContext, CiceroneScrollContext } from '@/context';

export const useTargetViewModel = (props: Pick<ITargetProps, 'id'>) => {
  const { id } = props;
  const ref = useRef<HostInstance | null>(null);
  const cicerone = useContext(CiceroneContext);
  const scroll = useContext(CiceroneScrollContext);

  useEffect(() => {
    if (!cicerone) return;
    return cicerone.registerTarget(id, ref);
  }, [cicerone, id]);

  useEffect(() => {
    if (!cicerone || !scroll) return;
    return cicerone.registerScroll(id, scroll.handle);
  }, [cicerone, scroll, id]);

  return { ref };
};
