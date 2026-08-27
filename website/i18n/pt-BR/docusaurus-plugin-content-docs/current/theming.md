---
sidebar_position: 3
title: Temas
---

# Temas

Toda cor tem um padrão. Você sobrescreve o que quiser e o resto continua, porque as paletas
se juntam campo a campo.

```tsx
<Cicerone.Provider
  steps={STEPS}
  theme={{
    ring: '#5fd694',
    scrim: 'rgba(11,18,13,.55)',
    card: { buttonBackground: '#2e9e5b' },
  }}>
```

## O que tem num tema

| Campo       | O que pinta                           |
| ----------- | ------------------------------------- |
| `scrim`     | O escurecido sobre tudo fora do furo  |
| `ring`      | O contorno em volta do alvo           |
| `ringGlow`  | O halo em volta do anel               |
| `ringWidth` | Espessura do anel                     |
| `card`      | Paleta padrão do card                 |
| `highlight` | Paleta usada pelos passos de destaque |

## Paletas de card

`card` e `highlight` têm o mesmo formato.

| Campo                             | O que pinta                                               |
| --------------------------------- | --------------------------------------------------------- |
| `cardBackground`                  | Fundo do card                                             |
| `cardBackgroundGradient`          | Segunda parada do gradiente. Sem ela o card é cor sólida. |
| `arrowBackground`                 | O losango na borda do card                                |
| `label`                           | Contador do passo ou rótulo customizado                   |
| `title` / `text`                  | Texto do card                                             |
| `skip`                            | O link de pular                                           |
| `buttonBackground` / `buttonText` | O botão de avançar                                        |

## Passos de destaque

Colocar `variant: 'highlight'` troca para a segunda paleta e liga três extras: card com
gradiente, um brilho atravessando ele, e faíscas em volta do alvo. O anel também pulsa em
direção à cor de destaque em vez de ficar parado.

```ts
{
  id: 'premium',
  title: 'Premium',
  text: 'Busque sem escanear, use offline, receba alternativas.',
  variant: 'highlight',
  label: 'PREMIUM',
}
```

É chamativo de propósito. Guarde para um upsell ou uma novidade, não para um passo sim outro
não.

Recolorir funciona do mesmo jeito:

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

## Rótulos

Os padrões estão em inglês. `{{current}}` e `{{total}}` são substituídos.

```tsx
labels={{
  step: 'DICA {{current}} DE {{total}}',
  stepSingle: 'DICA',
  next: 'Próximo',
  last: 'Entendi',
  skip: 'Pular',
}}
```

`stepSingle` é o que aparece num tour de um passo só, já que "1 de 1" não diz nada a ninguém.

Um passo também pode ter o próprio `label`, que substitui o contador só naquele passo. É
assim que o exemplo Premium acima mostra `PREMIUM` em vez de `DICA 5 DE 5`.

## Trocando o card

Quando o tema não basta, o `renderCard` te entrega tudo que o card embutido usa e deixa você
desenhar o seu. O holofote, o anel e o posicionamento continuam como estão.

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
      nextLabel={isLast ? 'Pronto' : 'Próximo'}
    />
  )}
/>
```

O posicionamento fica com você. O `placement` e o `layout` que chegam dizem qual lado o tour
escolheu e onde ele teria posto o próprio card.
