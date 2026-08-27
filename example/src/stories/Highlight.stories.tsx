import type { Meta, StoryObj } from '@storybook/react-native';
import { TourStage } from './TourStage';

const meta = {
  title: 'Tour/Highlight',
  component: TourStage,
} satisfies Meta<typeof TourStage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Gradient card, sweeping sheen, sparkles, and a ring pulsing towards gold. */
export const Highlight: Story = {
  args: {
    targetLabel: 'PREMIUM',
    step: {
      title: 'Rotuz Premium',
      text: 'Search without scanning, work offline, and get healthier alternatives.',
      padding: 8,
      radius: 20,
      variant: 'highlight',
      label: 'ROTUZ PREMIUM',
    },
  },
};

/** The highlight palette is merged, so a subset is enough to reskin it. */
export const HighlightRecoloured: Story = {
  args: {
    ...Highlight.args,
    theme: {
      ring: '#7aa2ff',
      highlight: {
        cardBackground: '#1e2749',
        cardBackgroundGradient: '#0e1430',
        label: '#7aa2ff',
        buttonBackground: '#7aa2ff',
        buttonText: '#0e1430',
      },
    },
  },
};
