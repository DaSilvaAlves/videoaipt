# VIDEO-AI-PT

> Sistema de produção automatizada de vídeos curtos para redes sociais.
> Do brief do cliente ao vídeo finalizado + package agendável, com o mínimo de toque humano.

---

## Status

**Fase:** Bootstrap — projecto acabou de ser criado (2026-04-17).
**Próximo passo:** ler `HANDOFF-BOOTSTRAP.md` e seguir a secção 7.

---

## Estrutura actual

```
videoaipt/
├── HANDOFF-BOOTSTRAP.md     ← handoff de arranque (LÊ PRIMEIRO)
├── README.md                ← este ficheiro
├── .gitignore
├── .env.example             ← copiar para .env e preencher
└── squad/                   ← fundação: squad do professor Adavio (adaptado)
    ├── squad.yaml
    ├── agents/              ← 5 agentes (Scout, Lens, Muse, Ink, Reel)
    ├── tasks/               ← 21 tasks task-first
    ├── workflows/           ← 2 workflows (onboarding + content pipeline)
    ├── templates/           ← persona-brief, post-brief, video-script
    ├── checklists/          ← persona-quality-check
    ├── scripts/             ← nanobanana-client, social-scraper
    ├── config/              ← coding-standards, tech-stack, source-tree
    └── data/                ← runtime, gitignored (cada cliente tem data/{slug}/)
```

Ainda não existe: `PRD.md`, `docs/`, `package.json`, `.env`. Vão ser criados pelo próximo agente conforme o plano no handoff.

---

## Arranque

Quando abrires nova sessão de Claude Code aqui:

1. Lê `HANDOFF-BOOTSTRAP.md` inteiro.
2. Activa `@pm` (Morgan) para formalizar PRD, ou `@architect` (Aria) para atacar arquitectura, ou `@ux-design-expert` (Uma) para continuidade.
3. Segue as instruções da secção 7 do handoff.

---

## Princípios (herdados do handoff)

- PT-PT sempre. Nunca PT-BR.
- Task-first. Toda capacidade é uma task persistível em disco.
- Person/brand-centric: cada cliente tem pasta própria (`squad/data/{slug}/`).
- Máximo de automação em cada camada. Humano só valida e publica.
- Preparado para Fase 2 (SaaS na comunidade [IA]AVANÇADA PT) desde o início.

---

## Fundação

O squad em `squad/` é uma adaptação limpa do trabalho original de **Adavio Tittoni** (MIT). Os dados reais do Adavio (`data/data/adavio/`) **não foram copiados** — são privados. Apenas a estrutura.
