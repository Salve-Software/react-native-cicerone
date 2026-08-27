import type { IDemoSectionProps } from './types';
import React from 'react';
import { Text, View } from 'react-native';
import { useStyles } from './styles';

export const DemoSection: React.FC<IDemoSectionProps> = (props) => {
  const { title, subtitle, children } = props;
  const styles = useStyles();

  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {children}
    </View>
  );
};
