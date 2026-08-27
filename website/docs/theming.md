---
sidebar_position: 3
title: Theming
---

# Theming

Every colour has a default taken from the design the library was built for. You override any
subset — palettes merge field by field, so you never have to restate the whole thing.

```tsx
<Cicerone.Provider
  steps={STEPS}
  theme={{
    ring: '#5fd694',
    scrim: 'rgba(11,18,13,.55)',
    card: { buttonBackground: '#2e9e5b' },
  }}>
```

## What is in a theme

| Field       | What it paints                           |
| ----------- | ---------------------------------------- |
| `scrim`     | The dim over everything outside the hole |
| `ring`      | The outline around the target            |
| `ringGlow`  | The halo radiating from the ring         |
| `ringWidth` | Thickness of the ring                    |
| `card`      | The default card palette                 |
| `highlight` | The palette a highlight step switches to |

## Card palettes

Both `card` and `highlight` take the same shape:

| Field                             | What it paints                                               |
| --------------------------------- | ------------------------------------------------------------ |
| `cardBackground`                  | Card fill                                                    |
| `cardBackgroundGradient`          | Second gradient stop; omit it and the card is a solid colour |
| `arrowBackground`                 | The diamond pinned to the card edge                          |
| `label`                           | The step counter or custom label                             |
| `title` / `text`                  | Card copy                                                    |
| `skip`                            | The skip link                                                |
| `buttonBackground` / `buttonText` | The advance button                                           |

## Highlight steps

A step with `variant: 'highlight'` switches to the second palette and turns on three extras:
a gradient card, a sheen sweeping across it, and sparkles orbiting the target. The ring also
pulses towards the highlight colour instead of holding steady.

```ts
{
  id: 'premium',
  title: 'Premium',
  text: 'Search without scanning, work offline, get alternatives.',
  variant: 'highlight',
  label: 'PREMIUM',
}
```

It is loud on purpose. Use it for an upsell or a new feature, not for every other step.

Recolouring it is the same partial merge:

```tsx
theme={{
  highlight: {
    cardBackground: '#1e2749',
    cardBackgroundGradient: '#0e1430',
    label: '#7aa2ff',
    buttonBackground: '#7aa2ff',
    buttonText: '#0e1430',
  },
}}
```

## Labels

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

`stepSingle` is what a one-step tour shows, since a counter reading "1 of 1" says nothing.

A step can also carry its own `label`, which replaces the counter for that step alone — that
is how the Premium example above reads `PREMIUM` instead of `TIP 5 OF 5`.

## Replacing the card

When theming is not enough, `renderCard` hands you everything the built-in card uses and
takes over completely. The spotlight, the ring and the placement stay.

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

You are responsible for positioning it. The `placement` and `layout` you receive tell you
which side the tour picked and where it would have put its own card.
