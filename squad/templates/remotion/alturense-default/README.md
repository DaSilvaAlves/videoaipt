# Template Remotion — Alturense Default

> Template Remotion default para o cliente **Snack Bar Clube Recreativo Alturense**. Produz vídeos Facebook 1:1 (1080x1080), 30fps, 28s, com 2 clips de vídeo IA + 1 design final + overlays animados + música royalty-free.
>
> Story 1.1 do projecto VIDEO-AI-PT — Camada 3 do pipeline.

---

## Estrutura

```
alturense-default/
├── package.json              # deps Remotion 4 + React 18
├── remotion.config.ts        # codec H.264, CRF 18, JPEG preview
├── tsconfig.json             # paths absolutos via @/*
├── src/
│   ├── index.tsx             # Composition registration (28s @ 30fps, 1080x1080)
│   ├── AlturenseComposition.tsx
│   ├── scenes/
│   │   ├── Clip1Scene.tsx    # 0-10s — clip IA #1 + nome do prato
│   │   ├── Clip2Scene.tsx    # 10,5-20,5s — clip IA #2
│   │   └── FinalScene.tsx    # 21-28s — design final + price badge
│   ├── overlays/
│   │   ├── TextOverlay.tsx   # spring animation, configurável
│   │   └── PriceBadge.tsx    # destaque comercial central
│   ├── audio/
│   │   └── MusicLayer.tsx    # fade-in/out, volume configurável
│   └── subtitles/
│       └── BurnedSubtitle.tsx  # stub-safe (Q-ARQ-2)
├── public/
│   └── music/
│       ├── README.md         # como colocar a track
│       └── (warm-background-01.mp3)   # NÃO comitada — ver README
└── assets/
    ├── fonts/README.md       # Montserrat via @remotion/google-fonts
    └── LICENCE-AUDIO.md      # PROVA R9 — preencher antes de produção
```

## Imports absolutos

Todos os imports internos usam `@/...` configurado em `tsconfig.json`:

```tsx
import { Clip1Scene } from '@/scenes/Clip1Scene';
import { TextOverlay } from '@/overlays/TextOverlay';
```

NUNCA usar paths relativos como `../../scenes/...`.

---

## Setup

### 1. Instalar dependências

```bash
cd squad/templates/remotion/alturense-default
npm install
```

Tempo estimado: 1-3 minutos (Remotion descarrega Chromium ~200MB no primeiro install).

### 2. (Opcional) Instalar FFmpeg

Se `ffmpeg -version` falhar no shell:

```bash
npx remotion install ffmpeg
```

### 3. Verificar setup

```bash
npx remotion versions
```

Output esperado: lista das versões dos pacotes Remotion (todas em sync com `package.json`).

### 4. Colocar a track de música

Ler `public/music/README.md` para os passos. Antes do primeiro render, deve existir `public/music/warm-background-01.mp3` (track real Uppbeat / Artlist / Epidemic Sound) e `assets/LICENCE-AUDIO.md` deve estar preenchido.

---

## Render local

### Opção 1 — Via EditingProvider (RECOMENDADA, regra Q-ARQ-3)

```javascript
const editingProvider = require('../../../providers/implementations/remotion-local');

const resultado = await editingProvider.render({
  composition_spec: {
    composition_id: 'AlturenseComposition',
    template_id: 'alturense-default',
    clip1Url: '/abs/path/clip-01.mp4',
    clip2Url: '/abs/path/clip-02.mp4',
    finalDesignUrl: '/abs/path/design-04.png',
    dishName: 'Atum à Algarvia',
    price: '€12,50',
    musicTrackPath: 'music/warm-background-01.mp3',
    musicVolume: 0.4,
    subtitlesSrtPath: undefined,    // stub-safe
    brandColor: '#6B3A2A',
    logoPath: undefined,
  },
  assets: {},
  output_spec: {
    output_path: '/abs/path/squad/data/alturense/videos/2026-04-18/final.mp4',
    aspect_ratio: '1:1',
    fps: 30,
    codec: 'h264',
  },
});

console.log(resultado);
// { output_path, cost_eur: 0, latency_ms, render_logs }
```

### Opção 2 — Direct CLI (apenas para debug e iteração rápida do template)

```bash
cd squad/templates/remotion/alturense-default

npx remotion render \
  src/index.tsx \
  AlturenseComposition \
  out/preview.mp4 \
  --props='{"clip1Url":"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4","clip2Url":"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4","finalDesignUrl":"https://placehold.co/1080x1080/6B3A2A/D4A017.png?text=Alturense","dishName":"Atum à Algarvia","price":"€12,50","musicTrackPath":"music/warm-background-01.mp3","musicVolume":0.4,"brandColor":"#6B3A2A"}'
```

> **AVISO:** Opção 2 viola Q-ARQ-3 em produção. Usar APENAS para debug.

### Opção 3 — Studio interactivo

```bash
cd squad/templates/remotion/alturense-default
npx remotion studio src/index.tsx
```

Abre Studio Remotion no browser para preview + tweaking visual em tempo real.

---

## Validação manual (AC-C1)

Após o primeiro render bem-sucedido, validar:

```bash
# Duração e resolução
ffprobe -v error -show_entries format=duration -show_entries stream=width,height,r_frame_rate /path/to/final.mp4

# Esperado:
#   width: 1080
#   height: 1080
#   r_frame_rate: 30/1
#   duration: ~28.0 (entre 20-30 dentro de tolerância AC-B2)
```

E inspecção visual:
- Transições fade entre cenas suaves (~0,5s)
- TextOverlay "Atum à Algarvia" com entrada elástica
- PriceBadge "€12,50" com destaque comercial dourado
- Música audível mas não competindo com vídeo
- Sem placeholder em inglês
- Vírgula no preço (PT-PT) — `€12,50` não `€12.50`

---

## Versões testadas

| Componente | Versão |
|-----------|--------|
| Node.js | v22.22.2 (testado em Story 1.1); >=18 mínimo |
| Remotion | 4.0.180 (declarado em `package.json`) |
| React | 18.3.1 |
| FFmpeg | bundled via `npx remotion install ffmpeg` |
| Sistema operativo | Windows 11 Pro (Story 1.1 dev environment) |

---

## Troubleshooting

| Sintoma | Causa provável | Resolução |
|---------|----------------|-----------|
| `Error: Cannot find module 'remotion'` | `npm install` não corrido | Correr `npm install` na raíz do template |
| `ffmpeg: command not found` | FFmpeg não no PATH | `npx remotion install ffmpeg` |
| `staticFile: file not found` | `public/music/warm-background-01.mp3` ausente | Descarregar track e colocar em `public/music/` |
| Render lento (>5 min) | Hardware fraco ou clip Camada 1 muito grande | Aceitar — render local 30-90s típico (PRD §8.6) |
| Texto do overlay cortado | `dishName` muito longo (>30 chars) | Ajustar `maxWidth` em `TextOverlay.tsx` ou abreviar nome |
| Preço com ponto em vez de vírgula | Persona/script gerou em formato errado | Validar via `quality-gate-automatic` (AC-C3) — formato PT-PT obrigatório |

---

## Referências

- Story: `docs/stories/active/1.1.story.md`
- Contrato Provider: `squad/providers/interfaces/EditingProvider.md`
- Implementação: `squad/providers/implementations/remotion-local/`
- PRD: `PRD.md` v1.0 §8.1, §8.3 Q-ARQ-3, §8.4, §8.5, §14
- Research: `docs/research/2026-04-17-video-stack-decision.md` §5
- Scaffold original: `docs/research/samples/remotion-alturense-scaffold.md`
