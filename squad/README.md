# Social Media Squad

> Squad de copywriting personalizado para redes sociais — do descobrimento da persona à geração de posts, stories e calendário editorial.

## Visão Geral

Este squad automatiza o ciclo completo de criação de conteúdo personalizado:

1. **Entrevista o usuário** para entender comportamento, tom e valores
2. **Pesquisa perfis públicos** na internet para identificar estilo digital
3. **Constrói a persona de copywriting** consolidando os dados
4. **Gera conteúdo** (posts, stories, calendário) com copy + imagens+ script de video

## Agentes

| Agent | Persona | Função |
|-------|---------|--------|
| `@profile-interviewer` | Scout | Entrevista guiada com o usuário |
| `@social-scout` | Lens | Pesquisa perfis públicos |
| `@persona-architect` | Muse | Constrói persona de copywriting |
| `@copy-creator` | Ink | Social Media virtual — gera copy e imagens |

## Workflows

| Workflow | Descrição |
|----------|-----------|
| `full-onboarding` | Orquestra os 4 agentes do zero até a primeira peça de conteúdo |
| `content-pipeline` | Geração em lote mensal (calendário → copy → imagens) |

## Quick Start

```bash
# 1. Ativar workflow completo de onboarding
@squad-creator *workflow full-onboarding

# 2. Ou interagir diretamente com o Ink (social media virtual)
@copy-creator
*plan-post
```

## Variáveis de Ambiente

```bash
export NANOBANANA_API_KEY=your_key_here    # Required para imagens
export APIFY_API_TOKEN=your_token_here      # Optional para scraping avançado
```

## Estrutura

```
social-media-squad/
├── squad.yaml              # Manifest
├── config/                 # Coding standards, tech stack, source tree
├── agents/                 # 4 agentes
├── tasks/                  # 14 tasks (task-first)
├── workflows/              # 2 workflows
├── templates/              # persona-brief, post-brief
├── checklists/             # persona-quality-check
├── scripts/                # nanobanana-client, social-scraper
├── tools/                  # (vazio — reservado para extensões)
└── data/                   # (vazio — reservado para datasets)
```

## Roadmap de Extensões Sugeridas

- [ ] Suporte a análise de concorrentes
- [ ] Integração com agendadores (Buffer, Later)
- [ ] A/B testing de variantes de copy
- [ ] Analytics de engajamento pós-publicação

## Licença

MIT — Veja o manifest `squad.yaml` para detalhes.

---

*Gerado por @squad-creator (Craft) a partir do blueprint `squads/.designs/social-media-squad-design.yaml`*
