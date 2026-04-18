---
interface: VideoProvider
version: v1.0
camada: 1
fonte: PRD.md v1.0 §8.3 Q-ARQ-3
implementacoes_v1.0:
  - kling-v2-fal
implementacoes_planeadas:
  - luma-dream-machine-fal (v1.1 fallback)
  - runway-gen4-turbo (Fase 2 premium)
Entrada: |
  - prompt: string — descrição cinematográfica do clip
  - duration_s: number — duração em segundos (tipicamente 5-10)
  - aspect_ratio: string — ex: "1:1", "9:16", "16:9"
  - seed_image_path: string (opcional) — path para imagem semente (image-to-video)
Saida: |
  - output_path: string — path local absoluto do .mp4 gerado
  - cost_eur: number — custo da chamada em euros
  - latency_ms: number — latência total em milissegundos
  - provider_metadata: object — dados específicos do provider (model, seed, etc.)
Contrato: |
  - Provider DEVE retornar mp4 H.264 com a duração exacta solicitada (±0,5s tolerância).
  - Provider DEVE registar custo em EUR mesmo que o serviço facture em USD (conversão interna).
  - Provider DEVE rejeitar com erro descritivo se aspect_ratio não for suportado.
  - Provider NÃO DEVE silenciar falhas — escalar erros à task chamadora.
---

# VideoProvider — Contrato Camada 1

> Contrato declarativo task-style do squad. Implementações concretas vivem em `squad/providers/implementations/{provider-id}/`. Seleção runtime via `persona.yaml` campo `providers.video`.

## Propósito

Abstracção uniforme para geração de clips de vídeo IA da Camada 1 do pipeline `daily-content-delivery`. Permite swap de provider (Kling v2 → Luma → Runway) sem refactor de tasks ou workflows (Q-ARQ-3 day-1).

## Assinatura (pseudocódigo Node 18 CommonJS)

```javascript
async function generate({prompt, duration_s, aspect_ratio, seed_image_path}) {
  // implementação específica do provider
  return {output_path, cost_eur, latency_ms, provider_metadata};
}
```

## Inputs

| Campo | Tipo | Obrigatório | Notas |
|-------|------|-------------|-------|
| `prompt` | string | sim | Descrição cinematográfica em PT-PT ou EN. O provider pode traduzir internamente se necessário. |
| `duration_s` | number | sim | Duração desejada em segundos. Tipicamente 5-10. |
| `aspect_ratio` | string | sim | Formato `"W:H"`. v1.0 suporte mínimo `"1:1"`. |
| `seed_image_path` | string | não | Path local de imagem semente (image-to-video). Quando presente, provider usa este como primeiro frame. |

## Outputs

| Campo | Tipo | Notas |
|-------|------|-------|
| `output_path` | string | Path absoluto local do `.mp4` gerado. |
| `cost_eur` | number | Custo da chamada convertido para EUR. |
| `latency_ms` | number | Latência end-to-end (chamada → ficheiro escrito). |
| `provider_metadata` | object | Campos livres específicos do provider (model name, seed, request id). |

## Erros possíveis

| Código | Causa | Acção sugerida |
|--------|-------|----------------|
| `PROVIDER_API_ERROR` | Falha na API externa (5xx, timeout) | Retry com backoff exponencial (3 tentativas) |
| `INVALID_ASPECT_RATIO` | aspect_ratio não suportado pelo provider | Cair no fallback v1.1 (Luma) |
| `INVALID_DURATION` | duration_s fora do range suportado | Validar input antes de chamar provider |
| `INSUFFICIENT_CREDITS` | Conta sem saldo | Escalar a Eurico — out-of-band |

## Referências

- PRD.md v1.0 §8.1 — stack ratificada Camada 1
- PRD.md v1.0 §8.3 — Q-ARQ-3 abstraction pattern
- PRD.md v1.0 §8.5 — breakdown de custo (~$0,04/segundo Kling)
- `docs/research/2026-04-17-video-stack-decision.md` §3 — análise Camada 1
