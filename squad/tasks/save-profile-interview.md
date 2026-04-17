---
task: Save Profile Interview
responsavel: "@profile-interviewer"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - person_slug: Slug da pessoa (obrigatório — resolvido via *resolve-person)
  - session_id: UUID da sessão
Saida: |
  - interview_data_path: data/{person_slug}/interviews/{session_id}.final.yaml (PERSISTIDO)
  - status: completed
  - summary: Resumo executivo dos principais insights
Checklist:
  - "[ ] Step 0: Resolver person_slug via *resolve-person"
  - "[ ] Carregar sessão de data/{person_slug}/interviews/{session_id}.yaml"
  - "[ ] Verificar consentimento para persistência"
  - "[ ] Anonimizar dados sensíveis"
  - "[ ] Calcular depth_score final"
  - "[ ] Gerar resumo executivo"
  - "[ ] PERSISTIR em data/{person_slug}/interviews/{session_id}.final.yaml (MANDATORY)"
  - "[ ] Marcar sessão como completed"
---

# *save-profile-interview

Finaliza e persiste a entrevista com consentimento do usuário.

## Fluxo

```
1. Consent gate:
   "Posso salvar esta entrevista para construir sua persona?
    Os dados ficam apenas no seu projeto local, sem envio externo. (Y/n)"

2. Se Y → prosseguir
   Se n → descartar dados em memória

3. Anonimização:
   - Remover e-mails, telefones, nomes completos
   - Substituir por placeholders {EMAIL}, {PHONE}, {FULL_NAME}

4. Gerar resumo executivo (5 bullets)

5. PERSIST (MANDATORY):
   data/{person_slug}/interviews/{session_id}.final.yaml
```

## Schema Final

```yaml
session_id: uuid
user_name_anonymized: string
domain: string
completed_at: iso8601
depth_score: float
total_questions: int
answers:
  - question: string
    answer: string (anonymized)
    tags: [string]
summary:
  voice_traits: [string]
  key_values: [string]
  primary_audience: string
  pain_points: [string]
  references: [string]
  niche: string
consent:
  given: true
  timestamp: iso8601
  version: "1.0"
```
