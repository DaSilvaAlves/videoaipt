---
interface: CaptionProvider
version: v1.0
camada: 4
fonte: PRD.md v1.0 §8.3 Q-ARQ-3 + Q-ARQ-2 (Whisper out-of-scope v1.0)
implementacoes_v1.0:
  - text-from-script (stub — converte script.md em .srt sem ASR)
implementacoes_planeadas:
  - whisper-pt-pt (v1.1+ quando entrar cliente com narração)
Entrada: |
  - audio_path_or_script_md: string — path para .mp3/.wav (se Whisper) OU para script.md (se text-from-script)
  - language: string — ex: "pt-PT"
  - output_format: string — "srt" | "vtt"
Saida: |
  - srt_path: string — path absoluto do ficheiro de legendas gerado
  - cost_eur: number
  - latency_ms: number
Contrato: |
  - Provider DEVE retornar legendas no formato solicitado.
  - Provider DEVE garantir PT-PT correcto (sem PT-BR) — aplicar pós-processamento se necessário.
  - Provider stub `text-from-script` NÃO usa ASR — converte directamente texto escrito em segmentos temporizados.
  - Provider DEVE timestampar segmentos com base em duração do clip ou heurística (ex: 80 caracteres/segundo).
---

# CaptionProvider — Contrato Camada 4

> **Q-ARQ-2 — Whisper OUT-OF-SCOPE v1.0:**
>
> Vídeos Alturense não têm voz falada. v1.0 usa stub `text-from-script` que lê o `script.md` produzido pelo agente `script-writer` e converte em `.srt` com timestamps heurísticos.
>
> Re-activação Whisper em v1.1+ é troca da string `caption: text-from-script` → `caption: whisper-pt-pt` na `persona.yaml`. Zero refactor de tasks.

## Propósito

Abstracção uniforme para geração de legendas. v1.0 stub não-ASR; v1.1+ ASR real (Whisper) quando cliente com narração entrar no portfolio.

## Assinatura

```javascript
async function caption({audio_path_or_script_md, language, output_format}) {
  return {srt_path, cost_eur, latency_ms};
}
```

## Inputs

| Campo | Tipo | Obrigatório | Notas |
|-------|------|-------------|-------|
| `audio_path_or_script_md` | string | sim | Stub v1.0 espera path para `script.md`. Whisper v1.1+ esperaria path para áudio. |
| `language` | string | sim | Padrão `"pt-PT"`. NÃO `"pt-BR"`. |
| `output_format` | string | sim | `"srt"` ou `"vtt"`. v1.0 suporte mínimo `"srt"`. |

## Outputs

| Campo | Tipo | Notas |
|-------|------|-------|
| `srt_path` | string | Path absoluto do ficheiro `.srt` gerado. |
| `cost_eur` | number | `0` para stub `text-from-script`. Valor positivo para Whisper. |
| `latency_ms` | number | Latência da geração. |

## Erros possíveis

| Código | Causa | Acção sugerida |
|--------|-------|----------------|
| `SCRIPT_NOT_FOUND` | Path para script.md inválido | Validar input antes de chamar |
| `EMPTY_SCRIPT` | script.md vazio | Retornar .srt vazio sem erro (legendas opcionais) |
| `INVALID_LANGUAGE` | language não suportado | v1.0 só suporta pt-PT |

## Referências

- PRD.md v1.0 §8.3 Q-ARQ-3 + Q-ARQ-2
- PRD.md v1.0 §11.1 — out-of-scope Whisper v1.0
- Story 1.1 AC-B4 — BurnedSubtitle stub-safe
