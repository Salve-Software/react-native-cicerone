---
sidebar_position: 3
title: Theming
---

# Theming

Every color has a default. You override whatever you want and the rest stays, because
palettes merge field by field.

```tsx
<Cicerone.Provider
  steps={STEPS}
  theme={{
    ring: '#5fd694',
    scrim: 'rgba(11,18,13,.55)',
    card: { buttonBackground: '#2e9e5b' },
  }}>
```

## What a theme holds

| Field       | What it paints                           |
| ----------- | ---------------------------------------- |
| `scrim`     | The dim over everything outside the hole |
| `ring`      | The outline around the target            |
| `ringGlow`  | The halo around the ring                 |
| `ringWidth` | Ring thickness                           |
| `card`      | Default card palette                     |
| `highlight` | Palette used by highlight steps          |

## Card palettes

`card` and `highlight` take the same shape.

| Field                             | What it paints                                        |
| --------------------------------- | ----------------------------------------------------- |
| `cardBackground`                  | Card fill                                             |
| `cardBackgroundGradient`          | Second gradient stop. Leave it out for a solid color. |
| `arrowBackground`                 | The little diamond on the card edge                   |
| `label`                           | Step counter or custom label                          |
| `title` / `text`                  | Card copy                                             |
| `skip`                            | The skip link                                         |
| `buttonBackground` / `buttonText` | The advance button                                    |

## Highlight steps

Setting `variant: 'highlight'` switches to the second palette and turns on three extras: a
gradient card, a sheen that sweeps across it, and sparkles around the target. The ring also
pulses toward the highlight color instead of staying flat.

```ts
{
  id: 'premium',
  title: 'Premium',
  text: 'Search without scanning, work offline, get alternatives.',
  variant: 'highlight',
  label: 'PREMIUM',
}
```

It is loud on purpose. Save it for an upsell or a new feature, not for every other step.

Recoloring works the same way:

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

Defaults are in English. `{{current}}` and `{{total}}` get replaced.

```tsx
labels={{
  step: 'DICA {{current}} DE {{total}}',
  stepSingle: 'DICA',
  next: 'Próximo',
  last: 'Entendi',
  skip: 'Pular',
}}
```

`stepSingle` is what shows on a one step tour, since "1 of 1" tells nobody anything.

A step can also carry its own `label`, which replaces the counter for that step only. That is
how the Premium example above reads `PREMIUM` instead of `TIP 5 OF 5`.

## Replacing the card

When theming is not enough, `renderCard` gives you everything the built in card uses and lets
you draw your own. The spotlight, ring and placement stay as they are.

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

Positioning is on you. The `placement` and `layout` you get tell you which side the tour
picked and where it would have put its own card.
