---
sidebar_position: 4
title: Recipes
---

# Recipes

## Remembering what was seen

By default the "already seen" flag lives in memory, so it dies with the app and the tour
returns on the next launch. Pass any object with `getItem` / `setItem` / `removeItem` —
both sync and async work.

```tsx
import { MMKV } from 'react-native-mmkv';

const mmkv = new MMKV();

<Cicerone.Provider
  steps={STEPS}
  tourKey="scanner"
  storage={{
    getItem: (key) => mmkv.getString(key) ?? null,
    setItem: (key, value) => mmkv.set(key, value),
    removeItem: (key) => mmkv.delete(key),
  }}>
```

AsyncStorage works the same way, and its promises are awaited for you.

The library keeps no opinion about which storage you use, which is why it has no dependency
on one.

## A replay button

```tsx
const { start, reset } = useCicerone();

const replay = () => {
  reset();
  start({ force: true });
};
```

`force` skips the seen check. `reset()` clears the mark as well, so the tour would also come
back on the next launch.

## Letting the user tap the highlighted element

By default one layer covers the screen and any press advances the tour, which is what most
onboarding wants. When the point of the step is for the user to actually press the thing:

```tsx
<Cicerone.Provider steps={STEPS} allowTargetInteraction>
```

Four strips surround the hole instead of one full-screen layer, so the target stays live.

To stop presses from doing anything at all, use `overlayPress="none"` — worth it when the
card's own buttons should be the only way forward.

## Reacting to the tour

```tsx
<Cicerone.Provider
  steps={STEPS}
  onStart={() => analytics.track('tour_started')}
  onStepChange={(index, step) => analytics.track('tour_step', { index, id: step.id })}
  onStop={(reason) => analytics.track('tour_ended', { reason })}
/>
```

`onStop` tells you which of the three happened: `finished`, `skipped`, or `manual` — a
`stop()` you called yourself.

It fires once, at the moment the tour ends, not when the closing animation lands.

## Forcing which side the card takes

The card normally takes whichever side of the target has room. When you know better:

```ts
{ id: 'header-action', title: '…', text: '…', placement: 'bottom' }
```

## Putting a blur behind the hole

`renderBackdrop` draws inside the cut-out, underneath the scrim. The library ships no blur of
its own, so you bring the one your app already has:

```tsx
import { BlurView } from 'expo-blur';

<Cicerone.Provider
  steps={STEPS}
  renderBackdrop={() => <BlurView intensity={20} style={StyleSheet.absoluteFill} />}
/>;
```
