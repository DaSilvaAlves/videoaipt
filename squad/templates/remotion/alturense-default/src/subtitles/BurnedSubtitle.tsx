/**
 * BurnedSubtitle.tsx — legendas queimadas (stub-safe v1.0).
 *
 * Propósito:
 *   Renderizar legendas no terço inferior do frame quando um path .srt é
 *   fornecido. Quando undefined, retorna null (render condicional já feito
 *   no componente pai AlturenseComposition — este componente assume srtPath
 *   string válida).
 *
 * Q-ARQ-2 (PRD §8.3): em v1.0, NÃO usamos Whisper. As legendas vêm do stub
 * `text-from-script` (squad/providers/implementations/text-from-script/) que
 * converte o `script.md` do agente script-writer em .srt.
 *
 * Implementação v1.0:
 *   - Lê o ficheiro .srt via staticFile() ou path absoluto.
 *   - Parse mínimo de blocos SRT (timestamp + texto).
 *   - Renderiza o segmento activo no frame corrente.
 *
 * Inputs:
 *   - srtPath: string — path do ficheiro .srt (relativo a public/ ou URL)
 *
 * Output: legenda activa renderizada com badge semi-transparente no rodapé.
 *
 * Stub-safe: se este componente for invocado SEM srtPath válido, render condicional
 * no AlturenseComposition garante que nem é montado. Aqui assumimos srtPath ok.
 *
 * Story 1.1 — AC-B4.
 */

import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Montserrat';

const { fontFamily } = loadFont();

interface BurnedSubtitleProps {
  srtPath: string;
}

interface SegmentoSrt {
  inicioMs: number;
  fimMs: number;
  texto: string;
}

/**
 * Parse mínimo de SRT. Aceita o formato standard:
 *   1
 *   00:00:00,000 --> 00:00:03,500
 *   Texto da legenda
 *
 *   2
 *   ...
 *
 * Retorna array de segmentos. Implementação propositadamente conservadora —
 * v1.0 só consome SRTs gerados pelo nosso próprio stub `text-from-script`.
 */
function parseSrt(conteudo: string): SegmentoSrt[] {
  const blocos = conteudo.split(/\r?\n\r?\n/).filter((b) => b.trim().length > 0);
  const segmentos: SegmentoSrt[] = [];

  for (const bloco of blocos) {
    const linhas = bloco.split(/\r?\n/);
    if (linhas.length < 3) continue;

    // linhas[0] = índice; linhas[1] = timestamps; linhas[2..] = texto
    const linhaTimestamps = linhas[1];
    const match = linhaTimestamps.match(
      /^(\d{2}):(\d{2}):(\d{2})[,.](\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2})[,.](\d{3})/
    );
    if (!match) continue;

    const inicioMs =
      parseInt(match[1], 10) * 3_600_000 +
      parseInt(match[2], 10) * 60_000 +
      parseInt(match[3], 10) * 1_000 +
      parseInt(match[4], 10);
    const fimMs =
      parseInt(match[5], 10) * 3_600_000 +
      parseInt(match[6], 10) * 60_000 +
      parseInt(match[7], 10) * 1_000 +
      parseInt(match[8], 10);

    const texto = linhas.slice(2).join('\n').trim();
    segmentos.push({ inicioMs, fimMs, texto });
  }

  return segmentos;
}

export const BurnedSubtitle: React.FC<BurnedSubtitleProps> = ({ srtPath }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Carregar conteúdo do SRT. Em browser context (Remotion preview), usar fetch
  // sobre staticFile(). Aqui assumimos que srtPath já é resolvable como URL.
  const [segmentos, setSegmentos] = React.useState<SegmentoSrt[]>([]);

  React.useEffect(() => {
    let cancelado = false;
    fetch(srtPath)
      .then((r) => r.text())
      .then((texto) => {
        if (!cancelado) setSegmentos(parseSrt(texto));
      })
      .catch(() => {
        // Falha silenciosa — stub-safe. Se SRT não carregar, simplesmente sem legendas.
        if (!cancelado) setSegmentos([]);
      });
    return () => {
      cancelado = true;
    };
  }, [srtPath]);

  // Calcular tempo actual em ms.
  const tempoActualMs = (frame / fps) * 1000;

  // Encontrar segmento activo (linear scan — SRTs típicos têm <50 segmentos).
  const segmentoActivo = segmentos.find(
    (s) => tempoActualMs >= s.inicioMs && tempoActualMs <= s.fimMs
  );

  if (!segmentoActivo) return null;

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 60,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: '#FAF6EE',
          padding: '14px 28px',
          borderRadius: 8,
          fontFamily,
          fontWeight: 600,
          fontSize: 38,
          textAlign: 'center',
          maxWidth: '88%',
          lineHeight: 1.3,
          textShadow: '0 1px 2px rgba(0,0,0,0.6)',
        }}
      >
        {segmentoActivo.texto}
      </div>
    </AbsoluteFill>
  );
};
