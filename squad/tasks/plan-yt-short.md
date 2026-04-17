---
task: Plan YouTube Short
responsavel: "@script-writer"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - person_slug: Slug da pessoa (obrigatório — resolvido via *resolve-person)
  - persona: Persona ativa (data/{person_slug}/persona/)
  - topic: Tema/tópico do short
  - duration_target: Duração alvo em segundos (15-60, default: 45)
  - goal: awareness | engagement | conversion | educational (default: awareness)
Saida: |
  - video_id: Slug do short
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
  - "[ ] Validar tópico contra pilares"
  - "[ ] Hook <=2s (YT Shorts é ainda mais implacável que Reels)"
  - "[ ] Respeitar limite de 60s HARD"
  - "[ ] Incluir hook visual + hook verbal"
  - "[ ] CTA curto (YT Shorts favorece 'inscreva-se' ou link)"
  - "[ ] PERSISTIR brief.yaml (MANDATORY)"
  - "[ ] PERSISTIR script.md completo (com visual/overlay/pacing) (MANDATORY)"
  - "[ ] PERSISTIR spoken.md limpo (só a fala, para teleprompter/gravação) (MANDATORY)"
---

# *plan-yt-short

Escreve roteiro de YouTube Shorts — máximo 60 segundos, vertical 9:16, algoritmo do YT prioriza retenção 80%+.

> ⚠️ **MANDATORY:** Começar com `*resolve-person` e TERMINAR persistindo `brief.yaml` + `script.md`.

## Diferenças vs Reel IG/TikTok

| Dimensão | Reel IG/TikTok | YT Short |
|----------|---------------|---------|
| Duração max | 90s | **60s HARD** |
| Hook window | 3s | **2s** (mais implacável) |
| Retenção alvo | 70% | **80%+** |
| CTA primário | Bio link / comment | **Inscreva-se / card no canto** |
| Discovery | Hashtag-driven | **Search + Watch-next** |
| Loop | Muito eficaz | Menos crítico |

## Anatomia de um Short

```
[00:00-00:02]  HOOK DUPLO    — visual (primeiro frame) + verbal (primeira frase)
[00:02-00:??]  PAYOFF RÁPIDO — já entrega parte do valor
[00:??-00:50]  DESENVOLVIMENTO — expande o insight, mantém pacing ALTO
[00:50-00:60]  CTA           — inscreva-se OU próximo vídeo
```

## Fluxo

```
0. Step 0 (MANDATORY): *resolve-person + video_id + mkdir

1. Validar pilar da persona

2. Hook duplo:
   a. Hook VISUAL (primeiro frame) — algo que pare o swipe (pose, overlay text, objeto)
   b. Hook VERBAL (primeira frase) — complementa o visual, confirma promessa

3. Pacing:
   - YT Shorts NÃO tolera desaceleração
   - Cada beat máximo 8 segundos
   - Cutaways frequentes (a cada 3-4s)

4. Estrutura:
   - Hook duplo (0-2s)
   - Mini-payoff imediato (2-5s): entrega algo de valor logo
   - Desenvolvimento (5-50s): expande
   - CTA (50-60s): inscreva-se, cardzinho ou próximo vídeo

5. CTA típicos Shorts:
   - "Se inscreve que tem parte 2"
   - "Link na descrição"
   - "Próximo vídeo explica X"
   - NÃO usar "comenta abaixo" (Shorts performa pior com comment-ask)

6. PERSIST (MANDATORY — 3 arquivos):
   - brief.yaml       → metadata
   - script.md        → completo com visual/overlay/pacing
   - spoken.md        → SÓ A FALA (formato: cabeçalho + "[MM:SS · role]" por beat + texto falado limpo)
```

## Output — brief.yaml

```yaml
video_id: "{slug}-{timestamp}"
person_slug: string
persona_ref: string
format: yt-short
platform: youtube
duration_target_s: 45
duration_max_s: 60
aspect_ratio: "9:16"
topic: string
pilar: int
goal: awareness | educational

hook_visual:
  first_frame: string         # descrição do que aparece em 0s
  pose: string                # posição/expressão
  overlay_text: string        # (opcional)

hook_verbal:
  text: string                # máx 10 palavras
  duration_s: 2

cta:
  type: subscribe | next_video | link
  text: string

retention_strategy:
  cutaway_frequency_s: 3-4
  pacing: very_fast
  loops: false
```

## Output — script.md

```markdown
# YT Short: {Topic}

> **Person:** {slug} · **Duration:** {X}s · **Aspect:** 9:16 · **Goal:** {goal}

---

## Hook Duplo (0-2s)

📹 **FRAME 0:** {descrição do primeiro frame}
🎙️ **FALADO:** "{hook_verbal.text}"
📝 **OVERLAY:** "{overlay_text opcional}"

---

## Mini-Payoff (2-5s)

🎙️ **FALADO:** "{entrega rápida de valor}"
📹 **VISUAL:** {cutaway pra reforço visual}

---

## Desenvolvimento

### Beat 1 [05-15s]
🎙️ "..."
📹 {visual}

### Beat 2 [15-30s]
...

### Beat 3 [30-50s]
...

---

## CTA (50-60s)

🎙️ **FALADO:** "{cta.text}"
📹 **VISUAL:** {card de inscrever-se OU próximo vídeo no canto}

---

## Notas de Produção

- Gravar vertical 9:16 HARD
- Cortar a cada 3-4s pra manter pacing
- Não passar de 60s total — YT penaliza Shorts >60s
```

## Checklist Específico Shorts

- [ ] Frame 0 já comunica algo (texto ou ação clara)
- [ ] Primeira fala em <= 2s
- [ ] Cutaway a cada 3-4s
- [ ] Duração total ≤ 60s HARD
- [ ] CTA compatível com algoritmo YT Shorts
