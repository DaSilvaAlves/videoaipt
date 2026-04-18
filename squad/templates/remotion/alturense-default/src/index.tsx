/**
 * src/index.tsx — entry point do template Alturense Remotion.
 *
 * Propósito:
 *   Registar a Composition AlturenseComposition no runtime Remotion. Todas as
 *   props default vivem aqui — chamadas a `npx remotion render` podem
 *   sobrepor-las via flag `--props='...'`.
 *
 * Inputs esperados (props da Composition):
 *   ver `AlturenseComposition.tsx` interface AlturenseCompositionProps.
 *
 * Output: Composition registada com 28s a 30fps, 1080x1080.
 *
 * Story 1.1 — AC-B1, AC-B2.
 */

import { Composition, registerRoot } from 'remotion';
import { AlturenseComposition, AlturenseCompositionProps } from '@/AlturenseComposition';

// Constantes da Composition Alturense.
// Duração: 28s = 10s clip1 + 0,5s fade + 10s clip2 + 0,5s fade + 7s final = 28s
// (28s está dentro da janela 20-30s exigida por AC-B2 e Story §AC-B1).
const COMPOSITION_ID = 'AlturenseComposition';
const FPS = 30;
const WIDTH = 1080;
const HEIGHT = 1080;
const DURACAO_SEGUNDOS = 28;

// Props default — usados pelo Remotion Studio em modo preview.
// Em produção, o EditingProvider remotion-local sobrepõe estes via --props.
const propsDefault: AlturenseCompositionProps = {
  clip1Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  clip2Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  finalDesignUrl: 'https://placehold.co/1080x1080/6B3A2A/D4A017.png?text=Alturense',
  dishName: 'Atum à Algarvia',
  price: '€12,50',
  musicTrackPath: 'music/warm-background-01.mp3',
  musicVolume: 0.4,
  subtitlesSrtPath: undefined,
  brandColor: '#6B3A2A',
  logoPath: undefined,
};

/**
 * RemotionRoot — função obrigatória registada via registerRoot().
 * Lista todas as Compositions disponíveis neste template.
 */
const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id={COMPOSITION_ID}
      component={AlturenseComposition}
      durationInFrames={DURACAO_SEGUNDOS * FPS}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      defaultProps={propsDefault}
    />
  );
};

registerRoot(RemotionRoot);
