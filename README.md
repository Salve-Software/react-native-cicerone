<h1 align="center">react-native-cicerone</h1>

<p align="center">
  <strong>Guided onboarding tours for React Native</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/@salve-software/react-native-cicerone.svg?style=flat-square" alt="Version">
  <img src="https://img.shields.io/npm/dm/@salve-software/react-native-cicerone.svg?style=flat-square" alt="Downloads">
  <img src="https://img.shields.io/badge/React%20Native-0.76+-61dafb?style=flat-square&logo=react" alt="React Native">
  <img src="https://img.shields.io/badge/native%20code-none-brightgreen?style=flat-square" alt="No native code">
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License">
</p>

---

A cicerone is the guide who walks visitors through a place. This one walks users through your screens: it dims the background, punches a hole around the element you want to talk about, and puts a card next to it.

The libraries that already do this were written before the New Architecture, and the popular ones still reach for `findNodeHandle`, which is deprecated. **react-native-cicerone** measures with `measureInWindow`, ships no native code of its own, and hands you the card so the tour looks like your app rather than like a library.

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

## Features

- **No native code** - pure TypeScript. Nothing to link, nothing of ours to rebuild.
- **New Architecture ready** - measures with `measureInWindow`, never `findNodeHandle`.
- **Scroll aware** - a target below the fold is scrolled into view, allowed to settle, and only then measured.
- **Your card, or ours** - ships a styled card that works out of the box; `renderCard` replaces it entirely while the spotlight stays.
- **Placement that follows the target** - the card takes whichever side has room, and the arrow moves when clamping to the screen edge pulls the two apart.
- **Nested-safe** - the overlay works in its own box, so a provider inside a sheet or a screen with a header still lands on target.
- **Bring your own storage** - the "already seen" flag goes through an adapter, so MMKV, AsyncStorage or nothing at all are equally fine.

## Installation

### Requirements

| Component                 | Requirement                                             |
| ------------------------- | ------------------------------------------------------- |
| React Native              | 0.76.0 or higher, with the **New Architecture** enabled |
| `react-native-reanimated` | 3.0.0 or higher, required peer dependency               |
| `react-native-svg`        | 15.0.0 or higher, required peer dependency              |

```bash
yarn add @salve-software/react-native-cicerone react-native-reanimated react-native-svg
```

Both peers carry native code. On a bare project run `pod install`; on Expo run `npx expo install` so the versions match your SDK, since Reanimated is version-locked to the runtime it was built against.

## Usage

Full docs, API reference, and theming guide: **[salve-software.github.io/react-native-cicerone](https://salve-software.github.io/react-native-cicerone)**

## Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup instructions, branch/commit conventions, and the PR process.

## License

This project is licensed under the MIT License, see [LICENSE](./LICENSE) for details.

---

<p align="center">
  Made by Salve Software
</p>
