/**
 * generate-test-assets.js — gera assets placeholder para teste local.
 *
 * Story 1.1 Tarefa 7 (AC-C1): assets placeholder para o render de validação.
 *
 * Cria:
 *   - public/placeholder/clip-01.mp4       (vídeo solid color #6B3A2A)
 *   - public/placeholder/clip-02.mp4       (vídeo solid color #5C6B2A)
 *   - public/placeholder/design-final.png  (PNG solid color #D4A017)
 *
 * Estratégia: usa o ffmpeg.exe que vem dentro do node_modules do template
 * (@remotion/compositor-win32-x64-msvc/ffmpeg.exe). Como esse ffmpeg minimal
 * não tem o filter `color`, geramos os ficheiros via abordagem alternativa:
 *
 *   1. Criar um PNG sólido programaticamente (escrevendo bytes válidos PNG).
 *   2. Usar ffmpeg para fazer loop do PNG num MP4 H.264 de N segundos.
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const zlib = require('node:zlib');

// Paths.
const templateDir = path.resolve(__dirname, '..', '..', '..', 'templates', 'remotion', 'alturense-default');
const placeholderDir = path.join(templateDir, 'public', 'placeholder');
const ffmpegPath = path.join(
  templateDir,
  'node_modules',
  '@remotion',
  'compositor-win32-x64-msvc',
  'ffmpeg.exe'
);

fs.mkdirSync(placeholderDir, { recursive: true });

/**
 * Cria um PNG sólido 1080x1080 com a cor passada (RGB).
 *
 * Implementação minimal de PNG sem dependências externas:
 *   - signature
 *   - IHDR (header)
 *   - IDAT (dados — RLE simples via zlib)
 *   - IEND
 */
function escreverPngSolido(filePath, r, g, b, width = 1080, height = 1080) {
  const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;     // bit depth
  ihdr[9] = 2;     // color type RGB
  ihdr[10] = 0;    // compression
  ihdr[11] = 0;    // filter
  ihdr[12] = 0;    // interlace

  // IDAT — para cada linha, byte de filter (0) seguido de RGB×width.
  const linha = Buffer.alloc(1 + width * 3);
  linha[0] = 0;
  for (let x = 0; x < width; x++) {
    linha[1 + x * 3] = r;
    linha[1 + x * 3 + 1] = g;
    linha[1 + x * 3 + 2] = b;
  }
  const rawDados = Buffer.alloc(linha.length * height);
  for (let y = 0; y < height; y++) {
    linha.copy(rawDados, y * linha.length);
  }
  const compressedDados = zlib.deflateSync(rawDados);

  function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcInput = Buffer.concat([typeBuf, data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(crcInput), 0);
    return Buffer.concat([len, typeBuf, data, crc]);
  }

  function crc32(buf) {
    let crc = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      crc = crc ^ buf[i];
      for (let j = 0; j < 8; j++) {
        crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
      }
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  const buffers = [
    PNG_SIGNATURE,
    chunk('IHDR', ihdr),
    chunk('IDAT', compressedDados),
    chunk('IEND', Buffer.alloc(0)),
  ];
  fs.writeFileSync(filePath, Buffer.concat(buffers));
  console.log(`PNG escrito: ${filePath}`);
}

/**
 * Converte um PNG num MP4 com loop de N segundos via FFmpeg.
 */
function pngParaMp4(pngPath, mp4Path, duracaoSegundos) {
  const result = spawnSync(ffmpegPath, [
    '-y',
    '-loop', '1',
    '-i', pngPath,
    '-c:v', 'libx264',
    '-t', String(duracaoSegundos),
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    mp4Path,
  ], { encoding: 'utf8' });

  if (result.status !== 0) {
    console.error(`FFmpeg falhou (${pngPath} → ${mp4Path}): ${result.stderr.split('\n').slice(-5).join('\n')}`);
    process.exit(1);
  }
  console.log(`MP4 escrito: ${mp4Path}`);
}

// === EXECUÇÃO ===

const clip1Png = path.join(placeholderDir, 'clip-01.png');
const clip2Png = path.join(placeholderDir, 'clip-02.png');
const designPng = path.join(placeholderDir, 'design-final.png');

const clip1Mp4 = path.join(placeholderDir, 'clip-01.mp4');
const clip2Mp4 = path.join(placeholderDir, 'clip-02.mp4');

// Cores Alturense (PRD §14): café, verde-oliva, dourado.
escreverPngSolido(clip1Png, 0x6B, 0x3A, 0x2A);     // café
escreverPngSolido(clip2Png, 0x5C, 0x6B, 0x2A);     // verde-oliva
escreverPngSolido(designPng, 0xD4, 0xA0, 0x17);    // dourado

// Converter PNGs em MP4s de 11s (cobrem os 10s de cada Clip Scene + buffer).
pngParaMp4(clip1Png, clip1Mp4, 11);
pngParaMp4(clip2Png, clip2Mp4, 11);

console.log('');
console.log('=== Assets placeholder gerados ===');
console.log(`  ${clip1Mp4}`);
console.log(`  ${clip2Mp4}`);
console.log(`  ${designPng}`);
