# Tech Stack — social-media-squad

## Linguagens & Runtime

| Componente | Tecnologia | Versão mínima |
|-----------|------------|---------------|
| Runtime | Node.js | 18+ |
| Scripts | JavaScript (CommonJS) | ES2022 |
| Configs | YAML | 1.2 |
| Docs | Markdown (CommonMark) | — |

## Dependências

### Runtime
- `axios` — HTTP client para calls de API (Nanobanana, APIs sociais)
- `yaml` — parse/stringify de configs

### Dev
- `jest` — framework de testes
- `eslint` — lint
- `prettier` — formatação

## APIs Externas

| Serviço | Propósito | Autenticação |
|---------|-----------|--------------|
| **Nanobanana** | Geração de imagens | `NANOBANANA_API_KEY` |
| **Apify** | Scraping de perfis (opcional) | `APIFY_API_TOKEN` |
| **Web Search** | Pesquisa inicial de perfis | — |

## Formatos de Dados

### Entrevista
```yaml
session_id: uuid
user_id: string
answers:
  - question: string
    answer: string
    timestamp: iso8601
depth_score: float (0-1)
```

### Persona
```yaml
persona_id: uuid
name: string
voice:
  tone: [casual, formal, provocativo, educativo, ...]
  pillars: [3-7 temas centrais]
audience:
  demographic: string
  psychographic: string
do: [string]
dont: [string]
examples: [copy references]
```

### Post Brief
```yaml
platform: [instagram, tiktok, linkedin, x]
hook: string (max 80 chars)
body: string
cta: string
hashtags: [string]
visual_brief: string (para Nanobanana)
```

## Padrões de Integração

- **Retry policy:** 3 tentativas com backoff exponencial (1s, 2s, 4s)
- **Rate limiting:** respeitar limites de cada API
- **Caching:** respostas de Nanobanana cached por 24h (idempotency)
