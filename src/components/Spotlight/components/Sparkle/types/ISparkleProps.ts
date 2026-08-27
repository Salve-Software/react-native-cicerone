import type { ISparklePosition } from '@/components/Spotlight/components/Sparkles/types';

export interface ISparkleProps {
  /** Indexes the staggered size and delay tables. */
  index: number;
  color: string;
  position: ISparklePosition;
}
