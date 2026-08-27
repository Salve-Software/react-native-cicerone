import type { RefObject } from 'react';
import type { HostInstance } from 'react-native';
import type { ICiceroneRect, ICiceroneScrollHandle } from '@/types';
import { SCROLL } from './constants';
import { measureInWindow } from './measureInWindow';
import { resolveScrollOffset } from './resolveScrollOffset';
import { wait } from './wait';

/** An off-screen target otherwise measures where the user cannot see it. */
export const measureTarget = async (
  ref: RefObject<HostInstance | null>,
  scroll: ICiceroneScrollHandle | null,
): Promise<ICiceroneRect | null> => {
  const first = await measureInWindow(ref);
  if (!first || !scroll) return first;

  const viewport = await measureInWindow(scroll.containerRef);
  if (!viewport) return first;

  const decision = resolveScrollOffset(
    first,
    viewport,
    scroll.getOffset(),
    scroll.getContentHeight(),
  );
  if (!decision.needsScroll) return first;

  scroll.scrollTo({ y: decision.offset, animated: true });
  await wait(SCROLL.settleDelay);

  return (await measureInWindow(ref)) ?? first;
};
