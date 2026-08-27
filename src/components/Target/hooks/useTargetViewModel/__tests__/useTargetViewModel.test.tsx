import type { ICiceroneContextValue, ICiceroneScrollContextValue } from '@/types';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-native';
import { CiceroneContext, CiceroneScrollContext } from '@/context';
import { useTargetViewModel } from '@/components/Target/hooks/useTargetViewModel';

const unregisterTarget = jest.fn();
const unregisterScroll = jest.fn();
const registerTarget = jest.fn<(id: string, ref: unknown) => () => void>(
  () => unregisterTarget,
);
const registerScroll = jest.fn<(id: string, handle: unknown) => () => void>(
  () => unregisterScroll,
);

const cicerone = { registerTarget, registerScroll } as unknown as ICiceroneContextValue;

const scroll: ICiceroneScrollContextValue = {
  id: 'scroll-1',
  handle: {
    containerRef: { current: null },
    scrollTo: jest.fn(),
    getOffset: () => 0,
    getContentHeight: () => 0,
  },
};

const mountWrapper =
  (options: { withScroll?: boolean } = {}) =>
  ({ children }: { children: ReactNode }) => (
    <CiceroneContext.Provider value={cicerone}>
      {options.withScroll ? (
        <CiceroneScrollContext.Provider value={scroll}>
          {children}
        </CiceroneScrollContext.Provider>
      ) : (
        children
      )}
    </CiceroneContext.Provider>
  );

describe('useTargetViewModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerTarget', () => {
    it('Announces the target to the provider under its id', async () => {
      await renderHook(() => useTargetViewModel({ id: 'reticle' }), {
        wrapper: mountWrapper(),
      });

      expect(registerTarget).toHaveBeenCalledTimes(1);
      expect(registerTarget.mock.calls[0]?.[0]).toBe('reticle');
    });

    it('Unregisters on unmount, so a stale ref cannot be measured', async () => {
      const { unmount } = await renderHook(() => useTargetViewModel({ id: 'reticle' }), {
        wrapper: mountWrapper(),
      });

      await unmount();

      expect(unregisterTarget).toHaveBeenCalledTimes(1);
    });

    it('Does nothing outside a provider, so a bare Target still renders', async () => {
      const { result } = await renderHook(() => useTargetViewModel({ id: 'orphan' }));

      expect(registerTarget).not.toHaveBeenCalled();
      expect(result.current.ref).toBeDefined();
    });
  });

  describe('registerScroll', () => {
    it('Does NOT register a scroll handle outside a scrollable area', async () => {
      await renderHook(() => useTargetViewModel({ id: 'reticle' }), {
        wrapper: mountWrapper(),
      });

      expect(registerScroll).not.toHaveBeenCalled();
    });

    it('Binds the enclosing scroll handle to the target id', async () => {
      await renderHook(() => useTargetViewModel({ id: 'histbody' }), {
        wrapper: mountWrapper({ withScroll: true }),
      });

      expect(registerScroll).toHaveBeenCalledWith('histbody', scroll.handle);
    });

    it('Releases the scroll handle on unmount', async () => {
      const { unmount } = await renderHook(() => useTargetViewModel({ id: 'histbody' }), {
        wrapper: mountWrapper({ withScroll: true }),
      });

      await unmount();

      expect(unregisterScroll).toHaveBeenCalledTimes(1);
    });
  });
});
