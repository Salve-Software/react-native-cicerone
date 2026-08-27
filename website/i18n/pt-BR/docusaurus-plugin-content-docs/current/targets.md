---
sidebar_position: 2
title: Targets
---

# Targets

Um `Target` marca o elemento que um passo aponta. Dê um `id` e o step com o mesmo `id` vai
medir ele.

```tsx
<Cicerone.Target id="scan-button">
  <ScanButton />
</Cicerone.Target>
```

## Um Target é uma View

Leia este primeiro, é onde quase todo mundo tropeça.

O `Target` põe uma `View` em volta do seu elemento, então ele participa do layout como
qualquer outra view. Dentro de uma coluna ele estica para a largura toda, e aí o tour mede
esse wrapper em vez da coisa que você vê. Um botão redondo acaba com um anel do tamanho da
tela.

Se o alvo é mais estreito que o container, mande ele encolher:

```tsx
<Cicerone.Target id="scan-button" style={{ alignSelf: 'flex-start' }}>
  <ScanButton />
</Cicerone.Target>
```

Alvos que já estão numa row, ou que devem ocupar o container inteiro, funcionam como estão.

:::note Por que isso não é o padrão
Porque o caso oposto é igualmente comum. Um card que deve ocupar a largura toda ia encolher.
Não existe padrão que sirva para os dois, então o `Target` aceita `style` e esta página diz
quando você precisa dele.
:::

## Formato do furo

Dois campos do step controlam isso.

| Campo     | Efeito                                                                                  |
| --------- | --------------------------------------------------------------------------------------- |
| `padding` | Espaço entre o alvo e o anel. Essa faixa continua escurecida, e é ela que forma o halo. |
| `radius`  | Raio de canto do alvo. Use `'circle'` para arredondar pela metade do menor lado.        |

```ts
{ id: 'scan-button', title: '...', text: '...', padding: 5, radius: 'circle' }
```

## Targets dentro de um ScrollView

Use `Cicerone.ScrollView` no lugar do `ScrollView`. Os targets acham ele pelo contexto, então
não tem ref para passar de um lado para o outro.

```tsx
<Cicerone.ScrollView>
  <Cicerone.Target id="history">
    <HistoryCard />
  </Cicerone.Target>
</Cicerone.ScrollView>
```

Quando um passo aponta para algo fora da tela, o tour rola até lá, espera o scroll terminar e
só então mede. Se o alvo já está visível ele não faz nada, porque rolar só para centralizar
faria a tela pular sem motivo.

## Targets que ainda não montaram

Se o alvo de um passo nunca aparece, o tour encerra em vez de ficar preso no passo anterior.
Quando o alvo está atrás de algo que precisa ser aberto antes, use `before`:

```ts
{
  id: 'tray',
  title: 'Sua leva',
  text: 'Tudo que você escaneia se acumula aqui.',
  before: () => openTray(),
  beforeDelay: 620,
}
```

O `before` roda antes da medição e o `beforeDelay` espera a animação dele terminar.
