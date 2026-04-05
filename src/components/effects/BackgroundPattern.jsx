import React from 'react';
import { designTokens } from '../../data/siteData';

const PATTERN_CLASSES = {
  dots: 'bg-pattern-dots',
  circuit: 'bg-pattern-circuit',
  hexagonal: 'bg-pattern-hexagonal',
  waves: 'bg-pattern-waves',
};

function BackgroundPattern() {
  const pattern = designTokens?.bgPattern || 'none';
  if (pattern === 'none') return null;

  const patternClass = PATTERN_CLASSES[pattern];
  if (!patternClass) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 ${patternClass}`}
      style={{ opacity: 0.4, color: 'var(--color-navy-900, #1e3a5f)' }}
    />
  );
}

export default BackgroundPattern;
