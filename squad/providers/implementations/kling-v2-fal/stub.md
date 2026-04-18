---
provider_id: kling-v2-fal
implements: VideoProvider
camada: 1
status: stub_v1.0
fonte: PRD.md v1.0 §8.1 (stack ratificada Camada 1)
---

# kling-v2-fal — VideoProvider Stub v1.0

> **Status:** stub documentado. Implementação real fica para Story 1.2 (ou subsequente do Epic 1) que cobre Camada 1.
>
> Esta story (1.1) implementa apenas a Camada 3 (EditingProvider). Os 4 restantes Providers existem como contratos + stubs para honrar Q-ARQ-3 day-1.

## Propósito

Implementação do contrato `VideoProvider` (ver `squad/providers/interfaces/VideoProvider.md`) usando **Kling v2** acedido via **fal.ai**.

## Dependências (a instalar quando implementação for real)

```json
{
  "@fal-ai/client": "^1.0.0",
  "axios": "^1.7.0"
}
```

## Configuração

Variável de ambiente obrigatória:

```bash
FAL_API_KEY=fal-...   # obter em https://fal.ai/dashboard/keys
```

## Chamada de exemplo (REFERENCE — não implementado)

```javascript
const provider = require('./index.js'); // a criar em story futura

const result = await provider.generate({
  prompt: 'Plano cinematográfico de atum à algarvia em prato de barro, luz quente, 4K',
  duration_s: 10,
  aspect_ratio: '1:1',
  seed_image_path: null,
});

// result === {
//   output_path: '/abs/path/to/clip.mp4',
//   cost_eur: 0.38,
//   latency_ms: 92000,
//   provider_metadata: { model: 'kling-v2-master', request_id: '...' }
// }
```

## Custo (PRD §8.5)

~$0,04/segundo de vídeo gerado. Para 10s = ~$0,40 (~€0,38) [KC-2026-01].

## Notas de implementação futura

1. Modelo Kling v2 via fal.ai endpoint `fal-ai/kling-video/v2/master/text-to-video` (ou `image-to-video` quando seed presente).
2. Polling assíncrono — fal.ai retorna `request_id`, depois sondar com timeout de 5 minutos.
3. Conversão USD→EUR usando taxa fixa do dia (consultar via call inicial ao boot da task).
4. Retry policy: 3 tentativas com backoff exponencial (1s, 2s, 4s) — coding-standards.md §3.

## NotImplementedError

Quando esta interface for invocada antes da implementação real existir, lançar:

```javascript
throw new Error('NotImplementedError: kling-v2-fal stub — implementação real pendente Story 1.2+');
```

## Referências

- `squad/providers/interfaces/VideoProvider.md`
- PRD.md v1.0 §8.1 stack, §8.5 custo
- `docs/research/2026-04-17-video-stack-decision.md` §3
