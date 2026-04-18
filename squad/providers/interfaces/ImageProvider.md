---
interface: ImageProvider
version: v1.0
camada: 2
fonte: PRD.md v1.0 §8.3 Q-ARQ-3
implementacoes_v1.0:
  - gemini-2.5-flash-image
implementacoes_planeadas:
  - canva-mcp (flag-based híbrido v1.0 quando persona.canva_editable=true)
  - ideogram-2 (v1.1 fallback text-heavy)
Entrada: |
  - prompt: string — descrição visual do design
  - aspect_ratio: string — ex: "1:1", "9:16"
  - palette_hint: string (opcional) — hex ou nome de paleta
  - text_overlay_spec: object (opcional) — texto a integrar na imagem
Saida: |
  - output_paths: array<string> — paths locais absolutos dos PNG gerados
  - cost_eur: number
  - latency_ms: number
  - provider_metadata: object
Contrato: |
  - Provider DEVE retornar PNG com aspect_ratio exacto (sem letterboxing).
  - Provider DEVE respeitar palette_hint quando suportado (Gemini 2.5 Flash Image suporta via prompt).
  - Provider DEVE devolver array, mesmo para 1 imagem — consistência com batch generation.
  - Provider NÃO DEVE inventar texto se text_overlay_spec for fornecido — usar apenas o texto solicitado.
---

# ImageProvider — Contrato Camada 2

## Propósito

Geração de designs de imagem para Camada 2 do pipeline. Pode ser activado em modo híbrido com Canva MCP via flag `canva_editable: true` na `persona.yaml` (v1.0 default Gemini 2.5 Flash Image).

## Assinatura

```javascript
async function generate({prompt, aspect_ratio, palette_hint, text_overlay_spec}) {
  return {output_paths, cost_eur, latency_ms, provider_metadata};
}
```

## Inputs

| Campo | Tipo | Obrigatório | Notas |
|-------|------|-------------|-------|
| `prompt` | string | sim | Descrição visual. PT-PT preferido; provider pode traduzir. |
| `aspect_ratio` | string | sim | v1.0 suporte mínimo `"1:1"`. |
| `palette_hint` | string | não | Hex (`"#6B3A2A"`) ou nome (`"warm-earthy"`). |
| `text_overlay_spec` | object | não | Schema livre — ex: `{text: "Atum à Algarvia", font_hint: "bold"}` |

## Outputs

| Campo | Tipo | Notas |
|-------|------|-------|
| `output_paths` | array&lt;string&gt; | Lista de paths PNG. v1.0 tipicamente 1-4 imagens. |
| `cost_eur` | number | Custo total da batch. |
| `latency_ms` | number | Latência end-to-end. |
| `provider_metadata` | object | Model, request id, safety filter results. |

## Erros possíveis

| Código | Causa | Acção sugerida |
|--------|-------|----------------|
| `SAFETY_FILTER_BLOCKED` | Provider rejeitou prompt por policy | Reformular prompt sem termos sensíveis |
| `TEXT_RENDERING_POOR` | Output com texto ilegível (Gemini limitação) | Cair em fallback Ideogram (v1.1) ou Canva MCP |
| `PROVIDER_API_ERROR` | Falha na API externa | Retry exponencial (3 tentativas) |

## Referências

- PRD.md v1.0 §8.1 — stack Camada 2
- PRD.md v1.0 §8.5 — custo (~$0,015/imagem Gemini)
- `docs/research/2026-04-17-video-stack-decision.md` §4 — análise Camada 2
