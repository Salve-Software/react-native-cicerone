---
sidebar_position: 4
title: Recipes
---

# Recipes

## Remembering what was seen

By default the flag lives in memory, so the tour comes back every time the app restarts.
Pass anything with `getItem`, `setItem` and `removeItem`. Sync and async both work.

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

AsyncStorage works the same way and its promises get awaited for you.

The library has no opinion about which storage you use, which is why it does not depend on
one.

## A replay button

```tsx
const { start, reset } = useCicerone();

const replay = () => {
  reset();
  start({ force: true });
};
```

`force` skips the seen check. `reset()` also clears the flag, so the tour would come back on
the next launch too.

## Letting the user tap the highlighted element

By default one layer covers the screen and any tap advances the tour, which is what most
onboarding wants. When the point of the step is for the user to actually press the thing:

```tsx
<Cicerone.Provider steps={STEPS} allowTargetInteraction>
```

Now four strips surround the hole instead of one full screen layer, so the target stays live.

Use `overlayPress="none"` if taps should do nothing at all and the card buttons are the only
way forward.

## Tracking the tour

```tsx
<Cicerone.Provider
  steps={STEPS}
  onStart={() => analytics.track('tour_started')}
  onStepChange={(index, step) => analytics.track('tour_step', { index, id: step.id })}
  onStop={(reason) => analytics.track('tour_ended', { reason })}
/>
```

`onStop` tells you which of the three happened: `finished`, `skipped`, or `manual` if you
called `stop()` yourself. It fires once, when the tour ends, not when the closing animation
finishes.

## Forcing which side the card goes

The card picks whichever side has room. When you know better:

```ts
{ id: 'header-action', title: '...', text: '...', placement: 'bottom' }
```

## Putting a blur behind the hole

`renderBackdrop` draws inside the cut out, under the scrim. The library ships no blur, so
bring the one your app already uses.

```tsx
import { BlurView } from 'expo-blur';

<Cicerone.Provider
  steps={STEPS}
  renderBackdrop={() => <BlurView intensity={20} style={StyleSheet.absoluteFill} />}
/>;
```
