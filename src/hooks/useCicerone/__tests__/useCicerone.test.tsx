import type { ICiceroneContextValue } from '@/types';
import type { ReactNode } from 'react';
import React from 'react';
import { describe, expect, it } from '@jest/globals';
import { renderHook } from '@testing-library/react-native';
import { CiceroneContext } from '@/context';
import { useCicerone } from '@/hooks/useCicerone';

const mountWrapper =
  (value: ICiceroneContextValue) =>
  ({ children }: { children: ReactNode }) => (
    <CiceroneContext.Provider value={value}>{children}</CiceroneContext.Provider>
  );

describe('useCicerone', () => {
  it('Hands back the controller the provider put in context', async () => {
    const value = { index: 3, isRunning: true } as ICiceroneContextValue;
    const { result } = await renderHook(() => useCicerone(), {
      wrapper: mountWrapper(value),
    });

    expect(result.current).toBe(value);
  });

  it('Names the missing provider, rather than failing on undefined later', async () => {
    await expect(async () => {
      await renderHook(() => useCicerone());
    }).rejects.toThrow('useCicerone must be used inside a <CiceroneProvider>.');
  });
});
