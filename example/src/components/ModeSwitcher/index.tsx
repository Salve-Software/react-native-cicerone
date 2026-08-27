import type { IModeSwitcherProps } from './types';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useModeSwitcherViewModel } from './hooks/useModeSwitcherViewModel';
import { useStyles } from './styles';

export const ModeSwitcher: React.FC<IModeSwitcherProps> = (props) => {
  const styles = useStyles();
  const { modes, isActive, select } = useModeSwitcherViewModel(props);

  return (
    <View style={styles.root}>
      {modes.map(({ key, label }) => (
        <Pressable
          key={key}
          accessibilityRole="button"
          onPress={() => select(key)}
          style={[styles.tab, isActive(key) && styles.tabActive]}
        >
          <Text style={[styles.label, isActive(key) && styles.labelActive]}>{label}</Text>
        </Pressable>
      ))}
    </View>
  );
};
