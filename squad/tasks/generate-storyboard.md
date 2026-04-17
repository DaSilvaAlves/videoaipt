---
task: Generate Storyboard
responsavel: "@script-writer"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - person_slug: Slug da pessoa (obrigatório — resolvido via *resolve-person)
  - video_id: ID do vídeo alvo (data/{person_slug}/videos/{video_id}/ deve existir com script.md)
  - shots_per_beat: Número médio de shots por beat (default: 2)
Saida: |
  - storyboard_file: data/{person_slug}/videos/{video_id}/storyboard.yaml (PERSISTIDO)
  - shot_count: Total de shots
  - production_checklist: Lista de B-roll/demos/overlays a gravar
Checklist:
  - "[ ] Step 0: Resolver person_slug via *resolve-person"
  - "[ ] Carregar script.md + brief.yaml do video_id"
  - "[ ] Quebrar cada beat em shots (N visuais distintos)"
  - "[ ] Descrever cada shot: tipo (talking head, B-roll, screen rec, demo, overlay)"
  - "[ ] Incluir composição (close, medium, wide, POV)"
  - "[ ] Incluir direção de arte (luz, ambiente, props)"
  - "[ ] Listar overlays/textos na tela (se houver)"
  - "[ ] Gerar production_checklist consolidado"
  - "[ ] PERSISTIR storyboard.yaml (MANDATORY)"
---

# *generate-storyboard

Gera storyboard shot-by-shot a partir de um roteiro existente. Transforma o texto do script em plano de produção executável.

> ⚠️ **MANDATORY:** Começar com `*resolve-person`. Output persiste em `data/{person_slug}/videos/{video_id}/storyboard.yaml`.

## Pré-requisito

Precisa ter rodado uma das tasks de script primeiro:
- `*plan-reel`
- `*plan-yt-short`
- `*plan-yt-video`
- `*plan-yt-aulao`
- `*script-from-post`

## Shot vs Beat

- **Beat** = unidade narrativa (ex: "Hook", "Setup", "Payoff")
- **Shot** = unidade visual (ex: "close rosto 3s", "screen recording terminal 5s", "overlay texto 2s")

Um beat vira 1-5 shots, dependendo da complexidade.

## Tipos de Shot

| Tipo | Quando usar | Duração típica |
|------|-------------|---------------|
| **Talking head** | Conexão direta, credibilidade | 3-8s |
| **B-roll** | Ilustra o que é falado | 2-4s |
| **Screen recording** | Demos de código, UI, workflow | 4-10s |
| **Cutaway/Overlay** | Reforço de palavra-chave | 1-3s |
| **Demo prática** | Mostra processo real | 5-15s |
| **POV/Hands** | Setup, execução manual | 3-6s |
| **Estático (prop)** | Objeto, livro, tela apagada | 2-4s |

## Composições (framing)

- **Extreme close-up (ECU)**: olho, detalhe mínimo
- **Close (CU)**: rosto, objeto em foco
- **Medium (MS)**: peito pra cima
- **Wide (WS)**: cena completa
- **POV**: ponto de vista do apresentador
- **Over-shoulder (OTS)**: vê o que o apresentador vê

## Fluxo

```
0. Step 0 (MANDATORY): *resolve-person + carregar script.md e brief.yaml

1. Parse do script:
   - Identificar cada beat (marcador MM:SS + título)
   - Extrair spoken + visual por beat

2. Para cada beat, gerar N shots (default: 2):
   - Decidir tipo (talking head, B-roll, screen recording, etc)
   - Definir composição (close, medium, wide)
   - Definir duração
   - Definir overlay/texto (se houver)
   - Definir transição pro próximo shot

3. Consolidar production checklist:
   - Lista de B-rolls necessários
   - Lista de screen recordings/demos
   - Lista de overlays/textos
   - Lista de props/ambiente

4. PERSIST (MANDATORY):
   - data/{person_slug}/videos/{video_id}/storyboard.yaml
   - Confirmar: "✅ storyboard salvo com {shot_count} shots"
```

## Output — storyboard.yaml

```yaml
video_id: "{video_id}"
person_slug: string
generated_from: "script.md"
total_duration_s: int
total_shots: int

shots:
  - index: 1
    beat_ref: "hook"
    timing: "00:00-00:03"
    duration_s: 3
    type: talking_head
    composition: close
    framing_note: "Face cam, fundo neutro escuro"
    spoken_excerpt: "Mano, IA não vai construir teu sistema. Tu vai."
    visual_description: "Apresentador direto na câmera, iluminação lateral suave"
    overlay_text: null
    props: []
    transition_to_next: corte_seco

  - index: 2
    beat_ref: "setup"
    timing: "00:03-00:07"
    duration_s: 4
    type: b_roll
    composition: medium
    framing_note: "Bancada lateral, mão digitando"
    spoken_excerpt: "A IA gera um trechinho, né?"
    visual_description: "Cutaway: mão no teclado mecânico, monitor ao fundo com código"
    overlay_text: null
    props: [teclado_mecanico, monitor]
    transition_to_next: corte_seco

  - index: 3
    beat_ref: "setup"
    timing: "00:07-00:11"
    duration_s: 4
    type: screen_recording
    composition: wide
    framing_note: "Screen completa"
    spoken_excerpt: "Mas é a stack que resolve o caso."
    visual_description: "Tela: n8n flow + docker compose + terminal em grid"
    overlay_text: "STACK"
    props: []
    transition_to_next: fade_rapido

  # ... (continua shot-by-shot até o final)

production_checklist:
  b_rolls_to_record:
    - "Mão digitando em teclado mecânico (4s)"
    - "Caneca + monitor ao fundo (3s)"
    - "Face cam estática fundo neutro (hook)"
  screen_recordings:
    - "n8n flow funcionando (5s)"
    - "terminal docker ps (3s)"
    - "Claude Code rodando (4s)"
  overlays:
    - text: "ARQUITETURA"
      timing: "00:15-00:17"
      style: "bold, white on black, fade in"
    - text: "STACK"
      timing: "00:09-00:11"
      style: "bold, orange accent"
  demos_to_prepare:
    - "Pipeline n8n → docker → output (screen rec, 10s)"
  props_list:
    - "Teclado mecânico"
    - "Monitor com terminal aceso"
    - "Caneca café"

estimated_recording_time_min: int
estimated_editing_time_min: int

generated_at: iso8601
```

## Uso Prático

O storyboard é entregue ao editor de vídeo (ou ao próprio apresentador se gravar sozinho). Com ele, fica óbvio:
- O que gravar
- Em que ordem
- Como enquadrar
- Quando inserir overlay

Se o apresentador segue o storyboard, a edição fica muito mais rápida — o editor sabe exatamente o que entra onde.

## Dica

Se o vídeo é curto (reel/short), storyboard pode ter 5-12 shots. Se é aulão, pode ter 60-120 shots — nesse caso, gerar storyboard por módulo separadamente ao invés de tudo de uma vez.
