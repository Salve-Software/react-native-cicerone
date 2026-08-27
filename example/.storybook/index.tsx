import { view } from './storybook.requires';

export const StorybookUI = view.getStorybookUI({
  storage: require('@react-native-async-storage/async-storage').default,
});
