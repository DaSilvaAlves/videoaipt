---
provider_id: gemini-2.5-flash-image
implements: ImageProvider
camada: 2
status: stub_v1.0
fonte: PRD.md v1.0 §8.1 (stack ratificada Camada 2)
---

# gemini-2.5-flash-image — ImageProvider Stub v1.0

> **Status:** stub documentado. Implementação real fica para story futura do Epic 1 (Camada 2).

## Propósito

Implementação do contrato `ImageProvider` (ver `squad/providers/interfaces/ImageProvider.md`) usando **Gemini 2.5 Flash Image** da Google AI.

## Dependências (a instalar quando implementação for real)

```json
{
  "@google/generative-ai": "^0.21.0"
}
```

## Configuração

Variável de ambiente obrigatória:

```bash
GOOGLE_AI_API_KEY=AIza...   # obter em https://aistudio.google.com/apikey
```

## Chamada de exemplo (REFERENCE — não implementado)

```javascript
const provider = require('./index.js'); // a criar em story futura

const result = await provider.generate({
  prompt: 'Design comercial de prato Atum à Algarvia, paleta tons quentes',
  aspect_ratio: '1:1',
  palette_hint: '#6B3A2A,#D4A017,#5C6B2A',
  text_overlay_spec: { text: 'Atum à Algarvia', font_hint: 'bold-serif' },
});

// result === {
//   output_paths: ['/abs/path/to/design-01.png'],
//   cost_eur: 0.014,
//   latency_ms: 18000,
//   provider_metadata: { model: 'gemini-2.5-flash-image', safety_ratings: {...} }
// }
```

## Custo (PRD §8.5)

~$0,015/imagem [KC-2026-01]. Para batch de 4 imagens (caso Alturense típico) = ~$0,06 (~€0,06).

## Limitações conhecidas

1. **Texto em imagem:** Gemini tem limitações tipográficas. Se `text_overlay_spec` é crítico, considerar fallback Ideogram 2 (v1.1).
2. **Safety filters:** podem bloquear prompts com termos sensíveis. Aplicar reformulação automática se possível.
3. **Aspect ratios suportados:** verificar matriz oficial — v1.0 mínimo `1:1`.

## NotImplementedError

```javascript
throw new Error('NotImplementedError: gemini-2.5-flash-image stub — implementação real pendente Camada 2 story');
```

## Referências

- `squad/providers/interfaces/ImageProvider.md`
- PRD.md v1.0 §8.1, §8.5
- `docs/research/2026-04-17-video-stack-decision.md` §4
