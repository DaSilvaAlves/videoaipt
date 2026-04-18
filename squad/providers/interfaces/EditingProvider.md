---
interface: EditingProvider
version: v1.0
camada: 3
fonte: PRD.md v1.0 §8.3 Q-ARQ-3 (decisão arquitectural mais importante de v1.0)
implementacoes_v1.0:
  - remotion-local
implementacoes_planeadas:
  - shotstack-api (v1.1 fallback se Remotion blocker)
  - remotion-lambda (Fase 2 escala multi-tenant)
Entrada: |
  - composition_spec: object — JSON com props da Composition Remotion (AlturenseCompositionProps ou equivalente)
  - assets: object — paths locais dos clips, imagens, áudio, legendas
  - output_spec: object — destino e codec do output final
Saida: |
  - output_path: string — path absoluto local do .mp4 final
  - cost_eur: number — €0 para render local, valor positivo para cloud
  - latency_ms: number
  - render_logs: string — path do ficheiro de logs do render
Contrato: |
  - Provider DEVE garantir que output respeita output_spec.aspect_ratio e output_spec.fps.
  - Provider DEVE escrever render_logs mesmo em caso de falha (debugging).
  - Provider NÃO DEVE chamar Remotion (ou outro motor) directamente fora desta interface — TODA invocação de render passa por aqui (regra Q-ARQ-3).
  - Provider DEVE criar pastas de output automaticamente se não existirem.
  - Provider DEVE retornar cost_eur=0 para implementações locais (render-local).
---

# EditingProvider — Contrato Camada 3 (CRÍTICO)

> **Q-ARQ-3 — Decisão arquitectural mais importante da v1.0:**
>
> NUNCA chamar Remotion (ou outro motor de edição) directamente. SEMPRE via `EditingProvider.render({...})`.
>
> Esta abstracção desbloqueia v1.1 fallback Shotstack e Fase 2 migração Remotion Lambda sem refactor de tasks.

## Propósito

Encapsular a Camada 3 de edição programática. v1.0 implementa `remotion-local` (render local na máquina do Eurico, custo €0). Implementações futuras podem trocar por Shotstack API ou Remotion Lambda sem alterar o consumidor.

## Assinatura

```javascript
async function render({composition_spec, assets, output_spec}) {
  return {output_path, cost_eur, latency_ms, render_logs};
}
```

## Inputs

| Campo | Tipo | Obrigatório | Notas |
|-------|------|-------------|-------|
| `composition_spec` | object | sim | JSON com props da Composition. Para Alturense default: `AlturenseCompositionProps` (ver template `squad/templates/remotion/alturense-default/`). |
| `assets` | object | sim | Map de paths locais. Ex: `{clip1: "...", clip2: "...", finalDesign: "...", music: "..."}`. |
| `output_spec` | object | sim | `{output_path, aspect_ratio, fps, codec}`. |

### Schema `output_spec`

```yaml
output_path: string         # ex: "squad/data/alturense/videos/2026-04-18/final.mp4"
aspect_ratio: string        # ex: "1:1"
fps: number                 # ex: 30
codec: string (opcional)    # default: "h264"
```

## Outputs

| Campo | Tipo | Notas |
|-------|------|-------|
| `output_path` | string | Path absoluto do `.mp4` final. |
| `cost_eur` | number | `0` para render-local. Valor positivo para implementações cloud. |
| `latency_ms` | number | Tempo total do render. |
| `render_logs` | string | Path do ficheiro `render-logs.txt` com stdout/stderr do render. |

## Padrão de persistência (PRD §8.4)

Output obrigatório em:

```
squad/data/{slug}/videos/{YYYY-MM-DD}/
├── final.mp4
└── render/
    ├── composition.json   # composition_spec serializado
    └── render-logs.txt    # render_logs path
```

## Erros possíveis

| Código | Causa | Acção sugerida |
|--------|-------|----------------|
| `REMOTION_NOT_INSTALLED` | `npx remotion` não disponível | Documentar setup no README |
| `FFMPEG_NOT_INSTALLED` | FFmpeg não no PATH | `npx remotion install ffmpeg` |
| `COMPOSITION_NOT_FOUND` | composition_spec.composition_id não existe no template | Validar nome da Composition |
| `ASSET_NOT_FOUND` | Path em assets não existe | Validar paths antes de chamar render |
| `RENDER_FAILED` | Erro genérico do render | Inspeccionar render_logs |

## Referências

- PRD.md v1.0 §8.3 Q-ARQ-3 — decisão e justificação
- PRD.md v1.0 §8.4 — data persistence pattern
- PRD.md v1.0 §13.5 — risco R4 (Remotion vs CapCut)
- Story 1.1 — `docs/stories/active/1.1.story.md` AC-A2 e AC-B6
