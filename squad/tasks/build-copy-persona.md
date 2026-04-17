---
task: Build Copy Persona
responsavel: "@persona-architect"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - person_slug: Slug da pessoa (obrigatório — resolvido via *resolve-person)
  - interview_data: data/{person_slug}/interviews/{session_id}.final.yaml
  - voice_profile: data/{person_slug}/research/voice-profile.yaml
  - engagement_patterns: data/{person_slug}/research/engagement-analysis.json
Saida: |
  - persona_yaml_file: data/{person_slug}/persona/{person_slug}.yaml (PERSISTIDO — machine-readable)
  - persona_brief_file: data/{person_slug}/persona/{person_slug}-brief.md (PERSISTIDO — human-readable)
  - divergences: Conflitos identificados entre self-reported e observado
  - confidence: Score de confiança da persona (0-1)
Checklist:
  - "[ ] Step 0: Resolver person_slug via *resolve-person"
  - "[ ] Carregar inputs de data/{person_slug}/{interviews,research}/"
  - "[ ] Detectar conflitos entre auto-relato e dados observados"
  - "[ ] Consolidar voz (priorizar dados observados em caso de conflito)"
  - "[ ] Identificar mínimo 3 pilares de conteúdo"
  - "[ ] Derivar DO/DONT da voz"
  - "[ ] Extrair exemplos de copy de referência (top posts)"
  - "[ ] Gerar arquetype"
  - "[ ] Rodar persona-quality-check.md"
  - "[ ] PERSISTIR {person_slug}.yaml em data/{person_slug}/persona/ (MANDATORY)"
  - "[ ] PERSISTIR {person_slug}-brief.md em data/{person_slug}/persona/ (MANDATORY)"
---

# *build-copy-persona

Consolida entrevista + pesquisa em uma persona de copywriting executável.

## Algoritmo de Consolidação

### 1. Detecção de Divergências

```
for each dimension (tone, pillars, audience):
  self_reported_value = interview_data.{dimension}
  observed_value      = voice_profile.{dimension} ∪ engagement_patterns.{dimension}

  if divergence > threshold:
    log_divergence(dimension, self_reported_value, observed_value)
```

### 2. Resolução de Conflitos

| Conflito | Resolução |
|----------|-----------|
| Tom auto-relatado vs observado | Priorizar observado; documentar divergência |
| Audiência declarada vs engajada | Usar interseção; flaggar gap |
| Nicho declarado vs temas reais | Usar temas com maior engajamento |

### 3. Geração de Pilares

Pilares = interseção entre:
- Temas mencionados na entrevista
- Temas com maior engajamento na pesquisa
- Gap: temas que o usuário quer mas ainda não explora

Mínimo 3, máximo 7 pilares.

### 4. DO/DONT

- **DO:** Derivado de padrões vencedores (top posts + signature moves)
- **DONT:** Derivado de anti-padrões (posts com baixa performance) + limites declarados

## Output Completo

```yaml
persona:
  name: "{user_name}"
  archetype: "The Mentor | The Rebel | The Expert | The Storyteller | ..."
  confidence: 0.87

  voice:
    tone_primary: educativo
    tone_secondary: casual
    formality_score: 0.4
    emotion_score: 0.7
    avg_length_target: 150
    emoji_policy: high
    signature_moves: [...]

  audience:
    primary:
      description: string
      pain_points: [string]
    secondary:
      description: string

  pillars:
    - theme: string
      weight: 0.3     # % do calendário
      subtopics: [string]

  do:
    - "Começar com pergunta provocativa"
    - "Usar listas numeradas para didática"

  dont:
    - "Jargão técnico sem explicar"
    - "Mais de 3 hashtags no IG (desvio da voz observada)"

  examples:
    - platform: instagram
      text: string
      why_it_works: string

divergences:
  - dimension: tone
    self_reported: formal
    observed: casual
    resolution: "Adotamos casual (observado) — feedback: entrevistado talvez esteja restringindo voz natural"
```
