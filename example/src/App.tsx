import type { IExampleMode } from '~/components/ModeSwitcher/types';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Cicerone } from '@salve-software/react-native-cicerone';
import { DemoScreen } from '~/components/DemoScreen';
import { ModeSwitcher } from '~/components/ModeSwitcher';
import { DEMO, TOUR_STEPS } from '~/constants';
import { StorybookUI } from '~storybook';

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: DEMO.background },
  stage: { flex: 1 },
  bar: { backgroundColor: DEMO.surface },
});

const Shell = () => {
  const [mode, setMode] = useState<IExampleMode>('demo');
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.stage} edges={['top']}>
        {mode === 'demo' ? (
          <Cicerone.Provider steps={TOUR_STEPS} allowTargetInteraction>
            <DemoScreen />
          </Cicerone.Provider>
        ) : (
          <StorybookUI />
        )}
      </SafeAreaView>
      <View style={[styles.bar, { paddingBottom: insets.bottom }]}>
        <ModeSwitcher mode={mode} onChange={setMode} />
      </View>
    </View>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={styles.stage}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Shell />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
