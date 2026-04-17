# Persona Quality Check

> Gate de qualidade obrigatório antes de exportar uma persona para uso em produção.

## Inputs
- `persona` — objeto persona a validar

## Resultado
- `verdict: [PASS | CONCERNS | FAIL]`
- `checks: [{id, passed, severity, message}]`
- `score: 0-10`

## Critérios

### 🔴 Critical (bloqueantes)

| # | Check | Critério |
|---|-------|----------|
| C1 | Voz definida | `persona.voice.tone_primary` presente |
| C2 | Pilares suficientes | `persona.pillars.length >= 3` |
| C3 | DO regras | `persona.do.length >= 3` |
| C4 | DONT regras | `persona.dont.length >= 3` |
| C5 | Audiência primária | `persona.audience.primary.description` não-vazio |

**Falha em qualquer critical → verdict: FAIL**

### 🟡 Standard (causam CONCERNS, não bloqueiam)

| # | Check | Critério |
|---|-------|----------|
| S1 | Exemplos de referência | `persona.examples.length >= 3` |
| S2 | Subtópicos por pilar | Cada pilar com `subtopics.length >= 2` |
| S3 | Signature moves | `voice.signature_moves.length >= 2` |
| S4 | Pain points | `audience.primary.pain_points.length >= 2` |
| S5 | Archetype definido | `persona.archetype` não genérico |

### 🟢 Quality (informacional)

| # | Check | Critério |
|---|-------|----------|
| Q1 | Confidence alta | `persona.confidence >= 0.8` |
| Q2 | Divergências resolvidas | Todas divergências têm `resolution` |
| Q3 | Pesos somam 100% | `sum(pillars.weight) == 1.0` |
| Q4 | Audiência secundária | Presente (opcional mas recomendado) |
| Q5 | Ordenação de pilares | Pilares ordenados por peso desc |

---

## Scoring

```
critical_passed = count(passed) out of 5
standard_passed = count(passed) out of 5
quality_passed  = count(passed) out of 5

score = (critical_passed * 1.2) + (standard_passed * 0.6) + (quality_passed * 0.4)
      # max = 6 + 3 + 2 = 11 → normalizado para 10

verdict =
  FAIL if critical_passed < 5
  CONCERNS if score < 7
  PASS if score >= 7
```

---

## Ações por Verdict

| Verdict | Ação |
|---------|------|
| PASS | Exportar persona, prosseguir pipeline |
| CONCERNS | Alertar usuário, permitir prosseguir com waiver |
| FAIL | Bloquear, retornar para `@persona-architect *refine-voice` |

---

## Exemplo de Output

```yaml
verdict: PASS
score: 8.4
checks:
  critical:
    - {id: C1, passed: true}
    - {id: C2, passed: true, message: "4 pilares definidos"}
    - {id: C3, passed: true, message: "5 regras DO"}
    - {id: C4, passed: true, message: "4 regras DONT"}
    - {id: C5, passed: true}
  standard:
    - {id: S1, passed: true, message: "3 exemplos"}
    - {id: S2, passed: true}
    - {id: S3, passed: false, severity: medium, message: "Apenas 1 signature move"}
    - {id: S4, passed: true}
    - {id: S5, passed: true}
  quality:
    - {id: Q1, passed: true}
    - {id: Q2, passed: true}
    - {id: Q3, passed: false, severity: low, message: "Pesos somam 0.95"}
    - {id: Q4, passed: false, severity: low}
    - {id: Q5, passed: true}
```
