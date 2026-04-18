# remotion-local — EditingProvider v1.0

> Implementação CommonJS do contrato `EditingProvider` (Camada 3) usando Remotion + FFmpeg em render local.
>
> Story 1.1 — AC-A2 e AC-B6.

## Propósito

Esta é a **única forma autorizada** de invocar o Remotion no projecto VIDEO-AI-PT. Decorre da regra arquitectural Q-ARQ-3 (PRD §8.3): nenhuma task ou workflow chama Remotion directamente.

## Setup

### Requisitos

| Requisito | Versão | Verificar |
|-----------|--------|-----------|
| Node.js | >=18 | `node --version` |
| FFmpeg | qualquer recente | `ffmpeg -version` (ou `npx remotion install ffmpeg`) |
| Template Remotion instalado | Ver `squad/templates/remotion/alturense-default/` | `cd squad/templates/remotion/alturense-default && npm install` |

### Instalação inicial

```bash
# 1. Instalar deps do template Remotion (uma vez)
cd squad/templates/remotion/alturense-default
npm install

# 2. (Opcional) Instalar FFmpeg via Remotion se não estiver no PATH
npx remotion install ffmpeg

# 3. Verificar versões
npx remotion versions
```

## Uso (CommonJS Node 18)

```javascript
const editingProvider = require('./squad/providers/implementations/remotion-local');

const resultado = await editingProvider.render({
  composition_spec: {
    composition_id: 'AlturenseComposition',
    template_id: 'alturense-default',           // opcional, default
    clip1Url: '/abs/path/to/clip-01.mp4',
    clip2Url: '/abs/path/to/clip-02.mp4',
    finalDesignUrl: '/abs/path/to/design-04.png',
    dishName: 'Atum à Algarvia',
    price: '€12,50',
    musicTrackPath: 'music/warm-background-01.mp3',
    musicVolume: 0.4,
    subtitlesSrtPath: undefined,                // stub-safe, undefined = sem legendas
    brandColor: '#6B3A2A',
    logoPath: undefined,
  },
  assets: {
    // informativo — paths já vêm em composition_spec
    clip1: '/abs/path/to/clip-01.mp4',
    clip2: '/abs/path/to/clip-02.mp4',
    finalDesign: '/abs/path/to/design-04.png',
  },
  output_spec: {
    output_path: 'squad/data/alturense/videos/2026-04-18/final.mp4',
    aspect_ratio: '1:1',
    fps: 30,
    codec: 'h264',
  },
});

console.log(resultado);
// {
//   output_path: '/abs/path/to/squad/data/alturense/videos/2026-04-18/final.mp4',
//   cost_eur: 0,
//   latency_ms: 67000,
//   render_logs: '/abs/path/to/squad/data/alturense/videos/2026-04-18/render/render-logs.txt'
// }
```

## Convenção de output

Cada chamada a `render()` cria/escreve:

```
squad/data/{slug}/videos/{YYYY-MM-DD}/
├── final.mp4
└── render/
    ├── composition.json   # composition_spec serializado (auditoria)
    └── render-logs.txt    # stdout/stderr do `npx remotion render`
```

A pasta é criada automaticamente se não existir.

## Erros possíveis

| Código | Causa | Resolução |
|--------|-------|-----------|
| `INVALID_COMPOSITION_SPEC` | composition_spec ausente ou não-objecto | Validar input antes de chamar |
| `INVALID_OUTPUT_SPEC` | output_spec.output_path ausente | Validar input antes de chamar |
| `TEMPLATE_NOT_FOUND` | Pasta do template não existe | Verificar `template_id` ou criar template |
| `REMOTION_NOT_INSTALLED` | npx remotion não disponível | `npm install` no template |
| `RENDER_FAILED` | Render terminou com exit !=0 | Inspeccionar `render-logs.txt` |

## Custo

`cost_eur: 0` para render local. Implementações cloud futuras (`remotion-lambda`) reportarão valor positivo.

Fonte: PRD §8.5 — render local Camada 3 = €0.

## Migração futura

Quando Fase 2 exigir scale multi-tenant, criar `squad/providers/implementations/remotion-lambda/` que implemente a mesma interface. Swap em `persona.yaml`:

```yaml
providers:
  editing: "remotion-lambda"   # antes: "remotion-local"
```

Zero refactor de tasks/workflows. Esta é a justificação central de Q-ARQ-3 day-1.

## Versões testadas

| Componente | Versão |
|-----------|--------|
| Node.js | v22.22.2 (testado); >=18 (mínimo) |
| Remotion | ver `package.json` do template |
| FFmpeg | qualquer build recente do bundle Remotion |
| Sistema | Windows 11 Pro (Story 1.1 dev environment) |

## Referências

- `squad/providers/interfaces/EditingProvider.md`
- PRD.md v1.0 §8.3 Q-ARQ-3, §8.4, §8.5
- `docs/stories/active/1.1.story.md` AC-A2, AC-B6
