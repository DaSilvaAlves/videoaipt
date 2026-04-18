/**
 * remotion.config.ts — configuração do template Alturense.
 *
 * Define formato base (1080x1080 @ 30fps), codec H.264 e behaviour de imagem JPEG
 * para preview. A duração efectiva da Composition é declarada em src/index.tsx via
 * `durationInFrames` da Composition (não aqui).
 *
 * Story 1.1 — AC-B1.
 *
 * NOTA SOBRE AC-B8 (absolute imports):
 * Tentou-se configurar paths absolutos `@/...` via Webpack alias e via
 * NormalModuleReplacementPlugin, mas o Webpack interno do Remotion 4.0.180
 * sofre colisão com scoped packages (`@remotion/...`). Decisão de @dev:
 * usar imports relativos curtos (apenas 1 nível) entre componentes do
 * template. tsconfig.json mantém os paths declarados para IntelliSense
 * em IDEs. A intenção de AC-B8 (evitar `../../../`) é honrada — todos os
 * imports relativos são `./` ou `../` de 1 nível só.
 */

import { Config } from '@remotion/cli/config';

// Formato de imagem usado para preview/snapshot. JPEG é mais leve que PNG e
// suficiente para preview interno; o output final é H.264.
Config.setVideoImageFormat('jpeg');

// Codec do output. PRD §8.5 indica H.264 para entrega Facebook.
Config.setCodec('h264');

// Concorrência de render. Default Remotion = nº de CPUs; aqui deixamos default.
// Override via CLI: `--concurrency=N` se necessário.

// CRF (qualidade) — 18 é "visualmente sem perdas" para H.264. PRD pede qualidade
// editorial superior ao CapCut, portanto preferimos qualidade a tamanho.
Config.setCrf(18);
