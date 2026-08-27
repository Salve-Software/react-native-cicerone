import type { HostInstance, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import type { ICiceroneScrollContextValue } from '@/types';
import type { ICiceroneScrollViewProps } from '@/components/CiceroneScrollView/types';
import type { IScrollInstance } from './types';
import { useCallback, useId, useMemo, useRef } from 'react';

export const useCiceroneScrollViewViewModel = (props: ICiceroneScrollViewProps) => {
  const { onScroll, onContentSizeChange } = props;
  const id = useId();
  const scrollRef = useRef<IScrollInstance | null>(null);
  const containerRef = useRef<HostInstance | null>(null);
  const offsetRef = useRef(0);
  const contentHeightRef = useRef(0);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      offsetRef.current = event.nativeEvent.contentOffset.y;
      onScroll?.(event);
    },
    [onScroll],
  );

  const handleContentSizeChange = useCallback(
    (width: number, height: number) => {
      contentHeightRef.current = height;
      onContentSizeChange?.(width, height);
    },
    [onContentSizeChange],
  );

  const handleRef = useCallback((node: IScrollInstance | null) => {
    scrollRef.current = node;
    containerRef.current = node as HostInstance | null;
  }, []);

  const scrollContext = useMemo<ICiceroneScrollContextValue>(
    () => ({
      id,
      handle: {
        containerRef,
        scrollTo: (options) => scrollRef.current?.scrollTo(options),
        getOffset: () => offsetRef.current,
        getContentHeight: () => contentHeightRef.current,
      },
    }),
    [id],
  );

  return { handleRef, scrollContext, handleScroll, handleContentSizeChange };
};
