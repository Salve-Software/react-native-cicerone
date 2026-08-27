---
sidebar_position: 6
title: How it works
---

# How it works

Useful when something lands in the wrong place, or when you want to know whether the library
will cope with a layout it has not seen before.

## Measuring

Each step measures its target with `measureInWindow`. That is the API that replaced
`findNodeHandle`, which most of the older tour libraries still use even though it is
deprecated. The result comes back in window coordinates.

Android reports `0x0` for a view that has not been through layout yet, so a zero sized
measurement counts as "not ready" and gets retried a few times before the tour gives up on
that step.

## The hole

The dim is one SVG path filled with the even odd rule: the screen rect, then a rounded rect
subpath over the target. Even odd makes the inner shape punch through, which is how the hole
gets real rounded corners.

It used to be a view with a huge border and a hollow middle. That works and needs no SVG, but
on iOS any prop update on a bordered view makes the platform regenerate a border image on the
main thread. During a transition that was 52% of main thread CPU, measured with Instruments.

## The ring and the halo

The ring sits `padding` px outside the hole, so the band between them stays dimmed. That band
is what your eye reads as a halo, and the glow around the ring adds to it.

## Placement

The card goes wherever there is room:

```
target center above the middle  ->  card below
target center below the middle  ->  card above
```

The middle here is the overlay's middle, not the window's. The overlay measures its own box,
so a provider inside a sheet or under a header still decides correctly.

Horizontally the card is centered on the target and clamped to the screen margins. When the
clamp pulls the card away from the target, the arrow slides so it keeps pointing at the thing
being described.

:::note One deliberate difference
The design this came from centers the card on the screen, and its arrow only lines up because
every target in it happens to be centered. A library cannot count on that.
:::

## Touch

Touch is handled separately from the visuals, because the two want different shapes.

By default one layer covers the whole screen and a tap advances. With
`allowTargetInteraction` you get four strips around the hole instead, so the target stays
tappable. The scrim itself never captures touches, it only paints.

## Animation

Everything runs on Reanimated shared values, so transitions stay on the UI thread.

Between steps the hole and ring slide to the new geometry over 550ms with an ease out expo
curve, and the card slides with them. The card also replays its entrance, the rise and settle
but not the fade. Fading out while crossing the screen looks like a blink instead of movement.

Closing fades the scrim over 340ms while the card drops and shrinks over 300ms. Only then
does the overlay unmount.
