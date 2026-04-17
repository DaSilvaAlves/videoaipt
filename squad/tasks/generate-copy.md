---
task: Generate Copy
responsavel: "@copy-creator"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - person_slug: Slug da pessoa (obrigatório — resolvido via *resolve-person)
  - post_id: ID do post (resolvido de plan-post.md)
  - persona: Persona ativa (data/{person_slug}/persona/)
  - brief: Post brief (data/{person_slug}/posts/{post_id}/brief.yaml)
Saida: |
  - copy_file: data/{person_slug}/posts/{post_id}/copy.md (PERSISTIDO)
  - variants_file: data/{person_slug}/posts/{post_id}/variants.yaml (PERSISTIDO)
  - copy_final: Copy pronta para publicação
  - variants: Mínimo 3 variantes
  - hashtags: Lista de hashtags otimizada
  - alt_text: Sugestão de alt-text
Checklist:
  - "[ ] Step 0: Resolver person_slug via *resolve-person"
  - "[ ] Carregar brief.yaml de data/{person_slug}/posts/{post_id}/"
  - "[ ] Aplicar signature_moves da persona"
  - "[ ] Respeitar DO/DONT"
  - "[ ] Gerar 3+ variantes com hooks diferentes"
  - "[ ] Validar comprimento vs limites da plataforma"
  - "[ ] Selecionar hashtags (respeitando limite da plataforma)"
  - "[ ] Gerar alt-text descritivo"
  - "[ ] Flag se alguma variante viola DONT"
  - "[ ] PERSISTIR copy.md (variante recomendada + hashtags + alt) em {post_path} (MANDATORY)"
  - "[ ] PERSISTIR variants.yaml (todas as variantes estruturadas) em {post_path} (MANDATORY)"
---

# *generate-copy

Gera a copy final a partir do brief, aplicando a persona com fidelidade.

> ⚠️ **MANDATORY:** Começar com `*resolve-person` e TERMINAR persistindo `copy.md` + `variants.yaml` em `data/{person_slug}/posts/{post_id}/`. Nunca deixar copy só em chat.

## Fluxo

```
0. Step 0 (MANDATORY): *resolve-person + carregar brief.yaml do post_id

1. Load persona.voice (tone, formality, emotion, signature_moves)

2. Para cada hook (3 variantes):
   a. Aplicar signature_move aleatório
   b. Construir body respeitando avg_length_target
   c. Fechar com CTA do brief
   d. Auto-validar contra DONT

3. Selecionar hashtags:
   - Extrair do tema + pilar
   - Ranquear por relevância
   - Cortar ao limite da plataforma

4. Gerar alt-text:
   - Descritivo da imagem planejada
   - Inclusivo
   - Máx 125 chars

5. Validação final:
   - Nenhuma variante viola DONT
   - Comprimento dentro de limites
   - Hashtags válidas

6. PERSIST (MANDATORY):
   - Escrever {post_path}/variants.yaml com TODAS as variantes + metadata
   - Escrever {post_path}/copy.md com variante recomendada + hashtags + alt_text (pronto p/ copy-paste)
   - Confirmar ao usuário: "✅ copy salva em {post_path}/copy.md e variants.yaml"
```

## Output

```yaml
copy_final:
  platform: instagram
  persona_ref: string

  variants:
    - id: variant_a
      hook: string
      body: string
      cta: string
      full_text: string           # concatenado pronto para copy/paste
      char_count: int
      dont_flags: []              # deve estar vazio
      recommended: true           # a variante melhor

    - id: variant_b
      # ...

  hashtags:
    count: 18
    list: ["#copy", "#empreendedorismo", ...]

  alt_text: "string descritivo em ~125 chars"

  notes:
    - "Variante A usa o signature_move X"
    - "Variante C foi mais arriscada — use se quer testar algo novo"
```
