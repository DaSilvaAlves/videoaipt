---
task: Plan Post
responsavel: "@copy-creator"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - person_slug: Slug da pessoa (obrigatório — resolvido via *resolve-person)
  - persona: Persona ativa (carregada de data/{person_slug}/persona/)
  - topic: Tópico / tema do post
  - platform: Plataforma alvo (instagram | tiktok | linkedin | x)
  - goal: Objetivo (awareness | engagement | conversion | educational)
Saida: |
  - post_id: Slug do post (gerado a partir do topic)
  - post_path: data/{person_slug}/posts/{post_id}/
  - brief_file: data/{person_slug}/posts/{post_id}/brief.yaml (PERSISTIDO EM DISCO)
  - post_brief: Brief completo com hook, body, CTA, visual_brief
Checklist:
  - "[ ] Step 0: Resolver person_slug via *resolve-person"
  - "[ ] Gerar post_id único (slug do tópico)"
  - "[ ] Criar pasta data/{person_slug}/posts/{post_id}/"
  - "[ ] Validar que tópico alinha com pilares da persona"
  - "[ ] Derivar ângulo narrativo"
  - "[ ] Gerar 3 opções de hook"
  - "[ ] Esboçar estrutura de body"
  - "[ ] Derivar CTA alinhado ao goal"
  - "[ ] Sugerir visual_brief para Nanobanana"
  - "[ ] Respeitar limites da plataforma"
  - "[ ] PERSISTIR brief.yaml em data/{person_slug}/posts/{post_id}/ (MANDATORY)"
---

# *plan-post

Planeja um post antes da geração de copy final — gera o brief estratégico.

> ⚠️ **MANDATORY:** Toda execução DEVE começar com `*resolve-person {person_slug}` (ver `resolve-person.md`) e DEVE terminar persistindo `brief.yaml` em disco. Nenhum brief fica só na memória.

## Fluxo

```
0. Step 0 (MANDATORY): Chamar *resolve-person → obter paths canônicos
   post_id = slugify(topic) + timestamp
   post_path = {paths.posts}/{post_id}/
   mkdir -p {post_path}

1. Validar alinhamento:
   - Topic está em algum pilar? → se não, avisar e sugerir ajuste

2. Escolher ângulo:
   - Narrativo (storytelling)
   - Educativo (framework/lista)
   - Provocativo (opinião forte)
   - Prova social (case/resultado)

3. Gerar 3 hooks (máx 80 chars):
   - Pergunta provocativa
   - Afirmação contra-intuitiva
   - Promessa específica

4. Estrutura do body:
   - IG: storytelling fluido, 150-400 chars
   - LinkedIn: bullets + parágrafo, até 1300 chars
   - X: thread estruturada 4-7 tweets

5. CTA alinhado ao goal:
   - Awareness: "Salva pra reler"
   - Engagement: "Comenta com sua experiência"
   - Conversion: "Link na bio"
   - Educational: "Compartilha com quem precisa"

6. Visual Brief:
   - Descrição em 1-2 linhas para prompt de imagem
   - Estilo visual (paleta, mood)

7. PERSIST (MANDATORY):
   - Serializar post_brief como YAML
   - Escrever em {post_path}/brief.yaml
   - Confirmar ao usuário: "✅ brief salvo em {post_path}/brief.yaml"
```

## Output

```yaml
post_id: "{slug-do-topico}"
post_path: "data/{person_slug}/posts/{post_id}/"
brief_file: "data/{person_slug}/posts/{post_id}/brief.yaml"

post_brief:
  person_slug: string
  persona_ref: string
  platform: instagram
  topic: string
  angle: narrativo | educativo | provocativo | social_proof
  goal: engagement

  hooks:
    - variant_a: string
    - variant_b: string
    - variant_c: string

  body_outline:
    structure: [intro, middle, close]
    key_points: [string]

  cta: string

  hashtags_hint: [string]   # sugestões, não final

  visual_brief:
    prompt: string          # para Nanobanana
    mood: string
    colors: [string]
    aspect_ratio: "1:1"
```
