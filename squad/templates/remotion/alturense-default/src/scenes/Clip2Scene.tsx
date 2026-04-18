/**
 * Clip2Scene.tsx — segunda cena (10,5-20,5s) do template Alturense.
 *
 * Propósito:
 *   Renderizar o segundo clip de vídeo IA (Camada 1 output #2) ocupando
 *   o frame inteiro 1080x1080. Sem overlay textual — a cena dá o foco visual
 *   para um plano alternativo do prato/bastidor.
 *
 * Inputs:
 *   - videoUrl: string — path local ou URL do clip-02.mp4
 *
 * Output: cena de 10s só com vídeo.
 *
 * Story 1.1 — AC-B2.
 */

import React from 'react';
import { AbsoluteFill, OffthreadVideo, staticFile } from 'remotion';

interface Clip2SceneProps {
  videoUrl: string;
}

/**
 * Resolve um path relativo via staticFile() ou retorna a URL absoluta como está.
 */
function resolverSrc(src: string): string {
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  return staticFile(src);
}

export const Clip2Scene: React.FC<Clip2SceneProps> = ({ videoUrl }) => {
  return (
    <AbsoluteFill>
      <OffthreadVideo
        src={resolverSrc(videoUrl)}
        muted   // áudio do clip silenciado — música vem de MusicLayer
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </AbsoluteFill>
  );
};
