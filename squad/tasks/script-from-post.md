---
task: Script From Post
responsavel: "@script-writer"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - person_slug: Slug da pessoa (obrigatório — resolvido via *resolve-person)
  - source_post_id: ID do post existente em data/{person_slug}/posts/{post_id}/
  - target_format: reel | yt-short | yt-video | yt-aulao
  - duration_target: Duração alvo (depende do formato)
Saida: |
  - video_id: Slug do vídeo derivado (ex: "{post_id}-reel")
  - video_path: data/{person_slug}/videos/{video_id}/
  - brief_file: data/{person_slug}/videos/{video_id}/brief.yaml (PERSISTIDO)
  - script_file: data/{person_slug}/videos/{video_id}/script.md (PERSISTIDO — completo com visual)
  - spoken_file: data/{person_slug}/videos/{video_id}/spoken.md (PERSISTIDO — só a fala)
  - source_ref: Link/referência ao post original
Checklist:
  - "[ ] Step 0: Resolver person_slug via *resolve-person"
  - "[ ] Carregar post original (brief.yaml + copy.md + variants.yaml)"
  - "[ ] Identificar hook e payoff do post"
  - "[ ] Adaptar copy escrita → copy falada (dual_register: mano-mode)"
  - "[ ] Re-estruturar beats conforme target_format"
  - "[ ] Delegar pra task de formato correspondente (plan-reel/short/video/aulao)"
  - "[ ] Manter source_ref no brief para rastreabilidade"
  - "[ ] PERSISTIR brief.yaml com source_post_id (MANDATORY)"
  - "[ ] PERSISTIR script.md completo (com visual/overlay/pacing) (MANDATORY)"
  - "[ ] PERSISTIR spoken.md limpo (só a fala adaptada pra oral) (MANDATORY)"
---

# *script-from-post

Converte um post existente em roteiro de vídeo, preservando hook e payoff mas **adaptando registro** (escrito → falado) e **estrutura** (caption → beats timed).

> ⚠️ **MANDATORY:** Começar com `*resolve-person`. Output persiste em `data/{person_slug}/videos/{video_id}/`.

## Por Que Existe

Posts de sucesso merecem segunda vida em vídeo. Mas **copiar a caption no roteiro é erro fatal**: texto escrito funciona no feed; falado soa robótico.

Esta task faz a tradução fiel.

## Adaptação Escrita → Falada

| Dimensão | Post (escrito) | Vídeo (falado) |
|----------|---------------|---------------|
| Frases | Curtas, quebradas, manifesto-mode | Corridas, mano-mode liberado |
| Ritmo | Leitura silenciosa | Respiração + pausa |
| Hook | Primeiras 2 linhas | Primeiros 3s (reel) ou 30s (yt-video) |
| Payoff | Frase-âncora no final | Beat explícito antes do CTA |
| Emoji | Decorativo | Traduz em entonação/B-roll |
| Hashtags | Na caption | Viram tags da descrição |

## Fluxo

```
0. Step 0 (MANDATORY): *resolve-person
   Carregar:
     - data/{person_slug}/posts/{source_post_id}/brief.yaml
     - data/{person_slug}/posts/{source_post_id}/copy.md
     - data/{person_slug}/posts/{source_post_id}/variants.yaml (variante recomendada)

1. Extrair elementos do post:
   - Hook (primeira linha da variante recomendada)
   - Beats implícitos (cada parágrafo quebrado = 1 beat potencial)
   - Signature moves usados
   - CTA original
   - Âncora/frase-manifesto

2. Adaptar registro (dual_register):
   - Manifesto-mode (post) → Mano-mode (vídeo falado)
   - Inserir respirações, "então", "mano"
   - Quebrar frases longas em unidades orais
   - Preservar palavras-chave da persona (signature vocabulary)

3. Re-estruturar conforme target_format:
   - target=reel       → delegar pra plan-reel.md (com hook_override do post)
   - target=yt-short   → delegar pra plan-yt-short.md
   - target=yt-video   → expandir beats com B-roll + contexto, delegar pra plan-yt-video.md
   - target=yt-aulao   → expandir muito, adicionar módulos + exercícios, delegar pra plan-yt-aulao.md

4. Manter rastreabilidade:
   - brief.yaml inclui source_post_id
   - video_id derivado: "{source_post_id}-{target_format}"
   - script.md inclui link/ref ao post original no header

5. PERSIST (MANDATORY — 3 arquivos):
   - brief.yaml       → metadata + source_post_id (rastreabilidade)
   - script.md        → roteiro completo com visual/overlay/pacing
   - spoken.md        → SÓ A FALA adaptada pra oral (mano-mode), pra teleprompter
```

## Exemplo de Adaptação

### Post original (manifesto-mode)
> IA não vai construir seu sistema.
> Você vai.
>
> A IA gera trecho.
> A stack resolve caso.
> A orquestração entrega resultado.

### Adaptado pra Reel (mano-mode)
```
[HOOK 0-3s]
🎙️ "Mano, IA não vai construir teu sistema. Tu vai."

[BEAT 5-15s]
🎙️ "Olha só — a IA gera um trechinho, né? Mas é a stack que resolve o caso.
    E só a orquestração é que entrega resultado de verdade."
📹 {cutaway: terminal + n8n + docker logos}

[PAYOFF 15-22s]
🎙️ "Não é mágica. É arquitetura."
📹 {overlay: "ARQUITETURA" — 2s}

[CTA 22-30s]
🎙️ "Marca aquele dev que ainda acha que prompt resolve tudo."
📹 {face cam, sorriso discreto}
```

Nota: o conteúdo é o mesmo, mas a **oralidade** foi reintroduzida ("mano", "olha só", "né?") porque vídeo é falado.

## Output — brief.yaml (com referência)

```yaml
video_id: "{source_post_id}-{target_format}"
person_slug: string
persona_ref: string
source_post_id: string              # rastreabilidade
source_post_path: "data/{person_slug}/posts/{source_post_id}/"
format: reel | yt-short | yt-video | yt-aulao
topic: string                       # herdado do post
pilar: int                          # herdado
goal: string                        # pode diferir do goal original
duration_target: int

adaptation_notes:
  register_shift: "manifesto-mode → mano-mode"
  hook_source: "variante B do post original"
  preserved_signature_moves: [string]
  dropped_elements: [string]         # o que não cabe em vídeo
```

## Dica

Se o post tem 3 variantes (A, B, C) — escolha a que tem melhor **oralidade natural**, não necessariamente a recomendada pro post estático.
