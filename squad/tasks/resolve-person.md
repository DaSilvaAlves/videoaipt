---
task: Resolve Person
responsavel: "@any"
responsavel_type: shared
atomic_layer: helper
Entrada: |
  - person_name: Nome da pessoa (ex: "Adavio Tittoni")
  - person_slug: Slug opcional (ex: "adavio") — se informado, pula slugificação
Saida: |
  - person_slug: Slug canônico em kebab-case
  - root_path: data/{person_slug}
  - paths:
      interviews: data/{person_slug}/interviews/
      research:   data/{person_slug}/research/
      persona:    data/{person_slug}/persona/
      posts:      data/{person_slug}/posts/
      stories:    data/{person_slug}/stories/
      videos:     data/{person_slug}/videos/
      calendar:   data/{person_slug}/calendar/
  - exists: boolean (estrutura já existia)
Checklist:
  - "[ ] Receber person_name OU person_slug"
  - "[ ] Slugificar se necessário (lowercase, remover acentos, espaços → -)"
  - "[ ] Verificar se data/{slug}/ existe"
  - "[ ] Criar estrutura padrão se não existir"
  - "[ ] Retornar paths canônicos"
---

# *resolve-person

Task helper chamada por **toda task do squad** no início do fluxo. Padroniza o resolution de `person_slug` e garante que a estrutura person-centric exista.

## Regra de Arquitetura

**Convenção obrigatória:** todos os dados do squad vivem sob `data/{person_slug}/`. Nunca flat. Nunca sem pessoa.

Uma pessoa nova → uma pasta nova. Toda nova task grava dentro de uma pasta específica da pessoa, separando por função (interviews, research, persona, posts, stories, calendar).

## Fluxo

```
1. Input:
   - person_name (string) OU person_slug (string)

2. Slugify (se só person_name vier):
   a. lowercase
   b. remover acentos (NFD normalize + strip combining marks)
   c. trim
   d. espaços e caracteres não-alfanuméricos → hífen
   e. colapsar hífens duplicados
   f. pegar primeiro token se for nome composto longo
   
   Ex: "Adavio Tittoni"    → "adavio"
       "João da Silva"     → "joao"
       "Maria Clara Nunes" → "maria-clara"  (se 2+ tokens curtos)

3. Montar root_path:
   root_path = "data/{person_slug}"

4. Se root_path não existir:
   - Criar root_path
   - Criar subpastas: interviews/, research/, persona/, posts/, stories/, videos/, calendar/
   - Marcar exists = false

5. Se root_path já existir:
   - Verificar subpastas esperadas, criar as faltantes
   - Marcar exists = true

6. Retornar struct completo com paths
```

## Estrutura Gerada

```
data/{person_slug}/
├── interviews/       # profile-interviewer outputs
├── research/         # social-scout + analyst outputs
├── persona/          # persona-architect outputs
├── posts/            # copy-creator: 1 subpasta por post_id
│   └── {post_id}/
│       ├── brief.yaml
│       ├── copy.md
│       ├── variants.yaml
│       └── images/
├── stories/          # copy-creator: 1 subpasta por story_id
│   └── {story_id}/
│       └── sequence.yaml
├── videos/           # script-writer: 1 subpasta por video_id
│   └── {video_id}/
│       ├── brief.yaml
│       ├── script.md
│       ├── storyboard.yaml   # opcional
│       └── references/       # opcional (B-roll notes, visual refs)
└── calendar/         # copy-creator: 1 arquivo por período
```

## Output

```yaml
resolve_person:
  person_slug: "adavio"
  person_name_original: "Adavio Tittoni"
  root_path: "squad/data/adavio"
  paths:
    interviews: "squad/data/adavio/interviews"
    research:   "squad/data/adavio/research"
    persona:    "squad/data/adavio/persona"
    posts:      "squad/data/adavio/posts"
    stories:    "squad/data/adavio/stories"
    videos:     "squad/data/adavio/videos"
    calendar:   "squad/data/adavio/calendar"
  exists: true
  created_at: "2026-04-16T20:00:00Z"
```

## Como Usar (em outras tasks)

Toda task do squad deve chamar esta primeiro:

```
Step 0 (MANDATORY): Chamar *resolve-person com person_name ou person_slug do input.
  → obter paths canônicos
  → usar paths.{tipo} como destino de output
```

## Error Handling

| Error | Causa | Resolução |
|-------|-------|-----------|
| `NO_PERSON_INPUT` | Nem person_name nem person_slug | Elicitar: "Qual o nome da pessoa?" |
| `EMPTY_SLUG` | person_name slugifica pra string vazia | Fallback para "unnamed-{timestamp}" + warn |
| `PATH_WRITE_DENIED` | FS sem permissão de escrita | Escalar para @devops |

## Regra Retroativa

Squads criadas antes dessa convenção (flat `data/{tipo}/`) devem rodar migração manual antes de invocar tasks novas. Ver `_orphan/` para artefatos sem dono identificável.
