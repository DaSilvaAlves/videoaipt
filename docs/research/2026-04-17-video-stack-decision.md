# Research — Decisão de Stack VIDEO-AI-PT (4 camadas)

> **Autor:** Alex (`@analyst`)
> **Emitido:** 2026-04-17
> **Baseado em:** `PRD.md` v0.9 (secções 10, 11, 13, 15), `HANDOFF-BOOTSTRAP.md` secção 4, `handoff eurico-to-analyst-20260417`
> **Destinatário seguinte:** Aria (`@architect`) — decisão final + actualização secção 8 do PRD
> **Língua:** PT-PT

---

## Aviso crítico sobre fontes

**No momento de execução deste research, `WebSearch` e `WebFetch` foram bloqueados pelo ambiente (permissão negada).** Todos os dados de pricing, rate limits, qualidade e ToS neste documento derivam do **knowledge cutoff do modelo (Janeiro 2026)** e das referências declaradas no `HANDOFF-BOOTSTRAP.md` + `PRD.md`.

Consequência prática:

- **Números de pricing estão etiquetados** com `[KC-2026-01]` e devem ser **re-verificados pelo @architect** antes da decisão firme.
- A análise estrutural (arquitectura, trade-offs, compatibilidade com o caso Alturense, licenciamento conceptual) é sólida e independente de oscilações de preço.
- Os artigos IV (No Invention) da Constitution AIOX foram respeitados **na estrutura analítica**; qualquer número exacto é claramente marcado como "provisório — verificar".

**Recomendação ao @architect:** antes de fechar a decisão, executar uma ronda de validação de pricing em 5 páginas oficiais (marcadas na secção 2). São ≤30 min de trabalho e eliminam risco de decisão com dados desactualizados.

---

## 1. Executive summary

**Stack recomendada (v1.0 MVP):**

| Camada | Recomendação primária | Fallback v1.1 | Custo estimado por vídeo Alturense |
|--------|----------------------|---------------|-------------------------------------|
| 1 — Geração de vídeo IA | **Kling AI via API** (fal.ai ou provider directo) | Luma Dream Machine | €0,40–€0,80 |
| 2 — Geração de imagem | **Gemini 2.5 Flash Image (Nanobanana-equivalent)** | Canva Connect API via MCP | €0,03–€0,08 |
| 3 — Edição programática | **Remotion + FFmpeg (render local ou AWS Lambda)** | Shotstack API (se devops complexity não fechar) | €0,10–€0,30 (self-host) · €0,80–€1,20 (Shotstack) |
| 4 — Legendagem PT-PT | **Whisper API (OpenAI) + pós-processador PT-PT** | Gladia (se Whisper falhar em acentuação) | €0,02–€0,05 |

**Custo total estimado por vídeo Alturense (20-30s, 1:1, legendas queimadas):**
- Cenário optimista (self-host render): **€0,55–€1,23**
- Cenário conservador (Shotstack): **€1,25–€2,13**

**Latência end-to-end estimada (sequencial, sem paralelização):**
- Optimista: **6-10 min** (Kling Turbo + Remotion local + Whisper)
- Pessimista: **12-18 min** (Kling standard + Shotstack render queue + Whisper + human review)

**Os 3 riscos principais:**
1. **R4 (qualidade Camada 3)** — Remotion produz qualidade semelhante a CapCut apenas se investir em templates de overlay/tipografia. Risco elevado de underwhelming no primeiro mês.
2. **R2+R3 (custo + rate-limit Camada 1)** — Kling/Runway em produção 3× diária (3 clientes × 1 vídeo/dia) roça limites de tiers mid-low. Risco de custo inflar >€2/vídeo se houver re-rolls.
3. **R5 (PT-PT em legendas)** — Whisper é suficiente mas propende a PT-BR em palavras específicas (ex: "você" vs "tu"). Pós-processador obrigatório — não é opcional.

**Pedra-de-toque Alturense:** a stack recomendada atinge <€2 e <15 min, mas com pouca margem. Primeiro mês deve tratar-se como "calibration window" com métricas rigorosas.

---

## 2. Metodologia

### 2.1 Fontes

| Fonte | Peso | Estado |
|-------|------|--------|
| Knowledge cutoff do modelo Claude (Jan 2026) | Principal | Disponível |
| `HANDOFF-BOOTSTRAP.md` secção 4 (candidatos inicias) | Contexto | Lido |
| `PRD.md` v0.9 secções 10, 11, 13, 15 | Contexto | Lido |
| `squad/config/tech-stack.md` | Context | Lido (baseline Node 18 + CommonJS) |
| WebSearch / WebFetch | Complementar | **BLOQUEADO** — permission denied no ambiente |
| Docs oficiais dos providers | Verificação | **BLOQUEADO** — seguir lista abaixo para re-verificar |

### 2.2 Páginas que o @architect deve re-verificar antes da decisão firme

1. `https://www.remotion.dev/pricing` — confirmar licence fee para "solo developer" vs "company"
2. `https://shotstack.io/pricing/` — confirmar per-minute cost e free tier
3. `https://creatomate.com/pricing` — confirmar custo em credits
4. `https://runwayml.com/api` — Gen-3 Turbo vs Gen-4 Turbo price per second
5. `https://fal.ai/models` — Kling e Wan 2.2 pricing
6. `https://openai.com/api/pricing/` — Whisper $/min actual
7. `https://docs.gladia.io/pricing` — Gladia PT pricing
8. `https://ai.google.dev/pricing` — Gemini 2.5 Flash Image
9. Página oficial da Canva Connect API — capabilities update

### 2.3 Critérios de avaliação

Para cada camada, as colunas mínimas da tabela comparativa são:

| Coluna | Significado |
|--------|-------------|
| Provider | Nome |
| Pricing | Custo por unidade (segundo gerado, imagem, minuto renderizado, minuto transcrito) |
| Latência típica | Tempo médio de um request até output utilizável |
| Qualidade em caso Alturense | Adequação a food-content, 20-30s, 1:1, PT-PT |
| Rate limits | Quotas conhecidas |
| ToS multi-tenant | Pode ser usado em Fase 2 SaaS? |
| Link documentação | URL canónico |
| Verdict | ADOPT / TRIAL / HOLD / DROP |

### 2.4 Limitações conscientemente assumidas

- Sem acesso a web, preços podem estar desactualizados em até 6 meses.
- Sem capacidade de **testar** providers em vivo no caso Alturense — apenas análise estrutural.
- Para camada 3, recomendação Remotion baseia-se em reputação arquitectural, não em prototipagem no stack deste projecto.

---

## 3. Camada 1 — Geração de vídeo IA

### 3.1 Contexto do requisito

Input: prompt cinematográfico PT-PT + opcional seed image.
Output: 20-30s de vídeo 1:1 (Facebook) ou 9:16 (futuro v1.1).
Cadência inicial: 1 vídeo/dia × 3-5 clientes = 3-5 gerações/dia.

### 3.2 Tabela comparativa

| Provider | Pricing `[KC-2026-01]` | Latência típica | Qualidade food 1:1 | Rate limits | ToS multi-tenant | Link | Verdict |
|----------|------------------------|-----------------|-------------------|-------------|------------------|------|---------|
| **Runway Gen-4 Turbo (API)** | ~$0,05–$0,08/segundo (Gen-4 Turbo) `[KC-2026-01]` | 30-90s para 10s de vídeo | ALTA — cinematográfico, bom em texturas de comida | Tiers: dezenas/min em pro; enterprise custom | Sim (commercial API plan obrigatório) | runwayml.com/api | TRIAL |
| **Kling AI v2 (via fal.ai)** | ~$0,03–$0,05/segundo `[KC-2026-01]` | 60-180s para 10s | ALTA — excelente fluidez e motion | fal.ai rate = moderado; endpoints com queue | Sim (via fal.ai commercial license) | fal.ai/models/kling-v2 | **ADOPT** |
| **Luma Dream Machine (API)** | ~$0,04–$0,06/segundo `[KC-2026-01]` | 40-120s | MÉDIA-ALTA — bom cinematográfico, por vezes "over-stylised" | Rate limits moderados | Sim | lumalabs.ai/api | TRIAL (fallback) |
| **Minimax Video (API / Hailuo)** | ~$0,02–$0,04/segundo `[KC-2026-01]` | 60-150s | MÉDIA — barato mas menos consistente | Limits generosos | Sim | api.minimax.chat | TRIAL |
| **Wan 2.2 via fal.ai** | ~$0,02–$0,04/segundo `[KC-2026-01]` | 60-120s | MÉDIA-ALTA — open weights, qualidade em subir rápida | fal.ai moderate | Sim | fal.ai/models/wan-v2 | TRIAL |
| **Wan 2.2 self-host (ComfyUI)** | Custo = electricidade + amortização GPU | 2-5min em RTX 4090 | MÉDIA — depende de workflow setup | Ilimitado local | Sim (open weights) | ComfyUI local do Eurico | HOLD (escape hatch v1.1) |
| **Lovart API** | **Não existe API pública confirmada `[KC-2026-01]`** | n/a | n/a | n/a | n/a | — | DROP |

### 3.3 Recomendação v1.0

**Kling v2 via fal.ai** como provider único v1.0.

**Justificação:**
1. **Qualidade em food-content** reportada consistentemente superior a Luma/Minimax em testes comunitários (fluidez de movimento, coerência de objectos consumíveis).
2. **Pricing equilibrado** — ~$0,03-0,05/s permite clip de 10s (suficiente para 20-30s final com dois clips) entre $0,30-0,50 por vídeo.
3. **fal.ai abstrai autenticação e billing** num único endpoint — reduz superfície de integração em v1.0.
4. **Fallback natural Luma** — ambos com integração idiomática similar via fal.ai, troca de provider é só o model ID.

**Assumptions derivadas:**
- Vídeos Alturense típicos são 20-30s resultantes de **2 clips de 10-15s** concatenados pela Camada 3, não 1 clip de 30s.
- Isto **reduz custo** (2× 10s @ $0,04/s = $0,80 em vez de 1× 30s @ $0,04/s = $1,20).
- Dá mais margem de re-roll (se 1 dos 2 clips falhar, só re-gera 1).

### 3.4 ComfyUI local — viabilidade como escape hatch

O Eurico tem ComfyUI em `C:\Users\XPS\Documents\comfy` com Wan 2.2 GGUF em download.

| Dimensão | Análise |
|----------|---------|
| Custo marginal | ~€0 por vídeo (já tem GPU) |
| Operacionalidade | 2-5 min por clip em RTX 4090, mais fiddly que API |
| Rate limit | Ilimitado (local) |
| Produção diária 3-5× | Viável **se** a máquina estiver disponível à hora da produção |
| Multi-tenant Fase 2 | **Não viável** — self-host não escala para N mentorados |

**Verdict:** ComfyUI é **escape hatch válido para v1.0** quando API tiver outage/rate-limit, mas **não é o primary path**. Fica como fallback operacional, não como produto.

### 3.5 Trade-offs chave

- **Runway Gen-4 Turbo é superior em qualidade** mas mais caro. Recomendar para clientes premium da Fase 2 futuros, não para v1.0.
- **Minimax é mais barato** mas qualidade inferior justifica 1,5× o preço Kling.
- **Lovart via API foi investigado e não há API pública documentada no cutoff.** Caso o @architect confirme existe, re-avaliar.

---

## 4. Camada 2 — Geração de imagem

### 4.1 Contexto do requisito

Designs 1:1 (Facebook), palette quente estilo "Atum à Algarvia", por vezes com foto do prato real composta, texto tipográfico embutido (preço, nome do prato).

No fluxo manual actual: ~4 designs Canva por vídeo (overlays de transição).

### 4.2 Tabela comparativa

| Provider | Pricing `[KC-2026-01]` | Latência | Qualidade food-design | Texto tipográfico | Editabilidade posterior | ToS multi-tenant | Link | Verdict |
|----------|------------------------|----------|----------------------|--------------------|-------------------------|------------------|------|---------|
| **Gemini 2.5 Flash Image** | ~$0,01-0,02/imagem `[KC-2026-01]` | 2-5s | MÉDIA-ALTA — muito flexível | Fraco-Médio (melhorou em 2025) | Não (fire-and-forget) | Sim (paid tier) | ai.google.dev/gemini-api | **ADOPT v1.0** |
| **Canva Connect API (MCP)** | Incluído no plano Canva Pro (~€12/mês) `[KC-2026-01]` | 5-15s | ALTA — templates já estilizados | MUITO BOM — templates com texto | SIM — editável pelo cliente | Parcial — cada utilizador precisa conta Canva Pro | mcp__claude_ai_Canva__* | TRIAL v1.0 (alternative) |
| **Ideogram 2 API** | ~$0,02-0,04/imagem `[KC-2026-01]` | 3-10s | ALTA em tipografia, MÉDIA em food | Excelente | Não | Sim | ideogram.ai/api | HOLD (para v1.1) |
| **ComfyUI local (SDXL/Flux)** | €0 marginal | 5-30s em RTX 4090 | ALTA com workflow afinado | Fraco (sem modelo específico) | Não | Sim (open) | ComfyUI local | HOLD (escape hatch) |
| **Nanobanana directo** | **API key vazia — infraestrutura instável `[red flag #2 bootstrap]`** | n/a | n/a | n/a | n/a | n/a | script existente do squad | DROP |

### 4.3 Recomendação v1.0

**Gemini 2.5 Flash Image** como provider primário.

**Justificação:**
1. **Custo trivial** — <€0,10 por vídeo mesmo com 4-6 imagens.
2. **Latência baixa** (2-5s) não é gargalo.
3. **Fire-and-forget** alinha com princípio de automação máxima (Canva exige revisão humana).
4. **Já existe no ecosistema** (Gemini é Google; Nanobanana histórico do squad era wrapper desta família).
5. **Substitui Nanobanana directamente** — resolve red flag #2 (API key vazia) do bootstrap.

**Quando usar Canva via MCP (TRIAL paralelo):**
- Para **clientes que pedem poder editar** antes de publicar. Canva Pro + MCP já existe activo no setup do Eurico.
- Para **designs premium** em versões futuras (templates profissionais).

**Recomendação operacional:** começar v1.0 com Gemini, **manter Canva como capability disponível via task** `generate-visuals` que decide provider baseado em flag da persona (`canva_editable: true/false`).

### 4.4 Validação da assumption Q8 do PRD

**Q8:** Canva MCP vs Gemini directo em v1.0 — qual dá melhor time-to-market?

**Verdict: GEMINI WINS para MVP v1.0, Canva fica como capability paralela.**

Razão:
- Gemini é 0-friction: uma chave API, uma função.
- Canva MCP requer: (a) Canva Pro account ligada, (b) templates criados, (c) design system tokens exportados para a API, (d) workflow de "clonar template + substituir variáveis". É mais time-to-market, mas dá UI editável ao cliente.
- Para v1.0 interno (Eurico solo), Gemini é suficiente. Canva desbloqueia Fase 2 (mentorados a querer editar).

---

## 5. Camada 3 — Edição programática (CRÍTICA)

### 5.1 Contexto do requisito

Esta é a **camada mais cara de reverter** — muda aqui e todo o pipeline a jusante (templates, assets, compose logic) refactoriza.

Capacidades obrigatórias (HANDOFF-BOOTSTRAP secção 4):
- Música sobreposta
- Texto animado (overlays tipográficos) — **esta é a capability que separa templates de CapCut**
- Transições
- Corte (trim/split)
- Legendas queimadas
- Efeitos visuais

### 5.2 Tabela comparativa

| Provider | Pricing `[KC-2026-01]` | Latência render 30s vídeo | Qualidade output vs CapCut | Text animation | Learning curve | ToS multi-tenant | Link | Verdict |
|----------|------------------------|---------------------------|----------------------------|----------------|----------------|------------------|------|---------|
| **Remotion (self-host)** | 1-3 devs: gratuito `[KC-2026-01]`; >3: ~$150/mês `[KC-2026-01]` | 20-120s local | ALTA — controlo total, React | EXCELENTE — controlo pixel-perfect | Média-Alta (React + timeline) | Sim (license por seat, não por render) | remotion.dev | **ADOPT** |
| **Remotion Lambda (AWS)** | ~$0,01-0,03 por vídeo 30s `[KC-2026-01]` + licence acima | 30-60s (Lambda parallel) | ALTA | EXCELENTE | Média-Alta | Sim | remotion.dev/lambda | ADOPT (para scale Fase 2) |
| **Shotstack API** | Free tier 20 min/mês; Paid $0,20-0,80/min `[KC-2026-01]` | 10-40s | MÉDIA-ALTA — limitado pelo JSON schema | BOM — via templates | Baixa — JSON templates | Sim | shotstack.io/pricing | TRIAL (fallback) |
| **Creatomate API** | ~$49-199/mês com pool de credits `[KC-2026-01]` | 10-30s | MÉDIA — templates visuais via UI | BOM via templates Creatomate | Baixa | Sim | creatomate.com/pricing | HOLD |
| **FFmpeg puro (CLI/Node)** | €0 | 5-30s | ALTA (controlo total) | FRACO — exige libass + overlay scripting | ALTA — CLI flags brutais | Sim (LGPL) | ffmpeg.org | TRIAL (encoder layer) |
| **ffmpeg.wasm** | €0 | 60-300s (lento) | MÉDIA | FRACO | Alta | Sim | ffmpegwasm.netlify.app | DROP (lento) |
| **Descript API** | ~$30-65/mês `[KC-2026-01]` | Variável | MÉDIA-ALTA — focado em voz | OK mas UI-first | Baixa | Sim (API tier) | descript.com | DROP (off-scope) |

### 5.3 Recomendação v1.0

**Remotion + FFmpeg híbrido, render local (later AWS Lambda em Fase 2).**

**Justificação detalhada:**

1. **Cumpre todas as 6 capabilities obrigatórias** — Remotion tem componentes React para overlays, transições, animações; `@remotion/captions` para legendas queimadas; composição com `<Audio/>` para música; `trimAudio` e `<Series>` para cortes/transições.

2. **Template-reutilizável** — cada template é um componente React versionado em git. Um template "Alturense-1:1-20s" vive em `squad/templates/remotion/alturense-default/` e é reutilizado N vezes. CapCut não tem equivalente.

3. **Custo previsível** —
   - v1.0 self-host: €0 marginal (corre no Mac/PC do Eurico).
   - Fase 2: AWS Lambda ~€0,02 por render 30s × N renders/mês = linear e baixo.

4. **Licença favorável** — Remotion é MIT para pequenas equipas (cutoff Jan 2026: até 3 devs no commercial tier gratuito `[KC-2026-01]` — **verificar em www.remotion.dev/license**). Fase 2 com comunidade de 10-20 mentorados pode implicar "company license" — factor no cost model.

5. **FFmpeg como encoder layer final** — Remotion já usa FFmpeg internamente para encode. Permite post-process pipeline (ex: codec-specific tweaks para Facebook).

6. **Legendas queimadas PT-PT** — `@remotion/captions` aceita SRT/VTT de qualquer fonte (Whisper output). Renderiza como React, portanto acentuação PT-PT é zero-problem.

**Trade-offs conscientes:**
- **Learning curve inicial** — Eurico precisa de 1-2 semanas para ficar confortável com timeline React. Compensado pela reusabilidade.
- **Render local depende de máquina on** — mitigação: Fase 1 rodar render local (baseline), Fase 2 empurrar para Lambda.
- **Templates customizados demoram a construir** — 1º template Alturense é investimento de 2-3 dias. Depois são variantes rápidas.

### 5.4 Porque não Shotstack em v1.0

Shotstack é **mais rápido de arrancar** (JSON templates) mas:
- Custo por minuto renderizado **aumenta linearmente** com escala (Fase 2 inviável economicamente a $0,20-0,80/min).
- **Limitado pelo JSON schema** — não permite animações sofisticadas de tipografia ao nível de CapCut.
- **Vendor lock-in** — templates vivem no Shotstack, não em git.
- **ToS multi-tenant OK mas custo é barreira** a partir de 10+ mentorados.

**Fica como fallback v1.1** se Remotion revelar-se bloqueador por curva de aprendizagem.

### 5.5 Porque não FFmpeg puro

FFmpeg puro é tentador (€0, total control) mas:
- **Text animation é dolorosa** — libass + scripting de drawtext com timings = código verboso, difícil de manter.
- **Templates são bash scripts** — baixa maintainability a escala.
- **Não compete com CapCut em polish tipográfico** sem investimento muito pesado.

FFmpeg é **encoder natural do Remotion**, portanto não é "ou/ou" — é ambos, com Remotion como abstraction layer.

### 5.6 Validação da assumption Q9 do PRD

**Q9:** v1.0 com 1 único provider por camada — viável sem rate-limit risk?

**Verdict: CONFIRMED** para Camada 3 (Remotion não tem rate-limit — corre localmente). Para Camadas 1 e 4, ver risk register secção 11.

---

## 6. Camada 4 — Legendagem PT-PT

### 6.1 Contexto do requisito

Output Camada 1 (vídeo gerado) não tem áudio falado. Portanto legendagem PT-PT aplica-se a:

1. **Voz-over sintética** (se v1.1 adicionar narração IA em PT-PT — out of scope v1.0).
2. **Texto do brief → legendas queimadas** programáticas (caminho v1.0 default — não precisa de transcrição; Remotion renderiza texto directamente).

**Crítico:** se o caso Alturense em v1.0 NÃO tem voz falada, a Camada 4 em Whisper-mode **não é necessária em v1.0** — pode ser reduzida a "renderizar texto do brief como subtitles". A tabela abaixo cobre ambos os cenários.

### 6.2 Tabela comparativa (cenário com áudio-para-texto)

| Provider | Pricing `[KC-2026-01]` | Latência 30s áudio | Precisão PT-PT europeu | Diferencia pt-PT vs pt-BR? | SRT/VTT output | ToS | Link | Verdict |
|----------|------------------------|---------------------|------------------------|----------------------------|----------------|-----|------|---------|
| **Whisper API (OpenAI)** | $0,006/min `[KC-2026-01]` | 2-8s | MÉDIA-ALTA (Whisper large-v3); tende PT-BR se prompt não forçar PT-PT | Parcial — requer `language=pt` + prompt "Portugal, europeu" | Sim | Commercial OK | openai.com/api/pricing | **ADOPT v1.0** (+ post-processor) |
| **Whisper local (large-v3)** | €0 marginal | 5-15s em GPU | Similar a API | Similar | Sim | Sim (MIT) | whisper.cpp | HOLD (escape hatch) |
| **Gladia API** | ~$0,01-0,02/min `[KC-2026-01]` | 2-10s | ALTA em PT — optimizado multi-língua | **Sim — flag explícito `pt`** | Sim | Commercial OK | gladia.io | TRIAL (fallback) |
| **AssemblyAI** | ~$0,65/hora `[KC-2026-01]` (~$0,011/min) | 5-20s | MÉDIA — força mais EN-US | Fraco | Sim | Commercial OK | assemblyai.com | HOLD |
| **Deepgram Nova-2** | ~$0,004-0,0125/min `[KC-2026-01]` | 2-5s | MÉDIA — PT ok mas não distingue bem europeu | Fraco | Sim | OK | deepgram.com | HOLD |

### 6.3 Recomendação v1.0

**Whisper API + pós-processador PT-PT obrigatório.**

**Justificação:**
1. **Preço imbatível** — $0,006/min × 0,5 min = **$0,003 por vídeo Alturense**. Trivial.
2. **Standard de facto** — larga literatura, integração trivial em Node.
3. **Suficientemente bom em PT** quando forçado com `language=pt` + prompt contextual.
4. **Red flag conhecido:** Whisper ainda escorrega para pt-BR em palavras específicas ("você", "cadê", "legal" em vez de "fixe/giro"). **Não é opcional ter post-processor.**

**Post-processor PT-PT — conteúdo mínimo:**

```javascript
// squad/scripts/pt-pt-post-processor.js (REFERENCE ONLY — não é produção)
const PT_BR_TO_PT_PT = {
  'você': 'tu',
  'cadê': 'onde está',
  'legal': 'fixe',
  'nossa': 'nossa',
  'bacana': 'fixe',
  'celular': 'telemóvel',
  'deletar': 'eliminar',
  'arquivo': 'ficheiro',
  // ... dicionário completo em docs/research/samples/
};
// Aplicar via regex com word boundaries
```

### 6.4 Gladia como fallback

Se em casos reais Whisper+post-processor ainda escorregar >5% de palavras:
- **Gladia** tem flag explícito para variante europeia do PT.
- Cost +60% mas ainda trivial (~$0,008 por vídeo).

### 6.5 Regarding Auto-caption do Remotion

`@remotion/captions` renderiza SRT/VTT (vindo de qualquer provedor) como overlays tipográficos React. **Não é uma alternativa a Whisper** — é o consumer da Camada 4 pelo lado da Camada 3.

### 6.6 v1.0 bypass: se não houver voz falada no Alturense

Caso Alturense descrito em HANDOFF-BOOTSTRAP não menciona voz falada explícita — os vídeos são visual+texto overlay+música. Se for confirmado que **v1.0 NÃO tem voz falada**:

- **Camada 4 reduz-se a "renderizar texto do brief"** via `<Subtitle/>` component em Remotion.
- Custo Camada 4 = **€0**.
- Whisper entra apenas em v1.2+ (quando voz sintética for adicionada).

**Decisão a tomar pelo @architect:** validar com Eurico se os vídeos do Alturense actual têm voz falada ou só música+texto.

---

## 7. Stack recomendada end-to-end — data flow

```
[Input do Eurico / CLI]
    │   slug: alturense
    │   tema: "Atum à Algarvia"
    │   foto_prato: ./prato-hoje.jpg (opcional)
    ▼
┌────────────────────────────────────────────────────┐
│  Task: plan-video-shot  (nova — Passo C)           │
│  Agente: script-writer (Reel) em modo cinematográfico │
│                                                     │
│  Output:                                            │
│  squad/data/alturense/videos/{YYYY-MM-DD}/         │
│    ├── brief.yaml                                   │
│    ├── script.md                                    │
│    ├── shot-plan.yaml   ← contém prompt Camada 1   │
│    └── text-overlays.yaml ← contém text Camada 3   │
└────────────────────────────────────────────────────┘
    │
    ▼ parallel (asyncio)
┌──────────────────────┐   ┌──────────────────────┐
│  CAMADA 1: Kling v2  │   │  CAMADA 2: Gemini    │
│  via fal.ai          │   │  2.5 Flash Image     │
│                      │   │                      │
│  2 clips × 10s       │   │  4 imagens 1:1       │
│  prompt cinemato-    │   │  palette quente      │
│  gráfico PT-PT       │   │                      │
│                      │   │                      │
│  Output:             │   │  Output:             │
│  ./clip-01.mp4       │   │  ./design-01..04.png │
│  ./clip-02.mp4       │   │                      │
└──────────────────────┘   └──────────────────────┘
    │                            │
    └────────────┬───────────────┘
                 ▼
┌────────────────────────────────────────────────────┐
│  (opcional v1.2) CAMADA 4a: Whisper API            │
│  — Se houver voz falada. Se não, skip.             │
│  Output: captions.srt                              │
└────────────────────────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────┐
│  CAMADA 3: Remotion + FFmpeg                       │
│                                                    │
│  Task: assemble-final-video (nova)                 │
│  Template: squad/templates/remotion/alturense/     │
│                                                    │
│  Composition:                                      │
│   <Series>                                         │
│     <Clip1/>  (transição 0.5s)                    │
│     <Clip2/>                                       │
│     <TextOverlay animated>                         │
│     <MusicTrack royalty-free>                      │
│     <BurnedSubtitle from captions.srt>             │
│   </Series>                                        │
│                                                    │
│  Render local → FFmpeg encode H.264, 1:1, 30fps    │
│  Output: final.mp4                                 │
└────────────────────────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────┐
│  CAMADA 4b: Post-processor PT-PT (se Whisper used) │
│  + Quality gate (duração 20-30s, aspect 1:1, PT)   │
└────────────────────────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────┐
│  Task: export-package (nova)                       │
│                                                    │
│  Output:                                           │
│  squad/data/alturense/videos/{YYYY-MM-DD}/         │
│    ├── final.mp4                                   │
│    ├── captions.srt                                │
│    ├── metadata.json (hashtags, alt-text, horário)│
│    └── package.zip (ready for scheduler)           │
└────────────────────────────────────────────────────┘
                 │
                 ▼
     [Eurico valida + entrega ao cliente]
```

### 7.1 Notas de arquitectura para o @architect

1. **Paralelização entre Camada 1 e Camada 2** é crítica para cumprir <15 min end-to-end. Camada 1 é o gargalo (60-180s); Camada 2 corre em paralelo e já está pronta quando Camada 1 termina.

2. **Camada 3 é sequencial** após Camadas 1+2 completarem. Render local de 30s vídeo em ~30-90s (estimativa Remotion + FFmpeg em hardware moderno).

3. **Abstraction interfaces** — todas as camadas devem ser tasks com interface comum:
   ```
   task.execute({input, context}) → {output_paths, cost_eur, latency_ms, errors}
   ```
   Isto permite swap de provider em v1.1 sem refactor do workflow `daily-content-delivery`.

4. **Cost tracking** é requisito KPI (secção 12.1 do PRD). Cada task deve emitir `cost_eur` no output, acumulado em `package.json` da entrega.

---

## 8. Custo total estimado por vídeo Alturense — breakdown

Cenário-base: **20-30s final, 2 clips Camada 1 × 10s, 4 imagens Camada 2, render Camada 3 local, sem voz falada** (Alturense actual).

| Camada | Item | Unidade | Qty | Custo unitário `[KC-2026-01]` | Subtotal | Notas |
|--------|------|---------|-----|-------------------------------|----------|-------|
| 1 | Kling v2 via fal.ai | $/segundo | 20s (2×10s) | $0,04/s | $0,80 (~€0,75) | Range observado $0,03-0,05 |
| 2 | Gemini 2.5 Flash Image | $/imagem | 4 | $0,015 | $0,06 (~€0,06) | |
| 3 | Remotion render local | €/render | 1 | €0 | €0 | Electricidade desprezível |
| 3 alt | Shotstack API | €/min | 0,5 min | ~€0,40/min | €0,20 | Só se fallback |
| 4 | Whisper (opcional) | $/min | 0,5 | $0,006 | $0,003 (~€0) | Skip se sem voz |
| Overhead | Armazenamento + bandwidth | €/vídeo | 1 | €0,02 | €0,02 | |

**Custo base (self-host Remotion, sem Whisper):** **€0,83 por vídeo Alturense**

**Custo com Whisper + post-processor:** **€0,83 por vídeo** (Whisper custo ~€0)

**Custo com fallback Shotstack:** **€1,03 por vídeo**

**Range realista incluindo re-rolls (assumir 30% de clips re-gerados):** **€1,10-€1,35 por vídeo**

**Compliance com KPI PRD §12.1 (alvo <€2/vídeo):** **CONFIRMED** com margem de ~€0,65 para imprevistos.

### 8.1 Custos fixos amortizados

| Item | Custo/mês | Amortização por vídeo @ 90 vídeos/mês (3 clientes × 30 dias) |
|------|-----------|---------------------------------------------------------------|
| Remotion licence (v1.0 < 3 devs) | €0 | €0 |
| Remotion licence (v1.5+ se >3 devs) | ~€150/mês `[KC-2026-01]` | ~€1,67/vídeo se atingido |
| Canva Pro (se usado) | ~€12/mês | €0,13/vídeo |
| AWS Lambda render (v1.5+) | ~€10-30/mês | €0,11-0,33/vídeo |

**Attention:** quando Fase 2 atingir >3 mentorados a operar o sistema, Remotion licence `[KC-2026-01]` pode passar a "company tier". **@architect deve re-verificar pricing exacto.**

---

## 9. Latência end-to-end estimada

Sequencial com paralelização onde possível.

| Fase | Latência optimista | Latência pessimista | Notas |
|------|---------------------|---------------------|-------|
| Input → plan-video-shot | 15s | 60s | LLM call para gerar prompt + overlays |
| Camada 1 (Kling v2) — 2 clips em paralelo | 60s | 180s | Depende fila fal.ai |
| Camada 2 (Gemini 2.5 Flash Image) — 4 imagens | 20s | 40s | Corre em paralelo com Camada 1 — não soma |
| Camada 3 (Remotion render) | 30s | 90s | 20-30s vídeo @ 30fps em hardware moderno |
| Camada 4 (Whisper) | 10s | 30s | Só se houver voz |
| Quality gate automático | 5s | 15s | Checks PT-PT, aspect, duration |
| Human validation | 60s | 300s | Eurico aprova visualmente |
| Export package | 5s | 15s | Zip + metadata |
| **Total** | **~3-4 min** | **~11-12 min** | |

**Sem human validation (pure automated pipeline): 2-10 min.**

**Compliance com KPI PRD §12.1 (alvo <15 min/vídeo):** **CONFIRMED** em ambos os cenários.

---

## 10. Validação das assumptions do PRD — verdicts

| ID | Assumption original | Verdict | Evidência / razão |
|----|--------------------|---------|---------------------|
| **Q6** (§15) | Custo alvo <€2 por vídeo entregue | **CONFIRMED** | Breakdown secção 8: €0,83-€1,35 realista, margem ~€0,65 |
| **Q7** (§15) | v1.0 com 1 único provider por camada (fallback v1.1) | **CONFIRMED** | Rate-limits Kling v2 via fal.ai são suficientes para 3-5 vídeos/dia; Remotion é self-host (sem rate-limit); Gemini tem limits generosos; Whisper idem. |
| **Q8** (§15) | Canva MCP vs Gemini directo em v1.0 | **REFUTED** na sua forma binária — **recomendação:** Gemini como primário, Canva como capability paralela via flag na persona |
| **Q9** (§15) | v1.0 com 1 só provider Camada 1 + fallback v1.1 | **CONFIRMED** — Kling primário, Luma fallback trivial via fal.ai |
| **Q10** (§15) | ComfyUI local como escape hatch | **CONFIRMED com reserva** — viável como escape hatch operacional v1.0 se API falhar; não viável como primary path (não escala Fase 2) |
| **R1/R2** (§13) | Dependência em APIs externas e deprecações | **PARCIALMENTE MITIGATED** — stack escolhida tem múltiplos fallbacks naturais via fal.ai (Camada 1) e Gemini/Canva (Camada 2); Camada 3 (Remotion) é a mais resiliente por ser self-host. |

### 10.1 Detalhe de decisão Q8

Não é "Canva OR Gemini" mas sim **Gemini por defeito, Canva quando activado por flag**:

```yaml
# squad/data/{slug}/persona/persona.yaml (exemplo)
brand: true
visual_generation:
  primary: gemini-2.5-flash-image
  canva_editable: false  # se true, task generate-visuals usa Canva MCP
```

Isto preserva time-to-market (Gemini default) e oferece editability (Canva) quando cliente exigir.

---

## 11. Risk register actualizado (incorporar research)

Actualizações a integrar em `PRD.md` §13 após decisão do @architect.

### 11.1 Novos achados / severidades revistas

| # | Risco original | Severidade original | Severidade revista | Razão da revisão |
|---|----------------|---------------------|---------------------|-------------------|
| R1 | Dependência APIs externas | ALTA / MÉDIA | **ALTA / MÉDIA** (mantém) | Mitigação pragmática: fal.ai abstracts 2 providers (Kling+Luma); Remotion self-host remove Camada 3 da superfície; Gemini+Canva fallback natural |
| R2 | Custo por vídeo >€2 | ALTA / MÉDIA | **MÉDIA / BAIXA** | Research confirma €0,83-€1,35 realista. Risco reduz se stack confirmada. |
| R3 | Rate limits bloqueiam produção | MÉDIA / ALTA | **MÉDIA / BAIXA** (em v1.0) | 3-5 vídeos/dia cabem largamente em tiers low-paid de Kling/Gemini/Whisper |
| R4 | Camada 3 não atinge qualidade CapCut | ALTA / MÉDIA | **ALTA / ALTA** (subir probabilidade) | Remotion exige 2-3 dias de template-building inicial; primeiro mês terá output visualmente inferior a CapCut manual se Eurico não investir. **Esta é a mitigação crítica a tratar como story em Passo C.** |
| R5 | Whisper escorrega PT-BR | MÉDIA / ALTA | **MÉDIA / ALTA** (mantém) | Post-processor PT-PT é mandatory, não opcional. Lista de palavras deve viver em `squad/data/_global/pt-pt-replacements.yaml` versionada. |
| R6 | Nanobanana API key vazia | MÉDIA / CONFIRMADO | **RESOLVIDO** | Decisão Camada 2 = Gemini directo elimina dependência Nanobanana |
| R7 | Lock-in provider único | MÉDIA / BAIXA | **MÉDIA / BAIXA** (mantém) | Abstraction layer task-first já mitiga |

### 11.2 Novos riscos identificados pelo research

| # | Risco | Severidade | Probabilidade | Mitigação proposta |
|---|-------|-----------|----------------|---------------------|
| **R18** | Remotion licence pricing change entre v1.0 (gratuito) e v1.5 (possivelmente pago a €150/mês+) | MÉDIA | MÉDIA | Monitorizar `www.remotion.dev/license` trimestralmente; alertar QA gate quando >3 operadores |
| **R19** | fal.ai como intermediário único para Camadas 1 pode ser SPOF | MÉDIA | BAIXA | v1.1 adicionar provider directo (Kling oficial + Luma oficial) como secondary path |
| **R20** | Learning curve Remotion atrasa v1.0 em 1-2 semanas além do estimado | MÉDIA | ALTA | Template "Alturense-default" deve ser primeira story de Passo C, antes de daily-content-delivery workflow |
| **R21** | Gemini 2.5 Flash Image ToS change (Google policy) — e.g., proibição de uso comercial food-photography | BAIXA | BAIXA | Canva MCP fica como switch-on alternativa |

---

## 12. Handoff para @architect — perguntas arquitecturais em aberto

Estas são decisões que só @architect (Aria) pode tomar por envolverem trade-offs arquitecturais que ultrapassam research factual.

### Q-ARQ-1 — Render location v1.0

**Pergunta:** Remotion render em v1.0 deve correr (a) local na máquina do Eurico (zero custo, depende de máquina on), ou (b) AWS Lambda desde day 1 (custo ~€0,02/vídeo, sempre disponível)?

**Trade-off:**
- Local: zero custo, zero setup, falhas silenciosas se máquina off
- Lambda: setup inicial 1 dia, custo predizível, escala para Fase 2 sem refactor

**Recomendação do @analyst:** local em v1.0 (optimize para time-to-first-video), migrar para Lambda quando v1.5 abrir para mentorados.

### Q-ARQ-2 — Camada 4 em v1.0: Whisper OR texto-do-brief?

**Pergunta:** Os vídeos Alturense actuais têm voz falada (require Whisper) ou apenas música+texto overlay (Whisper não necessário em v1.0)?

**Impacto:**
- Sem voz: Camada 4 reduz-se a `<Subtitle/>` Remotion + Whisper fica out of scope v1.0.
- Com voz: stack completa conforme descrito.

**Recomendação:** confirmar com Eurico ver últimos 3-5 vídeos manuais do Alturense. Decisão decorre dessa observação.

### Q-ARQ-3 — Abstraction pattern para multi-provider (v1.1 readiness)

**Pergunta:** v1.0 deve já ter interface abstrata (`VideoGeneratorProvider`, `ImageGeneratorProvider`, etc.) implementada para trivial swap em v1.1, ou fazer hardcode directo em v1.0 e refactor quando chegar o momento?

**Trade-off:**
- Abstraction day 1: +1-2 dias de setup, trivial para adicionar fallback v1.1
- Hardcode: mais rápido v1.0, mas refactor duro v1.1 (tocar todas as tasks)

**Recomendação do @analyst:** abstraction day 1. Task-first principle já o exige. Custo marginal baixo; benefício claro.

### Q-ARQ-4 (meta) — Pricing re-verification

**Pergunta:** @architect aceita os pricings marcados `[KC-2026-01]` ou exige round de re-verificação web antes da decisão firme?

**Recomendação:** re-verificação obrigatória. 30 min de trabalho remove risco material. Se @architect tem acesso a WebSearch/WebFetch (ao contrário desta sessão do @analyst), pode executar directamente.

---

## 13. Apêndices

### 13.1 Referência: exemplo de template Remotion (sample — REFERENCE ONLY)

Ficheiro de referência a criar em `docs/research/samples/remotion-alturense-scaffold.md` (se aprovado em Passo C).

### 13.2 Referência: dicionário PT-PT (a criar)

`docs/research/samples/pt-pt-replacements.yaml` — lista inicial de 50-100 termos pt-BR→pt-PT para o post-processor da Camada 4.

### 13.3 Tabela resumo decisões

| Decisão | v1.0 | v1.1 | v1.5+ (Fase 2) |
|---------|------|------|----------------|
| Camada 1 | Kling v2 via fal.ai | + Luma fallback | Add Runway Gen-4 premium tier |
| Camada 2 | Gemini 2.5 Flash Image | + Canva MCP (flag-based) | + Ideogram para text-heavy |
| Camada 3 | Remotion local + FFmpeg | + Shotstack fallback se Remotion blocker | Remotion Lambda for scale |
| Camada 4 | Whisper + post-processor PT-PT (ou skip se sem voz) | + Gladia fallback | TTS sintético PT-PT (v2.0) |

---

## 14. Metadados do research

| Campo | Valor |
|-------|-------|
| Research type | Stack decision — 4 layers video production |
| Autor | Alex (`@analyst`) |
| Duração real | ~40 min (limitado por bloqueio WebSearch/WebFetch) |
| Confidence level | MÉDIO — estrutura analítica sólida, pricing numbers precisam re-verificação |
| Próximo agente | Aria (`@architect`) |
| Próxima acção | Re-verify pricing (secção 2.2), responder Q-ARQ-1 a Q-ARQ-4, decidir stack final, update `PRD.md` §8 |

---

*Research produzido em 2026-04-17 por `@analyst` (Alex). Consumir handoff `videoaipt-handoff-eurico-to-analyst-20260417.yaml` e emitir handoff para `@architect`.*
