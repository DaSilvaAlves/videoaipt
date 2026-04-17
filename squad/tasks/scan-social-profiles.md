---
task: Scan Social Profiles
responsavel: "@social-scout"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - person_slug: Slug da pessoa (obrigatório — resolvido via *resolve-person)
  - user_handles: Lista de handles por plataforma (ex: [{platform: instagram, handle: "@joao"}])
  - platforms: Lista de plataformas para escanear
Saida: |
  - research_dir: data/{person_slug}/research/
  - raw_files: data/{person_slug}/research/raw-{platform}.json (PERSISTIDOS)
  - raw_profile_data: Dados brutos coletados por plataforma
  - scan_report: Relatório de status (sucesso/falhas/skipped)
Checklist:
  - "[ ] Step 0: Resolver person_slug via *resolve-person"
  - "[ ] Validar handles"
  - "[ ] Verificar acesso público a cada perfil"
  - "[ ] Decidir estratégia: Apify (se APIFY_API_TOKEN) ou Web Search"
  - "[ ] Coletar: bio, últimos 20 posts, engajamento básico"
  - "[ ] Respeitar rate limits"
  - "[ ] PERSISTIR em data/{person_slug}/research/raw-{platform}.json (MANDATORY)"
---

# *scan-social-profiles

Coleta dados públicos de perfis sociais para análise de comportamento digital.

## Estratégia

```
1. Para cada handle:
   a. Verificar se perfil é público
   b. Se APIFY_API_TOKEN disponível → usar social-scraper.js
   c. Senão → fallback para web search (limitado a bio + últimos posts indexados)

2. Dados coletados (por plataforma):
   - Instagram: bio, últimos 20 posts (caption, likes, comments, data)
   - TikTok: bio, últimos 10 vídeos (description, views, likes)
   - LinkedIn: headline, últimos 10 posts, seção "about"
   - X: bio, últimos 30 tweets

3. Filtros obrigatórios:
   - Apenas dados públicos
   - Sem autenticação de terceiros
   - Respeitar robots.txt
```

## Output Schema

```yaml
user_id: string
scan_date: iso8601
platforms:
  instagram:
    handle: "@joao"
    bio: string
    follower_count: int | null
    posts:
      - id: string
        caption: string
        likes: int
        comments: int
        date: iso8601
        media_type: [photo | video | carousel]
    scan_status: [success | partial | failed]

scan_report:
  total_platforms: int
  successful: int
  failed: int
  reasons: {platform: reason}
```

## Error Handling

| Error | Causa | Resolução |
|-------|-------|-----------|
| `PROFILE_PRIVATE` | Perfil fechado | Pular, documentar no report |
| `RATE_LIMITED` | Muitas requests | Backoff 60s, retry |
| `APIFY_UNAVAILABLE` | Token ausente/inválido | Fallback para web search |
