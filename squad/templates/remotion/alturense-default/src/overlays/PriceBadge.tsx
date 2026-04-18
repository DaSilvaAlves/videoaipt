/**
 * PriceBadge.tsx — badge de preço em destaque para FinalScene.
 *
 * Propósito:
 *   Renderizar o preço do prato com destaque visual máximo: fundo dourado
 *   semi-transparente, texto café (paleta Alturense), entrada com spring
 *   amplo e ligeira oscilação para chamar atenção comercial.
 *
 * Inputs:
 *   - precoFormatado: string — preço já em PT-PT (ex: "€12,50")
 *
 * Output: badge centrado verticalmente, ligeiramente acima do centro.
 *
 * Tipografia: Montserrat 900 weight (boldest).
 *
 * Story 1.1 — AC-B3 (PriceBadge configurável, paleta Alturense).
 */

import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Montserrat';

const { fontFamily } = loadFont();

// Paleta Alturense — café e dourado (PRD §14, persona.yaml).
const COR_FUNDO_DOURADO = 'rgba(212, 160, 23, 0.92)';   // #D4A017 alpha 0.92
const COR_TEXTO_CAFE = '#3D1F12';                        // café muito escuro p/ contraste
const COR_BORDA = '#6B3A2A';                             // contorno em café

interface PriceBadgeProps {
  precoFormatado: string;
}

export const PriceBadge: React.FC<PriceBadgeProps> = ({ precoFormatado }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring com mais elasticidade que TextOverlay — destaque comercial.
  const escala = spring({
    frame,
    fps,
    config: {
      damping: 8,            // menos amortecimento → mais oscilação
      stiffness: 120,
      mass: 0.7,
    },
    durationInFrames: 24,    // 0,8s a 30fps
  });

  // Fade-in nos primeiros 12 frames (0,4s).
  const opacidade = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        // Ligeiramente acima do centro para não competir com TextOverlay (rodapé).
        transform: 'translateY(-80px)',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          transform: `scale(${escala})`,
          opacity: opacidade,
          backgroundColor: COR_FUNDO_DOURADO,
          color: COR_TEXTO_CAFE,
          padding: '32px 64px',
          borderRadius: 18,
          border: `4px solid ${COR_BORDA}`,
          fontFamily,
          fontWeight: 900,
          fontSize: 124,
          letterSpacing: '1px',
          textAlign: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
          // Sombra dupla — uma curta e nítida para profundidade, outra suave para halo.
          textShadow: '0 2px 0 rgba(255,255,255,0.4), 0 6px 18px rgba(0,0,0,0.35)',
        }}
      >
        {precoFormatado}
      </div>
    </AbsoluteFill>
  );
};
