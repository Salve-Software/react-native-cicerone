import { describe, expect, it } from '@jest/globals';
import { formatStepLabel } from '@/utils/formatStepLabel';

describe('formatStepLabel', () => {
  it('Replaces both placeholders', () => {
    expect(formatStepLabel('TIP {{current}} OF {{total}}', 2, 3)).toBe('TIP 2 OF 3');
  });

  it('Leaves a template without placeholders untouched', () => {
    expect(formatStepLabel('ROTUZ PREMIUM', 1, 3)).toBe('ROTUZ PREMIUM');
  });
});
