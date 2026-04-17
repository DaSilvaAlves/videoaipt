# Coding Standards — social-media-squad

> **Modo de herança:** `extend` — estende as regras do AIOX core com especificidades deste domínio.

## Princípios Gerais (herdados do core)

- Task-first: toda funcionalidade começa numa task
- Self-documenting code
- Unit tests obrigatórios para lógica de negócio
- Erros com contexto (nunca `catch` silencioso)

## Específico para social-media-squad

### 1. Manipulação de Dados Pessoais (LGPD / GDPR)

- **NUNCA** persistir dados sensíveis (CPF, e-mail, telefone) sem consentimento explícito
- Dados de entrevista devem ser anonimizáveis (flag `anonymize_on_export`)
- Dados de pesquisa de redes sociais devem ser apenas **dados públicos**
- Rotas de "delete persona" devem remover **todos** os artefatos derivados

### 2. Copywriting

- Copy gerada deve incluir disclaimer quando solicitar engajamento comercial
- Nunca gerar copy que viole políticas das plataformas (Instagram, TikTok, LinkedIn)
- Hashtags devem respeitar limites de cada plataforma (IG: 30, TikTok: 5-7, LI: 3-5)

### 3. Integrações Externas

- **Nanobanana:** retry com backoff exponencial em falhas 5xx
- **Apify / Web Scraping:** respeitar `robots.txt`, usar delays razoáveis
- Timeouts padrão: 30s para geração, 10s para scraping

### 4. Output

- Copy sempre em múltiplas variantes (mínimo 3) para o usuário escolher
- Imagens em formatos: 1:1 (IG post), 9:16 (story/reel), 1.91:1 (LinkedIn)
- Sempre incluir alt-text sugerido para acessibilidade

### 5. Logging

- Log estruturado em JSON
- Nunca logar conteúdo pessoal do usuário em texto plano
- Usar `session_id` como correlação entre tasks
