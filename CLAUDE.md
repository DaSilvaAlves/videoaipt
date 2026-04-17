# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Leitura obrigatória ao iniciar sessão

**Antes de tocar em qualquer coisa, ler `HANDOFF-BOOTSTRAP.md` inteiro.** Esse ficheiro é a fonte de verdade do estado do projecto e das decisões tomadas até à data. A ordem das secções do handoff importa.

---

## Estado do projecto

- **Fase:** Bootstrap (criado 2026-04-17). Greenfield.
- **Não é repo git ainda.** Nunca correr `git` para descobrir histórico — não existe. `git init` está previsto como parte do Passo A no handoff.
- **Não existe `package.json`, `PRD.md`, `docs/`, nem `.env`.** Serão criados pelo próximo agente conforme Passo A da secção 5 de `HANDOFF-BOOTSTRAP.md`.
- **Não há comandos de build/test/lint funcionais.** O stack (Node 18+, CommonJS, `axios`, `yaml`, `jest`, `eslint`, `prettier`) está declarado em `squad/config/tech-stack.md` mas ainda não instanciado.

---

## O que o produto é (uma frase)

VIDEO-AI-PT é um sistema **task-first, person/brand-centric** para produção automatizada de vídeos curtos de redes sociais — do brief do cliente ao vídeo finalizado + package agendável, com o mínimo de toque humano. Meta: reduzir de ~2h/vídeo para <15 min/vídeo. Fase 1 interno (Eurico); Fase 2 SaaS na comunidade [IA]AVANÇADA PT.

O **caso de teste #1 é o Snack Bar Clube Recreativo Alturense** (contrato manual que o produto vai substituir). Alturense **nunca** é o nome do produto nem contamina o naming.

---

## Arquitectura — mental model

A fundação em `squad/` é uma adaptação do squad original do **Adavio Tittoni** (MIT, v1.0.0), copiada limpa (sem `.env`, sem dados privados). O squad **ainda não foi renomeado** — `squad/squad.yaml` ainda declara `name: social-media-squad` e `slashPrefix: social-media`. Renomear para `video-ai-pt-squad` e `slashPrefix: videoaipt` é parte do Passo A.

### Task-first (princípio central)

Cada capacidade do sistema é uma **task persistível em disco** (`squad/tasks/*.md`). Não há código escondido — toda a lógica vive em tasks declarativas com `Entrada`, `Saida`, `Checklist` no frontmatter. Os agentes são orquestradores que executam tasks; nunca implementam a lógica inline.

### Person/brand-centric storage

Toda task começa chamando `*resolve-person` (`squad/tasks/resolve-person.md`), que slugifica o nome e garante a estrutura:

```
squad/data/{slug}/
├── interviews/   # profile-interviewer
├── research/     # social-scout
├── persona/      # persona-architect (persona.yaml + brief.md)
├── posts/        # copy-creator — 1 subpasta por post_id
├── stories/      # copy-creator
├── videos/       # script-writer — brief.yaml + script.md + spoken.md
└── calendar/     # copy-creator
```

**Persistência é MANDATORY em cada task.** Regra explícita no squad: "nenhum output fica só em chat". Cada task grava `brief.yaml`, `copy.md`, `variants.yaml`, etc. no path correcto.

`squad/data/*` é **gitignored** (excepto `.gitkeep`). Runtime puro.

### 5 agentes / 21 tasks / 2 workflows

| Agente | Persona | Responsabilidade |
|--------|---------|------------------|
| `profile-interviewer` | Scout | Entrevista guiada com utilizador (até `depth_score >= 0.8`) |
| `social-scout` | Lens | Scraping de perfis públicos via Apify |
| `persona-architect` | Muse | Consolida entrevista + research em `persona.yaml` + quality gate |
| `copy-creator` | Ink | Posts, stories, calendário, geração de imagem (Nanobanana) |
| `script-writer` | Reel | Reels, shorts, vídeos longos, aulões — formato **falado humano** |

Workflows em `squad/workflows/`:
- `full-onboarding.yaml` — end-to-end: entrevista → research → persona → primeira peça. Tem quality gate (`halt` se persona reprovar).
- `content-pipeline.yaml` — produção em lote mensal, `parallel=3`, exit criteria: success ≥90%, partial ≥70%, failure <70%.

### Dual-register e 3 ficheiros por vídeo

O template `squad/templates/video-script-tmpl.md` separa **manifesto-mode (escrito)** de **mano-mode (falado)**:
- `brief.yaml` — metadata e direcção
- `script.md` — para o editor
- `spoken.md` — para o teleprompter

`script-from-post.md` converte post escrito em reel adaptando a oralidade — nunca copy-paste.

---

## Gaps do squad original vs o que este produto precisa

O squad do Adavio cobre **copy + script falado**. O produto VIDEO-AI-PT precisa de mais 4 camadas (ver secção 4 do handoff). Estas tasks/scripts **ainda não existem** e têm de ser criadas:

| Camada | Decisão | Task a criar |
|--------|---------|--------------|
| **1. Geração de vídeo IA** (substitui Lovart manual) | Stack pendente — ver research Passo B | `plan-video-shot.md` (cinematográfico, pacing, shot direction) |
| **2. Geração de imagem** (substitui Canva manual) | Híbrido Canva MCP + Nanobanana/Gemini + ComfyUI | `generate-visuals.md` |
| **3. Edição programática** (substitui CapCut manual — CAMADA CRÍTICA) | Candidato principal: Remotion + FFmpeg. Alternativas: Shotstack, Creatomate | `assemble-final-video.md` |
| **4. Legendagem** | Whisper / Gladia / AssemblyAI | `transcribe-and-caption.md` |

Também falta:
- Brand-persona (squad assume pessoa individual — clientes são marcas B2C, precisa de `brand: true` + pilares como prato-do-dia, bastidor, sazonalidade)
- Formato Facebook 1:1 como default (squad assume IG/TikTok/LinkedIn)
- Workflow `daily-content-delivery.yaml` que orquestre camadas 1→4
- Task `export-package.md` para pastas externas ao OS

---

## Red flags ainda por resolver

| # | Red flag | Localização | Severidade |
|---|----------|-------------|-----------|
| 1 | `squad.yaml` ainda tem `name: social-media-squad`, `slashPrefix: social-media`, `author: adavio-tittoni` | `squad/squad.yaml:1,8,10` | 🟡 Média — renomear no Passo A |
| 2 | Path duplicado `data/data/` no output de `resolve-person.md` | `squad/tasks/resolve-person.md:103-111` | 🟢 Baixa — corrigir para `squad/data/{slug}/` |
| 3 | `NANOBANANA_API_KEY` vazio; `nanobanana-client.js` lança `API_KEY_MISSING` sem fallback, apesar de docs mencionarem Gemini/OpenRouter | `squad/scripts/nanobanana-client.js:78-84` | 🟡 Média — decidir: obter chave, implementar fallback Gemini, ou substituir por Gemini/OpenRouter directo |
| 4 | `web-search-fallback` em `social-scraper.js` retorna array vazio (sem implementação) | `squad/scripts/social-scraper.js:99-107` | 🟢 Baixa — design decision do Adavio (assume Apify sempre) |

---

## Princípios inegociáveis (do handoff)

1. **PT-PT sempre** — outputs, documentação, código comments. Nunca PT-BR mesmo que o input seja.
2. **Task-first** — toda capacidade é task persistível em disco. Nunca lógica inline em agente.
3. **Person/brand-centric** — tudo em `squad/data/{slug}/`. Nunca flat.
4. **Máximo de automação em cada camada** — humano só valida e publica.
5. **Quality gates explícitos** antes de entrega (ver `squad/checklists/persona-quality-check.md`).
6. **Preparado para Fase 2 SaaS desde o início** — sem features que bloqueiem multi-tenant.

---

## Handoff Central

Quando `docs/handoffs/` existir, seguir a regra `C:\Users\XPS\.claude\rules\handoff-central.md`:
- Prefixo obrigatório: `videoaipt-handoff-{slug}-{YYYYMMDD}.yaml`
- Índice vivo em `docs/HANDOFF-INDEX.md`
- Ao activar nova sessão, ler o INDEX primeiro

Até existirem, o handoff autoritativo é `HANDOFF-BOOTSTRAP.md` na raíz.

---

## Agentes AIOX recomendados

Conforme secção 7 do handoff, o pipeline sugerido é:

```
@pm → @architect → @analyst (research stack) → @ux-design-expert → @dev
```

- `@pm` formaliza `PRD.md` a partir da secção 2 do handoff
- `@architect` decide stack (Remotion vs Shotstack, Runway vs Kling, etc.)
- `@analyst` faz `docs/research/2026-04-XX-video-stack-decision.md`
- `@devops` é **exclusivo** para `git init`, `git push`, PRs, MCP management
- `@sm` cria stories; `@po` valida; `@dev` implementa; `@qa` gate
