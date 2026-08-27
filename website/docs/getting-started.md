---
sidebar_position: 1
title: Getting started
---

# Getting started

A cicerone is the guide who walks visitors through a place. This one walks users through
your screens: it dims the background, punches a hole around the element you want to talk
about, and puts a card next to it.

## Requirements

| Component                 | Requirement                                             |
| ------------------------- | ------------------------------------------------------- |
| React Native              | 0.76.0 or higher, with the **New Architecture** enabled |
| `react-native-reanimated` | 3.0.0 or higher, required peer dependency               |
| `react-native-svg`        | 15.0.0 or higher, required peer dependency              |

## Install

```bash
yarn add @salve-software/react-native-cicerone react-native-reanimated react-native-svg
```

Both peers carry native code. On a bare project run `pod install` afterwards. On Expo, use
`npx expo install` instead of adding them by hand — Reanimated is version-locked to the
runtime it was built against, and a mismatch does not fail the bundle, it crashes at startup.

## Your first tour

Three pieces: a provider that holds the tour, targets that mark the elements, and steps that
tie them together by `id`.

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

The tour starts on its own the first time the screen mounts. It will not start again once it
has been seen — provided you give it a `tourKey` **and** a [`storage`](./recipes#remembering-what-was-seen).
Without storage the flag lives in memory and dies with the app.

## Where to put the provider

Wrap the screen, not the whole app, unless every screen shares one tour. The overlay renders
as a sibling of the provider's children and works in the provider's own box, so a provider
inside a bottom sheet or a screen with a header still lands on target.

## Driving it yourself

```tsx
const { start, stop, next, previous, skip, reset, index, total } = useCicerone();
```

`start({ force: true })` runs a tour that was already marked as seen — useful for a "replay
the tour" button. `reset()` clears the mark without running anything.

Set `autoStart={false}` when you would rather decide the moment yourself.
