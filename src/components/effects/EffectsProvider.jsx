import React from 'react';
import { designTokens } from '../../data/siteData';
import NoiseOverlay from './NoiseOverlay';
import FloatingShapes from './FloatingShapes';
import ScrollProgressBar from './ScrollProgressBar';
import MeshGradient from './MeshGradient';
import BackgroundPattern from './BackgroundPattern';

function EffectsProvider({ children }) {
  const effects = designTokens?.effects || {};

  return (
    <>
      {effects.noise && <NoiseOverlay />}
      {effects.floatingShapes && <FloatingShapes />}
      {effects.scrollProgress && <ScrollProgressBar />}
      {effects.meshGradient && <MeshGradient />}
      <BackgroundPattern />
      {children}
    </>
  );
}

export default EffectsProvider;
