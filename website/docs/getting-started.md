---
sidebar_position: 1
title: Getting started
---

# Getting started

Cicerone dims the screen, cuts a hole around one element, and shows a card next to it. You
give it a list of steps and mark the elements. It handles the rest.

## Requirements

| Component                 | Requirement                                         |
| ------------------------- | --------------------------------------------------- |
| React Native              | 0.76.0 or higher, with the New Architecture enabled |
| `react-native-reanimated` | 3.0.0 or higher, required peer dependency           |
| `react-native-svg`        | 15.0.0 or higher, required peer dependency          |

## Install

```bash
yarn add @salve-software/react-native-cicerone react-native-reanimated react-native-svg
```

Both peers have native code, so run `pod install` after. On Expo use `npx expo install`
instead of adding them by hand. Reanimated is tied to the runtime it was compiled against,
and a version mismatch does not break the bundle. It crashes on startup, which is much
harder to debug.

## Your first tour

You need three things: a provider, targets, and steps that reference the targets by `id`.

```tsx
import { Cicerone, type ICiceroneStep } from '@salve-software/react-native-cicerone';

const STEPS: ICiceroneStep[] = [
  {
    id: 'viewfinder',
    title: 'Scan in bulk',
    text: 'Run several products in a row without stopping.',
    padding: 26,
    radius: 28,
  },
  {
    id: 'scan-button',
    title: 'Always at hand',
    text: 'This button opens the scanner from anywhere.',
    radius: 'circle',
  },
];

export const Scanner = () => (
  <Cicerone.Provider steps={STEPS} tourKey="scanner">
    <Cicerone.Target id="viewfinder">
      <Viewfinder />
    </Cicerone.Target>

    <Cicerone.Target id="scan-button">
      <ScanButton />
    </Cicerone.Target>
  </Cicerone.Provider>
);
```

The tour runs by itself the first time the screen mounts, then never again. That only works
if you pass both a `tourKey` and a [`storage`](./recipes#remembering-what-was-seen). Without
storage the flag sits in memory and disappears when the app closes.

## Where to put the provider

Wrap the screen, not the whole app, unless every screen shares the same tour.

The overlay renders next to the provider's children and works inside the provider's own box.
That means you can put it inside a bottom sheet or a screen with a header and it still lands
on the right spot.

## Controlling it yourself

```tsx
const { start, stop, next, previous, skip, reset, index, total } = useCicerone();
```

`start({ force: true })` runs a tour that was already marked as seen, which is what you want
behind a "show me again" button. `reset()` only clears the flag.

Pass `autoStart={false}` if you would rather pick the moment.
