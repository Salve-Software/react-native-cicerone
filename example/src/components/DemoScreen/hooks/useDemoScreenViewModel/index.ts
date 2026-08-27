import { useCicerone } from '@salve-software/react-native-cicerone';

export const useDemoScreenViewModel = () => {
  const { start, isRunning, index, total } = useCicerone();

  const progress = isRunning ? `Step ${index + 1} of ${total}` : 'Idle';

  return { restart: start, isRunning, progress };
};
