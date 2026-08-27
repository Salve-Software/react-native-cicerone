---
sidebar_position: 4
title: Recipes
---

# Recipes

## Remembering what was seen

The library keeps no record of it. It shows the tour, and whether the tour should show at all
is your call — so no storage engine gets forced into your bundle.

`autoStart` is the gate, and it starts the tour the moment it turns true, which means an
async read costs you nothing.

```tsx
import { MMKV } from 'react-native-mmkv';

const mmkv = new MMKV();

export const Scanner = () => {
  const [seen, setSeen] = useState<boolean | null>(null);

  useEffect(() => {
    setSeen(mmkv.getBoolean('tour.scanner') ?? false);
  }, []);

  return (
    <Cicerone.Provider
      steps={STEPS}
      autoStart={seen === false}
      onStop={() => mmkv.set('tour.scanner', true)}
    >
      {/* targets */}
    </Cicerone.Provider>
  );
};
```

While `seen` is `null` the read has not landed yet and `autoStart` stays false, so the tour
never flashes before you know the answer. AsyncStorage works the same way.

## A replay button

```tsx
const { start } = useCicerone();
```

`start()` runs the tour whenever you call it. Clearing your own flag, if you keep one, is up
to you.

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
