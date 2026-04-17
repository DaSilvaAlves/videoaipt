---
task: Follow-up Questions
responsavel: "@profile-interviewer"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - session_id: UUID da sessão ativa
  - previous_answers: Respostas até o momento
Saida: |
  - next_questions: 2-3 perguntas adaptativas
  - depth_score: Pontuação de profundidade (0-1)
  - should_continue: bool (continua ou já pode encerrar)
Checklist:
  - "[ ] Carregar sessão"
  - "[ ] Analisar respostas anteriores (tom, profundidade, padrões)"
  - "[ ] Identificar gaps nos pilares (voz, valores, audiência)"
  - "[ ] Gerar perguntas adaptativas focadas nos gaps"
  - "[ ] Calcular depth_score"
  - "[ ] Decidir se continua ou encerra (threshold: 0.8)"
---

# *follow-up-questions

Gera perguntas adaptativas baseadas nas respostas anteriores, focando em gaps.

## Algoritmo de Adaptação

```
1. Analisar respostas:
   - Comprimento médio (indicador de engajamento)
   - Uso de emoção (palavras afetivas)
   - Referências específicas (pessoas, marcas, exemplos)

2. Mapear cobertura:
   □ Voz/Tom
   □ Valores
   □ Audiência-alvo
   □ Dores de comunicação
   □ Referências/inspirações
   □ Nicho específico

3. Priorizar perguntas para gaps menos cobertos

4. Adaptar tom da pergunta ao tom do usuário:
   - Se respostas curtas → perguntas diretas
   - Se respostas longas → perguntas abertas
```

## Critério de Encerramento

A entrevista pode encerrar quando:
- `depth_score >= 0.8` E
- Todos os 6 pilares com cobertura >= 60% E
- Mínimo de 10 perguntas respondidas

## Output

```yaml
next_questions:
  - text: "string"
    targets: [gap_area]  # qual gap essa pergunta ataca
    expected_depth: float

depth_score: 0.72
should_continue: true
coverage:
  voice: 0.9
  values: 0.6
  audience: 0.4
  pains: 0.7
  references: 0.3
  niche: 0.8
```
