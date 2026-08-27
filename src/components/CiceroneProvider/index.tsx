import type { ICiceroneContextValue, ICiceroneProviderProps } from '@/types';
import React from 'react';
import { CiceroneContext } from '@/context';
import { CiceroneOverlay } from '@/components/CiceroneOverlay';
import { useCiceroneProviderViewModel } from './hooks/useCiceroneProviderViewModel';

export const CiceroneProvider: React.FC<ICiceroneProviderProps> = (props) => {
  const { children } = props;
  const { geometry, ...controller } = useCiceroneProviderViewModel(props);
  const contextValue: ICiceroneContextValue = controller;
  const { step, isVisible, isExiting } = controller;

  return (
    <CiceroneContext.Provider value={contextValue}>
      {children}

      {isVisible && !!geometry && !!step && (
        <CiceroneOverlay
          geometry={geometry}
          step={step}
          index={controller.index}
          total={controller.total}
          isFirst={controller.isFirst}
          isLast={controller.isLast}
          isExiting={isExiting}
          next={controller.next}
          previous={controller.previous}
          skip={controller.skip}
          stop={controller.stop}
          options={props}
        />
      )}
    </CiceroneContext.Provider>
  );
};
