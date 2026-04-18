# Pasta `public/music/` — Tracks royalty-free do template Alturense

Esta pasta aloja as tracks de música utilizadas pelo `MusicLayer.tsx`. Em Remotion, ficheiros em `public/` são acedidos via `staticFile('music/{nome}.mp3')`.

## Track default v1.0

A track default referida em `src/AlturenseComposition.tsx` props default é:

```
warm-background-01.mp3
```

## Origem da track

Antes do primeiro render produtivo, o operador (Eurico) deve descarregar uma track royalty-free de **Uppbeat free tier** (https://uppbeat.io) ou equivalente (Artlist, Epidemic Sound) e colocá-la nesta pasta com o nome `warm-background-01.mp3`.

Critérios para a track default:
- Estilo: warm / acoustic / mediterranean (combina com paleta Alturense)
- Duração: >=30s (cobre os 28s da Composition + margem)
- Tempo: 80-110 BPM (não acelera demais, não cansa)
- Sem voz humana (interfere com legendas)
- Licença: free-tier com atribuição OU comercial paga

**Sem este ficheiro presente, o render falha em runtime na primeira chamada a `staticFile('music/warm-background-01.mp3')`.**

## Documentação obrigatória

Sempre que uma track for adicionada/trocada nesta pasta, actualizar `assets/LICENCE-AUDIO.md` com os campos: nome, artista, plataforma, URL, tipo de licença, restrições.

Esta é a mitigação de **R9 (direitos de música)** documentada na Story 1.1 AC-B5.

## Não comitar tracks ao git

`squad/templates/remotion/alturense-default/public/music/*.mp3` **não deve** ser comitado ao git (ficheiros binários grandes + risco de copyright). Adicionar `.mp3` ao `.gitignore` se ainda não estiver.

A licença em `assets/LICENCE-AUDIO.md` é a prova versionada de que a track usada cumpre os requisitos de R9.
