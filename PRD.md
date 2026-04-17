# PRD — VIDEO-AI-PT

> **Status:** v0.9 draft — awaiting Eurico validation
> **Fonte:** expansão da secção 2 de `HANDOFF-BOOTSTRAP.md` + trabalho autónomo do `@pm` (Morgan).
> **Emitido v0.1:** 2026-04-17 por `@ux-design-expert` (Uma)
> **Expandido para v0.9:** 2026-04-17 por `@pm` (Morgan)
> **Próximo passo:** validação interactiva com o Eurico → promover para v1.0.
> **Marcadores:** `[Assumption — validar com Eurico]` indica decisão autónoma do PM que precisa ratificação. Cada assumption tem justificação + alternativas.

---

## 1. Nome

**VIDEO-AI-PT**

---

## 2. Problema

Freelancers, agências e creators perdem **1-2 horas por vídeo curto de redes sociais** porque operam manualmente uma cadeia de ferramentas desconectadas (geração de vídeo IA → geração de designs → edição de vídeo → legendagem). O output não escala com o número de clientes.

**Caso concreto de origem:** o Eurico opera manualmente um contrato com o Snack Bar Clube Recreativo Alturense — 1 vídeo/dia, 20-30 segundos, Facebook 1:1 — a ~2h de trabalho humano por entrega. Clientes activos: 1. Não escala.

---

## 3. Personas

### 3.1 Fase 1 — Eurico Operator (primária)

| Campo | Detalhe |
|-------|---------|
| **Nome da persona** | Eurico Operator |
| **Arquétipo** | Freelancer técnico-criativo a servir clientes B2C (restaurantes, comércio local, serviços) |
| **Contexto** | Opera sozinho. Já tem 1 contrato diário (Alturense). Meta: 3-5 clientes em paralelo sem aumentar horas. |
| **Ferramentas actuais** | Lovart.ai (vídeo), Canva (designs), CapCut (edição), WhatsApp (entrega ao cliente), agendador externo |
| **Goals** | (1) Reduzir 2h → <15 min por vídeo. (2) Poder aceitar novos clientes sem colapsar. (3) Manter consistência de marca por cliente mesmo ao escalar. (4) Evitar trabalho manual repetitivo. |
| **Pains** | (1) Cada novo cliente = mais 2h/dia. (2) Perde tempo re-explicando contexto entre sessões. (3) Edição em CapCut é o maior drenador de tempo. (4) Erros de PT-BR aparecem quando usa modelos genéricos. |
| **Workflow ideal** | De manhã: abre CLI, corre `daily-content-delivery` para cada cliente com o tema do dia, valida os 3-5 vídeos gerados em <15 min cada, faz tweaks pontuais, entrega via pasta partilhada ou agendador. |
| **Tolerância técnica** | Alta — conforta-se com CLI, git, Node. Não precisa de UI para operar. |
| **Sucesso parece-se com** | Atender 3 clientes em 45 min/dia total em vez dos 2h/cliente actuais. |

### 3.2 Fase 2 — Mentor da Comunidade (secundária)

| Campo | Detalhe |
|-------|---------|
| **Nome da persona** | Mentor [IA]AVANÇADA PT |
| **Arquétipo** | Membro da comunidade [IA]AVANÇADA PT a replicar o playbook do Eurico |
| **Contexto** | Já opera freelance ou pequena agência. Procura ferramenta para automatizar produção de vídeo para os seus próprios clientes. Tem fluência técnica média — sabe usar ferramentas mas não quer montar stack do zero. |
| **Ferramentas actuais** | Mistura de CapCut, Descript, Canva, ChatGPT para copy. Resultado inconsistente. |
| **Goals** | (1) Produzir vídeos em PT-PT com qualidade profissional sem ser editor de vídeo. (2) Fechar mais contratos com a margem do Eurico. (3) Fazer parte da comunidade com ferramenta diferenciadora. |
| **Pains** | (1) Edição de vídeo consome mais tempo do que copywriting. (2) Difícil manter voz de marca consistente por cliente. (3) Custo de ferramentas individuais soma-se rapidamente. (4) Medo de lock-in num SaaS caro. |
| **Workflow ideal** | Onboarding rápido (<30 min) para criar brand-persona de um cliente. Dashboard simples para lançar produção diária. Receber vídeo em <15 min pronto a enviar ao cliente. |
| **Tolerância técnica** | Média — quer UI mínima mas aceita comandos se forem claros. **[Assumption — validar com Eurico]** Se o público da comunidade é mais técnico, podemos manter CLI-first com UI leve de observabilidade; caso contrário, Fase 2 precisa de dashboard funcional. |
| **Sucesso parece-se com** | Entregar primeiro vídeo a um cliente na semana de onboarding, sem abrir CapCut. |

**Justificação:** personas derivadas directamente de HANDOFF-BOOTSTRAP.md secção 2 (utilizador alvo por fase) + secção 1 (caso Alturense). Sem invenção.

**Alternativas consideradas:**
- Personas por papel (copywriter/editor/estratega) — rejeitado porque o Eurico opera end-to-end e a comunidade replica esse padrão. Papéis separados só fariam sentido numa Fase 3 multi-team.
- Persona do cliente final (restaurante Alturense) — rejeitado porque o cliente final não usa o sistema; consume output. Pode ser útil num doc de UX mas não como persona do produto.

---

## 4. Promessa

Entregar, a partir de um input mínimo do utilizador (marca + tema do dia), um **vídeo finalizado + package agendável** pronto a publicar nas redes — com o mínimo toque humano possível.

**Objectivo quantitativo:** reduzir o tempo por vídeo de ~2h para <15 min sem perder qualidade editorial.

---

## 5. Output alvo

1. **Vídeo finalizado auto-editado** (`.mp4`) — não prompt+designs para o operador editar depois
2. **Package agendável** — metadata + legendas + hashtags + alt-text + horário sugerido, prontos para agendador externo

---

## 6. Princípios inegociáveis

| # | Princípio |
|---|-----------|
| 1 | Output final PT-PT sempre. Suporte a pt-BR é adicionável mas a voz default é europeia. |
| 2 | Máximo de automação possível em cada camada. Humano só valida/publica. |
| 3 | Arquitectura task-first. Cada capacidade é uma task persistível em disco. |
| 4 | Person-centric / brand-centric storage: `squad/data/{slug}/` com subpastas `persona/`, `posts/`, `videos/`, `calendar/`. |
| 5 | Quality gates explícitos antes de entrega ao cliente. |
| 6 | Preparado para Fase 2 desde o início — sem features que bloqueiem o caminho para SaaS multi-tenant. |

---

## 7. Não-objectivos (explícitos)

- **Não** é um agendador de posts (integra com agendador externo; não reinventa).
- **Não** é um CRM de clientes.
- **Não** substitui o julgamento humano em decisões estratégicas de marca — só executa a voz já definida pela persona.
- **Não** gera conteúdo político/polémico/controverso. Escopo comercial B2C.

---

## 8. Arquitectura (resumo)

Fundação: squad task-first em `squad/` — 5 agentes, 21 tasks, 2 workflows. Adaptado do squad original de Adavio Tittoni (MIT).

Camadas a construir por cima (stack pendente de research — Passo B):
- **Camada 1** — Geração de vídeo IA (substitui Lovart manual)
- **Camada 2** — Geração de imagem/designs (substitui Canva manual)
- **Camada 3** — Edição programática de vídeo (substitui CapCut manual) — **camada crítica**
- **Camada 4** — Legendagem automática

Ver secção 4 de `HANDOFF-BOOTSTRAP.md` para candidatos por camada.

---

## 9. User Journeys

Três journeys principais, derivados dos workflows existentes no squad (`full-onboarding`, `content-pipeline`) e do fluxo manual actual do Alturense.

### 9.1 Journey A — Onboarding de cliente novo (Fase 1)

**Actor:** Eurico Operator. **Trigger:** assina novo contrato com restaurante/comércio. **Frequência:** uma vez por cliente.

| Passo | Acção | Task/Workflow | Tempo alvo |
|-------|-------|---------------|-----------|
| 1 | `*resolve-person {slug}` cria pasta `squad/data/{slug}/` | `resolve-person` | <1 min |
| 2 | Entrevista guiada com dono do cliente (via call ou questionário) | `start-interview` + `follow-up-questions` | 15-20 min |
| 3 | Research público de redes do cliente | `scan-social-profiles` + `analyze-engagement` | 5-10 min |
| 4 | Gerar `persona.yaml` brand-mode (pilares: prato do dia, bastidor, sazonalidade, etc.) | `build-copy-persona` + `refine-voice-tone` com flag `brand: true` | 10 min |
| 5 | Quality gate da persona | `persona-quality-check.md` | 2-5 min |
| 6 | Primeira peça de teste (1 vídeo com prato/produto real) | `daily-content-delivery` (workflow novo a criar em Passo C) | <15 min |
| 7 | Aprovação humana + entrega ao cliente | Humano | 5 min |

**Duração total alvo:** <60 min do brief à primeira entrega. **[Assumption — validar com Eurico]** Hoje este onboarding toma >4h manuais.

### 9.2 Journey B — Produção dia-a-dia (Fase 1, core loop)

**Actor:** Eurico Operator. **Trigger:** manhã ou véspera; tema do dia definido pelo cliente (ex: "Atum à Algarvia"). **Frequência:** 1x por cliente por dia (até 3-5 clientes em paralelo na v1.0).

| Passo | Acção | Task/Workflow | Tempo alvo |
|-------|-------|---------------|-----------|
| 1 | Input mínimo: `{slug}` + `tema do dia` + foto do prato opcional | CLI | <1 min |
| 2 | `plan-video-shot` — gera prompt cinematográfico a partir da persona + tema | task nova (Passo C) | 1-2 min |
| 3 | `generate-visuals` — gera assets imagem (Canva templates + Nanobanana) | task nova (Passo C) | 2-3 min |
| 4 | `plan-video-shot` dispara camada 1 (Runway/Kling/Wan) → clip IA gerado | Camada 1 stack | 2-5 min (assync) |
| 5 | `assemble-final-video` — composição programática (Remotion/FFmpeg) com música, overlays, transições, legendas queimadas | task nova + Camada 3 | 2-3 min |
| 6 | `transcribe-and-caption` — legendas PT-PT | Camada 4 (Whisper/Gladia) | <1 min |
| 7 | `export-package` — `.mp4` + legendas + hashtags + alt-text + horário sugerido | task nova | <1 min |
| 8 | Quality gate automático (duração, aspecto, PT-PT, sem placeholder) | checklist | <1 min |
| 9 | Humano valida + aprova (quality gate manual explícito) | Humano | 2-5 min |
| 10 | Entrega: pasta partilhada local ou upload para agendador externo | `export-package` variant | <1 min |

**Duração total alvo:** <15 min por vídeo end-to-end. **Clientes em paralelo v1.0:** ≥3 simultâneos via `content-pipeline` workflow com `parallel=3`.

### 9.3 Journey C — Handoff para agendador externo

**Actor:** Eurico ou cliente final. **Trigger:** vídeo aprovado em 9.2 passo 9.

**[Assumption — validar com Eurico]** Agendador externo = Metricool / Buffer / Hootsuite / Meta Business Suite. O PM assume Metricool por ser popular em PT e suportar Facebook/Instagram nativamente.

**Alternativas consideradas:**
- Publicação directa via Meta Graph API — rejeitado para v1.0 (aumenta superfície de erro, requer gestão de tokens Meta por cliente, lock-in à Meta).
- Publicação manual pelo cliente — aceite como fallback sempre disponível (cliente recebe ficheiros + caption prontos).

**Fluxo:**

| Passo | Acção | Output |
|-------|-------|--------|
| 1 | `export-package` escreve `{slug}/videos/{YYYY-MM-DD}/package.json` com metadata standard | JSON com `video_path`, `caption`, `hashtags`, `alt_text`, `suggested_time` |
| 2 | Opção A — Eurico faz upload manual ao agendador | Cliente agendador recebe |
| 3 | Opção B — Integração futura v1.1+ com API do agendador escolhido | Auto-upload |
| 4 | Opção C — Entrega directa ao cliente final (pasta partilhada OneDrive/Drive/WhatsApp) | Cliente agenda |

**Decisão v1.0:** apenas Opção A + Opção C. Integração API (Opção B) fica para v1.1+.

---

## 10. Monetização Fase 2

**Contexto:** Fase 2 é SaaS dentro da comunidade [IA]AVANÇADA PT, servindo os mentorados que já pagam mensalidade à comunidade.

### 10.1 Opções avaliadas

| Opção | Prós | Contras | Viabilidade |
|-------|------|---------|-------------|
| **A. Incluído na mensalidade da comunidade** | Zero fricção de adopção, reforça valor da comunidade, Eurico não gere billing separado | Receita do produto = €0 directo, custo API/infraestrutura absorvido pela comunidade, pode gerar uso abusivo | Boa para validação inicial; má para sustentabilidade |
| **B. Freemium — N vídeos/mês grátis, depois pay-as-you-go** | Baixa barreira, monetiza power users, custo API cobrerto | Requer billing e rate limiting desde dia 1, complexifica MVP | Média — adequado para v1.5+ |
| **C. Tier pago dedicado** (ex: €29-49/mês por utilizador) | Receita previsível, alinha com modelos SaaS comuns | Fricção de adopção, competes com mensalidade comunidade | Boa se o valor entregue justificar |
| **D. Pay-per-video** (ex: €1.50-3 por vídeo gerado) | Alinhamento directo com custo API + margem, transparente | Desincentiva uso, experiência fragmentada | Razoável como mecanismo de top-up |
| **E. Híbrido: base na mensalidade + créditos top-up** | Acessível na entrada, monetiza volume, compatível com limites API | Mais complexo de gerir | Boa a médio prazo |

### 10.2 Recomendação (v0.9)

**Modelo híbrido faseado:**

1. **v1.0 (validação interna Eurico):** sem monetização. Apenas valida arquitectura e custo por vídeo real.
2. **v1.5 Beta Fase 2 (primeiros 10-20 mentorados):** Opção A — incluído na mensalidade da comunidade com limite soft de 30 vídeos/utilizador/mês. Objectivo: aprender uso real, medir custo, validar retenção.
3. **v2.0 lançamento Fase 2:** Opção E — mensalidade inclui pool base (30-50 vídeos/mês), créditos top-up a €1-2/vídeo extra. Preço sugerido: pool base incluído no tier premium da comunidade.

**Justificação:**
- A comunidade [IA]AVANÇADA PT já tem modelo de mensalidade — replicá-lo reduz fricção.
- Custo API real por vídeo (camada 1 IA + camada 3 edição) precisa ser medido antes de fixar preço — só o Passo B research responde isso.
- Créditos top-up protegem contra explosão de custos em utilizadores heavy.
- **[Assumption — validar com Eurico]** O Eurico tem autonomia sobre pricing da comunidade; se não tiver, estratégia tem de se ajustar ao modelo comercial da comunidade.

**Alternativas rejeitadas e porquê:**
- Opção C pura (tier SaaS €29-49/mês) — rejeitada: duplica fricção de pagamento para quem já paga comunidade.
- Opção D pura (pay-per-video) — rejeitada: experiência fragmentada, desincentiva experimentação.
- Free tier público fora da comunidade — rejeitado: não é objectivo Fase 2 (comunidade é o canal).

### 10.3 KPIs de monetização a estabelecer

Definidos em detalhe na secção 12.

---

## 11. MVP Scope — v1.0 vs v1.1+

Alinhado com as 4 camadas do HANDOFF-BOOTSTRAP.md secção 4 + tasks do squad.

### 11.1 v1.0 (MVP — Fase 1 interna Eurico)

**Critério de inclusão:** resolve directamente o Journey B (produção dia-a-dia) para o caso Alturense. Sem isto, o produto não existe.

| Capacidade | Camada | Inclusão v1.0 | Justificação |
|------------|--------|---------------|--------------|
| Resolve-person + brand-persona (`brand: true`) | Fundação | SIM | Sem persona brand-mode o sistema não serve B2C. |
| Facebook 1:1 como formato default | Fundação | SIM | Caso Alturense exige. |
| `plan-video-shot` (prompt cinematográfico) | 1 | SIM | Peça central a criar. |
| Camada 1 — um único provider (escolhido no Passo B) | 1 | SIM | Não fazer multi-provider no MVP. |
| `generate-visuals` com Canva MCP OU Nanobanana/Gemini (um dos dois) | 2 | SIM (um) | Reduzir superfície. Canva se MCP já funcional, senão Gemini. |
| `assemble-final-video` com Remotion + FFmpeg (stack recomendada) | 3 | SIM | Camada crítica — se falhar, produto falha. |
| `transcribe-and-caption` com Whisper API | 4 | SIM | Whisper é standard e funciona para PT-PT. |
| `export-package` para pasta local | Fundação | SIM | Entrega funcional mínima. |
| `daily-content-delivery` workflow | Fundação | SIM | Orquestra 9.2 end-to-end. |
| Quality gate automático (duração, aspecto, PT-PT detection) | Fundação | SIM | Proteger contra output defeituoso. |
| Suporte a ≥3 clientes em paralelo via `content-pipeline` | Fundação | SIM | Métrica de sucesso declarada. |
| Logs de custo por vídeo | Observabilidade | SIM | Necessário para decidir monetização Fase 2. |

**Out of scope v1.0:**

| Capacidade | Razão |
|------------|-------|
| Multi-provider camada 1 (ex: Runway + Kling como fallback) | v1.1 — optimização de custo/qualidade, não bloqueador. |
| Integração directa com agendador (Metricool/Buffer/Meta) | v1.1 — Opção C do Journey C funciona como fallback. |
| Dashboard UI | v1.5 quando Fase 2 arrancar. CLI First é princípio. |
| Multi-tenant / isolamento por utilizador | v1.5+ (só quando Fase 2 começar). |
| Billing / rate limiting | v1.5+. |
| Suporte a formatos além de Facebook 1:1 | v1.1 (IG Reels 9:16, TikTok, YouTube Shorts). |
| Edição interactiva humana do vídeo gerado | v1.2+ se Journey B passo 9 revelar necessidade. |
| Brand assets library (logos, fonts, paletas por cliente) | v1.1 — para v1.0 assume inline na persona. |

### 11.2 v1.1 (hardening Fase 1)

Depois de 2-4 semanas de uso real do v1.0 com ≥3 clientes. Foco: robustez + expansão de formatos.

| Capacidade | Razão |
|------------|-------|
| Segundo provider camada 1 como fallback | Mitigar risco API externa. |
| Formatos adicionais: IG Reels 9:16, TikTok 9:16, YouTube Shorts | Ampliar mercado alvo. |
| Brand assets library por cliente | Reduzir re-entrada de logos/fonts por vídeo. |
| Integração Metricool (ou escolhida) via API | Automatizar Journey C. |
| Quality gate manual com UI básica (observabilidade) | Validação mais rápida. |

### 11.3 v1.5 (beta Fase 2)

Primeiros 10-20 mentorados da comunidade.

| Capacidade | Razão |
|------------|-------|
| Multi-tenant com isolamento por utilizador | Sem isto, Fase 2 não funciona. |
| Dashboard leve (observabilidade + launch de produção) | Utilizadores Fase 2 têm tolerância técnica média. |
| Billing base (integrado com comunidade) + limites soft | Modelo híbrido secção 10. |
| Onboarding self-service (Journey A via wizard) | Reduzir custo de onboarding por utilizador. |
| Templates pré-configurados por vertical (restaurante, comércio, serviços) | Acelerar tempo ao primeiro vídeo. |

### 11.4 v2.0+ (lançamento Fase 2)

- Créditos top-up + billing completo
- Marketplace de templates da comunidade
- Analytics de performance de vídeos (integração com APIs das redes)
- Eventual export para outras línguas (pt-BR, EN)

**Justificação do faseamento:** cada versão tem critério de saída claro baseado em evidência (uso real, custo medido, feedback mentorados). Nenhuma feature é adiada por capricho — só se não bloqueia o next-step core.

---

## 12. KPIs

### 12.1 Fase 1 (interno Eurico) — v1.0

| Métrica | Alvo v1.0 | Como medir |
|---------|-----------|------------|
| Tempo end-to-end por vídeo entregue | <15 min | Log do workflow `daily-content-delivery` |
| Clientes activos suportáveis em paralelo | ≥3 | Contagem em `squad/data/` com entregas diárias |
| Validação humana antes de publicar | 100% | Quality gate obrigatório |
| Taxa de vídeos aprovados à 1ª sem re-trabalho | ≥70% | Contador manual ou flag no package.json |
| PT-PT correcto (sem PT-BR no output) | 100% | Linter automático (lista de proibições) |
| Custo médio por vídeo (API + infra) | <€2 | Logs de custo por execução |
| Taxa de falha técnica (erro em alguma camada) | <5% | Logs do workflow |

### 12.2 Fase 2 (SaaS comunidade) — v1.5 / v2.0

**Adopção:**

| Métrica | Alvo v1.5 (beta) | Alvo v2.0 (GA) | Notas |
|---------|------------------|----------------|-------|
| Mentorados activos (≥1 vídeo/mês) | 10-20 | 50+ | Métrica primária Fase 2 |
| Tempo ao primeiro vídeo (onboarding) | <60 min | <30 min | Reduzido via templates |
| Mentorados com ≥1 cliente produtivo | 5+ | 20+ | Validação de utilidade real |
| % mensagens na comunidade sobre o produto / total | ≥5% | ≥10% | Proxy de engagement |

**Retenção:**

| Métrica | Alvo | Notas |
|---------|------|-------|
| Retention 30d (utilizadores que voltam ≥1x após primeira semana) | ≥70% | Crítico para viabilidade |
| Retention 90d | ≥50% | Indicador de product-market fit |
| Vídeos/utilizador/mês (média) | 10-20 v1.5 ; 20-40 v2.0 | Valida pricing |

**Satisfação:**

| Métrica | Alvo | Notas |
|---------|------|-------|
| NPS interno da comunidade | ≥40 | Survey trimestral |
| CSAT por vídeo entregue (opt-in) | ≥4/5 | Pergunta curta após geração |
| Tickets de suporte por utilizador/mês | <0.5 | Proxy de usabilidade |

**Churn:**

| Métrica | Alvo v2.0 | Notas |
|---------|-----------|-------|
| Churn mensal | <5% | Utilizadores que desactivam o produto (mantendo comunidade) |
| Churn de clientes finais dos mentorados | N/A tracking directo | Só perguntado em survey semestral |

**Económicas:**

| Métrica | Alvo v2.0 | Notas |
|---------|-----------|-------|
| Custo por vídeo (API) | <€1.50 | Optimização via multi-provider v1.1 |
| Margem bruta por utilizador | ≥60% | Com modelo híbrido secção 10 |
| Break-even utilizadores | ≤30 | Alinhar com estrutura da comunidade |

**[Assumption — validar com Eurico]** Os valores absolutos de KPI Fase 2 (ex: 10-20 mentorados v1.5) são estimativas proporcionais ao tamanho actual da comunidade. Ajustar após Eurico partilhar número real de membros activos.

---

## 13. Risk Register

Tabela priorizada por severidade (impacto × probabilidade). Cada risco tem mitigação proposta.

### 13.1 Riscos técnicos

| # | Risco | Severidade | Probabilidade | Mitigação proposta |
|---|-------|-----------|---------------|-------------------|
| R1 | **Dependência de APIs externas** (Runway/Kling/Whisper/Canva) — quebra, deprecation ou price hike | ALTA | MÉDIA | (a) Abstrair cada camada atrás de interface task; (b) v1.1 adicionar fallback provider; (c) avaliar ComfyUI local como escape hatch. |
| R2 | **Custo por vídeo excede viabilidade** (ex: Runway >€3/vídeo) | ALTA | MÉDIA | Research Passo B DEVE incluir custo medido real. Se >€2, escolher alternativa mais barata ou usar ComfyUI self-hosted. |
| R3 | **Rate limits das APIs bloqueiam produção em lote** | MÉDIA | ALTA | (a) Queue + retry com backoff exponencial; (b) geração overnight para lotes grandes; (c) múltiplas chaves por provider. |
| R4 | **Camada 3 (edição programática) não atinge qualidade CapCut** | ALTA | MÉDIA | Protótipo Remotion + FFmpeg com caso Alturense ANTES de fixar stack. Comparação lado-a-lado com output manual. |
| R5 | **Legendas queimadas com typos de PT-PT** (Whisper propende a PT-BR) | MÉDIA | ALTA | (a) Pós-processador com dicionário PT-PT; (b) Gladia como alternativa (melhor em PT-PT); (c) validação humana obrigatória. |
| R6 | **Nanobanana API key vazia / instável** (red flag #3) | MÉDIA | CONFIRMADO | Decidido no Passo B: obter chave, implementar fallback Gemini, ou substituir por Gemini/OpenRouter directo. |
| R7 | **Lock-in em provider único** (ex: só Runway) | MÉDIA | BAIXA para v1.0 | Arquitectura task-first já mitiga — abstrair cedo em interface. v1.1 adiciona segundo provider. |

### 13.2 Riscos legais e de compliance

| # | Risco | Severidade | Probabilidade | Mitigação proposta |
|---|-------|-----------|---------------|-------------------|
| R8 | **Direitos de imagem** — fotos de pratos/produtos dos clientes podem ter exigências legais | MÉDIA | MÉDIA | (a) Contrato com cliente explicitar cedência de uso das fotos fornecidas; (b) nunca usar stock photos com pessoas reais sem licença; (c) fotos IA geradas são próprias do sistema. |
| R9 | **Direitos de música** — biblioteca de música de fundo | ALTA | ALTA se não mitigada | (a) Usar APENAS bibliotecas royalty-free (Uppbeat, Artlist com licença comercial, Epidemic Sound) ou música generativa IA; (b) NUNCA música de editoras sem licença; (c) documentar licença por track. |
| R10 | **Conteúdo gerado por IA requer disclosure** (regulação EU AI Act) | MÉDIA | ALTA a médio prazo | Adicionar opção de watermark "gerado com IA" + alt-text que indica geração IA quando aplicável. Monitorizar regulação. |
| R11 | **Privacidade de dados dos clientes** (nome, morada, contactos em personas) | MÉDIA | MÉDIA | (a) `squad/data/` gitignored confirmado; (b) Fase 2 precisa encryption at rest + isolamento multi-tenant; (c) política de retenção definida. |
| R12 | **Uso indevido do sistema para desinformação/scam** | ALTA | BAIXA v1.0, MÉDIA v2.0 | (a) Secção 7 já declara não-objectivos; (b) v2.0 adicionar termos de serviço + mecanismo de report; (c) rate limit por utilizador. |

### 13.3 Riscos de produto / negócio

| # | Risco | Severidade | Probabilidade | Mitigação proposta |
|---|-------|-----------|---------------|-------------------|
| R13 | **Output não atinge qualidade esperada pelo cliente final** | ALTA | MÉDIA | (a) Caso de teste Alturense como gate v1.0; (b) quality gate manual obrigatório; (c) iteração rápida no mês 1. |
| R14 | **Fase 2 lançada sem Fase 1 validada** | ALTA | MÉDIA (pressão externa) | Princípio 6 explícito: Fase 2 só começa após Fase 1 validada. Gate claro em métricas 12.1. |
| R15 | **Lock-in técnico em framework (ex: Remotion) que fica inactivo** | MÉDIA | BAIXA | (a) Remotion é open source; (b) FFmpeg é standard eterno; (c) preferir ferramentas com comunidade activa. |
| R16 | **Complexidade do sistema ultrapassa capacidade de manutenção do Eurico sozinho** | ALTA | MÉDIA | (a) Task-first simplifica onboarding de novos agents/devs; (b) stories AIOX + QA gates; (c) documentação obrigatória por task. |
| R17 | **Custo de infraestrutura Fase 2 > receita gerada** | ALTA | MÉDIA | Medir custo real em Fase 1 antes de precificar Fase 2. KPI 12.2 económicas monitoriza. |

### 13.4 Resumo — Top-5 riscos a vigiar

1. **R2** — Custo por vídeo (bloqueador de viabilidade)
2. **R4** — Qualidade da camada de edição (bloqueador técnico)
3. **R9** — Direitos de música (bloqueador legal)
4. **R1** — Dependência de APIs externas (bloqueador de continuidade)
5. **R13** — Qualidade do output vs cliente final (bloqueador de adopção)

---

## 14. Caso de teste #1 — Alturense

O Snack Bar Clube Recreativo Alturense é o **primeiro teste real** do sistema:

- Formato: Facebook 1:1, 20-30s
- Cadência: 1 vídeo/dia
- Tom: paletas quentes estilo "Atum à Algarvia"
- Elementos: música sobreposta, texto animado, transições, corte, legendas queimadas, efeitos visuais
- Actual workflow manual: Lovart → Canva → CapCut (~2h)

**Meta de validação:** rodar `daily-content-delivery` workflow com prato do dia e comparar output contra o workflow manual actual. Sucesso = <15 min end-to-end + qualidade editorial equivalente ou superior.

---

## 15. Validação pendente

Questões numeradas para o Eurico validar antes de promover PRD para v1.0. Cada questão referencia a secção de origem.

### Personas (secção 3)

1. **Persona Fase 2 — tolerância técnica:** os mentorados da [IA]AVANÇADA PT são CLI-ready (como o Eurico) ou precisam de dashboard funcional desde v1.5? Impacto: define scope de UI v1.5.
2. **Persona Fase 1 — número de clientes-alvo:** o alvo "3-5 clientes em paralelo" está correcto, ou o Eurico quer apontar mais alto (ex: 10) já no v1.0? Impacto: dimensiona arquitectura desde o início.

### User journeys (secção 9)

3. **Journey A — onboarding:** confirma-se que entrevista do dono é a forma certa de captar persona brand, ou preferes outro mecanismo (ex: análise de redes + validação final)? Impacto: reordena fluxo.
4. **Journey C — agendador:** assumi Metricool como default. Preferes outro (Buffer/Hootsuite/Meta Business Suite/nenhum)? Impacto: priorização de integração v1.1.
5. **Input do utilizador no Journey B:** `{slug}` + `tema do dia` + foto opcional é input mínimo suficiente, ou o cliente fornece mais (ex: call-to-action, horário específico, URL)? Impacto: schema do brief.

### Monetização Fase 2 (secção 10)

6. **Autonomia de pricing:** tens autonomia sobre pricing da comunidade para embutir o produto, ou o pricing vem de terceiros (donos da comunidade)? Impacto: viabilidade da Opção A.
7. **Modelo híbrido aceite?** Mensalidade + pool base + créditos top-up faz sentido para a comunidade? Ou preferes modelo diferente (totalmente grátis no lançamento, ou tier pago dedicado)?
8. **Custo alvo aceitável por vídeo:** o target <€2 por vídeo é aceitável, ou tens outro limite? Impacto: determina escolha de camada 1 e 3 no Passo B.

### MVP scope (secção 11)

9. **v1.0 com 1 só provider camada 1:** aceita-se um único provider (ex: só Runway ou só Kling) no MVP, adicionando fallback em v1.1? Impacto: simplifica desenvolvimento inicial.
10. **Canva vs Nanobanana/Gemini em v1.0:** preferes começar com Canva MCP (que já tens activo) ou Gemini directo (mais rápido, sem template)? Impacto: define camada 2 imediatamente.
11. **Formatos além de 1:1 em v1.0:** mantém-se só Facebook 1:1 no MVP, ou queres IG 9:16 também? Impacto: +1-2 dias de trabalho.
12. **Dashboard v1.5 vs CLI First:** a constitution AIOX diz CLI First. Confirmas que v1.5 pode ter dashboard só de observabilidade (não controlo), ou queres dashboard de controlo também?

### KPIs (secção 12)

13. **Números absolutos Fase 2:** 10-20 mentorados v1.5 + 50+ v2.0 — são proporcionais ao tamanho actual da comunidade? Partilhar número real de membros activos.
14. **NPS target 40:** aceitável, ou tens benchmark diferente da comunidade?
15. **Pool base de vídeos (30-50/mês):** alinhado com uso previsto? Ou preferes diferente?

### Risk register (secção 13)

16. **Música royalty-free obrigatória:** confirmas restrição? Ou é aceitável pedir ao cliente fornecer licenças de música própria?
17. **Disclosure de IA (R10):** queres watermark "gerado com IA" visível ou apenas em alt-text?
18. **ComfyUI local como escape hatch (R1, R2):** aceitas ter ComfyUI a correr localmente como fallback, ou preferes stack 100% cloud?

### Out of scope / priorização

19. **Edição interactiva humana (v1.2):** é bloqueador se operador quiser tweak no vídeo gerado, ou quality-gate "approve/re-roll" é suficiente?
20. **Multi-língua (pt-BR, EN) em v2.0+:** há demanda da comunidade por isto, ou PT-PT é suficiente sem deadline?

---

## 16. Referências

- `HANDOFF-BOOTSTRAP.md` — contexto completo do bootstrap
- `squad/` — fundação task-first (adaptada de Adavio Tittoni)
- `docs/research/` — decisões de stack (Passo B, pendente)
- `docs/architecture/` — decisões arquitecturais (pendente)
- `CLAUDE.md` — mental model do projecto

---

*v0.9 draft — expandido por `@pm` (Morgan) em 2026-04-17. Próxima versão: v1.0 após validação interactiva com o Eurico das questões da secção 15.*
