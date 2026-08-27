import type { StyleProp, ViewStyle } from 'react-native';
import type { ICardLayout, ICiceroneCardProps } from '@/types';

export interface ITourCardProps extends ICiceroneCardProps {
  layout: ICardLayout;
  width: number;
  isExiting: boolean;
  style?: StyleProp<ViewStyle>;
}
