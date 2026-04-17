---
task: Plan Story
responsavel: "@copy-creator"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - person_slug: Slug da pessoa (obrigatório — resolvido via *resolve-person)
  - persona: Persona ativa (data/{person_slug}/persona/)
  - narrative_goal: Objetivo da sequência (launch | education | behind-scenes | engagement)
  - platform: instagram | tiktok
  - duration: Número de slides/clipes (default: 5)
Saida: |
  - story_id: Slug do story (gerado a partir do narrative_goal + timestamp)
  - story_path: data/{person_slug}/stories/{story_id}/
  - sequence_file: data/{person_slug}/stories/{story_id}/sequence.yaml (PERSISTIDO)
  - story_sequence: Sequência estruturada slide-a-slide
Checklist:
  - "[ ] Step 0: Resolver person_slug via *resolve-person"
  - "[ ] Gerar story_id único"
  - "[ ] Criar pasta data/{person_slug}/stories/{story_id}/"
  - "[ ] Validar narrative_goal contra pilares"
  - "[ ] Desenhar arco narrativo (início/meio/fim)"
  - "[ ] Gerar conteúdo slide-a-slide"
  - "[ ] Incluir CTAs intermediários (quando aplicável)"
  - "[ ] Sugerir interactive elements (poll, quiz, slider)"
  - "[ ] PERSISTIR sequence.yaml em {story_path} (MANDATORY)"
---

# *plan-story

Planeja uma sequência de stories ou clipes curtos com arco narrativo.

> ⚠️ **MANDATORY:** Começar com `*resolve-person` e TERMINAR persistindo `sequence.yaml` em disco.

## Padrões de Arco

### Launch (5-7 slides)
```
1. Hook problema
2. Agitação
3. Teaser solução
4. Reveal
5. CTA
```

### Education (4-6 slides)
```
1. Hook curiosidade
2. Contexto
3. Core insight
4. Aplicação prática
5. (opcional) Pergunta de reflexão
```

### Behind-Scenes (3-5 slides)
```
1. Momento captado
2. Contexto do que está acontecendo
3. Insight pessoal
4. Convite pra conexão
```

## Persistência (MANDATORY)

Ao final do planejamento, serializar a sequência inteira como YAML e escrever em `{story_path}/sequence.yaml`. Confirmar ao usuário: `"✅ story sequence salva em {path}"`.

## Output

```yaml
story_id: "{slug-do-narrative-goal}-{timestamp}"
story_path: "data/{person_slug}/stories/{story_id}/"
sequence_file: "data/{person_slug}/stories/{story_id}/sequence.yaml"

story_sequence:
  person_slug: string
  persona_ref: string
  platform: instagram
  narrative_goal: education
  duration: 5
  arc_type: education

  slides:
    - index: 1
      role: hook
      copy_draft: string
      visual_hint: string
      interactive: null
      duration_seconds: 5

    - index: 2
      role: context
      copy_draft: string
      visual_hint: string
      interactive:
        type: poll
        question: string
        options: [string]

    # ...
```
