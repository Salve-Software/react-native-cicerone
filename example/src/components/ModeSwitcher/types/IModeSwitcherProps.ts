export type IExampleMode = 'demo' | 'storybook';

export interface IModeSwitcherProps {
  mode: IExampleMode;
  onChange: (mode: IExampleMode) => void;
}
