import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Cicerone } from 'react-native-cicerone';
import { DemoScreen } from './components/DemoScreen';
import { TOUR_STEPS } from './constants';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Cicerone.Provider steps={TOUR_STEPS} tourKey="demo" allowTargetInteraction>
        <DemoScreen />
      </Cicerone.Provider>
    </SafeAreaProvider>
  );
}
