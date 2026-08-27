---
sidebar_position: 4
title: Receitas
---

# Receitas

## Lembrando o que já foi visto

A lib não guarda esse registro. Ela mostra o tour, e se o tour deve aparecer é decisão sua —
assim nenhum engine de storage entra no seu bundle à força.

O `autoStart` é o portão, e ele inicia o tour no momento em que vira `true`, o que faz uma
leitura assíncrona não custar nada.

```tsx
import { MMKV } from 'react-native-mmkv';

const mmkv = new MMKV();

export const Scanner = () => {
  const [seen, setSeen] = useState<boolean | null>(null);

  useEffect(() => {
    setSeen(mmkv.getBoolean('tour.scanner') ?? false);
  }, []);

  return (
    <Cicerone.Provider
      steps={STEPS}
      autoStart={seen === false}
      onStop={() => mmkv.set('tour.scanner', true)}
    >
      {/* targets */}
    </Cicerone.Provider>
  );
};
```

Enquanto `seen` for `null` a leitura ainda não chegou e o `autoStart` fica falso, então o tour
nunca pisca antes de você saber a resposta. O AsyncStorage funciona igual.

## Um botão de repetir

```tsx
const { start } = useCicerone();
```

`start()` roda o tour sempre que você chamar. Limpar o seu próprio registro, se você mantiver
um, é com você.

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
