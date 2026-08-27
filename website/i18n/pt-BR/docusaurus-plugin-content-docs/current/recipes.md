---
sidebar_position: 4
title: Receitas
---

# Receitas

## Lembrando o que já foi visto

Por padrão o registro fica em memória, então o tour volta toda vez que o app reinicia. Passe
qualquer coisa com `getItem`, `setItem` e `removeItem`. Síncrono e assíncrono funcionam.

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

O AsyncStorage funciona igual e as promises dele são aguardadas para você.

A lib não tem opinião sobre qual storage você usa, e é por isso que ela não depende de
nenhum.

## Um botão de repetir

```tsx
const { start, reset } = useCicerone();

const replay = () => {
  reset();
  start({ force: true });
};
```

O `force` pula a checagem de visto. O `reset()` também limpa o registro, então o tour voltaria
no próximo boot.

## Deixar o usuário tocar no elemento destacado

Por padrão uma camada cobre a tela e qualquer toque avança, que é o que a maioria dos
onboardings quer. Quando o ponto do passo é o usuário realmente apertar a coisa:

```tsx
<Cicerone.Provider steps={STEPS} allowTargetInteraction>
```

Aí quatro faixas cercam o furo em vez de uma camada inteira, e o alvo continua vivo.

Use `overlayPress="none"` se o toque não deve fazer nada e os botões do card são o único
caminho.

## Acompanhando o tour

```tsx
<Cicerone.Provider
  steps={STEPS}
  onStart={() => analytics.track('tour_started')}
  onStepChange={(index, step) => analytics.track('tour_step', { index, id: step.id })}
  onStop={(reason) => analytics.track('tour_ended', { reason })}
/>
```

O `onStop` diz qual dos três aconteceu: `finished`, `skipped`, ou `manual` se você chamou
`stop()`. Ele dispara uma vez, quando o tour acaba, não quando a animação de saída termina.

## Forçando o lado do card

O card escolhe o lado que tem espaço. Quando você sabe melhor:

```ts
{ id: 'header-action', title: '...', text: '...', placement: 'bottom' }
```

## Colocando um blur atrás do furo

O `renderBackdrop` desenha dentro do recorte, embaixo do scrim. A lib não traz blur, então
use o que seu app já tem.

```tsx
import { BlurView } from 'expo-blur';

<Cicerone.Provider
  steps={STEPS}
  renderBackdrop={() => <BlurView intensity={20} style={StyleSheet.absoluteFill} />}
/>;
```
