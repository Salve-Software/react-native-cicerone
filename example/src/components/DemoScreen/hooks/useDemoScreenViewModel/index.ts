import { useCallback } from 'react';
import { useCicerone } from 'react-native-cicerone';

export const useDemoScreenViewModel = () => {
  const { start, reset, isRunning, index, total } = useCicerone();

  /** The demo restarts on demand, so `force` skips the seen check. */
  const restart = useCallback(() => {
    reset();
    start({ force: true });
  }, [reset, start]);

  const progress = isRunning ? `Step ${index + 1} of ${total}` : 'Idle';

  return { restart, isRunning, progress };
};
