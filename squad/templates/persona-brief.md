# Persona: {{persona.name}}

*Arquétipo: {{persona.archetype}}*
*Confidence: {{persona.confidence}}*
*Gerado em: {{timestamp}}*

---

## 🎙️ Voz

{{persona.voice.narrative_description}}

| Dimensão | Valor |
|----------|-------|
| Tom primário | {{persona.voice.tone_primary}} |
| Tom secundário | {{persona.voice.tone_secondary}} |
| Formalidade | {{persona.voice.formality_score}} / 1.0 |
| Emoção | {{persona.voice.emotion_score}} / 1.0 |
| Comprimento médio alvo | {{persona.voice.avg_length_target}} chars |
| Política de emoji | {{persona.voice.emoji_policy}} |

### Signature Moves
{{#each persona.voice.signature_moves}}
- **{{this.pattern}}** — exemplo: _"{{this.example}}"_
{{/each}}

---

## 👥 Audiência

### Primary
{{persona.audience.primary.description}}

**Dores / Necessidades:**
{{#each persona.audience.primary.pain_points}}
- {{this}}
{{/each}}

### Secondary (opcional)
{{persona.audience.secondary.description}}

---

## 🏛️ Pilares de Conteúdo

| Pilar | Peso | Subtópicos |
|-------|------|------------|
{{#each persona.pillars}}
| {{this.theme}} | {{this.weight}} | {{this.subtopics}} |
{{/each}}

---

## ✅ Como Escrever (DO)

{{#each persona.do}}
- {{this}}
{{/each}}

---

## ❌ Como NÃO Escrever (DONT)

{{#each persona.dont}}
- {{this}}
{{/each}}

---

## 💎 Exemplos de Referência

{{#each persona.examples}}
### {{this.platform}}

> {{this.text}}

**Por que funciona:** {{this.why_it_works}}

---
{{/each}}

## 📊 Divergências Documentadas

{{#if divergences.length}}
{{#each divergences}}
- **{{this.dimension}}:** auto-relatado "{{this.self_reported}}" vs observado "{{this.observed}}"
  - Resolução: {{this.resolution}}
{{/each}}
{{else}}
_Nenhuma divergência significativa entre entrevista e dados observados._
{{/if}}

---

*Este documento foi gerado automaticamente pelo @persona-architect (Muse) do `social-media-squad`. Para refinar, use `@persona-architect *refine-voice`.*
