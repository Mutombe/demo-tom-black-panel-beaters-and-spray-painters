import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * HeroCarousel -- cycles through background images with smooth crossfade.
 * Features: Ken Burns zoom, mouse parallax, gold elongated dot indicators, auto-play.
 *
 * Props:
 *   images: [{ url, alt }]       -- array of 2-3 hero images
 *   backgroundImage: string      -- legacy single image fallback
 *   backgroundAlt: string        -- legacy single alt fallback
 *   interval: number             -- ms between transitions (default 6000)
 *   overlay: string              -- gradient overlay style: "left", "center", "full", "split", "subtle"
 *   children: React.ReactNode    -- hero content rendered on top
 *   className: string            -- additional classes for the section
 */
function HeroCarousel({
  images,
  backgroundImage,
  backgroundAlt,
  interval = 6000,
  overlay = 'left',
  children,
  className = '',
}) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Build the image list -- support both new array and legacy single image
  const imageList = React.useMemo(() => {
    if (images && images.length > 0) {
      return images.map((img) =>
        typeof img === 'string' ? { url: img, alt: '' } : img
      );
    }
    if (backgroundImage) {
      return [{ url: backgroundImage, alt: backgroundAlt || '' }];
    }
    return [];
  }, [images, backgroundImage, backgroundAlt]);

  const [current, setCurrent] = useState(0);
  const count = imageList.length;

  // Auto-advance with 6-second intervals
  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % count);
    }, interval);
    return () => clearInterval(timer);
  }, [count, interval]);

  // Subtle parallax on mouse move
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  }, []);

  // Overlay gradient based on style -- with multi-stop navy gradients and radial depth
  const overlayGradient = {
    left: (
      <>
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right,
              rgba(15,29,48,0.92) 0%,
              rgba(15,29,48,0.80) 20%,
              rgba(15,29,48,0.60) 40%,
              rgba(15,29,48,0.35) 60%,
              rgba(15,29,48,0.15) 80%,
              rgba(15,29,48,0.05) 100%
            )`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-navy-950/15" />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 30% 50%, transparent 0%, rgba(15,29,48,0.20) 60%, rgba(15,29,48,0.35) 100%)',
          }}
        />
      </>
    ),
    center: (
      <>
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom,
              rgba(15,29,48,0.70) 0%,
              rgba(15,29,48,0.55) 30%,
              rgba(15,29,48,0.55) 60%,
              rgba(15,29,48,0.75) 100%
            )`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(15,29,48,0.30) 0%, rgba(15,29,48,0.60) 100%)',
          }}
        />
      </>
    ),
    full: (
      <>
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom,
              rgba(15,29,48,0.75) 0%,
              rgba(15,29,48,0.55) 40%,
              rgba(15,29,48,0.65) 70%,
              rgba(15,29,48,0.90) 100%
            )`,
          }}
        />
      </>
    ),
    split: (
      <>
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right,
              rgba(15,29,48,0.95) 0%,
              rgba(15,29,48,0.75) 30%,
              rgba(15,29,48,0.35) 60%,
              rgba(15,29,48,0.08) 100%
            )`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent" />
      </>
    ),
    subtle: (
      <>
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom,
              rgba(15,29,48,0.45) 0%,
              rgba(15,29,48,0.35) 40%,
              rgba(15,29,48,0.50) 70%,
              rgba(15,29,48,0.75) 100%
            )`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center 40%, transparent 0%, rgba(15,29,48,0.25) 100%)',
          }}
        />
      </>
    ),
  };

  if (imageList.length === 0) return null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative ${className}`}
    >
      {/* Background images with crossfade + Ken Burns + mouse parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={`hero-img-${current}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.4, ease: 'easeInOut' } }}
          >
            <motion.div
              className="w-full h-full"
              animate={{
                scale: [1.0, 1.06],
                x: mousePos.x * -8,
                y: mousePos.y * -8,
              }}
              transition={{
                scale: { duration: 12, ease: 'linear' },
                x: { duration: 0.8, ease: 'easeOut' },
                y: { duration: 0.8, ease: 'easeOut' },
              }}
            >
              <img
                src={imageList[current].url}
                alt={imageList[current].alt}
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Blend overlay */}
        {overlayGradient[overlay] || overlayGradient.left}

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
      </div>

      {/* Slide indicator dots -- bottom center, active one is gold and elongated */}
      {count > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
          {imageList.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-500 ${
                i === current
                  ? 'w-8 h-3 bg-gold-400 shadow-lg shadow-gold-400/40'
                  : 'w-3 h-3 bg-white/25 hover:bg-white/45'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default HeroCarousel;
