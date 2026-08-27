import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface ITargetProps {
  /** Matches the `id` of a step in `steps`. */
  id: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}
