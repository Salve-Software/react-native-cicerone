import type { IExampleMode, IModeSwitcherProps } from '~/components/ModeSwitcher/types';
import { useCallback } from 'react';

const MODES: { key: IExampleMode; label: string }[] = [
  { key: 'demo', label: 'Demo' },
  { key: 'storybook', label: 'Storybook' },
];

export const useModeSwitcherViewModel = (props: IModeSwitcherProps) => {
  const { mode, onChange } = props;

  const isActive = useCallback((key: IExampleMode) => key === mode, [mode]);

  return { modes: MODES, isActive, select: onChange };
};
