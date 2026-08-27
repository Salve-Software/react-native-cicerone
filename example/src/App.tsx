import type { IExampleMode } from '~/components/ModeSwitcher/types';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { DemoScreen } from '~/components/DemoScreen';
import { ModeSwitcher } from '~/components/ModeSwitcher';
import { DEMO } from '~/constants';
import { StorybookUI } from '~storybook';

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: DEMO.background },
  stage: { flex: 1 },
});

const Shell = () => {
  const [mode, setMode] = useState<IExampleMode>('demo');
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <View style={styles.stage}>
        {mode === 'demo' ? <DemoScreen /> : <StorybookUI />}
      </View>
      <View style={{ paddingBottom: insets.bottom }}>
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
