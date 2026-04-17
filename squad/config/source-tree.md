# Source Tree — social-media-squad

## Estrutura Completa

```
social-media-squad/
├── squad.yaml                          # Manifest principal
├── README.md                           # Documentação
│
├── config/                             # Configs do squad
│   ├── coding-standards.md
│   ├── tech-stack.md
│   └── source-tree.md                  # Este arquivo
│
├── agents/                             # 4 personas
│   ├── profile-interviewer.md          # Scout
│   ├── social-scout.md                 # Lens
│   ├── persona-architect.md            # Muse
│   └── copy-creator.md                 # Ink
│
├── tasks/                              # 14 tasks executáveis
│   ├── start-interview.md              # profile-interviewer
│   ├── follow-up-questions.md
│   ├── save-profile-interview.md
│   ├── scan-social-profiles.md         # social-scout
│   ├── analyze-engagement.md
│   ├── extract-voice-patterns.md
│   ├── build-copy-persona.md           # persona-architect
│   ├── refine-voice-tone.md
│   ├── export-persona.md
│   ├── plan-post.md                    # copy-creator
│   ├── plan-story.md
│   ├── create-content-calendar.md
│   ├── generate-copy.md
│   └── generate-image.md
│
├── workflows/                          # Orquestrações multi-step
│   ├── full-onboarding.yaml            # End-to-end: entrevista → primeira peça
│   └── content-pipeline.yaml           # Produção em lote mensal
│
├── templates/
│   ├── persona-brief.md                # Saída formatada da persona
│   └── post-brief.md                   # Brief de um post antes da geração
│
├── checklists/
│   └── persona-quality-check.md        # Gate de qualidade da persona
│
├── scripts/
│   ├── nanobanana-client.js            # Client da API Nanobanana
│   └── social-scraper.js               # Wrapper Apify/scraping
│
├── tools/                              # Reservado para extensões futuras
│   └── .gitkeep
│
└── data/                               # Reservado para datasets
    └── .gitkeep
```

## Mapa de Responsabilidades

| Diretório | Responsabilidade | Mutabilidade |
|-----------|------------------|--------------|
| `config/` | Padrões e convenções | Raramente modificado |
| `agents/` | Personas e comandos | Modificado quando adiciona novo agent |
| `tasks/` | Lógica executável (task-first) | Coração do squad |
| `workflows/` | Orquestrações | Modificado para novos pipelines |
| `templates/` | Formatos de saída humano-legível | Tweaked para UX |
| `checklists/` | Gates de qualidade | Evoluem com o squad |
| `scripts/` | Integrações externas | Isolam APIs |

## Fluxo de Dados

```
USUÁRIO
   ↓ (fala com)
copy-creator (Ink)
   ↓ (consulta)
persona (arquivo YAML)
   ↓ (gerada por)
persona-architect (Muse)
   ↓ (consolida de)
   ├── interview_data ← profile-interviewer (Scout)
   └── research_data  ← social-scout (Lens) → social-scraper.js
```
