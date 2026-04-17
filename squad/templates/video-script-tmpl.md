# Video Script Template

> Template universal para roteiros de vídeo (reel, short, yt-video, aulão).
> Usado por `@script-writer` (Reel) nas tasks `plan-reel`, `plan-yt-short`, `plan-yt-video`, `plan-yt-aulao`, `script-from-post`.

## Convenção de Arquivos (MANDATORY)

Toda task de vídeo gera **3 arquivos** em `data/{person_slug}/videos/{video_id}/`:

| Arquivo | Audiência | Conteúdo |
|---------|-----------|----------|
| `brief.yaml` | Agente (rastreabilidade) | Metadata, hooks, CTA, visual_style |
| `script.md` | **Editor/produtor** | Roteiro COMPLETO com 🎙️ FALADO + 📹 VISUAL + 📝 OVERLAY + ⏱️ PACING |
| `spoken.md` | **Apresentador/teleprompter** | SÓ A FALA, quebras naturais, timing mínimo |

Os três são inegociáveis. Nenhum "fica pra depois".

---

## Template: spoken.md (SÓ FALA)

```markdown
# {Format} — Fala · {Topic} ({person_slug} · {duration})

> Só o texto falado. Pra teleprompter, gravação direta ou envio pra legendador.
> Para direção de arte, cutaways, overlay e pacing → ver `script.md`.

---

**[{MM:SS} · {role}]**
{frase 1 — uma linha por unidade oral}
{frase 2}

**[{MM:SS} · {role}]**
{próximo beat}

...
```

### Regras do spoken.md

1. **Só a fala.** Nada de 🎙️ 📹 📝 ⏱️, overlays, direção de arte.
2. **Timing compacto** `[MM:SS · role]` no header de cada beat — quem quer ignorar, ignora.
3. **Quebras naturais** de linha: separe onde há respiração/peso/pausa oral.
4. **Manter dual_register.** Se brief marcou `mano-mode`, preservar "mano", "né", "kkk". Se `manifesto-mode`, cortar oralidades e deixar seco.
5. **Sem markdown decorativo.** Só ` `, `**[...]**` de timing, e parágrafos.
6. **Sem listas, sem tabelas, sem hierarquia.** Se precisar, é porque virou `script.md`.

---

## Frontmatter (header obrigatório)

```markdown
# {Format}: {Topic}

> **Person:** {person_slug} · **Pilar:** {n} · **Platform:** {platform}
> **Duration:** {X}s/min · **Aspect:** {9:16 | 16:9} · **Goal:** {goal}
> **Register:** {manifesto-mode | mano-mode | hibrido}
> **Source post:** {opcional, se vier de *script-from-post}
```

## Estrutura Universal de um Beat

```markdown
## {Beat Title}

**[MM:SS-MM:SS]** *({duration}s, role: {hook|setup|tension|reveal|payoff|cta})*

🎙️ **FALADO:**
> "{exact spoken text — escreva como se fosse falar em voz alta}"

📹 **VISUAL:**
{descrição do visual: tipo de shot, cutaway, B-roll, composição}

📝 **OVERLAY:** *(opcional)*
"{texto sobreposto na tela}"

⏱️ **PACING:** *(opcional)*
{nota de ritmo: pausa, corte seco, fala rápida, etc}
```

---

## Templates por Formato

### Reel / YT Short (curto, 15-90s)

```markdown
## Hook (0-3s para Reel, 0-2s para YT Short)

**[00:00-00:03]** *(hook)*

🎙️ **FALADO:** "{afirmação provocativa OU pergunta}"
📹 **VISUAL:** {close no rosto OR primeiro frame impactante}

---

## Beat 1 — Setup

**[00:03-00:08]** *(setup)*

🎙️ **FALADO:** "..."
📹 **VISUAL:** {cutaway OR continua talking head}

---

## Beat 2 — Desenvolvimento

**[00:08-00:{X}]** *(tension)*

🎙️ **FALADO:** "..."
📹 **VISUAL:** "..."

---

## Payoff

**[00:{X}-00:{Y}]** *(payoff)*

🎙️ **FALADO:** "{insight/resolução}"
📹 **VISUAL:** {overlay do insight OR reveal visual}

---

## CTA / Loop

**[00:{Y}-00:{fim}]** *(cta)*

🎙️ **FALADO:** "{cta.text}"
📹 **VISUAL:** {overlay de ação + setinha OR loop de volta ao hook}

---

## Notas de Produção

- Aspect: 9:16 vertical
- Cortes a cada 3-5s (manter pacing)
- Legendas queimadas (IG mute-first)
- {outras notas}

## Hook Alternativo

> "{hook_b}" — usar se quiser testar hook mais {variação}
```

---

### YT Video Médio (5-20min)

```markdown
## Title Suggestions

1. **{title_a}** — SEO: {rationale}
2. **{title_b}** — SEO: {rationale}
3. **{title_c}** — SEO: {rationale}

---

## Hook + Promessa (0-30s)

🎙️ **FALADO (0-8s):** "{opening question/statement}"
📹 **VISUAL:** {face cam close}

🎙️ **FALADO (8-20s):** "{result_teaser}"
📹 **VISUAL:** {cutaway do payoff — demo/screenrec}

🎙️ **FALADO (20-30s):** "Nesse vídeo, {promise}."
📹 **VISUAL:** {volta face cam}

---

## Intro / Pattern Interrupt (30s-1min)

🎙️ "Se você é novo aqui, eu sou {person_name}, e {credibility}."
📹 {B-roll credibilidade}

---

## Chapter 1 — {Title} ({MM:SS}-{MM:SS})

### Key Points
- ...

### Spoken + Visual
{beats completos}

---

## Chapter 2 — {Title}
...

---

## (Se >10min) Recap Intermediário

🎙️ "Até aqui a gente viu: {chapter_1}, {chapter_2}..."
📹 {overlay}

### Soft-CTA
🎙️ "Se tá gostando, like."

---

## Chapter 3-5
...

---

## Payoff

🎙️ "{main insight}"
📹 {face cam + overlay}

---

## CTA Final

🎙️ "{hard_cta}"
📹 {overlay inscrever + próximo vídeo}

---

## Description (YT)

```text
{resumo}

⏱️ CHAPTERS:
00:00 Hook
{MM:SS} {Chapter 1}
...

🔗 LINKS: {links}

#{tags}
```
```

---

### YT Aulão (30-120min)

```markdown
## Hook + Promessa Grande (0-45s)

🎙️ **PROMESSA:** "Nesse aulão você vai {transformação}."
📹 **VISUAL:** {demo do resultado}

---

## Agenda + Credibilidade (45s-2min)

🎙️ "Vou dividir em {N} módulos: {overview}."
📹 {overlay com lista}

🎙️ "{credibilidade}"
📹 {B-roll prova social}

🎙️ "Esse aulão NÃO é pra {not_for}."

---

## MÓDULO 1 — {Title} ({MM:SS}-{MM:SS})

### Intro do Módulo
🎙️ "Aqui você vai {promise_m1}."

### Conteúdo (beats)
...

### Re-hook ({MM:SS})
🎙️ "{re_hook}"

### Exercício Prático
🎙️ "Agora PARA o vídeo e {instructions}."
📹 {overlay 'PAUSE AQUI' por 3s}

### Fechamento + Bridge
🎙️ "Agora que você entendeu X, no próximo módulo {next}."

---

## MÓDULO 2-N
{mesma estrutura}

---

## Recap Geral + Q&A + CTA Conversão
{...}

---

## Material de Apoio
- PDF: {link}
- Checklist: {link}
- Repo: {link}
```

---

## Variáveis (interpoladas pelo script-writer)

| Variável | Fonte | Exemplo |
|----------|-------|---------|
| `{person_slug}` | resolve-person | `adavio` |
| `{persona_ref}` | persona.yaml | `adavio` |
| `{topic}` | input da task | `"anti-hype em IA"` |
| `{platform}` | input | `instagram`, `youtube` |
| `{duration}` | input | `30s`, `10min` |
| `{pilar}` | persona.pillars | `2` |
| `{goal}` | input | `engagement` |
| `{cta.text}` | derivado do goal | `"Salva pra reler"` |
| `{person_name}` | persona.yaml | `"Adavio"` |
| `{credibility}` | persona.yaml | `"construo sistemas pra ADABTECH"` |

---

## Regras Universais

1. **Um beat = uma ideia.** Se dois conceitos, dois beats.
2. **Timing é lei.** Todo beat tem `[MM:SS-MM:SS]`.
3. **Dual register.** Vídeo é falado → default mano-mode. Manifesto-mode só se persona validar.
4. **Visual cue sempre.** Não deixe beats sem `📹 VISUAL` — mesmo que seja "talking head continuado".
5. **Hook inegociável.** Reel=3s, YT Short=2s, YT Video=30s, Aulão=45s.
6. **CTA alinhado ao goal.** Awareness=inscrever/salvar, Engagement=comentar, Conversion=link/produto, Educational=próximo vídeo.
7. **Persistência obrigatória.** Script salva em `data/{person_slug}/videos/{video_id}/script.md` — NUNCA só em chat.
