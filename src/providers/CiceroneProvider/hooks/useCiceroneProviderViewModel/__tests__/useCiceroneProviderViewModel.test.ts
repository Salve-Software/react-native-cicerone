import type { RefObject } from 'react';
import type { HostInstance } from 'react-native';
import type { ICiceroneStep, ICiceroneStorage } from '@/types';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import { mountSeenKey } from '@/storage';
import { useCiceroneProviderViewModel } from '@/providers/CiceroneProvider/hooks/useCiceroneProviderViewModel';

const STEPS: ICiceroneStep[] = [
  { id: 'reticle', title: 'Escaneie em massa', text: '...', padding: 26, radius: 28 },
  { id: 'tray', title: 'Sua leva de scans', text: '...', padding: 6, radius: 30 },
  { id: 'scanbtn', title: 'Scanner à mão', text: '...', padding: 5, radius: 'circle' },
];

/** Ref falso que responde `measureInWindow` como uma View já medida. */
const mountTargetRef = (y = 100): RefObject<HostInstance | null> =>
  ({
    current: {
      measureInWindow: (cb: (x: number, y: number, w: number, h: number) => void) =>
        cb(50, y, 120, 60),
    },
  }) as unknown as RefObject<HostInstance | null>;

const mountStorage = (seed?: Record<string, string>): ICiceroneStorage => {
  const map = new Map<string, string>(Object.entries(seed ?? {}));
  return {
    getItem: jest.fn((key: string) => map.get(key) ?? null),
    setItem: jest.fn((key: string, value: string) => {
      map.set(key, value);
    }),
    removeItem: jest.fn((key: string) => {
      map.delete(key);
    }),
  };
};

const renderViewModel = async (
  overrides: Partial<Parameters<typeof useCiceroneProviderViewModel>[0]> = {},
) => {
  const rendered = await renderHook(() =>
    useCiceroneProviderViewModel({
      children: null,
      steps: STEPS,
      autoStart: false,
      ...overrides,
    }),
  );

  await act(async () => {
    STEPS.forEach((step, i) => {
      rendered.result.current.registerTarget(step.id, mountTargetRef(100 + i * 10));
    });
  });

  return rendered;
};

const startTour = async (result: { current: { start: (o?: never) => void } }) => {
  await act(async () => {
    result.current.start();
  });
};

describe('useCiceroneProviderViewModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('start', () => {
    it('Runs the tour from the first step and measures its geometry', async () => {
      const { result } = await renderViewModel();
      await startTour(result);

      await waitFor(() => expect(result.current.isRunning).toBe(true));
      expect(result.current.index).toBe(0);
      expect(result.current.step?.id).toBe('reticle');
      expect(result.current.geometry?.hole).toEqual({
        x: 50,
        y: 100,
        width: 120,
        height: 60,
      });
    });

    it('Does NOT run a tour already marked as seen', async () => {
      const storage = mountStorage({ [mountSeenKey('scanner')]: '1' });
      const { result } = await renderViewModel({ tourKey: 'scanner', storage });
      await startTour(result);

      await waitFor(() => expect(result.current.isRunning).toBe(false));
    });

    it('Runs a seen tour again when forced', async () => {
      const storage = mountStorage({ [mountSeenKey('scanner')]: '1' });
      const { result } = await renderViewModel({ tourKey: 'scanner', storage });

      await act(async () => {
        result.current.start({ force: true });
      });

      await waitFor(() => expect(result.current.isRunning).toBe(true));
    });
  });

  describe('next', () => {
    it('Advances to the following step', async () => {
      const { result } = await renderViewModel();
      await startTour(result);
      await waitFor(() => expect(result.current.isRunning).toBe(true));

      await act(async () => {
        result.current.next();
      });

      await waitFor(() => expect(result.current.index).toBe(1));
      expect(result.current.step?.id).toBe('tray');
    });

    it('Stops the tour when advancing past the last step', async () => {
      const onStop = jest.fn();
      const { result } = await renderViewModel({ onStop });
      await startTour(result);
      await waitFor(() => expect(result.current.isRunning).toBe(true));

      await act(async () => {
        result.current.goTo(2);
      });
      await waitFor(() => expect(result.current.isLast).toBe(true));

      await act(async () => {
        result.current.next();
      });

      await waitFor(() => expect(result.current.isRunning).toBe(false));
      expect(onStop).toHaveBeenCalledWith('finished');
    });

    it('Marks the tour as seen once it finishes', async () => {
      const storage = mountStorage();
      const { result } = await renderViewModel({ tourKey: 'scanner', storage });
      await startTour(result);
      await waitFor(() => expect(result.current.isRunning).toBe(true));

      await act(async () => {
        result.current.goTo(2);
      });
      await waitFor(() => expect(result.current.isLast).toBe(true));
      await act(async () => {
        result.current.next();
      });

      await waitFor(() =>
        expect(storage.setItem).toHaveBeenCalledWith(mountSeenKey('scanner'), '1'),
      );
    });
  });

  describe('previous', () => {
    it('Goes back one step', async () => {
      const { result } = await renderViewModel();
      await startTour(result);
      await act(async () => {
        result.current.goTo(1);
      });
      await waitFor(() => expect(result.current.index).toBe(1));

      await act(async () => {
        result.current.previous();
      });

      await waitFor(() => expect(result.current.index).toBe(0));
    });

    it('Does nothing on the first step', async () => {
      const { result } = await renderViewModel();
      await startTour(result);
      await waitFor(() => expect(result.current.index).toBe(0));

      await act(async () => {
        result.current.previous();
      });

      expect(result.current.index).toBe(0);
      expect(result.current.isRunning).toBe(true);
    });
  });

  describe('skip', () => {
    it('Ends the tour and reports the reason', async () => {
      const onStop = jest.fn();
      const { result } = await renderViewModel({ onStop });
      await startTour(result);
      await waitFor(() => expect(result.current.isRunning).toBe(true));

      await act(async () => {
        result.current.skip();
      });

      expect(result.current.isRunning).toBe(false);
      expect(onStop).toHaveBeenCalledWith('skipped');
    });

    it('Marks the tour as seen, so skipping is not offered again', async () => {
      const storage = mountStorage();
      const { result } = await renderViewModel({ tourKey: 'scanner', storage });
      await startTour(result);
      await waitFor(() => expect(result.current.isRunning).toBe(true));

      await act(async () => {
        result.current.skip();
      });

      await waitFor(() =>
        expect(storage.setItem).toHaveBeenCalledWith(mountSeenKey('scanner'), '1'),
      );
    });
  });

  describe('exiting', () => {
    it('Holds the overlay mounted with its geometry while it fades out', async () => {
      const { result } = await renderViewModel();
      await startTour(result);
      await waitFor(() => expect(result.current.isRunning).toBe(true));

      await act(async () => {
        result.current.skip();
      });

      expect(result.current.isRunning).toBe(false);
      expect(result.current.isExiting).toBe(true);
      expect(result.current.isVisible).toBe(true);
      expect(result.current.geometry).not.toBeNull();
    });

    it('Drops the geometry once the fade is over', async () => {
      const { result } = await renderViewModel();
      await startTour(result);
      await waitFor(() => expect(result.current.isRunning).toBe(true));

      await act(async () => {
        result.current.skip();
      });

      await waitFor(() => expect(result.current.isVisible).toBe(false), {
        timeout: 2000,
      });
      expect(result.current.geometry).toBeNull();
      expect(result.current.isExiting).toBe(false);
    });

    it('Does NOT advance while fading out, so a stray press cannot revive it', async () => {
      const { result } = await renderViewModel();
      await startTour(result);
      await waitFor(() => expect(result.current.isRunning).toBe(true));

      await act(async () => {
        result.current.skip();
      });
      await act(async () => {
        result.current.next();
      });

      expect(result.current.isRunning).toBe(false);
      expect(result.current.index).toBe(0);
    });

    it('Reports the reason once, not again when the fade lands', async () => {
      const onStop = jest.fn();
      const { result } = await renderViewModel({ onStop });
      await startTour(result);
      await waitFor(() => expect(result.current.isRunning).toBe(true));

      await act(async () => {
        result.current.skip();
      });
      await act(async () => {
        result.current.skip();
      });

      expect(onStop).toHaveBeenCalledTimes(1);
    });
  });

  describe('goTo', () => {
    it('Ignores an index outside the steps', async () => {
      const { result } = await renderViewModel();
      await startTour(result);
      await waitFor(() => expect(result.current.index).toBe(0));

      await act(async () => {
        result.current.goTo(9);
      });

      expect(result.current.index).toBe(0);
    });
  });

  describe('reset', () => {
    it('Clears the seen mark so the tour can run again', async () => {
      const storage = mountStorage({ [mountSeenKey('scanner')]: '1' });
      const { result } = await renderViewModel({ tourKey: 'scanner', storage });

      await act(async () => {
        result.current.reset();
      });

      expect(storage.removeItem).toHaveBeenCalledWith(mountSeenKey('scanner'));
    });
  });

  describe('measureStep', () => {
    it('Ends the tour when the target never mounts', async () => {
      const onStop = jest.fn();
      const rendered = await renderHook(() =>
        useCiceroneProviderViewModel({
          children: null,
          steps: [{ id: 'ghost', title: 'x', text: 'y' }],
          autoStart: false,
          onStop,
        }),
      );

      await act(async () => {
        rendered.result.current.start();
      });

      await waitFor(() => expect(onStop).toHaveBeenCalledWith('finished'), {
        timeout: 3000,
      });
      expect(rendered.result.current.geometry).toBeNull();
    });

    it('Runs the step `before` hook ahead of measuring', async () => {
      const before = jest.fn<() => void>();
      const rendered = await renderHook(() =>
        useCiceroneProviderViewModel({
          children: null,
          steps: [{ id: 'tray', title: 'x', text: 'y', before }],
          autoStart: false,
        }),
      );

      await act(async () => {
        rendered.result.current.registerTarget('tray', mountTargetRef());
      });
      await act(async () => {
        rendered.result.current.start();
      });

      await waitFor(() => expect(before).toHaveBeenCalled());
    });
  });

  describe('autoStart', () => {
    it('Starts when autoStart flips to true after mount', async () => {
      const storage = mountStorage();
      const rendered = await renderHook(
        (props: { autoStart: boolean }) =>
          useCiceroneProviderViewModel({
            children: null,
            steps: STEPS,
            tourKey: 'scanner',
            storage,
            startDelay: 0,
            autoStart: props.autoStart,
          }),
        { initialProps: { autoStart: false } },
      );

      await act(async () => {
        STEPS.forEach((step, i) => {
          rendered.result.current.registerTarget(step.id, mountTargetRef(100 + i * 10));
        });
      });

      expect(rendered.result.current.isRunning).toBe(false);

      await rendered.rerender({ autoStart: true });

      await waitFor(() => expect(rendered.result.current.isRunning).toBe(true));
    });

    it('Does NOT start again when autoStart stays true across renders', async () => {
      const storage = mountStorage();
      const rendered = await renderHook(
        (props: { autoStart: boolean }) =>
          useCiceroneProviderViewModel({
            children: null,
            steps: STEPS,
            tourKey: 'scanner',
            storage,
            startDelay: 0,
            autoStart: props.autoStart,
          }),
        { initialProps: { autoStart: true } },
      );

      await act(async () => {
        STEPS.forEach((step, i) => {
          rendered.result.current.registerTarget(step.id, mountTargetRef(100 + i * 10));
        });
      });

      await waitFor(() => expect(rendered.result.current.isRunning).toBe(true));

      await act(async () => {
        rendered.result.current.next();
      });

      await waitFor(() => expect(rendered.result.current.index).toBe(1));

      await rendered.rerender({ autoStart: true });

      expect(rendered.result.current.index).toBe(1);
    });
  });
});
