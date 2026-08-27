import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { describe, expect, it, jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-native';
import { useCiceroneScrollViewViewModel } from '@/components/CiceroneScrollView/hooks/useCiceroneScrollViewViewModel';

const mountScrollEvent = (y: number) =>
  ({ nativeEvent: { contentOffset: { y } } }) as NativeSyntheticEvent<NativeScrollEvent>;

describe('useCiceroneScrollViewViewModel', () => {
  describe('handleScroll', () => {
    it('Tracks the offset so the tour knows where the content already sits', async () => {
      const { result } = await renderHook(() => useCiceroneScrollViewViewModel({}));

      result.current.handleScroll(mountScrollEvent(240));

      expect(result.current.scrollContext.handle.getOffset()).toBe(240);
    });

    it('Still forwards the event to the consumer handler', async () => {
      const onScroll = jest.fn();
      const { result } = await renderHook(() =>
        useCiceroneScrollViewViewModel({ onScroll }),
      );
      const event = mountScrollEvent(120);

      result.current.handleScroll(event);

      expect(onScroll).toHaveBeenCalledWith(event);
    });
  });

  describe('handleContentSizeChange', () => {
    it('Tracks the content height, which bounds how far the tour may scroll', async () => {
      const { result } = await renderHook(() => useCiceroneScrollViewViewModel({}));

      result.current.handleContentSizeChange(400, 2400);

      expect(result.current.scrollContext.handle.getContentHeight()).toBe(2400);
    });

    it('Still forwards the size to the consumer handler', async () => {
      const onContentSizeChange = jest.fn();
      const { result } = await renderHook(() =>
        useCiceroneScrollViewViewModel({ onContentSizeChange }),
      );

      result.current.handleContentSizeChange(400, 2400);

      expect(onContentSizeChange).toHaveBeenCalledWith(400, 2400);
    });
  });

  describe('scrollContext', () => {
    it('Keeps a stable identity, so a Target does not re-register every scroll', async () => {
      const { result } = await renderHook(() => useCiceroneScrollViewViewModel({}));
      const first = result.current.scrollContext;

      result.current.handleScroll(mountScrollEvent(80));

      expect(result.current.scrollContext).toBe(first);
    });

    it('Starts at the top with no measured content', async () => {
      const { result } = await renderHook(() => useCiceroneScrollViewViewModel({}));

      expect(result.current.scrollContext.handle.getOffset()).toBe(0);
      expect(result.current.scrollContext.handle.getContentHeight()).toBe(0);
    });
  });
});
