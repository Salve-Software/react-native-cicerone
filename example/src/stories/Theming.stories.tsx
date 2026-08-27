import type { Meta, StoryObj } from '@storybook/react-native';
import { Pressable, Text, View } from 'react-native';
import { TourStage } from './TourStage';

const meta = {
  title: 'Tour/Theming',
  component: TourStage,
} satisfies Meta<typeof TourStage>;

export default meta;
type Story = StoryObj<typeof meta>;

const STEP = {
  title: 'Your own palette',
  text: 'Pass a subset of the theme; the rest keeps the shipped values.',
  padding: 12,
  radius: 24,
};

export const CustomTheme: Story = {
  args: {
    step: STEP,
    theme: {
      ring: '#ff8a5b',
      ringGlow: 'rgba(255,138,91,.5)',
      scrim: 'rgba(24,10,4,.62)',
      card: { label: '#c2410c', buttonBackground: '#ff8a5b', buttonText: '#1a0d06' },
    },
  },
};

export const CustomLabels: Story = {
  args: {
    step: STEP,
    labels: { next: 'Próximo', last: 'Entendi', skip: 'Pular', stepSingle: 'DICA' },
  },
};

/** `renderCard` replaces the card wholesale; the spotlight stays. */
export const CustomCard: Story = {
  args: {
    step: STEP,
    renderCard: ({ step, next, skip }) => (
      <View
        style={{
          position: 'absolute',
          left: 24,
          right: 24,
          bottom: 64,
          padding: 18,
          borderRadius: 14,
          backgroundColor: '#111827',
          borderWidth: 1,
          borderColor: '#374151',
        }}
      >
        <Text style={{ color: '#f9fafb', fontSize: 16, fontWeight: '800' }}>
          {step.title}
        </Text>
        <Text style={{ color: '#9ca3af', fontSize: 13, marginTop: 6 }}>{step.text}</Text>
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
          <Pressable onPress={skip}>
            <Text style={{ color: '#6b7280', fontWeight: '700' }}>Dismiss</Text>
          </Pressable>
          <Pressable onPress={next}>
            <Text style={{ color: '#60a5fa', fontWeight: '700' }}>Continue</Text>
          </Pressable>
        </View>
      </View>
    ),
  },
};
