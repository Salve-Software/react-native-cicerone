---
sidebar_position: 5
title: API
---

# API

## `Cicerone`

Um namespace para o código ficar `<Cicerone.Target>`. Cada membro também é exportado
sozinho, se você preferir.

| Member                | Also exported as     |
| --------------------- | -------------------- |
| `Cicerone.Provider`   | `CiceroneProvider`   |
| `Cicerone.Target`     | `Target`             |
| `Cicerone.ScrollView` | `CiceroneScrollView` |

## `Cicerone.Provider`

| Prop                     | Type                                                    | Default         | What it does                                            |
| ------------------------ | ------------------------------------------------------- | --------------- | ------------------------------------------------------- |
| `steps`                  | `ICiceroneStep[]`                                       | none            | O tour, em ordem                                        |
| `tourKey`                | `string`                                                | none            | Persistence key; without it nothing is remembered       |
| `autoStart`              | `boolean`                                               | `true`          | Inicia ao montar, se ainda não foi visto                |
| `startDelay`             | `number`                                                | `800`           | Espera antes do início automático, para a tela assentar |
| `storage`                | `ICiceroneStorage`                                      | in-memory       | Onde fica o registro de visto                           |
| `theme`                  | `ICiceroneThemeOverride`                                | shipped palette | Cores, mescladas campo a campo                          |
| `labels`                 | `Partial<ICiceroneLabels>`                              | English         | Texto dos botões e do contador                          |
| `overlayPress`           | `'next' \| 'skip' \| 'none'`                            | `'next'`        | O que um toque fora do alvo faz                         |
| `allowTargetInteraction` | `boolean`                                               | `false`         | Deixa o toque chegar no elemento destacado              |
| `renderCard`             | `(props: ICiceroneCardProps) => ReactNode`              | built-in card   | Troca o card                                            |
| `renderBackdrop`         | `(props) => ReactNode`                                  | none            | Desenha dentro do recorte, um blur por exemplo          |
| `cardWidth`              | `number`                                                | `284`           | Largura do card                                         |
| `cardStyle`              | `StyleProp<ViewStyle>`                                  | none            | Estilo extra no card padrão                             |
| `onStart`                | `() => void`                                            | none            | O tour começou                                          |
| `onStepChange`           | `(index: number, step: ICiceroneStep) => void`          | none            | Um passo ficou ativo                                    |
| `onStop`                 | `(reason: 'finished' \| 'skipped' \| 'manual') => void` | none            | O tour terminou                                         |

## `Cicerone.Target`

| Prop       | Type                   | What it does                                                        |
| ---------- | ---------------------- | ------------------------------------------------------------------- |
| `id`       | `string`               | Casa com o `id` de um step                                          |
| `children` | `ReactNode`            | O elemento a destacar                                               |
| `style`    | `StyleProp<ViewStyle>` | Aplicado ao wrapper, veja [Targets](./targets#um-target-é-uma-view) |

## `Cicerone.ScrollView`

Aceita todas as props de `ScrollView`. Seu `onScroll` e `onContentSizeChange` continuam
disparando, o componente só escuta junto.

## `ICiceroneStep`

| Field         | Type                          | Default     | What it does                  |
| ------------- | ----------------------------- | ----------- | ----------------------------- |
| `id`          | `string`                      | none        | Casa com um `Target`          |
| `title`       | `string`                      | none        | Título do card                |
| `text`        | `string`                      | none        | Corpo do card                 |
| `padding`     | `number`                      | `8`         | Espaço entre alvo e anel      |
| `radius`      | `number \| 'circle'`          | `0`         | Raio de canto do alvo         |
| `variant`     | `'default' \| 'highlight'`    | `'default'` | Qual paleta usar              |
| `label`       | `string`                      | none        | Substitui o contador do passo |
| `placement`   | `'top' \| 'bottom'`           | auto        | Força o lado do card          |
| `before`      | `() => void \| Promise<void>` | none        | Roda antes de medir           |
| `beforeDelay` | `number`                      | none        | Espera depois do `before`     |

## `useCicerone()`

Lança erro se você chamar fora de um provider. A mensagem nomeia o provider, para você não
ficar caçando um `undefined` três frames depois.

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

O que o `renderCard` recebe.

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

O `createMemoryStorage()` é exportado para testes, e também é o padrão.
