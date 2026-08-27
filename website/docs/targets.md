---
sidebar_position: 2
title: Targets
---

# Targets

A `Target` marks the element a step points at. It takes an `id`, and a step with the same
`id` will measure it.

```tsx
<Cicerone.Target id="scan-button">
  <ScanButton />
</Cicerone.Target>
```

## A Target is a View

This is the one thing that surprises people, so it comes first.

`Target` wraps its child in a `View`, which means it takes part in layout like any other
view. In a column it stretches to the full width — and then the tour measures the _wrapper_,
not the thing you can see. A circular button ends up with a ring the width of the screen.

For a target narrower than its container, tell it to hug:

```tsx
<Cicerone.Target id="scan-button" style={{ alignSelf: 'flex-start' }}>
  <ScanButton />
</Cicerone.Target>
```

A target already inside a row, or one that is meant to span its container, needs nothing.

:::note Why not make it hug by default
Because the opposite case is just as common: a card that should span its container would
collapse. There is no default that is right for both, so `Target` takes a `style` prop and
this page tells you when to use it.
:::

## Shape of the hole

Two fields on the step control it:

| Field     | Effect                                                                                      |
| --------- | ------------------------------------------------------------------------------------------- |
| `padding` | Gap between the target and the ring. The band between them stays dimmed — that is the halo. |
| `radius`  | Corner radius of the target. `'circle'` rounds by half of the shortest side.                |

```ts
{ id: 'scan-button', title: '…', text: '…', padding: 5, radius: 'circle' }
```

The hole hugs the target; the ring sits `padding` px outside it.

## Targets inside a ScrollView

Swap `ScrollView` for `Cicerone.ScrollView`. Targets inside it find it through context, so
there is no ref to wire up.

```tsx
<Cicerone.ScrollView>
  <Cicerone.Target id="history">
    <HistoryCard />
  </Cicerone.Target>
</Cicerone.ScrollView>
```

When a step points at a target that is off-screen, the tour scrolls it into view, waits for
the scroll to settle, and only then measures. A target already comfortably visible is left
alone — scrolling it just to centre it would make the screen jump for nothing.

## Targets that do not exist yet

A step whose target never mounts ends the tour instead of stranding it on the previous step.
If the target is behind something you have to open first, use `before`:

```ts
{
  id: 'tray',
  title: 'Your batch',
  text: 'Everything you scan piles up here.',
  before: () => openTray(),
  beforeDelay: 620,
}
```

`before` runs ahead of the measurement, and `beforeDelay` waits for its animation to land.
