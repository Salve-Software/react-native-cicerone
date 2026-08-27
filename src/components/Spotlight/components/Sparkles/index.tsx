import type { ISparklesProps } from './types';
import React from 'react';
import { Sparkle } from '@/components/Spotlight/components/Sparkle';
import { SPARKLE_LAYOUT } from './constants';

export const Sparkles: React.FC<ISparklesProps> = (props) => {
  const { color } = props;

  return (
    <>
      {SPARKLE_LAYOUT.map((position, index) => (
        <Sparkle key={index} index={index} color={color} position={position} />
      ))}
    </>
  );
};
