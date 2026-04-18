---
provider_id: text-from-script
implements: CaptionProvider
camada: 4
status: stub_v1.0
fonte: PRD.md v1.0 §8.3 Q-ARQ-2 (Whisper out-of-scope)
---

# text-from-script — CaptionProvider Stub v1.0

> **Status:** stub documentado para v1.0. Implementação mínima funcional planeada para a story que cobre Camada 4 stub (não esta).
>
> **NÃO usa ASR/Whisper.** Converte directamente `script.md` em `.srt` com timestamps heurísticos.

## Propósito

Implementação do contrato `CaptionProvider` (ver `squad/providers/interfaces/CaptionProvider.md`) sem Whisper. Lê `script.md` produzido pelo agente `script-writer` (Reel) e gera `.srt` com timing baseado em heurística (caracteres/segundo).

## Dependências

Nenhuma externa — só Node 18 stdlib (`fs`, `path`).

## Configuração

Sem API key necessária. Stub puro local.

## Algoritmo (REFERENCE — não implementado)

```
1. Ler script.md
2. Dividir em segmentos por linha em branco
3. Para cada segmento:
   - calcular duração: chars / 16 (heurística: ~16 caracteres/segundo de leitura natural)
   - timestamp_inicio = soma das durações anteriores
   - timestamp_fim = timestamp_inicio + duração
4. Formatar como .srt:
   1
   00:00:00,000 --> 00:00:03,500
   Texto do segmento 1

   2
   00:00:03,500 --> 00:00:07,200
   Texto do segmento 2
5. Escrever para output_path/captions.srt
6. Retornar {srt_path, cost_eur: 0, latency_ms}
```

## Chamada de exemplo (REFERENCE — não implementado)

```javascript
const provider = require('./index.js'); // a criar em story futura

const result = await provider.caption({
  audio_path_or_script_md: 'squad/data/alturense/videos/2026-04-18/script.md',
  language: 'pt-PT',
  output_format: 'srt',
});

// result === {
//   srt_path: '/abs/path/to/captions.srt',
//   cost_eur: 0,
//   latency_ms: 30,
// }
```

## Importante para Story 1.1

O componente `BurnedSubtitle.tsx` do template Remotion **deve renderizar nada (sem erro)** quando `subtitlesSrtPath` é `undefined`. Esta é a condição stub-safe que permite v1.0 funcionar sem este provider implementado.

Quando este stub for implementado em story futura, o template já consegue consumi-lo automaticamente sem refactor.

## Re-activação Whisper v1.1+

Trocar `caption: text-from-script` → `caption: whisper-pt-pt` na `persona.yaml` do cliente. Zero refactor de tasks.

## NotImplementedError

```javascript
throw new Error('NotImplementedError: text-from-script stub — implementação real pendente Camada 4 story');
```

## Referências

- `squad/providers/interfaces/CaptionProvider.md`
- PRD.md v1.0 §8.3 Q-ARQ-2
- Story 1.1 AC-B4
