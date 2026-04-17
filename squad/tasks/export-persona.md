---
task: Export Persona
responsavel: "@persona-architect"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - persona_yaml: Persona finalizada
Saida: |
  - persona_brief_md: Arquivo markdown humano-legível
  - path: data/personas/{user_id}-brief.md
Checklist:
  - "[ ] Carregar persona"
  - "[ ] Aplicar template persona-brief.md"
  - "[ ] Gerar seções: Overview, Voz, Audiência, Pilares, DO/DONT, Exemplos"
  - "[ ] Escrever em linguagem humana (não técnica)"
  - "[ ] Validar que é auto-explicativo (outra pessoa entende sem contexto)"
---

# *export-persona

Converte a persona YAML em um documento humano-legível que o usuário e terceiros podem usar.

## Finalidade

- Usuário valida se persona representa sua voz
- Futuro freelancer/designer pode entender como escrever para ele
- Serve de "brand book" compacto

## Template Usado

`templates/persona-brief.md` (ver arquivo)

## Output Final

Um documento markdown formatado com:

```markdown
# Persona: {Name}

*Arquetype: {archetype}*

## Voz

{descrição narrativa da voz}

## Audiência

{descrição da audiência primary + secondary}

## Pilares de Conteúdo

| Pilar | Peso | Subtópicos |
|-------|------|------------|
| ... | ... | ... |

## Como Escrever (DO)

- ...

## Como NÃO Escrever (DONT)

- ...

## Exemplos de Referência

{3-5 exemplos de copy que representam a voz}

---
*Gerado em {timestamp} — confidence: {score}*
```
