/**
 * Clip1Scene.tsx — primeira cena (0-10s) do template Alturense.
 *
 * Propósito:
 *   Renderizar o primeiro clip de vídeo IA (Camada 1 output #1) ocupando
 *   o frame inteiro 1080x1080, com overlay do nome do prato animado por spring
 *   no terço inferior.
 *
 * Inputs:
 *   - videoUrl: string — path local ou URL do clip-01.mp4
 *   - dishName: string — nome do prato (ex: "Atum à Algarvia")
 *   - brandColor: string — hex da paleta da persona
 *
 * Output: cena de 10s com vídeo + overlay tipográfico animado.
 *
 * Story 1.1 — AC-B2 (cenas), AC-B3 (overlay configurável).
 */

import React from 'react';
import { AbsoluteFill, OffthreadVideo, staticFile } from 'remotion';

import { TextOverlay } from '../overlays/TextOverlay';

interface Clip1SceneProps {
  videoUrl: string;
  dishName: string;
  brandColor: string;
}

/**
 * Resolve um path relativo via staticFile() ou retorna a URL absoluta como está.
 * Permite o template aceitar tanto URLs http(s) reais (produção) como paths
 * relativos a public/ (testes locais).
 */
function resolverSrc(src: string): string {
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  return staticFile(src);
}

export const Clip1Scene: React.FC<Clip1SceneProps> = ({
  videoUrl,
  dishName,
  brandColor,
}) => {
  return (
    <AbsoluteFill>
      {/*
        OffthreadVideo é preferido sobre <Video> em renders longos — usa um
        worker thread separado, evitando bloqueios do UI thread.
      */}
      <OffthreadVideo
        src={resolverSrc(videoUrl)}
        muted   // o áudio do clip é desactivado; usamos só MusicLayer
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Overlay com nome do prato — entrada via spring nos primeiros 0,7s */}
      <TextOverlay
        texto={dishName}
        corDeFundo={brandColor}
        posicao="terco-inferior"
        atrasoFrames={6}     // entra após 0,2s do início do clip
      />
    </AbsoluteFill>
  );
};
