# HANDOFF — Bootstrap VIDEO-AI-PT

> **Este é o handoff de arranque do projecto VIDEO-AI-PT.**
> Foi emitido pela agente Uma (ux-design-expert) em 2026-04-17, a partir de outra sessão.
> Quando abrires este projecto numa nova sessão de Claude Code, **lê este ficheiro INTEIRO antes de tocar em qualquer coisa**. A ordem das secções importa.
> Todos os paths referenciados são **relativos à raíz deste projecto** (`./`). Não há dependências externas.

---

## 0. Metadata

| Campo | Valor |
|-------|-------|
| **Projecto** | VIDEO-AI-PT |
| **Raíz** | `./` (directório onde este ficheiro está) |
| **Utilizador** | Eurico Alves (euricojsalves@gmail.com) |
| **Emitido por** | Uma (`@ux-design-expert`) |
| **Emitido em** | 2026-04-17 |
| **Destinatário** | Qualquer agente AIOX ao iniciar nova sessão neste directório |
| **Status** | PENDING — aguarda consumo |
| **Língua** | PT-PT sempre (nunca PT-BR) — regra global do utilizador |

---

## 1. Porque é que este projecto existe (a dor)

O Eurico opera manualmente um contrato com o **Snack Bar Clube Recreativo Alturense** em que entrega **1 vídeo publicitário de 20-30 segundos por dia** para redes sociais do restaurante. O workflow manual actual é:

1. Escrever/adaptar prompt cinematográfico
2. Gerar vídeo em **Lovart.ai** (manual)
3. Gerar 4 designs em **Canva** (quadrado 1:1 Facebook) em paletas quentes estilo Atum à Algarvia
4. Substituir foto do prato num dos designs Canva
5. Fazer edições finais no **CapCut**: música, texto animado, transições, corte, legendas queimadas, efeitos visuais — TUDO
6. Exportar `.mp4` + `.mp3`

**Tempo real por vídeo: aproximadamente 2 horas.**
**Clientes activos: 1.**
**Não escala.**

### A descoberta que desbloqueou o projecto

Em 2026-04-17 o Eurico trouxe um squad construído pelo seu **professor Adavio Tittoni**. Análise detalhada revelou que a arquitectura desse squad é **exactamente o que o PRD original do produto descrevia**: uma fábrica de conteúdo task-first, person-centric, com persistência obrigatória em disco, quality gates e orquestração de agentes.

**Esse squad não é uma ferramenta para o workflow manual — é a fundação do produto.**

### Decisão tomada nesta sessão

1. **Separar contextos** — o trabalho manual diário do Alturense continua noutro projecto, em paralelo. O produto vive aqui, greenfield, sem qualquer contaminação do caso Alturense no naming ou decisões estruturais.
2. **Alturense é o caso de teste #1**, nunca o nome do produto.
3. **Copiar o squad do Adavio como fundação** (já feito — ver secção 3), adaptar para o caso de negócio, e ir além: substituir o trabalho manual (Lovart/Canva/CapCut) por stack programática onde for possível.

---

## 2. Visão do produto (PRD v0.1 — draft)

### Nome
**VIDEO-AI-PT**

### Problema
Freelancers, agências e creators perdem **1-2 horas por vídeo curto de redes sociais** porque operam manualmente uma cadeia de ferramentas desconectadas (geração de vídeo IA → geração de designs → edição de vídeo → legendagem). O output não escala com o número de clientes.

### Utilizador alvo

| Fase | Utilizador | Relação com o sistema |
|------|-----------|----------------------|
| **Fase 1** | O próprio Eurico a servir N clientes | Versão interna, self-hosted. Usada dia-a-dia pelo Eurico para atender múltiplos contratos. |
| **Fase 2** | Mentorados da comunidade **[IA]AVANÇADA PT** a servir clientes deles | SaaS dentro da comunidade. O sistema vira produto da comunidade. |

A Fase 2 só começa quando a Fase 1 estiver **testada e validada em produção real com múltiplos clientes do Eurico**.

### Promessa
Entregar, a partir de um input mínimo do utilizador (marca + tema do dia), um **vídeo finalizado + package agendável** pronto a publicar nas redes — com o mínimo toque humano possível.

**Objectivo quantitativo:** reduzir o tempo por vídeo de ~2h para <15 min sem perder qualidade editorial.

### Output alvo do sistema

1. **Vídeo finalizado auto-editado** (não prompt+designs para o operador editar depois)
2. **Package agendável**: metadata + legendas + hashtags + alt-text + horário sugerido, prontos para agendador

### Princípios inegociáveis

| # | Princípio |
|---|-----------|
| 1 | Output final PT-PT sempre. Suporte a pt-BR é adicionável mas a voz default é europeia. |
| 2 | Máximo de automação possível em cada camada. Humano só valida/publica. |
| 3 | Arquitectura task-first. Cada capacidade é uma task persistível em disco. |
| 4 | Person-centric / brand-centric storage: `squad/data/{slug}/` com subpastas `persona/`, `posts/`, `videos/`, `calendar/`. |
| 5 | Quality gates explícitos antes de entrega ao cliente. |
| 6 | Preparado para Fase 2 desde o início — sem features que bloqueiem o caminho para SaaS multi-tenant. |

### Não-objectivos (explícitos)

- **Não** é um agendador de posts (integra com agendador externo; não reinventa).
- **Não** é um CRM de clientes.
- **Não** substitui o julgamento humano em decisões estratégicas de marca — só executa a voz já definida pela persona.
- **Não** gera conteúdo político/polémico/controverso. Escopo comercial B2C.

---

## 3. Fundação: squad do Adavio (já copiada para `./squad/`)

### Localização
**Tudo está em `./squad/`** dentro deste projecto. Zero dependências externas.

### Autor original
Adavio Tittoni (professor do Eurico). Licença MIT. Versão 1.0.0. Adaptado para este projecto.

### O que foi copiado (e o que NÃO foi)

**Copiado para `./squad/`:**
- `squad.yaml` (manifest)
- `README.md`
- `agents/` (5 agentes)
- `tasks/` (21 tasks)
- `workflows/` (2 workflows)
- `templates/` (3 templates)
- `checklists/` (1 checklist)
- `scripts/` (2 scripts utilitários)
- `config/` (3 configs)
- `tools/` (reservado, vazio)
- `data/` (vazio, apenas `.gitkeep`)

**NÃO copiado (decisão deliberada):**
- `.env` do Adavio — continha chaves em texto plano. Foi substituído por `./.env.example` na raíz do projecto com placeholders. (O `.env` original nunca chegou a ser commitado no repo de origem — confirmado via `git log` e `.gitignore`).
- `data/data/adavio/` — dados reais do Adavio (persona, posts, imagens, entrevistas). São privados do professor. Não pertencem a este projecto.

### Composição

| Camada | Conteúdo |
|--------|----------|
| **Agentes (5)** | `profile-interviewer` (Scout) · `social-scout` (Lens) · `persona-architect` (Muse) · `copy-creator` (Ink) · `script-writer` (Reel) |
| **Tasks (21)** | `resolve-person`, `start-interview`, `follow-up-questions`, `save-profile-interview`, `scan-social-profiles`, `analyze-engagement`, `extract-voice-patterns`, `build-copy-persona`, `refine-voice-tone`, `export-persona`, `plan-post`, `plan-story`, `create-content-calendar`, `generate-copy`, `generate-image`, `plan-reel`, `plan-yt-short`, `plan-yt-video`, `plan-yt-aulao`, `script-from-post`, `generate-storyboard` |
| **Workflows (2)** | `full-onboarding` (end-to-end: entrevista → primeira peça) · `content-pipeline` (produção em lote mensal, parallel=3, exit criteria: success ≥90%, partial ≥70%, failure <70%) |
| **Templates (3)** | `persona-brief.md` · `post-brief.md` · `video-script-tmpl.md` (com os 3 ficheiros por vídeo: brief.yaml/script.md/spoken.md) |
| **Checklists (1)** | `persona-quality-check.md` (15 critérios em 3 níveis, verdicts PASS/CONCERNS/FAIL) |
| **Scripts (2)** | `nanobanana-client.js` (geração de imagem) · `social-scraper.js` (Apify wrapper) |
| **Configs (3)** | `coding-standards.md` · `tech-stack.md` · `source-tree.md` |

### O que é genial nesta arquitectura

| Mecanismo | Valor |
|-----------|-------|
| **`*resolve-person`** — toda task começa resolvendo slug e cria/valida `squad/data/{slug}/{interviews,research,persona,posts,stories,videos,calendar}/` | Cada cliente tem pasta própria. Zero re-explicação entre sessões. |
| **Persistência MANDATORY em cada task** (`brief.yaml`, `copy.md`, `variants.yaml`, etc) — "nenhum fica só em chat" | Rastreabilidade total. Nada se perde. |
| **Quality gate de persona** antes de exportar | Bloqueia produção enquanto persona está crua. |
| **Divergências documentadas** entre auto-relato e dados observados | Captura dissonância "como acho que soo" vs "como soo". |
| **Dual register** (manifesto-mode para escrito / mano-mode para falado) + **3 ficheiros por vídeo** (brief.yaml · script.md editor · spoken.md teleprompter) | Separa o que é lido silenciosamente do que é falado em voz alta. |
| **`script-from-post`** — converte post em reel adaptando a oralidade | Reutiliza conteúdo escrito sem copy-paste robótico. |
| **Decisão visual antes do prompt** (papel da imagem escolhido explicitamente: editorial/com-copy/mockup/meme/bastidor) | Evita "fundo com texto" default. |
| **Workflow `content-pipeline` com exit criteria** (success ≥90%, partial ≥70%, failure <70%) | Lote com gates mensuráveis. |

### Gaps identificados (precisam adaptação)

| Gap | Impacto | Dificuldade |
|-----|---------|-------------|
| Formato **Facebook 1:1** não é default (tasks assumem IG/TikTok/LinkedIn) | Caso de teste Alturense é Facebook | Baixa — ajustar `squad/tasks/generate-image.md` + adicionar `facebook_post` aos aspect ratios |
| **Prompts para vídeo IA generativo** (Lovart, Runway, Wan, Kling) não existem — o `script-writer` só faz roteiros de vídeo FALADO humano | Core do produto é vídeo IA generativo | **Média — peça central a criar** (task `plan-video-shot.md`) |
| **Brand-persona** vs creator-persona — squad assume pessoa individual | Clientes são MARCAS, não pessoas | Média — adicionar campo `brand: true` ao schema + pilares de marca (prato do dia, bastidor, sazonalidade) |
| **Canva Connect API não integrado** — `generate-image` usa Nanobanana/Gemini | Canva é tool-standard para muitos clientes | Baixa — wrapper simples; o Eurico já tem Canva MCP activo |
| **Edição de vídeo automática (substituir CapCut)** não existe no squad | Dor #1 — 2h por vídeo | **Alta — peça que vai definir a stack** |
| **Export para pastas externas do OS** não existe | Necessário se entrega for fora do repo | Baixa — post-processor |

### Red flags internas ainda por resolver

| # | Red flag | Onde | Severidade | Acção |
|---|----------|------|-----------|-------|
| 1 | ~~Chaves em texto plano no `.env`~~ | — | ✅ **RESOLVIDA** | `.env` original confirmado gitignored e nunca committed; não foi copiado. Só `.env.example` com placeholders. |
| 2 | `NANOBANANA_API_KEY=` vazio mas task `generate-image` exige ou lança `API_KEY_MISSING`. Fallback para Gemini/OpenRouter mencionado em docs mas não implementado em `nanobanana-client.js` | `squad/scripts/nanobanana-client.js` linha 78-84 | 🟡 MÉDIA | Escolher: (a) obter chave Nanobanana, (b) implementar fallback Gemini no client, (c) substituir Nanobanana por Gemini/OpenRouter directo. Decidir durante Passo B (research). |
| 3 | Duplicação de path em `resolve-person.md` output: sugere `squads/social-media-squad/data/data/adavio/` (tem `data/data/`) | `squad/tasks/resolve-person.md` linhas 104-111 | 🟢 BAIXA | Corrigir para `squad/data/{slug}/` coerente com a estrutura actual. |
| 4 | Squad não está registado no AIOX core do utilizador. Manifesto declara `slashPrefix: social-media` (o do Adavio) | `squad/squad.yaml` linha 10 | 🟡 MÉDIA | Renomear para `videoaipt` ou `video-ai-pt` quando se decidir o prefixo CLI. Depois `npm run sync:ide`. |
| 5 | `web-search-fallback` em `social-scraper.js` retorna array vazio — sem implementação | `squad/scripts/social-scraper.js` linhas 99-107 | 🟢 BAIXA | Design decision do Adavio (assume Apify sempre). Documentar ou implementar fallback real se crítico. |

---

## 4. Stack tecnológica a decidir (research pendente)

O Eurico validou output "máximo de automação" (fase b+c). Isto implica **substituir as 3 ferramentas manuais** (Lovart, Canva, CapCut) por APIs programáticas onde possível. A decisão de stack tem de acontecer **logo após a fundação estar pronta**, antes da adaptação do squad.

### Camada 1 — Geração de vídeo IA (substitui Lovart manual)

| Candidato | Considerações |
|-----------|---------------|
| Runway Gen-3/Gen-4 Turbo via API | Qualidade alta, API madura, custo médio |
| Wan 2.2 via fal.ai | Eurico já está a descarregar Wan 2.2 GGUF para ComfyUI local — opção self-hosted grátis mas requer GPU potente |
| Kling AI via API | Muito bom em fluidez, custo moderado |
| Luma Dream Machine via API | Cinematográfico, bom para food |
| Minimax Video via API | Barato, qualidade razoável |
| Lovart via API (se existir) | Manter fluxo actual sem quebra |

**Output esperado da research:** tabela comparativa com custo/segundo gerado, qualidade em vídeo de comida (caso Alturense), tempo de geração, limites de API, suporte a prompt cinematográfico complexo.

### Camada 2 — Geração de imagem / designs (substitui Canva manual)

| Candidato | Considerações |
|-----------|---------------|
| **Canva Connect API** via MCP (Eurico já tem activo: `mcp__claude_ai_Canva__*`) | Mantém consistência; permite templates editáveis se cliente quiser rever |
| **Nanobanana / Gemini 2.5 Flash Image** | Mais rápido para geração pura, sem edição posterior |
| **ComfyUI local** (Eurico tem instalado em `C:\Users\XPS\Documents\comfy`) | Self-hosted, controlo total, grátis; requer workflow setup |
| **Ideogram API** | Excelente em imagens com texto tipográfico |
| Combinação híbrida | Gemini para geração rápida + Canva para templates revíveis |

### Camada 3 — Edição de vídeo programática (substitui CapCut manual) — **CAMADA CRÍTICA**

**Capacidades a replicar** (confirmado pelo Eurico):

- Música sobreposta
- Texto animado (overlays tipográficos)
- Transições
- Corte (trim/split)
- Legendas queimadas
- Efeitos visuais

| Candidato | Prós | Contras |
|-----------|------|---------|
| **Remotion** (React-based programmatic video) | Declarativo, componentizável, grande controlo, renderizável em Vercel/AWS | Requer React; curva de aprendizagem média |
| **Shotstack API** | REST simples, produção-ready, templates | Custo por minuto renderizado |
| **Creatomate API** | Templates visuais + API; bom para variantes em massa | Custo; menos flexível que Remotion |
| **FFmpeg puro (CLI / Node wrapper)** | Grátis, controlo total, já usado noutro projecto do Eurico | Código verboso, curva de aprendizagem alta |
| **ffmpeg.wasm** (browser-side) | Sem servidor | Limitado em complexidade, lento em efeitos pesados |
| **Descript API** | Legendagem automática forte | Focado em podcast/interview |

**Recomendação inicial (a validar na research):** Remotion + FFmpeg híbrido — Remotion para composição/overlay/animação, FFmpeg para encoding. Ou, se o MVP tem de ser rápido, Shotstack com templates.

### Camada 4 — Legendagem automática

| Candidato | Notas |
|-----------|-------|
| Whisper (OpenAI) via API ou local | Standard actual para transcrição + legendagem |
| Gladia API | Optimizado para multi-língua (inc. PT-PT) |
| AssemblyAI | Tem speaker labels |
| Auto-caption do Remotion | Se for a stack de edição |

---

## 5. Plano de arranque proposto (Passos A, B, C)

### Passo A — Fundação (parcialmente feito)

**Já feito nesta sessão (sessão emissora do handoff):**
- ✅ Pasta `./` criada
- ✅ `./squad/` com squad do Adavio adaptado (sem `.env`, sem dados privados do Adavio)
- ✅ `./.gitignore`, `./.env.example`, `./README.md`, `./HANDOFF-BOOTSTRAP.md`

**Falta fazer (próximo agente):**
1. Decidir se renomeia `squad/` para algo mais distintivo (`videoaipt-squad/` ou deixar simples)
2. Actualizar `squad/squad.yaml`:
   - `name: video-ai-pt-squad`
   - `slashPrefix: videoaipt` (ou escolhido)
   - `author: eurico-alves` (ou nome escolhido)
3. Corrigir red flag #3 (path duplicado `data/data/`) em `squad/tasks/resolve-person.md`
4. Criar `./PRD.md` formalizando a secção 2 deste handoff + qualquer adição do Eurico
5. Criar `./docs/` com subpastas: `architecture/`, `research/`, `handoffs/`
6. Inicializar `package.json` com `npm init -y` e instalar dependências Node runtime (`axios`, `yaml`, `js-yaml`)
7. Inicializar repo git (`git init`), confirmar `.gitignore` OK, primeiro commit da fundação

### Passo B — Research de stack (2-4h)

Gerar `docs/research/2026-04-XX-video-stack-decision.md` com:

1. Tabela comparativa camada a camada (4 camadas acima)
2. Custo estimado por vídeo entregue (15s de output final)
3. Qualidade em caso food/restaurant (Alturense é o teste)
4. Tempo de geração end-to-end
5. Recomendação fundamentada

**Actor sugerido:** `@analyst` (Alex) para research + `@architect` (Aria) para decisão final.

### Passo C — Adaptação do squad (5-8h)

1. **Adaptar agentes:**
   - `persona-architect` passa a suportar `brand: true` (marca B2C)
   - `copy-creator` ganha defaults Facebook 1:1 + templates de restaurante
   - `script-writer` ganha modo **cinematográfico IA** (distinto do modo **falado-humano** actual)

2. **Tasks novas a criar:**
   - `plan-video-shot.md` — escreve prompt para camada 1, cinematográfico, com pacing e shot direction
   - `generate-visuals.md` — orquestra camada 2 com decisão automática Canva vs Nanobanana vs ComfyUI
   - `assemble-final-video.md` — orquestra camada 3 (edição programática) a partir de assets das camadas 1 e 2
   - `transcribe-and-caption.md` — camada 4
   - `export-package.md` — empacota para agendador ou pasta externa

3. **Workflow novo:**
   - `daily-content-delivery.yaml` — orquestra plan-video-shot → generate-visuals → assemble-final-video → transcribe-and-caption → export-package com human gates mínimos

4. **Primeiro teste real (Alturense como caso interno):**
   - Criar `squad/data/alturense/` com persona brand-mode
   - Rodar workflow `daily-content-delivery` com prato do dia actual
   - Comparar output com workflow manual actual
   - **Meta:** <15 min end-to-end vs ~2h hoje

---

## 6. Contexto do utilizador (memória persistente)

Regras **globais** do utilizador — aplicam-se independentemente do projecto. Respeitar desde a primeira linha de código.

| Regra | Detalhe |
|-------|---------|
| **PT-PT sempre** | Nunca PT-BR. Mesmo que o utilizador ou input escreva em PT-BR, a resposta é em PT-PT. "utilizar" (não "usar"), "eliminar" (não "deletar"), "equipa" (não "time"). |
| **Investigar antes de descartar** | Nunca recusar uma opção sem testar. Investigar por conta própria — não devolver a pergunta ao utilizador. |
| **Sem críticas não pedidas** | Quando o utilizador pede para ler/analisar, compreender — não dar opinião não pedida. |
| **Comunidade [IA]AVANÇADA PT — design system próprio** | Fundo `#04040A`, glassmorphism, 5 cores específicas. Aplicável em Fase 2 SaaS. Referência: `C:\Users\XPS\.claude\rules\design-system-ia-avancada.md` (global user rules). |
| **Handoff Central (quando existir `docs/handoffs/` neste projecto)** | Agentes ao activar nova sessão devem ler `docs/HANDOFF-INDEX.md` como primeiro passo. Handoffs seguem prefixo `videoaipt-`. |

Memória global completa do utilizador (perfil, preferências, projectos paralelos): `C:\Users\XPS\.claude\projects\C--Users-XPS-Documents-alturense-videos\memory\MEMORY.md` (leitura opcional, só se o contexto de outros projectos do utilizador ajudar).

---

## 7. Primeira acção do próximo agente

> **Lê esta secção depois de ter lido tudo acima.**

1. **Confirma orientação com o Eurico.** Este handoff é uma proposta — o Eurico pode querer mudar ângulo, nome, escopo. Espelha em 3-4 frases o que entendeste e confirma antes de agir.

2. **Decide primeiro agente.** Recomendações:
   - `@pm` (Morgan) — formaliza PRD
   - `@architect` (Aria) — ataca arquitectura e stack
   - `@ux-design-expert` (Uma) — continuidade com a sessão emissora; boa para persona + UI design depois
   - Sugestão: `@pm` → `@architect` → `@analyst` para research → `@ux-design-expert` para persona → `@dev` para implementação

3. **Executa o que falta do Passo A** (ver secção 5):
   - Renomear / ajustar `squad/squad.yaml`
   - Corrigir red flag #3 em `squad/tasks/resolve-person.md`
   - Criar `PRD.md`, `docs/` (architecture/research/handoffs)
   - `npm init -y` + deps + `git init` + primeiro commit

4. **Arranca Passo B (research)** só depois do Eurico validar o PRD formal.

5. Ao terminar a sessão, **cria handoff de continuação** em `docs/handoffs/videoaipt-handoff-{slug}-{YYYYMMDD}.yaml` seguindo a regra Handoff Central do AIOX (ver `C:\Users\XPS\.claude\rules\handoff-central.md`).

---

## 8. Referências externas (só consulta, nunca dependência)

Estas são referências para leitura se precisares de mais contexto. O projecto **não depende** delas — funciona isolado.

| Ficheiro externo | Valor informativo |
|------------------|-------------------|
| Handoff diário Alturense actual (workflow manual que o produto vai substituir) | `C:\Users\XPS\Documents\alturense-videos\.aiox\handoffs\handoff-uma-alturense-20260417.yaml` |
| ComfyUI local do utilizador | `C:\Users\XPS\Documents\comfy` — instalação activa com Wan 2.2 GGUF em download |
| Memória global do utilizador | `C:\Users\XPS\.claude\projects\C--Users-XPS-Documents-alturense-videos\memory\MEMORY.md` |
| Design system da comunidade [IA]AVANÇADA PT | `C:\Users\XPS\.claude\rules\design-system-ia-avancada.md` |
| Regras AIOX globais | `C:\Users\XPS\.claude\CLAUDE.md` e `C:\Users\XPS\.claude\rules\*.md` |

---

## 9. Estado actual da pasta

```
videoaipt/
├── HANDOFF-BOOTSTRAP.md     ← este ficheiro
├── README.md                ← overview curto
├── .gitignore               ← pronto
├── .env.example             ← copiar para .env e preencher
└── squad/                   ← fundação copiada do Adavio (limpa)
    ├── squad.yaml
    ├── README.md
    ├── agents/              (5 .md)
    ├── tasks/               (21 .md)
    ├── workflows/           (2 .yaml)
    ├── templates/           (3 .md)
    ├── checklists/          (1 .md)
    ├── scripts/             (2 .js)
    ├── config/              (3 .md)
    ├── tools/               (vazio)
    └── data/                (vazio — só .gitkeep)
```

Ainda **não existem**: `PRD.md`, `docs/`, `package.json`, `.env`, repo git. Serão criados pelo próximo agente conforme Passo A.

---

## 10. Assinatura

| Campo | Valor |
|-------|-------|
| Emitido por | Uma (`@ux-design-expert`) |
| Persona | UX/UI Designer & Design System Architect |
| Data | 2026-04-17 |
| Assinatura emocional | O Eurico está a 2h por vídeo e 1 cliente só. Esta arquitectura é o caminho para 15 min por vídeo e N clientes. Greenfield para pensar diferente. |

---

> **Fim do handoff.**
> Próximo agente: lê a secção 7, espelha ao Eurico o que entendeste, activa o agente adequado, completa o Passo A. Só depois arrancas Passo B.
