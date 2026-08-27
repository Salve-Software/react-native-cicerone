---
sidebar_position: 2
title: Targets
---

# Targets

A `Target` marks the element a step points at. Give it an `id` and the step with the same
`id` will measure it.

```tsx
<Cicerone.Target id="scan-button">
  <ScanButton />
</Cicerone.Target>
```

## A Target is a View

Read this one first, it trips up most people.

`Target` puts a `View` around your element, so it behaves like any other view in the layout.
Inside a column it stretches to the full width, and then the tour measures that wrapper
instead of the thing you can see. A round button ends up with a ring as wide as the screen.

If your target is narrower than its container, tell it to shrink:

```tsx
<Cicerone.Target id="scan-button" style={{ alignSelf: 'flex-start' }}>
  <ScanButton />
</Cicerone.Target>
```

Targets already inside a row, or ones meant to fill the container, work as they are.

:::note Why isn't this the default
Because the opposite case is just as common. A card that should span the container would
collapse instead. No default works for both, so `Target` accepts a `style` prop and this
page tells you when you need it.
:::

## Shape of the hole

Two fields on the step control it.

| Field     | Effect                                                                                       |
| --------- | -------------------------------------------------------------------------------------------- |
| `padding` | Space between the target and the ring. That band stays dimmed, which is what makes the halo. |
| `radius`  | Corner radius of the target. Use `'circle'` to round by half the shortest side.              |

```ts
{ id: 'scan-button', title: '...', text: '...', padding: 5, radius: 'circle' }
```

## Targets inside a ScrollView

Use `Cicerone.ScrollView` instead of `ScrollView`. Targets find it through context, so there
is no ref to pass around.

```tsx
<Cicerone.ScrollView>
  <Cicerone.Target id="history">
    <HistoryCard />
  </Cicerone.Target>
</Cicerone.ScrollView>
```

When a step points at something off screen, the tour scrolls to it, waits for the scroll to
finish, then measures. If the target is already visible it does nothing, since scrolling just
to center it would make the screen jump for no reason.

## Targets that are not mounted yet

If a step's target never shows up, the tour ends instead of getting stuck on the previous
step. When the target lives behind something you have to open first, use `before`:

```ts
{
  id: 'tray',
  title: 'Your batch',
  text: 'Everything you scan piles up here.',
  before: () => openTray(),
  beforeDelay: 620,
}
```

`before` runs before the measurement and `beforeDelay` waits for its animation to finish.
