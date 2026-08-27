import type { ITargetProps } from './types';
import React from 'react';
import { View } from 'react-native';
import { useTargetViewModel } from './hooks/useTargetViewModel';

/** Registers itself with the provider; no ref to wire up. */
export const Target: React.FC<ITargetProps> = (props) => {
  const { children, style } = props;
  const { ref } = useTargetViewModel(props);

  return (
    <View ref={ref} style={style} collapsable={false}>
      {children}
    </View>
  );
};
