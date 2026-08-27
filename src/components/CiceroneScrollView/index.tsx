import type { ICiceroneScrollViewProps } from './types';
import React from 'react';
import { ScrollView } from 'react-native';
import { CiceroneScrollContext } from '@/context';
import { useCiceroneScrollViewViewModel } from './hooks/useCiceroneScrollViewViewModel';

/** A plain ScrollView cannot be scrolled to an off-screen target by the tour. */
export const CiceroneScrollView: React.FC<ICiceroneScrollViewProps> = (props) => {
  const { children, ...rest } = props;
  const { handleRef, scrollContext, handleScroll, handleContentSizeChange } =
    useCiceroneScrollViewViewModel(props);

  return (
    <CiceroneScrollContext.Provider value={scrollContext}>
      <ScrollView
        {...rest}
        ref={handleRef}
        onScroll={handleScroll}
        onContentSizeChange={handleContentSizeChange}
        scrollEventThrottle={rest.scrollEventThrottle ?? 16}
      >
        {children}
      </ScrollView>
    </CiceroneScrollContext.Provider>
  );
};
