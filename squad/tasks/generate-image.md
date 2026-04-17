---
task: Generate Image
responsavel: "@copy-creator"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - person_slug: Slug da pessoa (obrigatório — resolvido via *resolve-person)
  - post_id: ID do post alvo (imagens vivem em data/{person_slug}/posts/{post_id}/images/)
  - image_role: [principal_sem_texto | com_copy | carrossel_misto | thumbnail | mockup | bastidor | produto | meme_visual]
  - reference_images: imagens de referencia opcionais quando houver pessoa, produto, ambiente, marca, setup, estilo visual ou print especifico
  - copy_brief: Brief com visual_brief e/ou copy_final
  - visual_style: Estilo desejado (opcional, herdado da persona) voce deve ser um profisiinal em designer suas imagens devem ser perfeitas baseadas nisso ter personas ser tudo muito ajustado.
  - aspect_ratio: [1:1 | 9:16 | 1.91:1]
Saida: |
  - images_dir: data/{person_slug}/posts/{post_id}/images/ (PERSISTIDO)
  - image_files: Arquivos PNG salvos em disco
  - manifest_file: data/{person_slug}/posts/{post_id}/images/manifest.json (PERSISTIDO)
  - variants: Mínimo 2 variantes
  - alt_text: Alt-text correspondente
Checklist:
  - "[ ] Step 0: Resolver person_slug via *resolve-person"
  - "[ ] Definir o papel da imagem antes do prompt"
  - "[ ] Decidir se a imagem deve ou nao conter texto"
  - "[ ] Solicitar imagens de referencia quando fidelidade visual depender disso"
  - "[ ] Gerar minimo 2 direcoes visuais quando a imagem for importante para a entrega"
  - "[ ] Validar chave de API disponível (NANOBANANA_API_KEY ou GEMINI_API_KEY como fallback)"
  - "[ ] Construir prompt a partir do visual_brief"
  - "[ ] Aplicar visual_style da persona"
  - "[ ] Chamar gerador com retry"
  - "[ ] Gerar mínimo 2 variantes"
  - "[ ] Validar aspect_ratio correto"
  - "[ ] Gerar alt-text"
  - "[ ] PERSISTIR PNGs em data/{person_slug}/posts/{post_id}/images/ (MANDATORY)"
  - "[ ] PERSISTIR manifest.json com metadados (prompts, paths, alt_text) (MANDATORY)"
---

# *generate-image

Gera imagens via Nanobanana para acompanhar a copy ou para serem a peca principal do post.

Imagem nao e sempre "fundo com texto". Ink deve decidir se a melhor entrega e:

- imagem editorial sem texto
- imagem com copy aplicada
- carrossel misto
- thumbnail
- mockup de sistema/produto
- bastidor/foto conceitual
- meme visual alinhado a persona
- imagem de produto, ambiente ou pessoa com referencias

## Pré-requisito

```bash
export NANOBANANA_API_KEY=your_key_here
```

Se variável ausente, task falha com erro claro e opção de skip.

## Construção do Prompt

```
1. Base:  visual_brief.prompt
2. + Estilo persona (se definido):
   - "in the style of {persona.visual_style}"
3. + Aspect ratio instruction
4. + Negative prompts (evitar logos, watermarks, texto ilegível)
```

## Decisao visual antes do prompt

Antes de gerar, Ink deve definir:

1. Qual e o papel da imagem:
   - `principal_sem_texto`: a imagem comunica sozinha; caption leva a copy.
   - `com_copy`: copy curta aparece no meio da imagem.
   - `carrossel_misto`: alguns slides sao imagem, outros texto.
   - `thumbnail`: texto curto, alto contraste, leitura rapida.
   - `mockup`: sistema, produto ou interface.
   - `bastidor`: foto editorial de rotina, setup, oficina, evento.
   - `produto`: objeto, embalagem, servico ou oferta visual.
   - `meme_visual`: ideia visual simples, reconhecivel e alinhada a persona.
2. Se precisa de texto dentro da imagem:
   - se nao precisar: usar `no readable text`.
   - se precisar: usar copy exata aprovada, pouca frase e hierarquia tipografica.
3. Se precisa de imagens de referencia.

Regra pratica: se o texto for longo, tiver acentos importantes ou precisar ficar 100% fiel, gerar imagem sem texto e aplicar tipografia depois.

## Quando pedir imagens de referencia

Pedir referencia antes de gerar quando o sucesso depender de fidelidade visual:

| Caso | Referencia necessaria |
|------|------------------------|
| Pessoa real | foto da pessoa ou frame aprovado |
| Produto fisico | foto do produto, embalagem ou objeto |
| Ambiente real | foto do escritorio, setup, sala, evento ou local |
| Marca/feed | prints do feed, identidade visual, paleta, posts anteriores |
| Sistema/app | screenshot ou mockup da interface |
| Roupa/pose/estilo | foto de pose, roupa, moodboard ou campanha similar |
| Antes/depois | imagem do antes e criterio do depois |

Se a referencia nao estiver disponivel, declarar a limitacao e criar uma direcao conceitual sem prometer fidelidade.

## Prompt de alto nivel

Use este esqueleto quando o brief visual estiver fraco:

```text
Asset type:
Image role:
Post objective:
Persona/mood:
Primary visual idea:
Scene:
Subject:
Composition:
Text treatment:
Lighting:
Color palette:
Materials/textures:
Reference images:
Constraints:
Negative prompt:
```

## Aspect Ratios por Plataforma

| Plataforma | Formato | AR |
|-----------|---------|-----|
| Instagram Post | quadrado | 1:1 |
| Instagram Story/Reel | vertical | 9:16 |
| LinkedIn | paisagem | 1.91:1 |
| TikTok | vertical | 9:16 |

## Persistência (MANDATORY)

```
images_dir = data/{person_slug}/posts/{post_id}/images/
mkdir -p {images_dir}

For each variant:
  save buffer as {images_dir}/variant_{a|b|c}.png

Save manifest.json with:
  - post_id, person_slug, generated_at, model
  - aspect_ratio, role
  - variants: [{id, file, mime, sizeBytes, promptUsed}]
  - alt_text
```

## Error Handling

| Error | Resolução |
|-------|-----------|
| `API_KEY_MISSING` | Avisar + perguntar se gera post sem imagem |
| `API_TIMEOUT` | Retry 3x com backoff |
| `API_QUOTA_EXCEEDED` | Cachear brief para retry manual |
| `NSFW_CONTENT` | Reformular prompt, re-tentar |

## Output

```yaml
image_url: primary_url

variants:
  - id: variant_a
    url: string
    aspect_ratio: "1:1"
    prompt_used: string
    recommended: true

  - id: variant_b
    url: string
    aspect_ratio: "1:1"
    prompt_used: string

alt_text: "string"

persisted_at: data/{person_slug}/posts/{post_id}/images/
```
