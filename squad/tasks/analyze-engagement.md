---
task: Analyze Engagement
responsavel: "@social-scout"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - person_slug: Slug da pessoa (obrigatório — resolvido via *resolve-person)
  - profile_data: Output de scan-social-profiles.md (data/{person_slug}/research/raw-*.json)
Saida: |
  - engagement_file: data/{person_slug}/research/engagement-analysis.json (PERSISTIDO)
  - engagement_patterns: Padrões de engajamento identificados
  - top_posts: Top 5 posts por plataforma
  - best_formats: Formatos com melhor performance
Checklist:
  - "[ ] Step 0: Resolver person_slug via *resolve-person"
  - "[ ] Carregar raw-*.json de data/{person_slug}/research/"
  - "[ ] Calcular taxa de engajamento por post"
  - "[ ] Identificar top 5 posts por plataforma"
  - "[ ] Detectar padrões de horário (se disponível)"
  - "[ ] Identificar formatos vencedores (foto vs vídeo vs carrossel)"
  - "[ ] Correlacionar conteúdo vs engajamento"
  - "[ ] PERSISTIR em data/{person_slug}/research/engagement-analysis.json (MANDATORY)"
---

# *analyze-engagement

Identifica o que funciona para o usuário com base em dados reais de engajamento.

## Métricas Calculadas

```
engagement_rate = (likes + comments) / followers * 100

relative_engagement = engagement_rate vs baseline do perfil
```

## Classificação de Posts

- **Top Performers:** engagement_rate > 2x média do perfil
- **Solid:** 0.8x a 2x média
- **Under-performers:** < 0.8x média

## Output

```yaml
engagement_patterns:
  overall:
    avg_engagement_rate: float
    best_platform: string

  by_platform:
    instagram:
      avg_likes: int
      avg_comments: int
      best_format: [photo | video | carousel | reel]
      best_hour: "18:00-21:00"

  by_format:
    photo: {avg_engagement: float}
    video: {avg_engagement: float}
    carousel: {avg_engagement: float}

top_posts:
  - platform: string
    id: string
    caption_preview: string
    engagement_rate: float
    insights: string  # por que performou bem

best_formats:
  ranked:
    - format: string
      reason: string
```
