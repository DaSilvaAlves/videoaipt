---
task: Create Content Calendar
responsavel: "@copy-creator"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - person_slug: Slug da pessoa (obrigatório — resolvido via *resolve-person)
  - persona: Persona ativa (data/{person_slug}/persona/)
  - period: Período (ex: "abril/2026", "próximas 2 semanas")
  - cadence: Frequência ({instagram: "5x/week", linkedin: "2x/week"})
  - platforms: Plataformas ativas
Saida: |
  - period_slug: Slug do período (ex: "2026-04", "2026-04-w1-w2")
  - calendar_file: data/{person_slug}/calendar/{period_slug}.yaml (PERSISTIDO)
  - calendar_yaml: Calendário editorial estruturado
  - pillar_distribution: Distribuição de pilares ao longo do período
Checklist:
  - "[ ] Step 0: Resolver person_slug via *resolve-person"
  - "[ ] Gerar period_slug canônico"
  - "[ ] Validar período e cadência"
  - "[ ] Calcular total de peças por plataforma"
  - "[ ] Distribuir pilares respeitando pesos da persona"
  - "[ ] Alternar formatos (evitar repetição)"
  - "[ ] Marcar datas especiais (se fornecidas)"
  - "[ ] Gerar briefs leves (título + pilar + ângulo) para cada peça"
  - "[ ] PERSISTIR {period_slug}.yaml em data/{person_slug}/calendar/ (MANDATORY)"
---

# *create-content-calendar

Gera calendário editorial distribuindo conteúdo pelos pilares da persona.

> ⚠️ **MANDATORY:** Começar com `*resolve-person` e TERMINAR persistindo `{period_slug}.yaml` em disco.

## Algoritmo de Distribuição

```
1. Total pieces = sum(cadence[platform] * period_weeks for platform)

2. Per pillar:
   pillar_pieces = total_pieces * pillar.weight

3. Schedule assignment:
   - Distribuir cada pilar uniformemente
   - Evitar 2 posts do mesmo pilar consecutivos
   - Alternar formatos (post → story → reel → post)

4. Peak days (ex: Seg e Quin):
   - Reservar para pilares de maior peso
   - Evitar conteúdo experimental

5. Datas especiais:
   - Se informadas, criar peça temática
```

## Persistência (MANDATORY)

Ao final, serializar o calendário completo como YAML e escrever em `data/{person_slug}/calendar/{period_slug}.yaml`. Confirmar ao usuário: `"✅ calendar salvo em {path}"`.

## Output

```yaml
period_slug: "{slug-do-periodo}"
calendar_file: "data/{person_slug}/calendar/{period_slug}.yaml"

calendar_yaml:
  person_slug: string
  persona_ref: string
  period: "abril/2026"
  total_pieces: 32
  platforms_breakdown:
    instagram: 20
    linkedin: 8
    tiktok: 4

  pillar_distribution:
    - pillar: "Empreendedorismo"
      weight: 0.4
      pieces: 13
    - pillar: "Bastidores"
      weight: 0.3
      pieces: 10
    # ...

  schedule:
    - date: "2026-04-01"
      day_of_week: Wed
      platform: instagram
      format: post
      pillar: "Empreendedorismo"
      angle: "Lição aprendida"
      brief_preview: string
      status: planned

    - date: "2026-04-01"
      platform: instagram
      format: story
      pillar: "Bastidores"
      # ...
```
