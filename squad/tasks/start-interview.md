---
task: Start Interview
responsavel: "@profile-interviewer"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - user_name: Nome do usuário (obrigatório — usado para derivar person_slug)
  - domain: Área de atuação / nicho (opcional, elicitado se omitido)
Saida: |
  - person_slug: Slug resolvido via *resolve-person (ex: "adavio")
  - interview_session_id: UUID da sessão
  - initial_questions: Primeiras 5 perguntas adaptadas ao domínio
  - session_path: data/{person_slug}/interviews/{session_id}.yaml (PERSISTIDO)
Checklist:
  - "[ ] Step 0: Resolver person_slug via *resolve-person(user_name) — CRIA pasta da pessoa"
  - "[ ] Criar session_id único"
  - "[ ] Elicitar domain se não informado"
  - "[ ] Gerar 5 perguntas iniciais adaptadas"
  - "[ ] PERSISTIR arquivo inicial de sessão em data/{person_slug}/interviews/{session_id}.yaml (MANDATORY)"
  - "[ ] Apresentar primeiras 2 perguntas ao usuário"
---

# *start-interview

Inicia uma nova sessão de entrevista para capturar comportamento e voz do usuário.

> ⚠️ **MANDATORY:** Esta é a **primeira task no fluxo de uma nova pessoa**. Deve criar a pasta `data/{person_slug}/` via `*resolve-person`. Todas as tasks seguintes gravam dentro dela.

## Fluxo

0. **Step 0 (MANDATORY):** Chamar `*resolve-person(person_name=user_name)` → cria `data/{person_slug}/` e subpastas. Retorna paths canônicos.
1. Verificar se já existe sessão em andamento em `data/{person_slug}/interviews/`
2. Gerar `session_id` (UUID v4)
3. Se `domain` não informado → elicitar ("Qual sua área de atuação?")
4. Carregar banco de perguntas iniciais por domínio
5. Selecionar 5 perguntas iniciais (mix aberto + específico)
6. **PERSIST (MANDATORY):** Criar `data/{person_slug}/interviews/{session_id}.yaml` com schema inicial
7. Apresentar perguntas 1 e 2 ao usuário

## Banco de Perguntas Iniciais

### Sempre incluir
- "Descreva em 3 palavras como seus amigos te veem"
- "Qual é o maior problema que você resolve para outras pessoas?"

### Adaptadas por domínio
- **Empreendedor:** "Como você começou? Qual foi a virada de chave?"
- **Criador de conteúdo:** "Que tipo de conteúdo você consome e adora?"
- **Profissional liberal:** "O que seu cliente ideal tem em comum?"

## Schema de Sessão

```yaml
session_id: uuid
user_name: string
domain: string
created_at: iso8601
status: active | completed | abandoned
depth_score: 0.0
answers: []
```

## Error Handling

| Error | Causa | Resolução |
|-------|-------|-----------|
| `SESSION_EXISTS` | Sessão ativa para o usuário | Perguntar se retoma ou inicia nova |
| `INVALID_DOMAIN` | Domínio vazio após elicitação | Usar "generic" como fallback |
