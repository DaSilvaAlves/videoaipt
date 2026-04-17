# PRD — VIDEO-AI-PT

> **Status:** v1.0 — APPROVED via tacit_approval do Eurico
> **Fonte:** expansão da secção 2 de `HANDOFF-BOOTSTRAP.md` + trabalho autónomo do `@pm` (Morgan) + research do `@analyst` (Alex) + decisão arquitectural do `@architect` (Aria) + aprovação do Eurico via duplo tacit_approval (2026-04-17).
> **Emitido v0.1:** 2026-04-17 por `@ux-design-expert` (Uma)
> **Expandido para v0.9:** 2026-04-17 por `@pm` (Morgan)
> **Ratificado arquitecturalmente v0.95:** 2026-04-17 por `@architect` (Aria) — secções 8, 11, 13 actualizadas; stack decidida; Q-ARQ-1/2/3 respondidas
> **Promovido para v1.0:** 2026-04-17 por `@pm` (Morgan) — aprovação via duplo tacit_approval do Eurico
> **Risco conhecido aberto:** R22 (pricings `[KC-2026-01]`) — re-verificar antes de primeiro billing produtivo
> **Próximo passo:** `@sm` (River) arranca Passo C.3 — primeira story do MVP: "Remotion Alturense template" (mitigação crítica R4+R20).
> **Marcadores:** `[Assumption — validar com Eurico]` indica decisão autónoma do PM, agora todas resolvidas (ver §15 Resolution Log). `[ARQ-2026-04-17]` indica decisão arquitectural ratificada por Aria. `[PM-v1.0-2026-04-17]` indica resolução via tacit_approval para promoção v1.0.

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

## 8. Arquitectura

> **Status desta secção:** `[ARQ-2026-04-17]` Ratificada pelo `@architect` (Aria) em 2026-04-17, com base no research de `@analyst` (Alex) em `docs/research/2026-04-17-video-stack-decision.md` e decisão Q-ARQ-2 do Eurico (vídeos Alturense sem voz falada).

### 8.1 Stack ratificada — v1.0

| Camada | Provider v1.0 | Fallback v1.1 | Fase 2 premium |
|--------|---------------|----------------|------------------|
| **1 — Vídeo IA** | Kling v2 via fal.ai | Luma Dream Machine via fal.ai | Runway Gen-4 Turbo (tier cliente premium) |
| **2 — Imagem / designs** | Gemini 2.5 Flash Image (default) + Canva MCP (flag `canva_editable: true` por persona) | Ideogram 2 (text-heavy) | — |
| **3 — Edição programática** | **Remotion + FFmpeg, render LOCAL** `[Q-ARQ-1]` | Shotstack API (se Remotion for blocker) | Remotion Lambda (AWS) para escala multi-tenant |
| **4 — Legendagem** | **OUT OF SCOPE v1.0** `[Q-ARQ-2 Eurico 2026-04-17]` — legendas queimadas vêm directamente do script escrito pelo agente `script-writer` (Reel), renderizadas via `<Subtitle/>` do Remotion | — | Whisper API + post-processor PT-PT (re-activa se cliente com narração) |

**Custos unitários ratificados** (ver secção 8.5 para breakdown detalhado):
- Kling v2 via fal.ai: ~$0,04/segundo de vídeo gerado `[KC-2026-01]`
- Gemini 2.5 Flash Image: ~$0,015/imagem `[KC-2026-01]`
- Remotion licence v1.0 (≤3 operadores): gratuito `[KC-2026-01]`
- Remotion licence v1.5+ (>3 operadores): ~$150/mês `[KC-2026-01]`
- Canva Pro (se flag activa): ~€12/mês por persona editável `[KC-2026-01]`

**Nota sobre re-verificação de pricings:** Todos os pricings marcados `[KC-2026-01]` derivam do knowledge cutoff do @analyst (Jan 2026). O @architect tentou re-verificar via WebSearch/WebFetch mas ambas as tools foram bloqueadas no ambiente desta sessão (mesma limitação do @analyst). **Acção exigida antes de primeiro billing produtivo:** `@devops` ou Eurico devem executar re-verificação nas 9 páginas listadas em `docs/research/2026-04-17-video-stack-decision.md` secção 2.2. Risco absorvível para v1.0 MVP: flutuação de ±20% em pricing não muda a viabilidade (<€2/vídeo) nem a escolha estrutural (Remotion é open-source, Kling é substituível via fal.ai abstraction).

### 8.2 Data flow end-to-end

```
                            [CLI: daily-content-delivery]
                                    |
                                    | input: slug, tema, [foto_prato.jpg]
                                    v
                   +-----------------------------------+
                   |  Task: plan-video-shot            |
                   |  Agente: script-writer (Reel)     |
                   |  Mode: cinematografico IA         |
                   +-----------------------------------+
                                    |
                                    | output: shot-plan.yaml
                                    |         text-overlays.yaml
                                    |         script.md (para captions)
                                    v
                      +-----------[fork]------------+
                      |                             |
                      v                             v
         +------------------------+    +------------------------+
         |  CAMADA 1              |    |  CAMADA 2              |
         |  VideoProvider         |    |  ImageProvider         |
         |  = kling-v2-fal        |    |  = gemini-2.5-flash    |
         |                        |    |                        |
         |  2 clips x 10s         |    |  4 imagens 1:1         |
         |  prompt cinematografico|    |  palette Alturense     |
         |                        |    |                        |
         |  output:               |    |  output:               |
         |  clip-01.mp4           |    |  design-01..04.png     |
         |  clip-02.mp4           |    |                        |
         +------------------------+    +------------------------+
                      |                             |
                      +-------------[join]----------+
                                    |
                                    v
         +-----------------------------------------------+
         |  Task: assemble-final-video                   |
         |  EditingProvider = remotion-local             |
         |                                               |
         |  Template: squad/templates/remotion/          |
         |            alturense-default/                 |
         |                                               |
         |  <Composition duration=20-30s ratio=1:1 >     |
         |    <Series>                                   |
         |      <Clip1 transition=fade-0.5s />           |
         |      <Clip2 />                                |
         |    </Series>                                  |
         |    <TextOverlay from=text-overlays.yaml />    |
         |    <Subtitle from=script.md />  [Q-ARQ-2]     |
         |    <MusicTrack src=royalty-free-library />    |
         |  </Composition>                               |
         |                                               |
         |  Render: local (Node + headless Chromium)     |
         |  Encode: FFmpeg H.264 1:1 30fps               |
         |                                               |
         |  output: final.mp4                            |
         +-----------------------------------------------+
                                    |
                                    v
         +-----------------------------------------------+
         |  Task: quality-gate-automatic                 |
         |  Checks: duracao [20-30s]                     |
         |          aspect [1:1]                         |
         |          PT-PT linter (lista proibicoes)      |
         |          no-placeholder                       |
         +-----------------------------------------------+
                                    |
                                    v
         +-----------------------------------------------+
         |  Task: export-package                         |
         |  StorageProvider = local-folder (v1.0)        |
         |                                               |
         |  output:                                      |
         |  squad/data/{slug}/videos/{YYYY-MM-DD}/       |
         |    final.mp4                                  |
         |    captions.srt (derivado de script.md)       |
         |    metadata.json                              |
         |    package.zip                                |
         +-----------------------------------------------+
                                    |
                                    v
                      [Eurico valida + entrega ao cliente]
```

**Notas de paralelização:**
- **Camada 1 corre em paralelo com Camada 2** — Camada 1 é o gargalo (60-180s); Camada 2 demora 20-40s e termina antes. Sem paralelização, latência sobe ~30-40s desnecessariamente.
- **Camada 3 é sequencial** (precisa dos outputs das Camadas 1+2).
- **Sem Camada 4 (Whisper) em v1.0** por decisão Q-ARQ-2 do Eurico.

### 8.3 Decisões arquitecturais — Q-ARQ-1, Q-ARQ-2, Q-ARQ-3

#### Q-ARQ-1 — Render location v1.0: **LOCAL** `[ARQ-2026-04-17]`

**Decisão:** Remotion render corre localmente na máquina do Eurico em v1.0.

**Razões:**
1. **Time-to-first-video optimizado** — zero setup AWS, zero IAM policies, zero Lambda packaging. Em Fase 1 (≤5 clientes), focar em conteúdo e não em ops cloud.
2. **Custo marginal €0** — electricidade desprezível vs €0,02-0,03/render em Lambda. Em 90 vídeos/mês = €1,80-2,70 poupados.
3. **Learning curve Remotion (R20)** concentra-se no que importa — templates, não infrastructure-as-code.
4. **Fase 2 path não bloqueado** — abstraction layer (Q-ARQ-3) permite swap `EditingProvider` de `remotion-local` para `remotion-lambda` sem tocar tasks. Migração estimada 1-2 dias v1.5.
5. **Mitiga R16** (complexidade ultrapassa capacidade Eurico solo) — menos superfície operacional em Fase 1.

**Trade-offs aceites:**
- Render depende da máquina do Eurico estar ligada quando `daily-content-delivery` corre. Mitigação: Eurico já opera diariamente de manhã; Fase 1 workflow é interactivo, não cron.
- Não testa o path cloud até v1.5. Mitigação: abstraction layer reduz risco de refactor surpresa.

**Alternativas rejeitadas:**
- **AWS Lambda day-1:** rejeitado — setup inicial 1-2 dias + custo fixo baseline em Fase 1 com 3-5 vídeos/dia não justifica.
- **Híbrido (flag `--render-cloud`):** rejeitado v1.0 por regra "one path works first". Pode ser adicionado v1.1 se necessidade emergir.

#### Q-ARQ-2 — Camada 4 v1.0: **OUT OF SCOPE** `[Eurico 2026-04-17]`

**Decisão (do Eurico antes de @architect activar):** Vídeos Alturense actuais são música + texto queimado + efeitos visuais — **sem voz falada**. Portanto Whisper e post-processor PT-PT saem de scope v1.0.

**Implicações arquitecturais ratificadas por @architect:**
1. **Legendas queimadas em v1.0 vêm do script escrito** pelo agente `script-writer` (Reel), não de transcrição. `script.md` é a source of truth textual; Remotion `<Subtitle/>` renderiza directamente.
2. **CaptionProvider interface ainda existe** na abstraction layer (secção 8.4) mas com implementação stub `text-from-script` em v1.0. Isto permite re-activar Whisper em v1.1+ sem refactor.
3. **Economia:** ~€0,003/vídeo + ~20s de latência. Reinvestida em qualidade Remotion (R4 — camada 3 crítica).
4. **R5 (PT-BR leaks) reduz de severidade** — sem transcrição, leak só acontece se o `script-writer` gerar PT-BR, o que já é mitigado por linter PT-PT no quality-gate.

**Condições de re-activação em v1.1+:**
- Cliente com narração (voz humana ou TTS sintético) entra no portfolio.
- A re-activação é troca de `CaptionProvider` no `persona.yaml` do cliente (ex: `caption_provider: whisper-pt-pt`). Zero refactor de tasks.

#### Q-ARQ-3 — Abstraction pattern: **DAY-1** `[ARQ-2026-04-17]`

**Decisão:** v1.0 implementa interfaces abstractas desde dia 1 para todas as 4 camadas (mesmo que Camada 4 tenha implementação stub).

**Interfaces declaradas:**

```javascript
// Pseudocódigo — contratos documentados; implementação CommonJS em Node 18

VideoProvider {
  async generate({prompt, duration_s, aspect_ratio, seed_image_path})
    → {output_path, cost_eur, latency_ms, provider_metadata}
}

ImageProvider {
  async generate({prompt, aspect_ratio, palette_hint, text_overlay_spec})
    → {output_paths[], cost_eur, latency_ms, provider_metadata}
}

EditingProvider {
  async render({composition_spec, assets, output_spec})
    → {output_path, cost_eur, latency_ms, render_logs}
}

CaptionProvider {
  async caption({audio_path_or_script_md, language, output_format})
    → {srt_path, cost_eur, latency_ms}
  // v1.0 implementação: TextFromScriptProvider (lê script.md → .srt)
  // v1.1+ implementação: WhisperProvider (áudio → .srt + post-processor PT-PT)
}

StorageProvider {
  async export({payload_paths[], destination_hint})
    → {final_location, package_manifest}
  // v1.0: LocalFolderProvider (squad/data/{slug}/videos/{date}/)
  // v1.1+: CloudFolderProvider (OneDrive/Drive via API)
}
```

**Localização:**
- Interfaces: `squad/providers/interfaces/*.md` (contratos declarativos task-style, coerentes com squad task-first)
- Implementações: `squad/providers/implementations/{provider-id}/` (uma pasta por implementação concreta)
- Selecção runtime: campo `providers:` na `persona.yaml` de cada cliente

**Exemplo `persona.yaml` fragment:**

```yaml
# squad/data/alturense/persona/persona.yaml
brand: true
providers:
  video: kling-v2-fal
  image: gemini-2.5-flash-image
  editing: remotion-local
  caption: text-from-script   # v1.0 stub
  storage: local-folder
visual_generation:
  canva_editable: false       # flag para switch Gemini → Canva MCP
```

**Custo da decisão:** +2-3 dias de dev inicial para contratos + 1 implementação por interface. Recuperado na 1ª migração v1.1 (fallback Luma, Canva flag, Whisper re-activation) que seria 1-2 dias cada em vez de 3-4 dias de refactor cross-cutting.

**Alinhamento com princípios:**
- Princípio 3 (task-first) — providers são tasks declarativas em disco.
- Princípio 6 (preparado para Fase 2) — swap de provider é mudança de string na `persona.yaml`; multi-tenant requires nothing more.
- Article IV Constitution AIOX (No Invention) — contratos documentados antes de implementação.

### 8.4 Data persistence pattern

Todo artefacto intermédio vive em `squad/data/{slug}/videos/{YYYY-MM-DD}/`:

```
squad/data/alturense/videos/2026-04-17/
├── brief.yaml                  # input original (slug, tema, foto_prato)
├── shot-plan.yaml              # output plan-video-shot — prompts camada 1
├── text-overlays.yaml          # output plan-video-shot — overlays camada 3
├── script.md                   # output plan-video-shot — legendas queimadas
├── clips/
│   ├── clip-01.mp4             # output camada 1, primeiro clip
│   ├── clip-02.mp4             # output camada 1, segundo clip
│   └── provider-metadata.json  # cost_eur, latency_ms, provider_id por clip
├── designs/
│   ├── design-01.png           # output camada 2
│   ├── design-02.png
│   ├── design-03.png
│   ├── design-04.png
│   └── provider-metadata.json
├── captions/
│   └── final.srt               # derivado de script.md (v1.0) ou Whisper (v1.1+)
├── render/
│   ├── composition.json        # input Remotion
│   └── render-logs.txt         # output Remotion + FFmpeg
├── final.mp4                   # output camada 3 — vídeo finalizado
├── metadata.json               # hashtags, alt-text, horário sugerido
├── package.zip                 # artefacto final de entrega
└── cost-summary.json           # custo total agregado do vídeo (para KPI <€2)
```

**Regra:** toda task escreve `{task-id}.output.json` ao lado do artefacto principal, com schema `{cost_eur, latency_ms, errors[]}`. O workflow `daily-content-delivery` agrega estes em `cost-summary.json` para o KPI 12.1 (custo <€2).

**`squad/data/*` é gitignored** (já configurado). Runtime puro.

### 8.5 Breakdown de custo ratificado — vídeo Alturense v1.0

| Camada | Item | Qty | Custo unitário | Subtotal |
|--------|------|-----|----------------|----------|
| 1 | Kling v2 via fal.ai @ $0,04/s | 20s (2×10s) | $0,04/s | $0,80 (~€0,75) |
| 2 | Gemini 2.5 Flash Image @ $0,015 | 4 imagens | $0,015/img | $0,06 (~€0,06) |
| 3 | Remotion render LOCAL | 1 render | €0 | €0 |
| 4 | Text-from-script stub | 1 srt | €0 | €0 |
| — | Storage + bandwidth | 1 vídeo | €0,02 | €0,02 |
| **Total ratificado (optimista)** | | | | **~€0,83** |
| **Total realista (com 30% re-rolls camada 1)** | | | | **~€1,10-€1,35** |
| **KPI alvo (PRD §12.1)** | | | | **<€2** |
| **Margem** | | | | **~€0,65-€1,17** |

**Custo Whisper v1.0 = €0** (out of scope). Economia vs baseline research = ~€0,003/vídeo.

**Compliance KPI 12.1:** CONFIRMED com margem saudável.

### 8.6 Latência end-to-end ratificada — v1.0

| Fase | Optimista | Pessimista | Notas |
|------|-----------|------------|-------|
| `plan-video-shot` (LLM) | 15s | 60s | |
| Camada 1 (Kling, 2 clips ∥) | 60s | 180s | Gargalo principal |
| Camada 2 (Gemini, 4 img ∥ com Camada 1) | 0s | 0s | Corre em paralelo com Camada 1 |
| Camada 3 (Remotion render local) | 30s | 90s | Depende hardware Eurico |
| Camada 4 (text-from-script) | 2s | 5s | Sem Whisper |
| Quality gate automático | 5s | 15s | |
| Validação humana (Eurico) | 60s | 300s | Fora pipe automático |
| Export package | 5s | 15s | |
| **Total pipeline automático** | **~2-3 min** | **~6-10 min** | Sem validação humana |
| **Total com validação humana** | **~3-4 min** | **~11-12 min** | Com Eurico no loop |
| **KPI alvo (PRD §12.1)** | | | **<15 min** |

**Economia vs baseline research:** ~20s/vídeo removidos com out-of-scope Whisper.

**Compliance KPI 12.1:** CONFIRMED em ambos os cenários.

### 8.7 Deploy topology

**Fase 1 (v1.0 — Eurico solo, ≤5 clientes):**

```
[Máquina Eurico]
  ├── Node 18 runtime
  ├── Remotion + FFmpeg (render local)
  ├── Canva MCP (flag-based)
  ├── fal.ai client (Kling v2)
  ├── Google AI SDK (Gemini 2.5 Flash Image)
  └── Storage: filesystem local (squad/data/)
```

Zero infra cloud. Zero CI/CD em execução. Single-operator workflow.

**Fase 2 (v1.5+ — beta 10-20 mentorados):**

```
[AWS ou equivalente]
  ├── API Gateway → Lambda (orchestration)
  ├── Lambda Remotion (render paralelo por worker)
  ├── S3 (artefactos + package outputs)
  ├── RDS/Supabase (persona + cost ledger multi-tenant)
  ├── Secrets Manager (API keys por tenant)
  └── CloudWatch (observabilidade)
```

**Migration path Fase 1 → Fase 2:**
1. Swap `EditingProvider = remotion-local` → `remotion-lambda` (mudança na `persona.yaml`).
2. Swap `StorageProvider = local-folder` → `s3-bucket`.
3. Adicionar layer de autenticação multi-tenant (fora de scope desta secção).

Graças à abstraction layer (Q-ARQ-3), **tasks e workflows do squad não mudam** entre Fase 1 e Fase 2. Só implementações de Providers.

### 8.8 Fundação existente — squad task-first

A fundação em `squad/` (5 agentes, 21 tasks, 2 workflows) permanece como descrita no bootstrap. As tasks novas da arquitectura (`plan-video-shot`, `generate-visuals`, `assemble-final-video`, `transcribe-and-caption` stub, `export-package`, `daily-content-delivery` workflow) integram-se via contratos `VideoProvider / ImageProvider / EditingProvider / CaptionProvider / StorageProvider`.

**Ver:** `HANDOFF-BOOTSTRAP.md` secção 3 (composição do squad), `CLAUDE.md` (mental model), `docs/research/2026-04-17-video-stack-decision.md` (análise completa).

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

> **Actualização `[ARQ-2026-04-17]`:** Camada 4 (Whisper + post-processor PT-PT) movida para out-of-scope v1.0 por decisão Q-ARQ-2 do Eurico (vídeos Alturense não têm voz falada). Legendas queimadas vêm do `script.md` do agente `script-writer` via `<Subtitle/>` do Remotion. Ver secção 8.3 Q-ARQ-2.

| Capacidade | Camada | Inclusão v1.0 | Justificação |
|------------|--------|---------------|--------------|
| Resolve-person + brand-persona (`brand: true`) | Fundação | SIM | Sem persona brand-mode o sistema não serve B2C. |
| Facebook 1:1 como formato default | Fundação | SIM | Caso Alturense exige. |
| `plan-video-shot` (prompt cinematográfico) | 1 | SIM | Peça central a criar. |
| Camada 1 — Kling v2 via fal.ai (provider único v1.0) | 1 | SIM | Stack ratificada §8.1. Luma fallback v1.1. |
| `generate-visuals` com Gemini 2.5 Flash Image default + Canva MCP flag-based | 2 | SIM (hibrido flag-based) | Gemini = zero-friction default; Canva activa-se via `canva_editable: true` na persona. |
| `assemble-final-video` com Remotion + FFmpeg render LOCAL | 3 | SIM | Camada crítica — stack ratificada §8.1. Local render per Q-ARQ-1. |
| Template "Alturense-default" em Remotion | 3 | SIM | **Mitigação R4 — deve ser primeira story do Passo C** (antes do workflow `daily-content-delivery`). |
| `transcribe-and-caption` com stub `text-from-script` | 4 | SIM (stub, não Whisper) | Q-ARQ-2: sem voz falada no Alturense. Legendas vêm de `script.md`. Contrato `CaptionProvider` implementado. |
| Abstraction layer (5 Providers interfaces) | Fundação | SIM | Q-ARQ-3 decisão. Preserva princípio 6 (preparado Fase 2) e desbloqueia v1.1 fallbacks sem refactor. |
| `export-package` para pasta local | Fundação | SIM | Entrega funcional mínima. |
| `daily-content-delivery` workflow | Fundação | SIM | Orquestra 9.2 end-to-end. |
| Quality gate automático (duração, aspecto, PT-PT detection, no-placeholder) | Fundação | SIM | Proteger contra output defeituoso. |
| Suporte a ≥3 clientes em paralelo via `content-pipeline` | Fundação | SIM | Métrica de sucesso declarada. |
| Logs de custo por vídeo em `cost-summary.json` | Observabilidade | SIM | Necessário para decidir monetização Fase 2 + KPI 12.1. |

**Out of scope v1.0:**

| Capacidade | Razão |
|------------|-------|
| **Whisper + post-processor PT-PT (Camada 4 completa)** `[Q-ARQ-2 Eurico 2026-04-17]` | Vídeos Alturense não têm voz falada. Re-activa em v1.1+ quando entrar cliente com narração — via swap de `CaptionProvider` na `persona.yaml`, sem refactor. |
| Multi-provider camada 1 (ex: Luma como fallback) | v1.1 — optimização de custo/qualidade, não bloqueador. |
| Remotion Lambda (render cloud) | v1.5 — `[Q-ARQ-1 ARQ-2026-04-17]` render local suficiente em Fase 1 ≤5 clientes. |
| Integração directa com agendador (Metricool/Buffer/Meta) | v1.1 — Opção C do Journey C funciona como fallback. |
| Dashboard UI | v1.5 quando Fase 2 arrancar. CLI First é princípio. |
| Multi-tenant / isolamento por utilizador | v1.5+ (só quando Fase 2 começar). |
| Billing / rate limiting | v1.5+. |
| Suporte a formatos além de Facebook 1:1 | v1.1 (IG Reels 9:16, TikTok, YouTube Shorts). |
| Edição interactiva humana do vídeo gerado | v1.2+ se Journey B passo 9 revelar necessidade. |
| Brand assets library (logos, fonts, paletas por cliente) | v1.1 — para v1.0 assume inline na persona. |
| ComfyUI local como primary path | Mantém-se como escape hatch operacional (v1.0 fallback manual se API Kling tiver outage), não primary. |

### 11.2 v1.1 (hardening Fase 1)

Depois de 2-4 semanas de uso real do v1.0 com ≥3 clientes. Foco: robustez + expansão de formatos.

| Capacidade | Razão |
|------------|-------|
| Luma Dream Machine como fallback Camada 1 | Mitigar risco API externa R1 (swap trivial via fal.ai). |
| Ideogram 2 como fallback Camada 2 para designs text-heavy | Mitigar limitação tipográfica Gemini. |
| Shotstack API como fallback Camada 3 se Remotion revelar blocker | Safety net se learning curve R20 matar velocidade. |
| **Whisper + post-processor PT-PT (Camada 4 re-activação)** | Quando entrar cliente com narração humana ou TTS sintético. Swap `CaptionProvider` na persona.yaml. |
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

> **Actualização `[ARQ-2026-04-17]`:** Severidades revistas à luz do research `@analyst` e decisões arquitecturais Q-ARQ-1/2/3. R5 reduzido por Q-ARQ-2 (sem Whisper v1.0). R6 resolvido (Gemini substitui Nanobanana). R18-R21 adicionados.

### 13.1 Riscos técnicos

| # | Risco | Severidade | Probabilidade | Mitigação proposta |
|---|-------|-----------|---------------|-------------------|
| R1 | **Dependência de APIs externas** (Kling/Gemini/Canva) — quebra, deprecation ou price hike | ALTA | MÉDIA | (a) Abstraction layer Q-ARQ-3 isola troca de provider; (b) fal.ai abstrai já Kling+Luma num endpoint; (c) ComfyUI local como escape hatch operacional v1.0 se API cair. |
| R2 | **Custo por vídeo excede viabilidade** (alvo <€2) | **MÉDIA** (antes ALTA) | **BAIXA** (antes MÉDIA) | Research ratificado: €0,83-€1,35/vídeo com margem de ~€0,65 sobre KPI. Re-verificar pricings `[KC-2026-01]` antes de primeiro billing produtivo. |
| R3 | **Rate limits das APIs bloqueiam produção em lote** | **MÉDIA** | **BAIXA** (em v1.0) | 3-5 vídeos/dia cabem largamente em tiers low-paid de Kling (fal.ai) e Gemini. Risco sobe em Fase 2; mitigação v1.1 = queue + retry + multi-provider. |
| R4 | **Camada 3 (Remotion) não atinge qualidade CapCut no primeiro mês** | **ALTA** | **ALTA** (confirmado pelo research) | **Mitigação crítica — primeira story Passo C = "Remotion Alturense template"** antes do workflow `daily-content-delivery`. Investir 2-3 dias em template-building + comparação lado-a-lado com CapCut manual. Shotstack fica como fallback v1.1 se Remotion for blocker. |
| R5 | **Legendas queimadas com typos de PT-PT** | **BAIXA** (antes MÉDIA/ALTA) | **BAIXA** (antes ALTA) | **Q-ARQ-2 mitiga por design:** legendas v1.0 vêm do `script.md` escrito pelo `script-writer` + linter PT-PT no quality gate. Whisper está out of scope v1.0. Risco re-activa só em v1.1+ quando entrar Whisper. |
| R6 | ~~Nanobanana API key vazia / instável~~ | **RESOLVIDO** | **N/A** | Decisão arquitectural Camada 2 = Gemini 2.5 Flash Image directo. Nanobanana não entra em v1.0. |
| R7 | **Lock-in em provider único** (ex: só Kling) | BAIXA | BAIXA | Q-ARQ-3 abstraction layer day-1 elimina este risco estruturalmente. Swap é mudança de string na `persona.yaml`. |

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

### 13.4 Novos riscos identificados pelo research `[ARQ-2026-04-17]`

Integrados a partir de `docs/research/2026-04-17-video-stack-decision.md` §11.2.

| # | Risco | Severidade | Probabilidade | Mitigação proposta |
|---|-------|-----------|---------------|---------------------|
| **R18** | Remotion licence pricing change entre v1.0 (gratuito ≤3 operadores) e v1.5 (possivelmente pago ~$150/mês+) | MÉDIA | MÉDIA | Monitorizar `www.remotion.dev/license` trimestralmente. Alertar quality gate quando >3 operadores. Custo absorvido pela estrutura Fase 2 de qualquer maneira. |
| **R19** | fal.ai como intermediário único para Camada 1 pode ser SPOF | MÉDIA | BAIXA | v1.1 adicionar provider directo (Kling oficial API) como secondary path. Q-ARQ-3 abstraction torna isso trivial. |
| **R20** | Learning curve Remotion atrasa v1.0 em 1-2 semanas além do estimado | MÉDIA | ALTA | Primeira story Passo C = "Remotion Alturense template". Documentação `docs/research/samples/remotion-alturense-scaffold.md` já produzida. Shotstack fallback v1.1 preparado. |
| **R21** | Gemini 2.5 Flash Image ToS change (Google policy, e.g., proibição food-photography comercial) | BAIXA | BAIXA | Canva MCP fica como switch-on alternativa via flag `canva_editable: true`. Abstraction layer Q-ARQ-3 garante swap trivial. |
| **R22** | Pricings `[KC-2026-01]` desactualizados até 6 meses (WebSearch/WebFetch bloqueados em sessões `@analyst` e `@architect`) | MÉDIA | MÉDIA | `@devops` ou Eurico re-verificam 9 páginas oficiais em §2.2 do research **antes de primeiro billing produtivo**. Flutuação ±20% não muda viabilidade (<€2/vídeo) nem escolha estrutural. |

### 13.5 Resumo — Top-5 riscos a vigiar (pós-ratificação)

1. **R4** — Qualidade Remotion vs CapCut no primeiro mês (severidade ALTA/ALTA — **mitigação = primeira story Passo C**)
2. **R20** — Learning curve Remotion (risco de deslize v1.0 em 1-2 semanas)
3. **R13** — Qualidade do output vs cliente final (bloqueador de adopção)
4. **R1** — Dependência de APIs externas (mitigado pela abstraction layer mas mantém alta)
5. **R9** — Direitos de música (bloqueador legal — biblioteca royalty-free obrigatória)

**Riscos descendentes desde v0.9:**
- R2 (custo) — de ALTA/MÉDIA → MÉDIA/BAIXA por research ratificado
- R5 (PT-BR leaks) — de MÉDIA/ALTA → BAIXA/BAIXA por Q-ARQ-2 (sem Whisper v1.0)
- R6 (Nanobanana) — RESOLVIDO por escolha Gemini
- R7 (lock-in) — mitigado estruturalmente por Q-ARQ-3

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

## 15. Resolution Log — Questões de validação (v0.9 → v1.0)

> **Status:** todas as 20 questões resolvidas em 2026-04-17 via combinação de (a) research `@analyst` (Passo B), (b) decisões arquitecturais `@architect` Q-ARQ-1/2/3, (c) duplo `tacit_approval` do Eurico.
>
> **Contexto dos dois tacit_approvals do Eurico:**
> - **1º tacit_approval (2026-04-17):** Eurico aprova as 20 assumptions da §15 com "li. podes avançar" — permite `@analyst` arrancar Passo B sem resposta síncrona questão-a-questão.
> - **2º tacit_approval (2026-04-17):** Eurico aceita decisões arquitecturais da Aria (Q-ARQ-1 render LOCAL, Q-ARQ-3 abstraction DAY-1) e stack ratificada. Opta por **não** fazer sessão síncrona de 30-45 min e autoriza promoção directa a v1.0.
>
> **Nota:** este log preserva as 20 questões originais como registo histórico. Cada entrada traz campo `Resolution:` com referência à decisão que a fechou.

### Personas (secção 3)

**Q1. Persona Fase 2 — tolerância técnica:** os mentorados da [IA]AVANÇADA PT são CLI-ready (como o Eurico) ou precisam de dashboard funcional desde v1.5? Impacto: define scope de UI v1.5.
- **Resolution:** aceite via tacit_approval 2026-04-17. Mantém-se assumption v0.9 — mentorados têm tolerância técnica média; v1.5 beta ganha dashboard leve de observabilidade (não controlo), alinhado com princípio CLI First da Constitution AIOX. Re-avaliar em v1.5 com dados reais de onboarding. `[PM-v1.0-2026-04-17]`

**Q2. Persona Fase 1 — número de clientes-alvo:** o alvo "3-5 clientes em paralelo" está correcto, ou o Eurico quer apontar mais alto (ex: 10) já no v1.0? Impacto: dimensiona arquitectura desde o início.
- **Resolution:** aceite via tacit_approval 2026-04-17. Target v1.0 fica 3-5 clientes paralelos — KPI §12.1. Arquitectura abstraction layer (Q-ARQ-3) desbloqueia Fase 2 multi-tenant sem refactor. `[PM-v1.0-2026-04-17]`

### User journeys (secção 9)

**Q3. Journey A — onboarding:** confirma-se que entrevista do dono é a forma certa de captar persona brand, ou preferes outro mecanismo (ex: análise de redes + validação final)? Impacto: reordena fluxo.
- **Resolution:** aceite via tacit_approval 2026-04-17. Mantém-se fluxo híbrido do v0.9 — entrevista guiada + scan de redes + validação `persona-quality-check`. Re-avaliar após primeiro onboarding real de cliente novo pós-Alturense. `[PM-v1.0-2026-04-17]`

**Q4. Journey C — agendador:** assumi Metricool como default. Preferes outro (Buffer/Hootsuite/Meta Business Suite/nenhum)? Impacto: priorização de integração v1.1.
- **Resolution:** aceite via tacit_approval 2026-04-17. Metricool fica como assumption default para integração v1.1+. v1.0 entrega apenas Opção A (upload manual) + Opção C (entrega directa ao cliente) — integração API adiada para v1.1. Se Eurico migrar para outro agendador antes do v1.1 arrancar, swap é trivial. `[PM-v1.0-2026-04-17]`

**Q5. Input do utilizador no Journey B:** `{slug}` + `tema do dia` + foto opcional é input mínimo suficiente, ou o cliente fornece mais (ex: call-to-action, horário específico, URL)? Impacto: schema do brief.
- **Resolution:** aceite via tacit_approval 2026-04-17. Input mínimo v1.0 = `{slug}` + `tema` + `foto opcional`. CTA/horário/URL ficam opcionais e lidos da `persona.yaml` quando existirem. Schema do `brief.yaml` em §8.4. `[PM-v1.0-2026-04-17]`

### Monetização Fase 2 (secção 10)

**Q6. Autonomia de pricing:** tens autonomia sobre pricing da comunidade para embutir o produto, ou o pricing vem de terceiros (donos da comunidade)? Impacto: viabilidade da Opção A.
- **Resolution:** aceite via tacit_approval 2026-04-17. Monetização fica deferida para v1.5 — v1.0 é validação interna, sem billing. Questão de autonomia de pricing re-activa em `@pm *monetization-plan` antes do beta v1.5. `[PM-v1.0-2026-04-17]`

**Q7. Modelo híbrido aceite?** Mensalidade + pool base + créditos top-up faz sentido para a comunidade? Ou preferes modelo diferente (totalmente grátis no lançamento, ou tier pago dedicado)?
- **Resolution:** aceite via tacit_approval 2026-04-17. Modelo híbrido §10.2 permanece como proposta Fase 2. Re-confirmar antes do v1.5 com dados reais de custo por vídeo medidos no v1.0. `[PM-v1.0-2026-04-17]`

**Q8. Custo alvo aceitável por vídeo:** o target <€2 por vídeo é aceitável, ou tens outro limite? Impacto: determina escolha de camada 1 e 3 no Passo B.
- **Resolution:** resolvida em research `@analyst` (Passo B) + §8.5 do PRD. Custo optimista €0,83; realista €1,10-€1,35; KPI <€2 confirmado com margem €0,65-€1,17. `[ARQ-2026-04-17]`

### MVP scope (secção 11)

**Q9. v1.0 com 1 só provider camada 1:** aceita-se um único provider (ex: só Runway ou só Kling) no MVP, adicionando fallback em v1.1? Impacto: simplifica desenvolvimento inicial.
- **Resolution:** resolvida em research `@analyst` (Passo B). Provider único v1.0 = **Kling v2 via fal.ai**. Luma Dream Machine fica como fallback v1.1 (swap trivial via abstraction layer Q-ARQ-3). `[ARQ-2026-04-17]`

**Q10. Canva vs Nanobanana/Gemini em v1.0:** preferes começar com Canva MCP (que já tens activo) ou Gemini directo (mais rápido, sem template)? Impacto: define camada 2 imediatamente.
- **Resolution:** resolvida em research `@analyst` (Passo B) + §8.1 do PRD. **Híbrido flag-based**: Gemini 2.5 Flash Image é default; Canva MCP activa-se via flag `canva_editable: true` na `persona.yaml` por cliente. Nanobanana não entra em v1.0 (R6 RESOLVIDO). `[ARQ-2026-04-17]`

**Q11. Formatos além de 1:1 em v1.0:** mantém-se só Facebook 1:1 no MVP, ou queres IG 9:16 também? Impacto: +1-2 dias de trabalho.
- **Resolution:** aceite via tacit_approval 2026-04-17. v1.0 entrega apenas Facebook 1:1 (caso Alturense). IG Reels 9:16, TikTok e YouTube Shorts entram em v1.1. Permite foco na camada 3 (R4+R20) no mês 1. `[PM-v1.0-2026-04-17]`

**Q12. Dashboard v1.5 vs CLI First:** a constitution AIOX diz CLI First. Confirmas que v1.5 pode ter dashboard só de observabilidade (não controlo), ou queres dashboard de controlo também?
- **Resolution:** aceite via tacit_approval 2026-04-17. v1.5 beta ganha dashboard **apenas de observabilidade**. Controlo continua 100% via CLI, em linha com Constitution AIOX Artigo I (CLI First — NON-NEGOTIABLE). `[PM-v1.0-2026-04-17]`

### KPIs (secção 12)

**Q13. Números absolutos Fase 2:** 10-20 mentorados v1.5 + 50+ v2.0 — são proporcionais ao tamanho actual da comunidade? Partilhar número real de membros activos.
- **Resolution:** aceite via tacit_approval 2026-04-17. KPIs §12.2 ficam como estimativas proporcionais — ajustar quando Eurico partilhar número real de membros activos antes do beta v1.5. `[PM-v1.0-2026-04-17]`

**Q14. NPS target 40:** aceitável, ou tens benchmark diferente da comunidade?
- **Resolution:** aceite via tacit_approval 2026-04-17. NPS ≥40 mantém-se como target inicial §12.2. Re-avaliar trimestralmente durante beta v1.5. `[PM-v1.0-2026-04-17]`

**Q15. Pool base de vídeos (30-50/mês):** alinhado com uso previsto? Ou preferes diferente?
- **Resolution:** aceite via tacit_approval 2026-04-17. Pool base 30-50 vídeos/mês fica como proposta v2.0. Calibrar com dados reais medidos no v1.0 (logs em `cost-summary.json`). `[PM-v1.0-2026-04-17]`

### Risk register (secção 13)

**Q16. Música royalty-free obrigatória:** confirmas restrição? Ou é aceitável pedir ao cliente fornecer licenças de música própria?
- **Resolution:** aceite via tacit_approval 2026-04-17. Restrição **royalty-free obrigatória** confirmada (R9 mitigação). Biblioteca inicial v1.0 = Uppbeat/Artlist/Epidemic Sound. Cliente pode fornecer licença própria caso a caso, com documentação obrigatória. `[PM-v1.0-2026-04-17]`

**Q17. Disclosure de IA (R10):** queres watermark "gerado com IA" visível ou apenas em alt-text?
- **Resolution:** aceite via tacit_approval 2026-04-17. v1.0 entrega disclosure **apenas em alt-text** (metadata.json). Watermark visível re-avaliado caso EU AI Act obrigue, com flag configurável por persona. `[PM-v1.0-2026-04-17]`

**Q18. ComfyUI local como escape hatch (R1, R2):** aceitas ter ComfyUI a correr localmente como fallback, ou preferes stack 100% cloud?
- **Resolution:** aceite via tacit_approval 2026-04-17. ComfyUI mantém-se como **escape hatch operacional** (não primary path) — activar manualmente se API Kling tiver outage prolongado. Não bloqueador para v1.0. `[PM-v1.0-2026-04-17]`

### Out of scope / priorização

**Q19. Edição interactiva humana (v1.2):** é bloqueador se operador quiser tweak no vídeo gerado, ou quality-gate "approve/re-roll" é suficiente?
- **Resolution:** aceite via tacit_approval 2026-04-17. v1.0 entrega apenas quality-gate "approve/re-roll" (sem edição interactiva humana). Edição fine-grained fica para v1.2+ se Journey B passo 9 revelar necessidade real em uso. `[PM-v1.0-2026-04-17]`

**Q20. Multi-língua (pt-BR, EN) em v2.0+:** há demanda da comunidade por isto, ou PT-PT é suficiente sem deadline?
- **Resolution:** aceite via tacit_approval 2026-04-17. PT-PT é suficiente para v1.0/v1.1/v1.5/v2.0. Multi-língua fica sem deadline no backlog — activa apenas se demanda da comunidade surgir. `[PM-v1.0-2026-04-17]`

---

## 16. Changelog do PRD

Registo histórico de versões deste PRD:

| Versão | Data | Autor | Delta principal |
|--------|------|-------|------------------|
| **v0.1** | 2026-04-17 | `@ux-design-expert` (Uma) | Skeleton inicial emitido a partir de `HANDOFF-BOOTSTRAP.md`. Estrutura de secções base (personas, promessa, output alvo, princípios, não-objectivos, arquitectura esboço, user journeys preliminar, KPIs draft, caso Alturense). |
| **v0.9** | 2026-04-17 | `@pm` (Morgan) | Expansão de 6 secções com assumptions documentadas + 20 questões §15 para validação do Eurico. Secções expandidas: §3 personas, §9 user journeys (A/B/C), §10 monetização Fase 2 (5 opções avaliadas), §11 MVP scope v1.0/v1.1/v1.5/v2.0, §12 KPIs Fase 1 + Fase 2, §13 risk register (17 riscos iniciais), §14 caso Alturense. |
| **v0.95** | 2026-04-17 | `@architect` (Aria) | Stack ratificada com base no research do `@analyst`. §8 reescrita do zero (8 subsecções: stack, data flow, Q-ARQ-1/2/3, abstraction layer, persistence, custo, latência, deploy topology). §11 revista (Whisper OUT OF SCOPE v1.0 por Q-ARQ-2 Eurico, abstraction layer como capacidade v1.0). §13 revista (R2/R3/R5 severidades desceram, R6 RESOLVIDO, novos R18-R22). |
| **v1.0** | 2026-04-17 | `@pm` (Morgan) | Promoção via duplo `tacit_approval` do Eurico (ver §15 Resolution Log). 20 questões de validação fechadas: 3 via research Passo B (Q8, Q9, Q10), 1 via decisão explícita do Eurico antes de activar `@architect` (Q-ARQ-2 sobre Whisper), 2 via decisões arquitecturais da Aria ratificadas pelo Eurico (Q-ARQ-1 render LOCAL, Q-ARQ-3 abstraction DAY-1), 14 via tacit_approval do Eurico para assumptions v0.9. R22 (re-verificação de pricings `[KC-2026-01]`) aceite como risco conhecido aberto — re-verificar antes do primeiro billing produtivo. |

**Próxima revisão esperada:** v1.1 após 2-4 semanas de uso real do v1.0 com ≥3 clientes (hardening Fase 1 — ver §11.2).

---

## 17. Referências

- `HANDOFF-BOOTSTRAP.md` — contexto completo do bootstrap
- `squad/` — fundação task-first (adaptada de Adavio Tittoni)
- `docs/research/2026-04-17-video-stack-decision.md` — research completo Passo B (`@analyst` Alex)
- `docs/research/samples/remotion-alturense-scaffold.md` — scaffold Remotion inicial para story 1 do Passo C
- `docs/research/samples/pt-pt-replacements.yaml` — dicionário PT-PT para futura re-activação Whisper
- `docs/handoffs/archive/videoaipt-handoff-architect-to-pm-20260417.yaml` — handoff consumido que iniciou v1.0
- `CLAUDE.md` — mental model do projecto
- `.aiox-core/constitution.md` — Constitution AIOX (Artigo I CLI First, Artigo IV No Invention)

---

*v1.0 APPROVED — promovido por `@pm` (Morgan) em 2026-04-17 via duplo tacit_approval do Eurico. Próxima versão esperada: v1.1 após 2-4 semanas de uso real do v1.0 com ≥3 clientes.*
