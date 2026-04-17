---
task: Refine Voice Tone
responsavel: "@persona-architect"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - persona_yaml: Persona atual
  - user_feedback: Feedback específico do usuário
Saida: |
  - persona_v2_yaml: Persona ajustada
  - changelog: Lista de mudanças aplicadas
Checklist:
  - "[ ] Carregar persona atual"
  - "[ ] Parsear feedback (identificar dimensão afetada)"
  - "[ ] Aplicar ajustes incrementais"
  - "[ ] Re-validar com persona-quality-check.md"
  - "[ ] Incrementar versão (v2, v3...)"
  - "[ ] Preservar histórico (data/personas/{user_id}.v{n}.yaml)"
---

# *refine-voice-tone

Ajusta a persona com base em feedback do usuário após ver exemplos gerados.

## Tipos de Feedback

| Feedback | Ajuste |
|----------|--------|
| "Ficou muito formal" | `formality_score -= 0.2` |
| "Falta emoção" | `emotion_score += 0.2` |
| "Muito longo" | `avg_length_target *= 0.7` |
| "Não falo desse jeito" | Revisar `signature_moves` com exemplos |
| "Adicione pilar X" | `pillars.append()` com peso proporcional |
| "Remover tema Y" | `pillars.filter()` redistribuindo pesos |

## Regras de Versionamento

- Cada refinement cria nova versão (v2, v3, ...)
- Versão anterior nunca sobrescrita (audit trail)
- Persona "live" aponta para última versão via symlink/alias

## Output

```yaml
persona_v2_yaml: data/personas/{user_id}.v2.yaml
changelog:
  - dimension: tone
    from: educativo+formal
    to: educativo+casual
    reason: "Feedback do usuário: ficou engessado"
  - dimension: avg_length_target
    from: 200
    to: 140
    reason: "User feedback: too long"
```
