---
sidebar_position: 6
title: How it works
---

# How it works

Useful when something lands in the wrong place, or when you are deciding whether to trust
the library with a layout it has not seen.

## Measuring

Each step measures its target with `measureInWindow`, which is the API that replaced
`findNodeHandle` and is not deprecated. The result is a rect in **window** coordinates.

Android reports `0x0` for a view that has not been through layout yet, so a zero-sized
measurement is treated as "not ready" and retried a few times before the tour gives up on
that step.

## The hole

The dim is a single SVG path filled with the even-odd rule: the screen rect, followed by a
rounded-rect subpath at the target. Even-odd makes the inner subpath punch through, which is
how the cut-out gets true rounded corners.

It used to be a view with a screen-wide border and a hollow centre. That works, and it needs
no SVG — but on iOS any prop update on a bordered view makes the platform regenerate a
border image on the main thread. During a transition that was 52% of main-thread CPU.

## The ring and the halo

The ring sits `padding` px outside the hole, which leaves the band between the two dimmed.
That band is what reads as a halo; the glow around the ring adds to it.

## Placement

The card takes the side with room:

```
target centre above the middle → card below
target centre below the middle → card above
```

The middle is the **overlay's** middle, not the window's. The overlay measures its own box,
so a provider inside a sheet or below a header still decides correctly.

Horizontally the card is centred on the target and clamped to the screen margins. When
clamping pulls the card away from the target, the arrow is repositioned so it keeps pointing
at the thing being described.

:::note A deliberate difference
The design this came from centres the card on the _screen_, and its arrow only lands because
every target in it happens to be central. A library cannot assume that.
:::

## Touch

Touch is decoupled from the visuals, because the two want different shapes.

By default one layer covers the whole screen and a press advances the tour. With
`allowTargetInteraction`, four strips surround the hole instead, leaving the target live.
The scrim itself never captures touches; it only paints.

## Animation

Everything runs on Reanimated shared values, so the transitions stay on the UI thread.

Between steps the hole and the ring slide to the new geometry over 550ms with an
ease-out-expo curve, and the card slides with them. The card also replays its entrance —
the rise and settle, without the fade, because fading out while crossing the screen reads as
a blink rather than as movement.

Closing fades the scrim over 340ms while the card drops and shrinks over 300ms, and only
then does the overlay unmount.
