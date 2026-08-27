import type { RefObject } from 'react';
import type { HostInstance } from 'react-native';
import type {
  ICiceroneGeometry,
  ICiceronePhase,
  ICiceroneProviderProps,
  ICiceroneScrollHandle,
  ICiceroneStopReason,
} from '@/types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ANIMATION } from '@/constants';
import { measureTarget, resolveGeometry, wait } from '@/utils';
import { MEASURE } from '@/providers/CiceroneProvider/constants';

export const useCiceroneProviderViewModel = (props: ICiceroneProviderProps) => {
  const {
    steps,
    autoStart = true,
    startDelay = ANIMATION.startDelay,
    onStart,
    onStepChange,
    onStop,
  } = props;

  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<ICiceronePhase>('idle');
  const [geometry, setGeometry] = useState<ICiceroneGeometry | null>(null);

  const targetsRef = useRef(new Map<string, RefObject<HostInstance | null>>());
  const scrollsRef = useRef(new Map<string, ICiceroneScrollHandle>());
  const isMeasuringRef = useRef(false);
  const runIdRef = useRef(0);
  const phaseRef = useRef<ICiceronePhase>('idle');
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasAutoStartedRef = useRef(false);

  const enterPhase = useCallback((next: ICiceronePhase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const total = steps.length;
  const step = steps[index] ?? null;

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
      onStop?.(reason);

      enterPhase('exiting');
      exitTimerRef.current = setTimeout(() => {
        enterPhase('idle');
        setGeometry(null);
      }, ANIMATION.scrimOutDuration);
    },
    [onStop, enterPhase],
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

  const start = useCallback(() => {
    void (async () => {
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
      enterPhase('running');
      onStart?.();
      await measureStep(0);
    })();
  }, [measureStep, onStart, enterPhase]);

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

  const startRef = useRef(start);
  const startDelayRef = useRef(startDelay);

  useEffect(() => {
    startRef.current = start;
    startDelayRef.current = startDelay;
  });

  useEffect(() => {
    if (!autoStart || hasAutoStartedRef.current) return;

    const timer = setTimeout(() => {
      hasAutoStartedRef.current = true;
      startRef.current();
    }, startDelayRef.current);

    return () => clearTimeout(timer);
  }, [autoStart]);

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
      registerTarget,
      registerScroll,
    ],
  );
};
