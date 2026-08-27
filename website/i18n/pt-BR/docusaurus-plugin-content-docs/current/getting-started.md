---
sidebar_position: 1
title: Começar
---

# Começar

O Cicerone escurece a tela, recorta um furo em volta de um elemento e mostra um card ao lado.
Você passa a lista de passos e marca os elementos. Ele cuida do resto.

## Requisitos

| Componente                | Requisito                                      |
| ------------------------- | ---------------------------------------------- |
| React Native              | 0.76.0 ou maior, com a New Architecture ligada |
| `react-native-reanimated` | 3.0.0 ou maior, peer dependency obrigatória    |
| `react-native-svg`        | 15.0.0 ou maior, peer dependency obrigatória   |

## Instalação

```bash
yarn add @salve-software/react-native-cicerone react-native-reanimated react-native-svg
```

As duas peers têm código nativo, então rode `pod install` depois. No Expo use
`npx expo install` em vez de adicionar na mão. O Reanimated é preso à runtime contra a qual
foi compilado, e uma versão errada não quebra o bundle. Ela crasha no boot, que é bem mais
chato de debugar.

## Seu primeiro tour

Você precisa de três coisas: um provider, os targets, e os steps referenciando os targets
pelo `id`.

```tsx
import { Cicerone, type ICiceroneStep } from '@salve-software/react-native-cicerone';

const STEPS: ICiceroneStep[] = [
  {
    id: 'viewfinder',
    title: 'Escaneie em massa',
    text: 'Passe vários produtos em sequência, sem parar.',
    padding: 26,
    radius: 28,
  },
  {
    id: 'scan-button',
    title: 'Sempre à mão',
    text: 'Este botão abre o scanner de qualquer tela.',
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

O tour roda sozinho na primeira vez que a tela monta, e nunca mais. Isso só vale se você
passar `tourKey` **e** [`storage`](./recipes#lembrando-o-que-já-foi-visto). Sem storage o
registro fica em memória e some quando o app fecha.

## Onde colocar o provider

Envolva a tela, não o app inteiro, a menos que todas as telas compartilhem o mesmo tour.

O overlay renderiza ao lado dos filhos do provider e trabalha dentro da caixa dele. Ou seja,
dá para colocar dentro de um bottom sheet ou de uma tela com header que ele ainda acerta o
lugar certo.

## Controlando na mão

```tsx
const { start, stop, next, previous, skip, reset, index, total } = useCicerone();
```

`start({ force: true })` roda um tour já marcado como visto, que é o que você quer atrás de
um botão "ver de novo". `reset()` só limpa o registro.

Passe `autoStart={false}` se preferir escolher o momento.
