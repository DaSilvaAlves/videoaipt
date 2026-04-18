/**
 * TextOverlay.tsx — overlay de texto animado (nome do prato).
 *
 * Propósito:
 *   Renderizar texto editorial sobre vídeo/imagem com entrada via spring
 *   animation do Remotion (escala + fade-in). Configurável por props para
 *   permitir reuso em múltiplas cenas (Clip1Scene, FinalScene).
 *
 * Inputs:
 *   - texto: string — texto a renderizar (PT-PT)
 *   - corDeFundo: string — hex do badge de fundo (paleta da persona)
 *   - posicao: 'terco-inferior' | 'terco-superior' | 'centro'
 *   - atrasoFrames: number — frames de atraso antes da entrada (default 0)
 *
 * Output: overlay tipográfico com badge semi-transparente e animação de entrada.
 *
 * Tipografia: Montserrat (carregada via @remotion/google-fonts).
 *
 * Story 1.1 — AC-B3 (overlays configuráveis).
 */

import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Montserrat';

// Carregar Montserrat — chamada idempotente; Remotion cacheia o resultado.
const { fontFamily } = loadFont();

interface TextOverlayProps {
  texto: string;
  corDeFundo: string;
  posicao: 'terco-inferior' | 'terco-superior' | 'centro';
  atrasoFrames?: number;
}

export const TextOverlay: React.FC<TextOverlayProps> = ({
  texto,
  corDeFundo,
  posicao,
  atrasoFrames = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frame relativo ao início da animação (após atraso).
  const frameRelativo = Math.max(0, frame - atrasoFrames);

  // Spring para escala — entrada elástica suave (~0,7s).
  const escala = spring({
    frame: frameRelativo,
    fps,
    config: {
      damping: 12,           // amortecimento — quanto maior, menos oscilação
      stiffness: 100,        // rigidez — quanto maior, mais rápido
      mass: 0.6,
    },
    durationInFrames: 21,    // 0,7s a 30fps
  });

  // Fade-in linear nos primeiros 9 frames (0,3s).
  const opacidade = interpolate(frameRelativo, [0, 9], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Mapear posição → estilos de alinhamento vertical.
  const alinhamentoVertical = (() => {
    switch (posicao) {
      case 'terco-superior':
        return 'flex-start';
      case 'centro':
        return 'center';
      case 'terco-inferior':
      default:
        return 'flex-end';
    }
  })();

  // Padding inferior aplicado quando posicao=terco-inferior para evitar bleed
  // contra a margem inferior do frame.
  const paddingBottom = posicao === 'terco-inferior' ? 120 : 0;
  const paddingTop = posicao === 'terco-superior' ? 120 : 0;

  return (
    <AbsoluteFill
      style={{
        justifyContent: alinhamentoVertical,
        alignItems: 'center',
        paddingBottom,
        paddingTop,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          transform: `scale(${escala})`,
          opacity: opacidade,
          backgroundColor: hexParaRgba(corDeFundo, 0.85),
          padding: '20px 48px',
          borderRadius: 14,
          fontFamily,
          fontWeight: 700,
          fontSize: 72,
          color: '#FAF6EE',     // bege claro, contraste alto sobre paleta quente
          textAlign: 'center',
          textShadow: '0 2px 4px rgba(0,0,0,0.35)',
          letterSpacing: '0.5px',
          maxWidth: '85%',
          lineHeight: 1.15,
        }}
      >
        {texto}
      </div>
    </AbsoluteFill>
  );
};

/**
 * Converte hex (#RRGGBB) em rgba(r,g,b,a).
 * Helper local para overlay translúcido sem dependências externas.
 */
function hexParaRgba(hex: string, alpha: number): string {
  const valor = hex.replace('#', '');
  const r = parseInt(valor.substring(0, 2), 16);
  const g = parseInt(valor.substring(2, 4), 16);
  const b = parseInt(valor.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
