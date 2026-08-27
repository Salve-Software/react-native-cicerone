---
sidebar_position: 6
title: Como funciona
---

# Como funciona

Útil quando algo aparece no lugar errado, ou quando você quer saber se a lib dá conta de um
layout que ela ainda não viu.

## Medição

Cada passo mede o alvo com `measureInWindow`. É a API que substituiu o `findNodeHandle`, que
a maioria das libs de tour mais antigas ainda usa mesmo estando depreciado. O resultado vem
em coordenadas de janela.

O Android reporta `0x0` para uma view que ainda não passou por layout, então medida de
tamanho zero conta como "não pronto" e é repetida algumas vezes antes do tour desistir do
passo.

## O furo

O escurecido é um único path SVG preenchido com a regra even-odd: o retângulo da tela, e
depois um retângulo arredondado sobre o alvo. O even-odd faz a forma de dentro vazar, e é
assim que o furo ganha cantos arredondados de verdade.

Antes era uma view com uma borda enorme e o miolo vazio. Funciona e dispensa SVG, mas no iOS
qualquer atualização de prop numa view com borda faz a plataforma regenerar uma imagem de
borda na main thread. Durante uma transição isso era 52% do CPU da main thread, medido com o
Instruments.

## O anel e o halo

O anel fica `padding` px fora do furo, então a faixa entre os dois continua escurecida. É
essa faixa que o olho lê como halo, e o brilho em volta do anel soma nisso.

## Posicionamento

O card vai onde tem espaço:

```
centro do alvo acima do meio  ->  card embaixo
centro do alvo abaixo do meio ->  card em cima
```

O meio aqui é o meio do overlay, não o da janela. O overlay mede a própria caixa, então um
provider dentro de um sheet ou embaixo de um header ainda decide certo.

Na horizontal o card é centralizado no alvo e limitado às margens da tela. Quando esse limite
afasta o card do alvo, a seta desliza para continuar apontando para a coisa descrita.

:::note Uma diferença deliberada
O design de onde isso veio centraliza o card na tela, e a seta dele só bate porque todos os
alvos são centrais. Uma lib não pode contar com isso.
:::

## Toque

O toque é tratado separado do visual, porque os dois querem formatos diferentes.

Por padrão uma camada cobre a tela toda e o toque avança. Com `allowTargetInteraction` você
ganha quatro faixas em volta do furo, e o alvo continua tocável. O scrim nunca captura toque,
ele só pinta.

## Animação

Tudo roda em shared values do Reanimated, então as transições ficam na UI thread.

Entre passos o furo e o anel deslizam para a geometria nova em 550ms com curva ease out expo,
e o card desliza junto. O card também repete a entrada, a subida e o assentamento, mas sem o
fade. Sumir enquanto atravessa a tela parece piscada, não movimento.

Ao fechar, o scrim apaga em 340ms enquanto o card cai e encolhe em 300ms. Só depois disso o
overlay desmonta.
