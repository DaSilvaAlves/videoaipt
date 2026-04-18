/**
 * test-render.js — invocação manual de teste do EditingProvider remotion-local.
 *
 * Propósito (Story 1.1 Tarefa 7 — AC-C1):
 *   Validar end-to-end que o render local funciona com props placeholder.
 *   NÃO é parte da pipeline produtiva — só serve para AC-C1 (render de teste).
 *
 * Uso:
 *   node squad/providers/implementations/remotion-local/test-render.js
 *
 * Output esperado:
 *   squad/data/alturense/videos/{YYYY-MM-DD}/final.mp4 (1080x1080, ~28s, H.264)
 *   squad/data/alturense/videos/{YYYY-MM-DD}/render/composition.json
 *   squad/data/alturense/videos/{YYYY-MM-DD}/render/render-logs.txt
 */

'use strict';

const path = require('node:path');
const editingProvider = require('./index.js');

async function main() {
  // Data corrente em formato YYYY-MM-DD para o pattern de persistência.
  const dataHoje = new Date().toISOString().slice(0, 10);

  // Path absoluto do output, conforme PRD §8.4.
  // __dirname = squad/providers/implementations/remotion-local
  // Subimos 4 níveis até à raíz do repositório.
  const repoRoot = path.resolve(__dirname, '..', '..', '..', '..');
  const outputPath = path.join(
    repoRoot,
    'squad', 'data', 'alturense', 'videos', dataHoje, 'final.mp4'
  );

  console.log('=== Teste manual EditingProvider remotion-local ===');
  console.log(`Output esperado: ${outputPath}`);
  console.log('');

  // Props com paths placeholder gerados por generate-test-assets.js.
  // staticFile() do Remotion resolve paths relativos a partir de public/.
  // Para validação de AC-C2 (comparação CapCut) o operador substitui por
  // assets reais do Alturense.
  const compositionSpec = {
    composition_id: 'AlturenseComposition',
    template_id: 'alturense-default',
    clip1Url: 'placeholder/clip-01.mp4',           // public/placeholder/clip-01.mp4 via staticFile()
    clip2Url: 'placeholder/clip-02.mp4',
    finalDesignUrl: 'placeholder/design-final.png',
    dishName: 'Atum à Algarvia',
    price: '€12,50',
    musicTrackPath: 'music/warm-background-01.mp3',  // public/music/...
    musicVolume: 0.4,
    subtitlesSrtPath: undefined,    // stub-safe — sem legendas no teste
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
    console.log('A invocar editingProvider.render() ...');
    const startMs = Date.now();
    const resultado = await editingProvider.render({
      composition_spec: compositionSpec,
      assets: {},
      output_spec: outputSpec,
    });
    const totalMs = Date.now() - startMs;

    console.log('');
    console.log('=== RENDER COMPLETO ===');
    console.log(`output_path:  ${resultado.output_path}`);
    console.log(`cost_eur:     ${resultado.cost_eur}`);
    console.log(`latency_ms:   ${resultado.latency_ms}`);
    console.log(`render_logs:  ${resultado.render_logs}`);
    console.log(`Total wall:   ${totalMs}ms`);
    console.log('');
    console.log('Validação AC-C1: verificar com `ffprobe` que o output tem');
    console.log('  - duração ~28s');
    console.log('  - resolução 1080x1080');
    console.log('  - codec H.264');
  } catch (err) {
    console.error('');
    console.error('=== RENDER FALHOU ===');
    console.error(`Code:    ${err.code || 'UNKNOWN'}`);
    console.error(`Message: ${err.message}`);
    if (err.details) console.error('Details:', err.details);
    process.exitCode = 1;
  }
}

main();
