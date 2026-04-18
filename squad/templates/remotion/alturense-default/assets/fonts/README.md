# Pasta `assets/fonts/` — Fonts do template Alturense

A tipografia principal do template é **Montserrat**, carregada via `@remotion/google-fonts/Montserrat` directamente nos componentes `TextOverlay.tsx` e `PriceBadge.tsx`. Não é necessário ter o ficheiro `.ttf` localmente — o pacote do Remotion trata da entrega.

## Quando colocar fonts aqui

Esta pasta serve para fonts personalizadas (ex: TTF/WOFF próprios de um cliente) que não estejam no Google Fonts. Para v1.0 Alturense não há fonts adicionais.

Quando uma persona futura exigir font customizada:
1. Colocar `.ttf` ou `.woff2` aqui
2. No componente, usar `loadFont()` do Remotion com path local via `staticFile()`
3. Documentar a licença da font (criar `LICENCE-FONTS.md`)

## Não comitar binários grandes

Fonts em `.ttf`/`.woff2` podem ser grandes. Avaliar se devem ir para git ou ser distribuídas separadamente.
