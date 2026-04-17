# Post Brief — {{post.topic}}

*Plataforma:* {{post.platform}}
*Pilar:* {{post.pillar}}
*Goal:* {{post.goal}}
*Ângulo:* {{post.angle}}

---

## 🎣 Hooks (3 variantes)

### Variante A (recomendada)
> {{post.hooks.variant_a}}

### Variante B
> {{post.hooks.variant_b}}

### Variante C
> {{post.hooks.variant_c}}

---

## 📝 Estrutura do Body

**Pontos-chave:**
{{#each post.body_outline.key_points}}
- {{this}}
{{/each}}

**Estrutura sugerida:** {{post.body_outline.structure}}

---

## 📢 CTA

> {{post.cta}}

---

## 🏷️ Hashtags Sugeridas

{{#each post.hashtags_hint}}
`{{this}}` {{/each}}

_Validar contra limite da plataforma antes de usar._

---

## 🎨 Visual Brief

**Papel da imagem:** {{post.visual_brief.image_role}}

**Texto na imagem:** {{post.visual_brief.text_treatment}}

**Precisa de referencias?** {{post.visual_brief.reference_need}}

**Referencias solicitadas:**
{{#each post.visual_brief.reference_requests}}
- {{this}}
{{/each}}

**Direcao visual:**
{{post.visual_brief.art_direction}}

**Prompt para Nanobanana:**
```
{{post.visual_brief.prompt}}
```

| Campo | Valor |
|-------|-------|
| Mood | {{post.visual_brief.mood}} |
| Paleta | {{post.visual_brief.colors}} |
| Aspect Ratio | {{post.visual_brief.aspect_ratio}} |
| Negative Prompt | {{post.visual_brief.negative_prompt}} |

---

## ✅ Validação

- [ ] Papel da imagem esta definido
- [ ] Texto na imagem foi decidido explicitamente
- [ ] Referencias foram solicitadas quando necessarias
- [ ] Prompt inclui cena, sujeito, composicao, luz, textura, paleta e negative prompt
- [ ] Alinhado com pilar da persona
- [ ] Respeita DO/DONT
- [ ] Hook tem max 80 chars
- [ ] Comprimento total dentro do limite da plataforma
- [ ] Hashtags relevantes e dentro do limite
- [ ] Visual brief é executável

---

*Gerado via `@copy-creator *plan-post`. Próximo passo: `*generate-copy`.*
