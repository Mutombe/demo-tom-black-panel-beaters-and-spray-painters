import React, { useState, useEffect } from 'react';
import { X } from '@phosphor-icons/react';

/**
 * DemoBanner — thin bar above navigation.
 * Uses HARDCODED colors (not CSS variables) so brand color injection
 * cannot override it. Always shows as a neutral dark bar.
 */
function DemoBanner() {
  const [dismissed, setDismissed] = useState(false);

  // Set CSS custom property for navbar offset
  useEffect(() => {
    const updateHeight = () => {
      const el = document.getElementById('demo-banner');
      if (el && !dismissed) {
        document.documentElement.style.setProperty('--banner-height', el.offsetHeight + 'px');
      } else {
        document.documentElement.style.setProperty('--banner-height', '0px');
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div
      id="demo-banner"
      className="relative z-[60] text-center text-xs py-2 px-8"
      style={{
        backgroundColor: '#1a1a2e',
        color: '#e0e0e0',
      }}
    >
      <span className="font-medium">
        Demo by{' '}
        <a
          href="mailto:admin@bitstudio.co.zw"
          className="underline font-bold transition-colors"
          style={{ color: '#e5af3e' }}
          onMouseEnter={(e) => (e.target.style.color = '#f5c542')}
          onMouseLeave={(e) => (e.target.style.color = '#e5af3e')}
        >
          Bit Studio
        </a>
        {' '}&mdash; Want a site like this?{' '}
        <a
          href="mailto:admin@bitstudio.co.zw"
          className="underline transition-colors"
          style={{ color: '#e5af3e' }}
          onMouseEnter={(e) => (e.target.style.color = '#f5c542')}
          onMouseLeave={(e) => (e.target.style.color = '#e5af3e')}
        >
          Get in touch
        </a>
      </span>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded transition-colors"
        style={{ color: '#999' }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgba(255,255,255,0.1)')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
        aria-label="Dismiss banner"
      >
        <X size={14} />
      </button>
    </div>
  );
}

export default DemoBanner;
