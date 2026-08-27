import type {
  ICiceroneProviderProps,
  ICiceroneStep,
} from '@salve-software/react-native-cicerone';
import React from 'react';
import { Text, View } from 'react-native';
import { Cicerone } from '@salve-software/react-native-cicerone';
import { useStyles } from './styles';

export interface ITourStageProps extends Omit<
  ICiceroneProviderProps,
  'children' | 'steps'
> {
  step: Omit<ICiceroneStep, 'id'>;
  /** Where the target sits, so a story can push the card to the other side. */
  align?: 'top' | 'bottom';
  targetLabel?: string;
  targetShape?: 'card' | 'circle';
}

/** One target and one step, which is the smallest thing a tour can be. */
export const TourStage: React.FC<ITourStageProps> = (props) => {
  const {
    step,
    align = 'top',
    targetLabel = 'TARGET',
    targetShape = 'card',
    ...rest
  } = props;
  const styles = useStyles();

  return (
    <Cicerone.Provider
      {...rest}
      steps={[{ id: 'story-target', ...step }]}
      startDelay={250}
    >
      <View style={[styles.root, align === 'bottom' && styles.rootBottom]}>
        <Cicerone.Target id="story-target">
          <View style={targetShape === 'circle' ? styles.circle : styles.card}>
            <Text style={styles.label}>
              {targetShape === 'circle' ? '+' : targetLabel}
            </Text>
          </View>
        </Cicerone.Target>
      </View>
    </Cicerone.Provider>
  );
};
