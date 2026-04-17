---
task: Plan YouTube Aulão (Long-form)
responsavel: "@script-writer"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - person_slug: Slug da pessoa (obrigatório — resolvido via *resolve-person)
  - persona: Persona ativa (data/{person_slug}/persona/)
  - topic: Tema/tópico do aulão
  - duration_target_min: Duração alvo (30-120, default: 45)
  - goal: educational | conversion (default: educational)
  - modules_count: Número de módulos/seções (3-8, default: 5)
  - exercises: Incluir exercícios práticos? (true|false, default: true)
Saida: |
  - video_id: Slug do aulão
  - video_path: data/{person_slug}/videos/{video_id}/
  - brief_file: data/{person_slug}/videos/{video_id}/brief.yaml (PERSISTIDO)
  - script_file: data/{person_slug}/videos/{video_id}/script.md (PERSISTIDO — completo com visual)
  - spoken_file: data/{person_slug}/videos/{video_id}/spoken.md (PERSISTIDO — só a fala, organizado por módulo)
  - modules: Estrutura de módulos completa
Checklist:
  - "[ ] Step 0: Resolver person_slug via *resolve-person"
  - "[ ] Gerar video_id único"
  - "[ ] Criar data/{person_slug}/videos/{video_id}/"
  - "[ ] Escrever PROMESSA forte (retenção de aulão depende dela)"
  - "[ ] Estruturar 3-8 módulos com arcos próprios"
  - "[ ] Incluir re-hooks a cada 5-7min (combate fadiga)"
  - "[ ] Incluir exercícios práticos (se requested)"
  - "[ ] Incluir Q&A ou FAQ no final"
  - "[ ] CTA de conversão claro (produto, lista, link)"
  - "[ ] Sugerir material de apoio (PDF, repo, checklist)"
  - "[ ] Gerar title + thumbnail brief"
  - "[ ] Gerar description detalhada com timestamps completos"
  - "[ ] PERSISTIR brief.yaml (MANDATORY)"
  - "[ ] PERSISTIR script.md completo (com visual/overlay/pacing) (MANDATORY)"
  - "[ ] PERSISTIR spoken.md limpo (só a fala por módulo, para teleprompter/gravação) (MANDATORY)"
---

# *plan-yt-aulao

Escreve roteiro de aulão YouTube longo (30-120 minutos, 16:9). Foco em transformação de viewer em aluno/cliente, retenção via re-hooks, estrutura modular com exercícios.

> ⚠️ **MANDATORY:** Começar com `*resolve-person` e TERMINAR persistindo `brief.yaml` + `script.md`.

## Diferenças vs Vídeo Médio

| Dimensão | Vídeo Médio | Aulão |
|----------|-------------|-------|
| Duração | 5-20min | **30-120min** |
| Estrutura | 3-5 chapters | **3-8 módulos** com sub-beats |
| Re-hook | 1 no meio | **A cada 5-7min** |
| Exercícios | não | **sim, intercalados** |
| CTA | inscrever | **converter** (produto, lista) |
| Material apoio | opcional | **obrigatório** (PDF, checklist) |
| Intent | learn | **transform** |

## Anatomia de um Aulão

```
[00:00-00:45]   HOOK + PROMESSA GRANDE    — transformação prometida
[00:45-02:00]   AGENDA + CREDIBILIDADE    — o que vai ver, por que confiar
[02:00-??:??]   MÓDULO 1 (10-15min)
  ├── Intro do módulo
  ├── Conteúdo principal
  ├── Re-hook (cada 5-7min)
  ├── Exercício prático
  └── Fechamento + bridge pro próximo
[??:??-??:??]   MÓDULO 2-N (mesmo padrão)
[??:??-??:??]   RECAP GERAL               — resumo dos módulos
[??:??-??:??]   Q&A / FAQ                 — dúvidas previstas
[??:??-XX:XX]   CTA DE CONVERSÃO          — produto, lista, próximo passo
```

## Fluxo

```
0. Step 0 (MANDATORY): *resolve-person + video_id + mkdir

1. Validar escopo:
   - Aulão precisa de UMA transformação clara (não múltiplas)
   - Modules count: 3-8 (mais que isso = cansativo)
   - Depth: sempre DEEP (aulão raso é vídeo médio disfarçado)

2. Promessa grande (primeiros 45s):
   - "Nesse aulão você vai {transformação concreta}"
   - Evidência/demo do resultado final
   - Para quem é (filtrar viewer errado)

3. Agenda + credibilidade:
   - Overview dos módulos (texto na tela + verbal)
   - Prova social (clientes, alunos, cases)
   - Quem NÃO deveria assistir (filtra retenção inútil)

4. Módulos (10-20min cada):
   Estrutura de CADA módulo:
   a. Intro do módulo (1min): promessa específica
   b. Conteúdo (5-12min)
   c. Re-hook a cada 5-7min: pergunta, case, objeção antecipada
   d. Exercício prático (2-3min): aluno PARA, executa
   e. Fechamento + bridge (1min): "Agora que você entendeu X, vou mostrar Y"

5. Recap geral (2-3min no final):
   - Re-visita os módulos
   - Conecta pontos

6. Q&A / FAQ (3-5min):
   - 3-5 perguntas frequentes antecipadas
   - Responde cada uma de forma curta

7. CTA de conversão (2-3min):
   - Oferta primária: produto, lista, curso
   - Prova social reforçada
   - Escassez legítima (se aplicável)

8. Material de apoio (brief):
   - PDF resumo
   - Checklist
   - Repo de código
   - Planilha

9. Title + thumbnail:
   - Title SEO + curiosidade
   - Thumbnail brief (descrição pra designer)

10. PERSIST (MANDATORY — 3 arquivos):
    - brief.yaml       → metadata + módulos + material apoio + título + thumbnail brief
    - script.md        → completo com visual/overlay/pacing + description YT
    - spoken.md        → SÓ A FALA organizada por módulo, pra teleprompter em sessões longas
```

## Output — brief.yaml

```yaml
video_id: "{slug}-{timestamp}"
person_slug: string
persona_ref: string
format: yt-aulao
platform: youtube
duration_target_min: 45
duration_range_min: [30, 120]
aspect_ratio: "16:9"
topic: string
pilar: int
goal: educational | conversion
depth: deep

promise:
  transformation: string      # "você vai sair sabendo X"
  evidence: string            # demo, resultado, caso
  for_whom: string            # ICP explícito
  not_for: string             # quem deve SAIR

modules:
  - index: 1
    title: string
    duration_min: float
    timing: "MM:SS-MM:SS"
    promise: string
    content_beats: [string]
    re_hooks:
      - timing: "MM:SS"
        type: question | case | objection
        text: string
    exercise:
      title: string
      duration_min: float
      instructions: string
    closing_bridge: string

recap_at_min: float
qa_at_min: float
faq:
  - q: string
    a: string

cta_conversion:
  offer: string
  type: product | list | course | link
  social_proof: string
  urgency: string | null

support_material:
  - type: pdf | checklist | repo | spreadsheet
    description: string

title_suggestions:
  - variant: a
    text: string
    seo_rationale: string

thumbnail_brief:
  concept: string
  key_elements: [string]
  text_overlay: string

description_with_timestamps: string
```

## Output — script.md (estrutura simplificada)

```markdown
# Aulão YT: {Topic}

> **Person:** {slug} · **Duration:** {X}min · **Aspect:** 16:9 · **Goal:** {goal}

---

## Title Suggestions
1. ...

## Thumbnail Brief
{concept}

---

## Hook + Promessa (0-45s)

🎙️ **PROMESSA:** "Nesse aulão você vai {transformação}."
📹 **VISUAL:** {demo/cutaway do resultado final}

---

## Agenda + Credibilidade (45s-2min)

🎙️ "Vou dividir isso em {N} módulos: {overview}."
📹 {overlay com lista de módulos}

🎙️ "Antes, rápido: {credibility}."
📹 {b-roll prova social}

🎙️ "Esse aulão NÃO é pra {not_for}. Se você se encaixa, ficar aqui."

---

## MÓDULO 1 — {Title} ({MM:SS}-{MM:SS})

### Intro do módulo
🎙️ "Aqui você vai {promise_m1}."

### Conteúdo
{beats completos...}

### Re-hook em {MM:SS}
🎙️ "{re_hook_text}"

### Exercício Prático
🎙️ "Agora PARA o vídeo e {instructions}."
📹 {overlay 'PAUSE AQUI' por 3s}

### Fechamento + Bridge
🎙️ "Agora que você entendeu X, no próximo módulo {next}."

---

## MÓDULO 2-N
{mesma estrutura}

---

## Recap Geral

🎙️ "Recapitulando: {módulo 1}, {módulo 2}, ..."
📹 {overlay resumo}

---

## Q&A / FAQ

**Pergunta 1:** {q}
🎙️ **Resposta:** {a}

---

## CTA de Conversão

🎙️ "{cta_offer}"
📹 {tela do produto / link overlay}

🎙️ "{social_proof}"
📹 {depoimentos cut}

---

## Material de Apoio

- {material_1}: {link ou descrição}
- {material_2}: ...

---

## Notas de Produção

- Chapter markers em cada módulo
- Cards: inscrição em 05:00, produto em 20:00 e no CTA final
- End screen com playlist + próximo vídeo
- Legendas obrigatórias (aulão raramente é visto 100% com som)
- Exportar também versão áudio (podcast)

## Description (YT)

```text
{descrição + valor transformacional}

⏱️ CHAPTERS:
00:00 Hook + Promessa
00:45 Agenda
02:00 Módulo 1: {title}
...
{MM:SS} CTA

📎 MATERIAL DE APOIO:
- {PDF}
- {Checklist}
- {Repo}

#{tags}
```
```

## Regra de Retenção

Aulão só funciona com **uma transformação clara**. Se o roteiro tentar ensinar 2+ coisas, quebrar em 2 aulões. Retenção de aulão = promessa cumprida, não pacing frenético.
