# PRD — VIDEO-AI-PT

> **Status:** v0.1 DRAFT — skeleton bootstrap. Precisa de sessão formal com `@pm` (Morgan) para refinamento interactivo com o Eurico.
> **Fonte:** este PRD é a formalização da secção 2 de `HANDOFF-BOOTSTRAP.md`. Conteúdo herdado; o refinamento é responsabilidade do `@pm`.
> **Emitido:** 2026-04-17 (Passo A do Bootstrap) — por `@ux-design-expert` (Uma)
> **Próximo dono:** `@pm` (Morgan) — para validar/iterar secções marcadas `[PENDENTE]` e formalizar versão v1.0.

---

## 1. Nome

**VIDEO-AI-PT**

---

## 2. Problema

Freelancers, agências e creators perdem **1-2 horas por vídeo curto de redes sociais** porque operam manualmente uma cadeia de ferramentas desconectadas (geração de vídeo IA → geração de designs → edição de vídeo → legendagem). O output não escala com o número de clientes.

**Caso concreto de origem:** o Eurico opera manualmente um contrato com o Snack Bar Clube Recreativo Alturense — 1 vídeo/dia, 20-30 segundos, Facebook 1:1 — a ~2h de trabalho humano por entrega. Clientes activos: 1. Não escala.

---

## 3. Utilizador alvo

| Fase | Utilizador | Relação com o sistema |
|------|-----------|----------------------|
| **Fase 1** | O próprio Eurico a servir N clientes | Versão interna, self-hosted. Usada dia-a-dia para atender múltiplos contratos. |
| **Fase 2** | Mentorados da comunidade **[IA]AVANÇADA PT** a servir clientes deles | SaaS dentro da comunidade. O sistema vira produto da comunidade. |

A Fase 2 só começa quando a Fase 1 estiver **testada e validada em produção real com múltiplos clientes do Eurico**.

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

## 9. Critérios de sucesso

### Fase 1 (interno Eurico)

| Métrica | Alvo v1.0 |
|---------|-----------|
| Tempo end-to-end por vídeo entregue | <15 min |
| Clientes activos suportáveis em paralelo | ≥3 |
| Validação humana antes de publicar | 100% (humano sempre no loop de aprovação) |
| Taxa de vídeos aprovados à 1ª sem re-trabalho | ≥70% |
| PT-PT correcto (sem PT-BR no output) | 100% |

### Fase 2 (SaaS comunidade) — **[PENDENTE — a definir com `@pm`]**

---

## 10. Caso de teste #1 — Alturense

O Snack Bar Clube Recreativo Alturense é o **primeiro teste real** do sistema:

- Formato: Facebook 1:1, 20-30s
- Cadência: 1 vídeo/dia
- Tom: paletas quentes estilo "Atum à Algarvia"
- Elementos: música sobreposta, texto animado, transições, corte, legendas queimadas, efeitos visuais
- Actual workflow manual: Lovart → Canva → CapCut (~2h)

**Meta de validação:** rodar `daily-content-delivery` workflow com prato do dia e comparar output contra o workflow manual actual. Sucesso = <15 min end-to-end + qualidade editorial equivalente ou superior.

---

## 11. Secções a expandir com `@pm`

- [PENDENTE] Personas detalhadas (Fase 1 e Fase 2) — em colaboração com `@ux-design-expert`
- [PENDENTE] User journeys concretos (onboarding de cliente novo, dia-a-dia de produção, handoff para agendador)
- [PENDENTE] Modelo de monetização Fase 2 (SaaS comunidade [IA]AVANÇADA PT)
- [PENDENTE] Priorização de features v1.0 vs v1.1+ (MVP scope)
- [PENDENTE] KPIs Fase 2 (adopção, retenção, satisfação)
- [PENDENTE] Risk register (dependências em APIs externas, custo por vídeo, limites rate)

---

## 12. Referências

- `HANDOFF-BOOTSTRAP.md` — contexto completo do bootstrap
- `squad/` — fundação task-first (adaptada de Adavio Tittoni)
- `docs/research/` — decisões de stack (Passo B, pendente)
- `docs/architecture/` — decisões arquitecturais (pendente)

---

*v0.1 — skeleton emitido por `@ux-design-expert` (Uma) em 2026-04-17. Próxima versão: `@pm` (Morgan) em sessão interactiva com o Eurico.*
