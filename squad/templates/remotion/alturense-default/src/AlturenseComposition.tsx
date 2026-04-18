/**
 * AlturenseComposition.tsx — Composition principal do template Alturense.
 *
 * Propósito:
 *   Orquestra a sequência de 3 cenas (Clip1 → Clip2 → Final) com transições
 *   fade de 0,5s, sobre música royalty-free contínua e legendas opcionais.
 *
 * Inputs esperados (AlturenseCompositionProps):
 *   - clip1Url / clip2Url / finalDesignUrl — assets das Camadas 1 e 2
 *   - dishName / price — conteúdo textual do brief
 *   - musicTrackPath / musicVolume — Camada áudio
 *   - subtitlesSrtPath — opcional, stub-safe (AC-B4)
 *   - brandColor — paleta dinâmica do cliente
 *   - logoPath — opcional
 *
 * Output: Composition Remotion 1080x1080 30fps com duração 28s.
 *
 * Estrutura temporal (AC-B2):
 *   0,0s  – 10,0s  → Clip1Scene (com TextOverlay nome do prato)
 *  10,0s  – 10,5s  → fade transition
 *  10,5s  – 20,5s  → Clip2Scene
 *  20,5s  – 21,0s  → fade transition
 *  21,0s  – 28,0s  → FinalScene (com PriceBadge sobre design final)
 *
 * Story 1.1 — AC-B2 (composition principal), AC-B3 (overlays), AC-B4 (legendas),
 *             AC-B5 (música), AC-B7 (documentação inline).
 */

import React from 'react';
import { AbsoluteFill, Audio, useVideoConfig } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';

import { Clip1Scene } from './scenes/Clip1Scene';
import { Clip2Scene } from './scenes/Clip2Scene';
import { FinalScene } from './scenes/FinalScene';
import { MusicLayer } from './audio/MusicLayer';
import { BurnedSubtitle } from './subtitles/BurnedSubtitle';

/**
 * Props aceites pela Composition Alturense.
 * Espelha exactamente o que o EditingProvider remotion-local passa via --props.
 *
 * Fonte: docs/research/samples/remotion-alturense-scaffold.md §Interface de dados.
 */
export interface AlturenseCompositionProps {
  // Assets vindos das Camadas 1 e 2 (paths locais ou URLs).
  clip1Url: string;
  clip2Url: string;
  finalDesignUrl: string;

  // Conteúdo textual do brief (PT-PT obrigatório).
  dishName: string;
  price: string;

  // Camada áudio.
  musicTrackPath: string;     // relativo a public/ ou absoluto via staticFile()
  musicVolume: number;        // 0–1, default 0.4

  // Legendas opcionais (stub-safe — undefined = sem legendas, sem erro).
  subtitlesSrtPath?: string;

  // Branding da persona.
  brandColor: string;         // hex — paleta Alturense default #6B3A2A
  logoPath?: string;          // opcional
}

// Duração de cada cena em segundos. Soma com transições = 28s total.
const DURACAO_CLIP1_S = 10;
const DURACAO_CLIP2_S = 10;
const DURACAO_FINAL_S = 7;
// Transição fade: 15 frames a 30fps = 0,5s. (15 / 30 = 0.5).
const TRANSICAO_FRAMES = 15;

export const AlturenseComposition: React.FC<AlturenseCompositionProps> = (props) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      <TransitionSeries>
        {/* Cena 1: clip vídeo IA #1 com nome do prato em overlay */}
        <TransitionSeries.Sequence durationInFrames={DURACAO_CLIP1_S * fps}>
          <Clip1Scene
            videoUrl={props.clip1Url}
            dishName={props.dishName}
            brandColor={props.brandColor}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSICAO_FRAMES })}
        />

        {/* Cena 2: clip vídeo IA #2 (sem overlay textual) */}
        <TransitionSeries.Sequence durationInFrames={DURACAO_CLIP2_S * fps}>
          <Clip2Scene videoUrl={props.clip2Url} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSICAO_FRAMES })}
        />

        {/* Cena 3: design final com PriceBadge em destaque */}
        <TransitionSeries.Sequence durationInFrames={DURACAO_FINAL_S * fps}>
          <FinalScene
            designUrl={props.finalDesignUrl}
            price={props.price}
            dishName={props.dishName}
            brandColor={props.brandColor}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Música de fundo durante toda a Composition (camada áudio sobreposta) */}
      <MusicLayer
        trackPath={props.musicTrackPath}
        volume={props.musicVolume}
      />

      {/* Legendas queimadas — render condicional (stub-safe, AC-B4) */}
      {props.subtitlesSrtPath ? (
        <BurnedSubtitle srtPath={props.subtitlesSrtPath} />
      ) : null}
    </AbsoluteFill>
  );
};
