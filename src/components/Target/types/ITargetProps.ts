import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface ITargetProps {
  id: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}
