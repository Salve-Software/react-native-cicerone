---
sidebar_position: 5
title: API
---

# API

## `Cicerone`

A namespace so call sites read as `<Cicerone.Target>`. Each member is also exported on its
own if you prefer that.

| Member                | Also exported as     |
| --------------------- | -------------------- |
| `Cicerone.Provider`   | `CiceroneProvider`   |
| `Cicerone.Target`     | `Target`             |
| `Cicerone.ScrollView` | `CiceroneScrollView` |

## `Cicerone.Provider`

| Prop                     | Type                                                    | Default         | What it does                                      |
| ------------------------ | ------------------------------------------------------- | --------------- | ------------------------------------------------- |
| `steps`                  | `ICiceroneStep[]`                                       | none            | The tour, in order                                |
| `tourKey`                | `string`                                                | none            | Persistence key; without it nothing is remembered |
| `autoStart`              | `boolean`                                               | `true`          | Start on mount when not yet seen                  |
| `startDelay`             | `number`                                                | `800`           | Wait before auto-start, to let the screen settle  |
| `storage`                | `ICiceroneStorage`                                      | in-memory       | Where the seen flag lives                         |
| `theme`                  | `ICiceroneThemeOverride`                                | shipped palette | Colours, merged field by field                    |
| `labels`                 | `Partial<ICiceroneLabels>`                              | English         | Button and counter text                           |
| `overlayPress`           | `'next' \| 'skip' \| 'none'`                            | `'next'`        | What a press outside the target does              |
| `allowTargetInteraction` | `boolean`                                               | `false`         | Let presses reach the highlighted element         |
| `renderCard`             | `(props: ICiceroneCardProps) => ReactNode`              | built-in card   | Replace the card                                  |
| `renderBackdrop`         | `(props) => ReactNode`                                  | none            | Draw inside the cut-out, e.g. a blur              |
| `cardWidth`              | `number`                                                | `284`           | Card width                                        |
| `cardStyle`              | `StyleProp<ViewStyle>`                                  | none            | Extra style on the default card                   |
| `onStart`                | `() => void`                                            | none            | The tour began                                    |
| `onStepChange`           | `(index: number, step: ICiceroneStep) => void`          | none            | A step became active                              |
| `onStop`                 | `(reason: 'finished' \| 'skipped' \| 'manual') => void` | none            | The tour ended                                    |

## `Cicerone.Target`

| Prop       | Type                   | What it does                                                        |
| ---------- | ---------------------- | ------------------------------------------------------------------- |
| `id`       | `string`               | Matches a step's `id`                                               |
| `children` | `ReactNode`            | The element to highlight                                            |
| `style`    | `StyleProp<ViewStyle>` | Applied to the wrapper, see [Targets](./targets#a-target-is-a-view) |

## `Cicerone.ScrollView`

Takes every `ScrollView` prop. Your `onScroll` and `onContentSizeChange` still fire, the
component just listens in as well.

## `ICiceroneStep`

| Field         | Type                          | Default     | What it does                |
| ------------- | ----------------------------- | ----------- | --------------------------- |
| `id`          | `string`                      | none        | Matches a `Target`          |
| `title`       | `string`                      | none        | Card heading                |
| `text`        | `string`                      | none        | Card body                   |
| `padding`     | `number`                      | `8`         | Gap between target and ring |
| `radius`      | `number \| 'circle'`          | `0`         | Corner radius of the target |
| `variant`     | `'default' \| 'highlight'`    | `'default'` | Which palette to use        |
| `label`       | `string`                      | none        | Replaces the step counter   |
| `placement`   | `'top' \| 'bottom'`           | auto        | Forces the card side        |
| `before`      | `() => void \| Promise<void>` | none        | Runs before measuring       |
| `beforeDelay` | `number`                      | none        | Wait after `before`         |

## `useCicerone()`

Throws if you call it outside a provider. The message names the provider, so you do not end
up chasing an `undefined` three frames later.

| Field                | Type                                      | What it is                           |
| -------------------- | ----------------------------------------- | ------------------------------------ |
| `isRunning`          | `boolean`                                 | A step is on screen                  |
| `step`               | `ICiceroneStep \| null`                   | The active step                      |
| `index`              | `number`                                  | Zero-based position                  |
| `total`              | `number`                                  | How many steps                       |
| `isFirst` / `isLast` | `boolean`                                 | Where in the tour                    |
| `start`              | `(options?: { force?: boolean }) => void` | Begin; `force` ignores the seen flag |
| `stop`               | `() => void`                              | End it                               |
| `next` / `previous`  | `() => void`                              | Move a step                          |
| `skip`               | `() => void`                              | End it, reported as `skipped`        |
| `goTo`               | `(index: number) => void`                 | Jump; out-of-range is ignored        |
| `reset`              | `() => void`                              | Clear the seen mark                  |

## `ICiceroneCardProps`

What `renderCard` receives.

| Field                                 | Type                   |
| ------------------------------------- | ---------------------- |
| `step`                                | `ICiceroneStep`        |
| `index` / `total`                     | `number`               |
| `isFirst` / `isLast`                  | `boolean`              |
| `placement`                           | `'top' \| 'bottom'`    |
| `palette`                             | `ICiceroneCardPalette` |
| `labels`                              | `ICiceroneLabels`      |
| `next` / `previous` / `skip` / `stop` | `() => void`           |

## `ICiceroneStorage`

```ts
interface ICiceroneStorage {
  getItem: (key: string) => string | null | Promise<string | null>;
  setItem: (key: string, value: string) => void | Promise<void>;
  removeItem: (key: string) => void | Promise<void>;
}
```

`createMemoryStorage()` is exported for tests, and it is also the default.
