import type {
  ICiceroneCardPalette,
  ICiceroneCardProps,
  ICiceroneLabels,
  ICiceroneTheme,
} from '@/types';
import type { ICiceroneOverlayProps } from '@/components/CiceroneOverlay/types';
import type { HostInstance } from 'react-native';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { CICERONE, DEFAULT_LABELS, DEFAULT_THEME } from '@/constants';
import { resolveCardLayout, resolvePlacement, translateGeometry } from '@/utils';

export const useCiceroneOverlayViewModel = (props: ICiceroneOverlayProps) => {
  const { geometry: windowGeometry, step, options } = props;
  const window = useWindowDimensions();
  const rootRef = useRef<HostInstance | null>(null);
  const [box, setBox] = useState({ x: 0, y: 0, width: 0, height: 0 });

  /**
   * The overlay is only absolute within whatever contains the provider, so it
   * has to know where that box sits in the window before it can place anything.
   */
  const onRootLayout = useCallback(() => {
    rootRef.current?.measureInWindow((x, y, width, height) => {
      setBox((current) =>
        current.x === x && current.y === y && current.height === height
          ? current
          : { x, y, width, height },
      );
    });
  }, []);

  const geometry = useMemo(
    () => translateGeometry(windowGeometry, box),
    [windowGeometry, box],
  );

  const screen = useMemo(
    () => ({
      width: box.width || window.width,
      height: box.height || window.height,
    }),
    [box.width, box.height, window.width, window.height],
  );

  const theme = useMemo<ICiceroneTheme>(
    () => ({
      ...DEFAULT_THEME,
      ...options.theme,
      card: { ...DEFAULT_THEME.card, ...options.theme?.card },
      highlight: { ...DEFAULT_THEME.highlight, ...options.theme?.highlight },
    }),
    [options.theme],
  );

  const labels = useMemo<ICiceroneLabels>(
    () => ({ ...DEFAULT_LABELS, ...options.labels }),
    [options.labels],
  );

  const isHighlight = step.variant === 'highlight';
  const palette: ICiceroneCardPalette = isHighlight ? theme.highlight : theme.card;
  const cardWidth = options.cardWidth ?? CICERONE.cardWidth;

  const placement = useMemo(
    () => resolvePlacement(geometry.ring, screen.height, step.placement),
    [geometry.ring, screen.height, step.placement],
  );

  const layout = useMemo(
    () =>
      resolveCardLayout(geometry.ring, placement, cardWidth, screen.width, screen.height),
    [geometry.ring, placement, cardWidth, screen.width, screen.height],
  );

  const cardProps = useMemo<ICiceroneCardProps>(
    () => ({
      step,
      index: props.index,
      total: props.total,
      isFirst: props.isFirst,
      isLast: props.isLast,
      placement,
      palette,
      labels,
      next: props.next,
      previous: props.previous,
      skip: props.skip,
      stop: props.stop,
    }),
    [step, props, placement, palette, labels],
  );

  const overlayPress = options.overlayPress ?? 'next';
  const onOverlayPress = overlayPress === 'skip' ? props.skip : props.next;

  return {
    theme,
    palette,
    labels,
    isHighlight,
    cardWidth,
    layout,
    cardProps,
    geometry,
    screen,
    rootRef,
    onRootLayout,
    overlayPress,
    onOverlayPress,
    allowTargetInteraction: options.allowTargetInteraction ?? false,
  };
};
