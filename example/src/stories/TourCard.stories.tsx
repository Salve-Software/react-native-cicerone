import type { Meta, StoryObj } from '@storybook/react-native';
import { TourStage } from './TourStage';

const meta = {
  title: 'Tour/Card',
  component: TourStage,
  argTypes: {
    align: { control: 'radio', options: ['top', 'bottom'] },
    targetShape: { control: 'radio', options: ['card', 'circle'] },
    overlayPress: { control: 'radio', options: ['next', 'skip', 'none'] },
    allowTargetInteraction: { control: 'boolean' },
  },
} satisfies Meta<typeof TourStage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    step: {
      title: 'Anything can be a target',
      text: 'Wrap it in Cicerone.Target and the hole follows whatever it measures.',
      padding: 12,
      radius: 24,
    },
  },
};

/** The card flips to the other side once the target crosses the screen middle. */
export const AboveTheTarget: Story = {
  args: { ...Default.args, align: 'bottom' },
};

export const CircleTarget: Story = {
  args: {
    ...Default.args,
    targetShape: 'circle',
    step: { ...Default.args.step, radius: 'circle', padding: 8 },
  },
};

/** One step, so the counter collapses to a bare label. */
export const SingleStep: Story = {
  args: {
    ...Default.args,
    step: {
      ...Default.args.step,
      title: 'One step only',
      text: 'The counter collapses when there is nothing to count.',
    },
  },
};

export const CustomLabel: Story = {
  args: {
    ...Default.args,
    step: { ...Default.args.step, label: 'WHAT IS NEW' },
  },
};
