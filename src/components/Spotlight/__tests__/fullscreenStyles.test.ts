import type * as ReactNative from 'react-native';
import { describe, expect, it, jest } from '@jest/globals';
import { StyleSheet } from 'react-native';
import { DEFAULT_THEME } from '@/constants';
import { useStyles as spotlightStyles } from '@/components/Spotlight/styles';
import { useStyles as tourCardStyles } from '@/components/TourCard/styles';

jest.mock('react-native', () => {
  const native = jest.requireActual<typeof ReactNative>('react-native');
  Object.defineProperty(native.StyleSheet, 'absoluteFillObject', {
    configurable: true,
    value: undefined,
  });
  return native;
});

const fill = { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 };

describe('fullscreen styles without the removed absoluteFillObject export', () => {
  it('keeps the spotlight root and its overlay touch surface filling the screen', () => {
    expect(StyleSheet.flatten(spotlightStyles(DEFAULT_THEME).root)).toMatchObject(fill);
  });

  it('keeps the highlight gradient covering the tour card', () => {
    expect(
      StyleSheet.flatten(tourCardStyles(DEFAULT_THEME.highlight).gradient),
    ).toMatchObject({
      ...fill,
      opacity: 0.9,
    });
  });
});
