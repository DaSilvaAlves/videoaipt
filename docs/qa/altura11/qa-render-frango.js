/**
 * qa-render-frango.js — render Remotion para gate AC-C2 Story 1.1.
 *
 * Autor: @qa Quinn
 * Propósito: produzir vídeo Remotion "Frango Assado no Forno" para comparação
 *            lado-a-lado contra docs/qa/altura11/altura11.mp4 (baseline CapCut real).
 *
 * NÃO é código produtivo. Vive sob docs/qa/ como artefacto de gate.
 *
 * Inputs reais (vs placeholders do test-render.js do @dev):
 *   - finalDesignUrl = frango-final-19-04.png (foto real do prato, crop 1080×1080)
 *   - dishName = "Frango Assado no Forno"
 *   - price = "€7,50" (Eurico confirmou — achado: CapCut real não mostra preço)
 *   - musicTrackPath = altura11-proxy.mp3 (extraído do CapCut como proxy sonoro — NÃO para produção por causa da licença)
 *
 * Clip1 e Clip2 ficam em placeholders coloridos (Eurico não forneceu clips de vídeo
 * reais — validamos estrutura, pacing, overlays; não fidelidade de clips de produto).
 */

'use strict';

const path = require('node:path');
const editingProvider = require('../../../squad/providers/implementations/remotion-local/index.js');

async function main() {
  const repoRoot = path.resolve(__dirname, '..', '..', '..');
  const outputDir = path.join(repoRoot, 'squad', 'data', 'alturense', 'videos', '2026-04-18-qa-frango');
  const outputPath = path.join(outputDir, 'final.mp4');

  console.log('=== QA render — Frango Assado no Forno (gate AC-C2) ===');
  console.log(`Output: ${outputPath}`);

  const compositionSpec = {
    composition_id: 'AlturenseComposition',
    template_id: 'alturense-default',
    clip1Url: 'placeholder/clip-01.mp4',
    clip2Url: 'placeholder/clip-02.mp4',
    finalDesignUrl: 'placeholder/frango-final-19-04.png',
    dishName: 'Frango Assado no Forno',
    price: '€7,50',
    musicTrackPath: 'music/altura11-proxy.mp3',
    musicVolume: 0.4,
    subtitlesSrtPath: undefined,
    brandColor: '#6B3A2A',
    logoPath: undefined,
  };

  const outputSpec = {
    output_path: outputPath,
    aspect_ratio: '1:1',
    fps: 30,
    codec: 'h264',
  };

  try {
    const startMs = Date.now();
    const resultado = await editingProvider.render({
      composition_spec: compositionSpec,
      assets: {},
      output_spec: outputSpec,
    });
    const totalMs = Date.now() - startMs;
    console.log('=== RENDER COMPLETO ===');
    console.log(`output_path: ${resultado.output_path}`);
    console.log(`latency_ms:  ${resultado.latency_ms}`);
    console.log(`wall_ms:     ${totalMs}`);
  } catch (err) {
    console.error('=== RENDER FALHOU ===');
    console.error(`Code:    ${err.code}`);
    console.error(`Message: ${err.message}`);
    if (err.details) console.error('Details:', err.details);
    process.exitCode = 1;
  }
}

main();
