# Remotion Template Scaffold — Alturense default (REFERENCE ONLY)

> **Aviso:** este ficheiro é **documentação de referência** para ajudar o @architect e o @dev a compreender a forma de um template Remotion para caso Alturense.
>
> **NÃO É CÓDIGO DE PRODUÇÃO.** Não deve ser copiado directamente para `squad/templates/`. Serve de base mental para a primeira story do Passo C.
>
> Autor: @analyst (Alex) em 2026-04-17 como parte do research stack.

## Contexto

Caso Alturense:
- Formato: Facebook 1:1 (1080×1080)
- Duração: 20-30s
- Elementos: 2 clips vídeo IA + 4 designs imagem + música royalty-free + texto animado (nome do prato + preço) + legendas queimadas (se voz presente)
- Paleta: quentes estilo "Atum à Algarvia" — tons de laranja, amarelo, vermelho

## Estrutura proposta de ficheiros

```
squad/templates/remotion/alturense-default/
├── package.json              # deps: remotion, @remotion/captions, @remotion/transitions
├── remotion.config.ts        # 1080x1080, 30fps
├── src/
│   ├── index.tsx             # entry point — regista composition
│   ├── AlturenseComposition.tsx  # composition principal
│   ├── scenes/
│   │   ├── Clip1Scene.tsx    # Clip Camada 1 #1 (0-10s)
│   │   ├── Clip2Scene.tsx    # Clip Camada 1 #2 (10-20s)
│   │   └── FinalScene.tsx    # Design Camada 2 com preço (20-28s)
│   ├── overlays/
│   │   ├── TextOverlay.tsx   # Nome do prato (entrada com spring animation)
│   │   └── PriceBadge.tsx    # Preço em destaque
│   ├── audio/
│   │   └── MusicLayer.tsx    # Música royalty-free com fade-in/fade-out
│   └── subtitles/
│       └── BurnedSubtitle.tsx  # Legendas @remotion/captions (se voz)
└── assets/
    ├── fonts/                # Fonts PT-PT friendly (ex: Montserrat)
    └── music/                # Tracks royalty-free default
```

## Interface de dados

O template aceita um `props` JSON vindo da task `assemble-final-video`:

```typescript
// REFERENCE ONLY — TypeScript interface
interface AlturenseCompositionProps {
  // Assets vindos das camadas anteriores
  clip1Url: string;           // Camada 1 output #1
  clip2Url: string;           // Camada 1 output #2
  finalDesignUrl: string;     // Camada 2 output #4 (design final)

  // Conteúdo textual do brief
  dishName: string;           // ex: "Atum à Algarvia"
  price: string;              // ex: "€12,50"

  // Música
  musicTrackPath: string;     // relative to assets/music/
  musicVolume: number;        // 0-1, default 0.4

  // Legendas (opcional)
  subtitlesSrtPath?: string;  // Camada 4 output, se houver voz

  // Branding
  brandColor: string;         // hex da paleta do cliente
  logoPath?: string;          // opcional
}
```

## Composition skeleton (REFERENCE ONLY)

```tsx
// REFERENCE ONLY — não é código runtime
import {Composition, Series, Video, Audio, useVideoConfig} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';

export const AlturenseComposition: React.FC<AlturenseCompositionProps> = (props) => {
  const {fps} = useVideoConfig();

  return (
    <>
      <TransitionSeries>
        {/* Scene 1: Clip vídeo IA #1 */}
        <TransitionSeries.Sequence durationInFrames={10 * fps}>
          <Clip1Scene videoUrl={props.clip1Url} dishName={props.dishName} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({durationInFrames: 15})}
        />

        {/* Scene 2: Clip vídeo IA #2 */}
        <TransitionSeries.Sequence durationInFrames={10 * fps}>
          <Clip2Scene videoUrl={props.clip2Url} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({durationInFrames: 15})}
        />

        {/* Scene 3: Design final com preço */}
        <TransitionSeries.Sequence durationInFrames={8 * fps}>
          <FinalScene designUrl={props.finalDesignUrl} price={props.price} />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Música de fundo durante toda a composition */}
      <Audio src={props.musicTrackPath} volume={props.musicVolume} />

      {/* Legendas queimadas (se presente) */}
      {props.subtitlesSrtPath && <BurnedSubtitle srtPath={props.subtitlesSrtPath} />}
    </>
  );
};
```

## Command-line render (REFERENCE ONLY)

```bash
# REFERENCE ONLY
# v1.0 local render
npx remotion render \
  src/index.tsx \
  AlturenseComposition \
  squad/data/alturense/videos/2026-04-17/final.mp4 \
  --props='{"clip1Url":"./clip-01.mp4","clip2Url":"./clip-02.mp4",...}'
```

## Custo de construção inicial (estimativa do @analyst)

| Tarefa | Esforço estimado |
|--------|-------------------|
| Setup Remotion project + deps | 0,5 dia |
| Composition skeleton + scenes | 1 dia |
| Overlays tipográficos com animation | 1 dia |
| Music + audio ducking | 0,5 dia |
| Subtitles integration | 0,5 dia |
| Testing + iteration com feedback Alturense | 1 dia |
| **Total** | **~4,5 dias** para 1º template |

Templates subsequentes (outros clientes) reduzem para ~1 dia/template por reuso da estrutura.

## Risco R4 — aqui é onde vive

Esta é **a camada mais cara de reverter**. Se Remotion não atingir qualidade CapCut em 1 mês, a mitigação é:

1. **Investir mais tempo em overlays** (R4 mitigation: 2-3 dias extra para melhorar tipografia animada)
2. **Fallback Shotstack** — re-fazer template como JSON template Shotstack (1-2 dias), cost trade-off
3. **Decisão de re-roll** — se >30% de vídeos exigem tweak manual no CapCut pós-Remotion, é sinal de que Remotion não está a cobrir o gap e stack precisa revisão

## Próximas perguntas para o @architect / @dev

1. O template deve ser TypeScript ou JavaScript puro? (squad config diz CommonJS; Remotion moderno é TS-first)
2. Render pipeline corre em processo filho do Node (via `npx remotion render`) ou embedded (Remotion Lambda SDK)?
3. Fonts são empacotadas no template ou carregadas de `squad/data/{slug}/brand/fonts/`?
4. Music licence é stored em `squad/templates/remotion/alturense-default/LICENCE-AUDIO.md` ou externalised?

---

*Reference document — @analyst 2026-04-17*
