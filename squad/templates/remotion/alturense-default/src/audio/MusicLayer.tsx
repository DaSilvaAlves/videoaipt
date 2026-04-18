/**
 * MusicLayer.tsx — camada de música royalty-free com fade-in/out.
 *
 * Propósito:
 *   Tocar a track de fundo durante toda a Composition com:
 *   - fade-in nos primeiros 30 frames (1s)
 *   - fade-out nos últimos 45 frames (1,5s)
 *   - volume base configurável (default 0,4 — leitura conjunta com vídeo)
 *
 * Inputs:
 *   - trackPath: string — path relativo a public/ ou absoluto via staticFile()
 *   - volume: number — volume base 0–1
 *
 * Output: <Audio/> com curva de volume animada.
 *
 * Mitigação R9 (direitos de música): a track usada DEVE estar documentada em
 * `assets/LICENCE-AUDIO.md` com prova de licença comercial ou free-tier com
 * atribuição. Ver AC-B5 da Story 1.1.
 *
 * Story 1.1 — AC-B5.
 */

import React from 'react';
import { Audio, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

interface MusicLayerProps {
  trackPath: string;
  volume: number;
}

// Frames de fade — ver docstring acima.
const FADE_IN_FRAMES = 30;     // 1,0s a 30fps
const FADE_OUT_FRAMES = 45;    // 1,5s a 30fps

export const MusicLayer: React.FC<MusicLayerProps> = ({ trackPath, volume }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Curva de volume:
  //   [0 → FADE_IN_FRAMES]                    : 0 → volume          (fade-in)
  //   [FADE_IN_FRAMES → durationInFrames - FADE_OUT_FRAMES]
  //                                            : volume             (constante)
  //   [durationInFrames - FADE_OUT_FRAMES → durationInFrames]
  //                                            : volume → 0         (fade-out)
  const volumeAtual = interpolate(
    frame,
    [
      0,
      FADE_IN_FRAMES,
      durationInFrames - FADE_OUT_FRAMES,
      durationInFrames,
    ],
    [0, volume, volume, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // staticFile() resolve para public/ do template; trackPath relativo (ex:
  // "music/warm-background-01.mp3") aponta para public/music/warm-background-01.mp3.
  // Se trackPath já é uma URL absoluta (http(s)://) Remotion aceita directo.
  const src = trackPath.startsWith('http') ? trackPath : staticFile(trackPath);

  return <Audio src={src} volume={volumeAtual} />;
};
