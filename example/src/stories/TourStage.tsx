import type {
  ICiceroneProviderProps,
  ICiceroneStep,
} from '@salve-software/react-native-cicerone';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Cicerone, useCicerone } from '@salve-software/react-native-cicerone';
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

const Replay = () => {
  const { isRunning, start } = useCicerone();
  const styles = useStyles();

  if (isRunning) return null;

  return (
    <Pressable style={styles.replay} onPress={() => start()}>
      <Text style={styles.replayLabel}>Replay</Text>
    </Pressable>
  );
};

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
  const isCircle = targetShape === 'circle';

  return (
    <Cicerone.Provider
      // Stories stay put: a press would end a one-step tour and blank the stage.
      overlayPress="none"
      {...rest}
      steps={[{ id: 'story-target', ...step }]}
      startDelay={250}
    >
      <View style={[styles.root, align === 'bottom' && styles.rootBottom]}>
        {/* A Target is a View, so in a column it stretches unless told not to. */}
        <Cicerone.Target id="story-target" style={isCircle ? styles.hug : undefined}>
          <View style={isCircle ? styles.circle : styles.card}>
            <Text style={styles.label}>{isCircle ? '+' : targetLabel}</Text>
          </View>
        </Cicerone.Target>
        <Replay />
      </View>
    </Cicerone.Provider>
  );
};
