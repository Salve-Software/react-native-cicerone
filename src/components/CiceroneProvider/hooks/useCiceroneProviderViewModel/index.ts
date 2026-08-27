import type { RefObject } from 'react';
import type { HostInstance } from 'react-native';
import type {
  ICiceroneGeometry,
  ICiceronePhase,
  ICiceroneProviderProps,
  ICiceroneScrollHandle,
  ICiceroneStartOptions,
  ICiceroneStopReason,
} from '@/types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ANIMATION } from '@/constants';
import { createMemoryStorage, mountSeenKey } from '@/storage';
import { measureTarget, resolveGeometry, wait } from '@/utils';
import { MEASURE } from '@/components/CiceroneProvider/constants';

export const useCiceroneProviderViewModel = (props: ICiceroneProviderProps) => {
  const {
    steps,
    tourKey,
    autoStart = true,
    startDelay = ANIMATION.startDelay,
    storage,
    onStart,
    onStepChange,
    onStop,
  } = props;

  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<ICiceronePhase>('idle');
  const [geometry, setGeometry] = useState<ICiceroneGeometry | null>(null);

  const targetsRef = useRef(new Map<string, RefObject<HostInstance | null>>());
  const scrollsRef = useRef(new Map<string, ICiceroneScrollHandle>());
  const fallbackStorage = useRef(createMemoryStorage());
  // Guard so a repeated press cannot skip a step while the measurement runs.
  const isMeasuringRef = useRef(false);
  const runIdRef = useRef(0);
  const phaseRef = useRef<ICiceronePhase>('idle');
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const enterPhase = useCallback((next: ICiceronePhase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const activeStorage = storage ?? fallbackStorage.current;
  const total = steps.length;
  const step = steps[index] ?? null;

  const markSeen = useCallback(async () => {
    if (!tourKey) return;
    await activeStorage.setItem(mountSeenKey(tourKey), '1');
  }, [activeStorage, tourKey]);

  const hasSeen = useCallback(async () => {
    if (!tourKey) return false;
    return (await activeStorage.getItem(mountSeenKey(tourKey))) === '1';
  }, [activeStorage, tourKey]);

  const reset = useCallback(() => {
    if (!tourKey) return;
    void activeStorage.removeItem(mountSeenKey(tourKey));
  }, [activeStorage, tourKey]);

  const registerTarget = useCallback(
    (id: string, ref: RefObject<HostInstance | null>) => {
      targetsRef.current.set(id, ref);
      return () => {
        targetsRef.current.delete(id);
      };
    },
    [],
  );

  const registerScroll = useCallback((id: string, handle: ICiceroneScrollHandle) => {
    scrollsRef.current.set(id, handle);
    return () => {
      scrollsRef.current.delete(id);
    };
  }, []);

  const stop = useCallback(
    (reason: ICiceroneStopReason = 'manual') => {
      if (phaseRef.current !== 'running') return;

      runIdRef.current += 1;
      isMeasuringRef.current = false;
      void markSeen();
      onStop?.(reason);

      // Kept mounted with its geometry so the overlay has something to fade out.
      enterPhase('exiting');
      exitTimerRef.current = setTimeout(() => {
        enterPhase('idle');
        setGeometry(null);
      }, ANIMATION.scrimOutDuration);
    },
    [markSeen, onStop, enterPhase],
  );

  const measureStep = useCallback(
    async (nextIndex: number) => {
      const target = steps[nextIndex];
      if (!target) return stop('finished');

      const runId = ++runIdRef.current;
      isMeasuringRef.current = true;

      if (target.before) await target.before();
      if (target.beforeDelay) await wait(target.beforeDelay);

      for (let attempt = 0; attempt < MEASURE.retries; attempt += 1) {
        if (runId !== runIdRef.current) return;

        const ref = targetsRef.current.get(target.id);
        const rect = ref
          ? await measureTarget(ref, scrollsRef.current.get(target.id) ?? null)
          : null;

        if (rect) {
          if (runId !== runIdRef.current) return;
          setGeometry(resolveGeometry(rect, target));
          setIndex(nextIndex);
          isMeasuringRef.current = false;
          onStepChange?.(nextIndex, target);
          return;
        }

        await wait(MEASURE.retryDelay);
      }

      isMeasuringRef.current = false;
      // A target that never mounted must not strand the tour on the previous step.
      if (runId === runIdRef.current) stop('finished');
    },
    [steps, stop, onStepChange],
  );

  const goTo = useCallback(
    (nextIndex: number) => {
      if (nextIndex < 0 || nextIndex >= steps.length) return;
      void measureStep(nextIndex);
    },
    [measureStep, steps.length],
  );

  const start = useCallback(
    (options?: ICiceroneStartOptions) => {
      void (async () => {
        if (!options?.force && (await hasSeen())) return;
        if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
        enterPhase('running');
        onStart?.();
        await measureStep(0);
      })();
    },
    [hasSeen, measureStep, onStart, enterPhase],
  );

  const next = useCallback(() => {
    if (isMeasuringRef.current || phaseRef.current !== 'running') return;
    if (index >= steps.length - 1) return stop('finished');
    void measureStep(index + 1);
  }, [index, measureStep, steps.length, stop]);

  const previous = useCallback(() => {
    if (isMeasuringRef.current || phaseRef.current !== 'running' || index === 0) return;
    void measureStep(index - 1);
  }, [index, measureStep]);

  const skip = useCallback(() => stop('skipped'), [stop]);

  useEffect(() => {
    if (!autoStart) return;
    const timer = setTimeout(() => start(), startDelay);
    return () => clearTimeout(timer);
    // Mount only: changing `steps` mid-tour must not restart it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => () => {
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    },
    [],
  );

  return useMemo(
    () => ({
      isRunning: phase === 'running',
      isExiting: phase === 'exiting',
      isVisible: phase !== 'idle',
      step,
      index,
      total,
      geometry,
      isFirst: index === 0,
      isLast: index === total - 1,
      start,
      stop: () => stop('manual'),
      next,
      previous,
      skip,
      goTo,
      reset,
      registerTarget,
      registerScroll,
    }),
    [
      phase,
      step,
      index,
      total,
      geometry,
      start,
      stop,
      next,
      previous,
      skip,
      goTo,
      reset,
      registerTarget,
      registerScroll,
    ],
  );
};
