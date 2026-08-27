# @salve-software/react-native-cicerone

Guided onboarding tours for React Native. It handles the spotlight, you style the card.

A cicerone is the guide who walks visitors through a place. This one walks users through
your screens: it dims the background, punches a hole around the element you want to talk
about, and puts a card next to it.

- **No native code.** Pure TypeScript, New Architecture ready.
- **No `findNodeHandle`.** Measures with `measureInWindow`, which is not deprecated.
- **Scroll aware.** A target below the fold is scrolled into view before it is measured.
- **Your card, or ours.** Ships a styled card that works out of the box, and `renderCard`
  replaces it entirely.

## Installation

```sh
npm install @salve-software/react-native-cicerone
```

`react-native-reanimated` is a peer dependency:

```sh
npm install react-native-reanimated
```

## Usage

Wrap the screen in a provider, wrap each element in a `Target`, and give the provider a list
of steps whose `id` matches those targets.

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

The tour starts on its own the first time the screen mounts, and never again once it has been
seen — provided you give it a `tourKey` and a `storage`.

### A Target is a View

`Target` wraps its child in a `View`, so it takes part in layout like any other. In a column
that means it stretches to the full width, and the tour measures the wrapper rather than the
child. For a target narrower than its container, tell it to hug:

```tsx
<Cicerone.Target id="scan-button" style={{ alignSelf: 'flex-start' }}>
  <ScanButton />
</Cicerone.Target>
```

A target already inside a row, or one that is meant to span the container, needs nothing.

### Targets inside a ScrollView

Swap `ScrollView` for `Cicerone.ScrollView`. Targets inside it find it on their own; there is
no ref to wire up. When a step points at an off-screen target, the tour scrolls it into view,
waits for the scroll to settle, and only then measures.

```tsx
<Cicerone.ScrollView>
  <Cicerone.Target id="history">
    <HistoryCard />
  </Cicerone.Target>
</Cicerone.ScrollView>
```

### Imperative control

```tsx
const { start, stop, next, previous, skip, reset, index, total } = useCicerone();
```

`start({ force: true })` runs a tour that was already marked as seen. `reset()` clears the
mark without running anything.

### Persistence

By default the "already seen" flag lives in memory, so it dies with the app. Pass any object
with `getItem` / `setItem` / `removeItem` — both sync and async work:

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

### A step that needs something opened first

`before` runs ahead of the measurement, and `beforeDelay` waits for its animation:

```ts
{
  id: 'tray',
  title: 'Your batch',
  text: 'Everything you scan piles up here.',
  before: () => openTray(),
  beforeDelay: 620,
}
```

## Styling

### Theme

Every colour has a default taken from the original design. Override any subset — partial
palettes are merged, not replaced:

```tsx
<Cicerone.Provider
  steps={STEPS}
  theme={{
    ring: '#5fd694',
    scrim: 'rgba(11,18,13,.55)',
    card: { buttonBackground: '#2e9e5b' },
  }}>
```

### Highlight steps

A step with `variant: 'highlight'` swaps to a second palette and adds a gradient card, a
sweeping sheen and sparkles around the target. Use it for an upsell or a new feature, not for
every other step.

```ts
{ id: 'premium', title: 'Premium', text: '…', variant: 'highlight', label: 'PREMIUM' }
```

### Your own card

`renderCard` receives everything the default card uses and replaces it wholesale:

```tsx
<Cicerone.Provider
  steps={STEPS}
  renderCard={({ step, index, total, isLast, next, skip }) => (
    <MyCard
      title={step.title}
      body={step.text}
      counter={`${index + 1}/${total}`}
      onNext={next}
      onSkip={skip}
      nextLabel={isLast ? 'Done' : 'Next'}
    />
  )}
/>
```

### Labels

Defaults are English. `{{current}}` and `{{total}}` are interpolated:

```tsx
labels={{
  step: 'DICA {{current}} DE {{total}}',
  stepSingle: 'DICA',
  next: 'Próximo',
  last: 'Entendi',
  skip: 'Pular',
}}
```

## Props

| Prop                                  | Type                         | Default         | What it does                                      |
| ------------------------------------- | ---------------------------- | --------------- | ------------------------------------------------- |
| `steps`                               | `ICiceroneStep[]`            | —               | The tour, in order                                |
| `tourKey`                             | `string`                     | —               | Persistence key; without it nothing is remembered |
| `autoStart`                           | `boolean`                    | `true`          | Start on mount when not yet seen                  |
| `startDelay`                          | `number`                     | `800`           | Wait before auto-start, to let the screen settle  |
| `storage`                             | `ICiceroneStorage`           | in-memory       | Where the seen flag lives                         |
| `theme`                               | `Partial<ICiceroneTheme>`    | shipped palette | Colours, deep-merged                              |
| `labels`                              | `Partial<ICiceroneLabels>`   | English         | Button and counter text                           |
| `overlayPress`                        | `'next' \| 'skip' \| 'none'` | `'next'`        | What a press outside the target does              |
| `allowTargetInteraction`              | `boolean`                    | `false`         | Let presses reach the highlighted element         |
| `renderCard`                          | `(props) => ReactNode`       | built-in card   | Replace the card                                  |
| `renderBackdrop`                      | `(props) => ReactNode`       | —               | Draw inside the cut-out, e.g. a blur              |
| `cardWidth`                           | `number`                     | `284`           | Card width                                        |
| `cardStyle`                           | `StyleProp<ViewStyle>`       | —               | Extra style on the default card                   |
| `onStart` / `onStepChange` / `onStop` | callbacks                    | —               | Lifecycle                                         |

### Step

| Field                    | Type                       | What it does                              |
| ------------------------ | -------------------------- | ----------------------------------------- |
| `id`                     | `string`                   | Matches a `Cicerone.Target`               |
| `title` / `text`         | `string`                   | Card copy                                 |
| `padding`                | `number`                   | Gap between target and ring (default `8`) |
| `radius`                 | `number \| 'circle'`       | Corner radius of the target               |
| `variant`                | `'default' \| 'highlight'` | Palette                                   |
| `label`                  | `string`                   | Overrides the step counter                |
| `placement`              | `'top' \| 'bottom'`        | Forces the card side                      |
| `before` / `beforeDelay` | `() => …` / `number`       | Run something before measuring            |

## How the overlay works

The dim is a single view with a very wide border and a rounded hollow centre — the hollow is
the hole, so the cut-out gets real rounded corners without SVG. The ring sits `padding` px
outside the hole, which leaves the band between the two dimmed; that is what produces the
halo. Both are driven by Reanimated shared values, so moving between steps slides the hole
instead of cutting to it.

Touch is decoupled from the visuals. By default one layer covers the screen and a press
advances, matching the original design. With `allowTargetInteraction`, four strips are laid
around the hole instead, so the highlighted element stays pressable.

## Example

```sh
yarn
yarn example start
```

The example app demonstrates static targets, a circular target, a target below the fold that
gets scrolled to, a card that flips above its target, and a highlight step.

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT
