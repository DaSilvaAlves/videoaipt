---
task: Plan YouTube Video (Medium)
responsavel: "@script-writer"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - person_slug: Slug da pessoa (obrigatório — resolvido via *resolve-person)
  - persona: Persona ativa (data/{person_slug}/persona/)
  - topic: Tema/tópico do vídeo
  - duration_target_min: Duração alvo em minutos (5-20, default: 10)
  - goal: educational | conversion | awareness (default: educational)
  - depth: light | medium | deep (default: medium)
Saida: |
  - video_id: Slug do vídeo
  - video_path: data/{person_slug}/videos/{video_id}/
  - brief_file: data/{person_slug}/videos/{video_id}/brief.yaml (PERSISTIDO)
  - script_file: data/{person_slug}/videos/{video_id}/script.md (PERSISTIDO — completo com visual)
  - spoken_file: data/{person_slug}/videos/{video_id}/spoken.md (PERSISTIDO — só a fala)
  - chapters: Estrutura de capítulos do vídeo
Checklist:
  - "[ ] Step 0: Resolver person_slug via *resolve-person"
  - "[ ] Gerar video_id único"
  - "[ ] Criar data/{person_slug}/videos/{video_id}/"
  - "[ ] Validar pilar e depth"
  - "[ ] Escrever hook forte (15-30s — permite mais espaço que Shorts)"
  - "[ ] Estruturar 3-5 beats (capítulos)"
  - "[ ] Incluir recap/resumo intermediário em vídeos >10min"
  - "[ ] CTA claro no final + soft-CTA no meio (inscrição)"
  - "[ ] Sugerir B-roll / screen recording / demos por beat"
  - "[ ] Gerar title sugestões otimizadas pra YT search"
  - "[ ] Gerar description com timestamps"
  - "[ ] PERSISTIR brief.yaml (MANDATORY)"
  - "[ ] PERSISTIR script.md completo (com visual/overlay/pacing + description YT) (MANDATORY)"
  - "[ ] PERSISTIR spoken.md limpo (só a fala, para teleprompter/gravação) (MANDATORY)"
---

# *plan-yt-video

Escreve roteiro de vídeo YouTube médio (5-20 minutos, horizontal 16:9). Foco em retenção, chapters e search optimization.

> ⚠️ **MANDATORY:** Começar com `*resolve-person` e TERMINAR persistindo `brief.yaml` + `script.md`.

## Anatomia de um Vídeo Médio

```
[00:00-00:30]   HOOK + PROMESSA           — o que o viewer vai aprender
[00:30-01:00]   PATTERN INTERRUPT + INTRO — nome, contexto, credibilidade
[01:00-??:??]   3-5 BEATS/CHAPTERS        — conteúdo principal
[??:??-??:??]   (se >10min) RECAP         — resumo intermediário
[??:??-??:??]   PAYOFF / RESOLUÇÃO        — o que tudo isso significa
[??:??-XX:XX]   CTA + PRÓXIMO VÍDEO       — inscreva + card do próximo
```

## Fluxo

```
0. Step 0 (MANDATORY): *resolve-person + video_id + mkdir

1. Validar pilar + depth:
   - Light: entretenimento, 5-8min
   - Medium: didático, 8-15min
   - Deep: explicação técnica, 15-20min

2. Hook 30s (mais generoso que Shorts):
   - Frase ou pergunta forte (5-8s)
   - Mostra o resultado final / teaser do payoff (10-15s)
   - Promessa explícita do que aprender (5-7s)

3. Estruturar chapters (3-5 beats):
   - Cada chapter = 1 ideia única
   - Mínimo 2min por chapter, máximo 6min
   - Transição clara entre chapters

4. Recap intermediário (se >10min):
   - "Até aqui a gente viu X, Y, Z"
   - Reinicia atenção pra parte final

5. CTA duplo:
   - Soft-CTA no meio (~40% do vídeo): "se tá gostando, deixa o like"
   - Hard-CTA no final: inscrever + próximo vídeo

6. Outputs extras:
   - Title suggestions (3 variantes SEO-optimized)
   - Description com timestamps de chapters
   - Tags sugeridas

7. PERSIST (MANDATORY — 3 arquivos):
   - brief.yaml       → metadata + chapters + title suggestions + description
   - script.md        → completo com visual/overlay/pacing + description YT + tags
   - spoken.md        → SÓ A FALA, organizada por chapter, pra teleprompter/gravação
```

## Output — brief.yaml

```yaml
video_id: "{slug}-{timestamp}"
person_slug: string
persona_ref: string
format: yt-video
platform: youtube
duration_target_min: 10
duration_range_min: [5, 20]
aspect_ratio: "16:9"
topic: string
pilar: int
goal: educational
depth: medium

hook:
  duration_s: 30
  opening_question: string
  result_teaser: string     # o payoff que o viewer vai ver
  promise: string           # o que vai aprender

chapters:
  - index: 1
    title: string
    duration_min: float
    timing: "MM:SS-MM:SS"
    key_points: [string]

recap_at_min: float | null   # null se <10min

cta:
  soft_cta_at_min: float     # aprox 40% do vídeo
  hard_cta_text: string
  next_video_teaser: string

title_suggestions:
  - variant: a
    text: string
    seo_rationale: string

description_with_timestamps: string
tags: [string]
```

## Output — script.md

```markdown
# YT Video: {Topic}

> **Person:** {slug} · **Duration:** {X}min · **Aspect:** 16:9 · **Depth:** {depth}
> **Goal:** {goal}

---

## Title Suggestions

1. **{title_a}** — {rationale}
2. **{title_b}** — {rationale}
3. **{title_c}** — {rationale}

---

## Hook + Promessa (0-30s)

🎙️ **FALADO (0-8s):** "{opening question/statement}"
📹 **VISUAL:** {face cam close + overlay do título ou pergunta}

🎙️ **FALADO (8-20s):** "{result_teaser}"
📹 **VISUAL:** {cutaway mostrando o payoff — screen recording, demo, antes/depois}

🎙️ **FALADO (20-30s):** "Nesse vídeo, {promise}."
📹 **VISUAL:** {volta pra face cam}

---

## Intro / Pattern Interrupt (30s-1min)

🎙️ "Se você é novo aqui, eu sou {person_name}, e {credibility signal}."
📹 {B-roll de credibilidade — setup, clientes, stack, etc}

---

## Chapter 1 — {Title} ({MM:SS}-{MM:SS})

### Key Points
- ...

### Spoken + Visual
🎙️ "..."
📹 {B-roll / screen recording / demo}

---

## Chapter 2 — {Title}
...

---

## (Se >10min) Recap Intermediário

🎙️ "Até aqui a gente viu: {chapter_1}, {chapter_2}. Agora vou te mostrar {next}."
📹 {cutaway rápido com os 3 tópicos como overlay}

### Soft-CTA
🎙️ "Se tá gostando, deixa o like — ajuda muito o canal."

---

## Chapter 3-5
...

---

## Payoff / Resolução

🎙️ "O ponto é: {main insight}"
📹 {face cam + overlay do core takeaway}

---

## CTA Final

🎙️ "{cta.hard_cta_text}"
📹 {overlay: inscrever-se + card do próximo vídeo}

🎙️ "No próximo vídeo: {next_video_teaser}"
📹 {preview do próximo vídeo}

---

## Notas de Produção

- Gravar 16:9 horizontal
- Chapter markers na edição
- Inserir cards: inscrição aos {timing}, próximo vídeo aos {timing}
- Inserir playlist no final (end screen)
- Legendas auto + revisão

## Description (YT)

```text
{1-2 parágrafos do resumo}

⏱️ CHAPTERS:
00:00 Hook + Promessa
{MM:SS} {Chapter 1 title}
{MM:SS} {Chapter 2 title}
...

🔗 LINKS:
- {link 1}
- {link 2}

#{tag1} #{tag2} #{tag3}
```
```
