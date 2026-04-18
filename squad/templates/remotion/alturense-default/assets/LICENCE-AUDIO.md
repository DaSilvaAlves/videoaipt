# LICENCE-AUDIO.md — Documentação de Licenças das Tracks

> Este ficheiro é a prova de cumprimento de **R9 (direitos de música)** documentada na Story 1.1 AC-B5.
>
> Toda track utilizada pelo `MusicLayer.tsx` deve estar listada aqui com licença comercial válida ou free-tier com atribuição.

---

## Política

| Regra | Detalhe |
|-------|---------|
| Fontes permitidas | Uppbeat (free com atribuição), Artlist (subscrição comercial), Epidemic Sound (subscrição comercial), YouTube Audio Library (royalty-free) |
| Fontes proibidas | Música de editoras sem licença, samples de plataformas comerciais sem licença explícita, música clássica em interpretação moderna sem licença mecânica |
| Atribuição | Quando exigida pela licença, incluir crédito no caption do post (não no vídeo). Documentar aqui o texto exacto. |
| Verificação | Antes de cada novo cliente em portfolio, confirmar que o tipo de licença permite uso comercial em redes sociais B2C. |

---

## Tracks registadas

### `warm-background-01.mp3` (default v1.0)

| Campo | Valor |
|-------|-------|
| Nome da track | _A preencher pelo operador antes do primeiro render produtivo_ |
| Artista | _A preencher_ |
| Plataforma | Uppbeat (recomendado free tier) — alternativa: Artlist / Epidemic Sound |
| URL | _A preencher (ex: https://uppbeat.io/t/...)_ |
| Tipo de licença | Free with attribution OU Commercial subscription |
| Atribuição exigida no caption | _Sim/Não — preencher_ |
| Texto de atribuição (se aplicável) | _A preencher (ex: "Music by Artista from Uppbeat — uppbeat.io")_ |
| Uso comercial autorizado | _Sim/Não — confirmar antes de aprovar entrega_ |
| Restrições territoriais | _Nenhuma / Listar_ |
| Data de download | _YYYY-MM-DD_ |
| Download link verificado | _Sim/Não_ |

> **AVISO STORY 1.1:** O Eurico (ou @devops) deve preencher esta entrada antes do primeiro render produtivo. Sem dados completos, gate AC-B5 NÃO PASSA.

---

## Workflow de adição de nova track

1. Procurar track adequada em Uppbeat / Artlist / Epidemic Sound
2. Verificar termos de licença (uso comercial, atribuição)
3. Descarregar e colocar em `public/music/{nome}.mp3`
4. Adicionar entrada nesta tabela com todos os campos preenchidos
5. Se atribuição exigida, adicionar texto à `persona.yaml > brand_assets > music_attribution`
6. Commit do `LICENCE-AUDIO.md` actualizado (mas NÃO do .mp3)

---

## Histórico de alterações

| Data | Acção | Operador |
|------|-------|----------|
| 2026-04-18 | Ficheiro criado pelo @dev (Dex) na Story 1.1, com placeholder a preencher pelo Eurico antes de render produtivo. | @dev |
