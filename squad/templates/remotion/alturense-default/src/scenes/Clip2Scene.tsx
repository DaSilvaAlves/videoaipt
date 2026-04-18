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
import { AbsoluteFill, OffthreadVideo } from 'remotion';

interface Clip2SceneProps {
  videoUrl: string;
}

export const Clip2Scene: React.FC<Clip2SceneProps> = ({ videoUrl }) => {
  return (
    <AbsoluteFill>
      <OffthreadVideo
        src={videoUrl}
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
