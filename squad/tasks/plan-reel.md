---
task: Plan Reel
responsavel: "@script-writer"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - person_slug: Slug da pessoa (obrigatório — resolvido via *resolve-person)
  - persona: Persona ativa (data/{person_slug}/persona/)
  - topic: Tema/tópico do reel
  - platform: instagram | tiktok (default: instagram)
  - duration_target: Duração alvo em segundos (15-90, default: 30)
  - goal: awareness | engagement | conversion | educational (default: engagement)
Saida: |
  - video_id: Slug do vídeo (derivado de topic + timestamp)
  - video_path: data/{person_slug}/videos/{video_id}/
  - brief_file: data/{person_slug}/videos/{video_id}/brief.yaml (PERSISTIDO)
  - script_file: data/{person_slug}/videos/{video_id}/script.md (PERSISTIDO — completo com visual)
  - spoken_file: data/{person_slug}/videos/{video_id}/spoken.md (PERSISTIDO — só a fala)
  - hook_variants: Mínimo 2 opções de hook
  - beats: Sequência de beats timed
Checklist:
  - "[ ] Step 0: Resolver person_slug via *resolve-person"
  - "[ ] Gerar video_id único"
  - "[ ] Criar data/{person_slug}/videos/{video_id}/"
  - "[ ] Validar tópico contra pilares da persona"
  - "[ ] Escolher registro (manifesto-mode | mano-mode) conforme persona.dual_register"
  - "[ ] Gerar mínimo 2 opções de hook (<=3s cada)"
  - "[ ] Estruturar beats timed (Hook → Beat → Payoff → Loop/CTA)"
  - "[ ] Adicionar visual cues (B-roll, cutaway, overlay) para cada beat"
  - "[ ] Fechar com CTA claro alinhado ao goal"
  - "[ ] Respeitar limite de duração (max 90s reel)"
  - "[ ] PERSISTIR brief.yaml (MANDATORY)"
  - "[ ] PERSISTIR script.md completo (com visual/overlay/pacing) (MANDATORY)"
  - "[ ] PERSISTIR spoken.md limpo (só a fala, para teleprompter/gravação) (MANDATORY)"
---

# *plan-reel

Escreve roteiro de Reel (Instagram/TikTok) — 15 a 90 segundos, formato vertical 9:16, hook obrigatório nos primeiros 3 segundos.

> ⚠️ **MANDATORY:** Começar com `*resolve-person` e TERMINAR persistindo `brief.yaml` + `script.md` em disco.

## Anatomia de um Reel

```
[00:00-00:03]  HOOK          — pergunta/afirmação que para o scroll
[00:03-00:??]  BEAT 1        — setup do problema
[00:??-00:??]  BEAT 2-4      — desenvolvimento (máximo 4 beats)
[00:??-00:??]  PAYOFF        — insight/resolução
[00:??-XX:XX]  CTA / LOOP    — chamada + (opcional) loop pro início
```

## Fluxo

```
0. Step 0 (MANDATORY): *resolve-person + gerar video_id = slugify(topic) + timestamp
   video_path = {paths.videos}/{video_id}/
   mkdir -p {video_path}

1. Validar pilar:
   - Tópico está em algum pilar? Se não, avisar e sugerir ajuste

2. Escolher registro (dual_register):
   - Manifesto-mode: frases editadas, curtas, ritmo de slogan
   - Mano-mode: conversa solta, "mano" e "kkk" liberados, tom de parceiro
   - Default: mano-mode (reel é vídeo FALADO)

3. Gerar hooks (mínimo 2, máx 3s cada):
   - Pergunta provocativa
   - Afirmação contra-intuitiva
   - Call-out de erro comum
   - Promessa curta específica

4. Estruturar beats (3-6 beats total):
   - Hook (3s)
   - Setup do problema (5-8s)
   - Desenvolvimento (15-40s, 2-3 beats)
   - Payoff (5-10s)
   - CTA ou loop (3-5s)

5. Visual cues por beat:
   - Talking head vs B-roll
   - Cutaway (screen recording, terminal, stack)
   - Overlay text (reforço visual do spoken)
   - Corte seco vs transição

6. CTA alinhado ao goal:
   - Awareness: "Salva pra reler" / "Compartilha com quem precisa"
   - Engagement: "Comenta X no final"
   - Conversion: "Link na bio"
   - Educational: "Parte 2 amanhã"

7. PERSIST (MANDATORY — 3 arquivos):
   - brief.yaml       → metadata completo
   - script.md        → beats formatados com visual cues + overlay + pacing (pra editor)
   - spoken.md        → SÓ A FALA, quebras naturais, timing mínimo (pra quem grava/teleprompter)
   - Confirmar: "✅ roteiro salvo em {video_path}/ (brief + script + spoken)"
```

## Formato do spoken.md (IMPORTANTE)

Arquivo limpo, só o texto falado, sem direção de arte. Use este template:

```markdown
# Reel — Fala · {Topic} ({person_slug} · {duration}s)

> Só o texto falado. Pra teleprompter, gravação direta ou envio pra legendador.
> Para direção de arte, cutaways, overlay e pacing → ver `script.md`.

---

**[{MM:SS} · {role}]**
{frase 1}
{frase 2, uma por linha se fizer sentido oral}

**[{MM:SS} · {role}]**
{fala do próximo beat}

...
```

Regras:
- **Só fala.** Nada de 🎙️, 📹, overlays, pacing notes.
- **Timing curto** (`[MM:SS · role]`) — quem quer ler direto ignora; quem quer cronometrar usa.
- **Quebras naturais** de linha quando a fala tem pausa (respiração, peso).
- **Sem markdown decorativo** além do necessário pra separar beats.

## Output — brief.yaml

```yaml
video_id: "{slug}-{timestamp}"
person_slug: string
persona_ref: string
format: reel
platform: instagram | tiktok
duration_target_s: 30
duration_max_s: 90
aspect_ratio: "9:16"
topic: string
pilar: int
goal: engagement
dual_register: mano-mode | manifesto-mode

hook_variants:
  - id: hook_a
    text: string
    duration_s: 3
    type: pergunta_provocativa | afirmacao_contraintuitiva | call_out
    recommended: true
  - id: hook_b
    text: string
    ...

cta:
  text: string
  type: awareness | engagement | conversion | educational

visual_style:
  primary_shot: talking_head | b_roll | screen_recording | hybrid
  pacing: fast | medium | slow
  transitions: cortes_secos | fades | motion
```

## Output — script.md (estrutura)

```markdown
# Reel: {Topic}

> **Person:** {slug} · **Pilar:** {n} · **Platform:** {platform} · **Goal:** {goal}
> **Duration target:** {X}s · **Aspect:** 9:16 · **Register:** {mode}

---

## Hook (recomendado)

**[00:00-00:03]**

🎙️ **FALADO:** "{hook.text}"

📹 **VISUAL:** {close-up cam, direct eye, minimal background}

---

## Beat 1 — Setup

**[00:03-00:10]**

🎙️ **FALADO:** "..."

📹 **VISUAL:** "..."

---

## Beat 2 — Desenvolvimento
...

---

## Payoff

**[MM:SS]**

🎙️ **FALADO:** "..."
📹 **VISUAL:** "..."

---

## CTA

**[MM:SS]**

🎙️ **FALADO:** "{cta.text}"
📹 **VISUAL:** {overlay com @handle e setinha pra bio}

---

## Notas de Produção

- Gravar em vertical 9:16
- {outras notas específicas}

## Hook Alternativo (variante B)

> "{hook_b.text}" — usar se quiser testar hook mais {arriscado/suave}
```

## Notas

- Hook < 3s é inegociável — teste em voz alta, cronometrado
- Se o roteiro passar de 90s na leitura, **cortar beats**, não acelerar fala
- Dual register: reel é FALADO → mano-mode é padrão, manifesto-mode só se a persona validar
