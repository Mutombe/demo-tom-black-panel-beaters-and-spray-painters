import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle } from '@phosphor-icons/react';
import siteData from '../../data/siteData';

/**
 * HeroDiagonal — 135° diagonal gradient overlay.
 * Dark top-left reveals imagery in bottom-right corner.
 * Paired with subtle grain texture for analog warmth.
 */
function HeroDiagonal() {
  const { business, hero } = siteData;

  const images = hero.backgroundImages?.length
    ? hero.backgroundImages
    : hero.backgroundImage
      ? [{ url: hero.backgroundImage, alt: hero.backgroundAlt || '' }]
      : [];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-navy-950">
      {/* Background image carousel */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={`diag-bg-${current}`}
            src={images[current]?.url || ''}
            alt={images[current]?.alt || ''}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.2 }, scale: { duration: 10, ease: 'easeOut' } }}
          />
        </AnimatePresence>

        {/* 135° diagonal gradient — 8 opacity stops */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: `linear-gradient(135deg,
              rgba(15,29,48,0.97) 0%,
              rgba(15,29,48,0.93) 15%,
              rgba(15,29,48,0.85) 25%,
              rgba(15,29,48,0.72) 38%,
              rgba(15,29,48,0.55) 50%,
              rgba(15,29,48,0.35) 62%,
              rgba(15,29,48,0.15) 78%,
              rgba(15,29,48,0.08) 100%
            )`,
          }}
        />
        {/* Bottom edge fade */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-950 to-transparent z-[1]" />
      </div>

      {/* Decorative diagonal line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 w-full h-full z-[2] pointer-events-none origin-top-left"
      >
        <div
          className="absolute w-[150%] h-px bg-gradient-to-r from-gold-500/30 via-gold-500/10 to-transparent"
          style={{ top: '35%', left: '-10%', transform: 'rotate(-35deg)' }}
        />
      </motion.div>

      {/* Content — top-left area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16 lg:pt-0 lg:pb-0">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-12 h-[2px] bg-gold-500" />
            <span className="text-gold-400 text-xs font-semibold uppercase tracking-[3px]">
              {hero.badge}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08] mb-6"
          >
            {hero.titleParts.map((part, i) =>
              part.highlight ? (
                <span key={i} className="text-transparent bg-clip-text bg-gradient-to-br from-gold-400 to-gold-600">
                  {part.text}
                </span>
              ) : (
                <React.Fragment key={i}>{part.text}</React.Fragment>
              )
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-base sm:text-lg text-white/65 leading-relaxed mb-10 max-w-lg"
          >
            {hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <Link to="/contact" className="btn-primary">
              {hero.ctaPrimary} <ArrowRight size={18} />
            </Link>
            <Link to="/projects" className="btn-secondary">
              {hero.ctaSecondary}
            </Link>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex items-center gap-6 flex-wrap"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} weight="fill" className={i < business.ratingRounded ? 'text-gold-400' : 'text-gold-400/40'} />
              ))}
              <span className="text-white/60 text-sm ml-2">{business.rating}/5 ({business.reviewCount} reviews)</span>
            </div>
            <div className="hidden sm:block h-5 w-px bg-white/15" />
            <div className="flex items-center gap-2">
              <CheckCircle size={15} weight="fill" className="text-emerald-400" />
              <span className="text-white/60 text-sm">{hero.trustBadge}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroDiagonal;
