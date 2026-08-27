import type { Preview } from '@storybook/react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DEMO } from '~/constants';

const styles = StyleSheet.create({
  stage: { flex: 1, backgroundColor: DEMO.background },
});

const preview: Preview = {
  decorators: [
    // Every story mounts a tour, which paints over the whole screen.
    (Story) => (
      <View style={styles.stage}>
        <Story />
      </View>
    ),
  ],
  parameters: {
    controls: { expanded: true },
  },
};

export default preview;
