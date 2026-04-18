/**
 * FinalScene.tsx — cena final (21-28s) do template Alturense.
 *
 * Propósito:
 *   Renderizar a imagem de design final (Camada 2 output) com PriceBadge em
 *   destaque visual e o nome do prato como reforço editorial.
 *
 * Inputs:
 *   - designUrl: string — path local ou URL do design-04.png
 *   - price: string — preço formatado PT-PT (ex: "€12,50")
 *   - dishName: string — nome do prato (ex: "Atum à Algarvia")
 *   - brandColor: string — hex da paleta da persona
 *
 * Output: cena de 7s com imagem + PriceBadge centrado + dishName em rodapé.
 *
 * Story 1.1 — AC-B2 (cenas), AC-B3 (overlays).
 */

import React from 'react';
import { AbsoluteFill, Img } from 'remotion';

import { PriceBadge } from '@/overlays/PriceBadge';
import { TextOverlay } from '@/overlays/TextOverlay';

interface FinalSceneProps {
  designUrl: string;
  price: string;
  dishName: string;
  brandColor: string;
}

export const FinalScene: React.FC<FinalSceneProps> = ({
  designUrl,
  price,
  dishName,
  brandColor,
}) => {
  return (
    <AbsoluteFill>
      <Img
        src={designUrl}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Nome do prato em rodapé como reforço editorial */}
      <TextOverlay
        texto={dishName}
        corDeFundo={brandColor}
        posicao="terco-inferior"
        atrasoFrames={3}     // entra quase imediato (0,1s)
      />

      {/* Price Badge — destaque central, animado por spring */}
      <PriceBadge precoFormatado={price} />
    </AbsoluteFill>
  );
};
