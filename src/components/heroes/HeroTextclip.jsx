import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle } from '@phosphor-icons/react';
import siteData from '../../data/siteData';

/**
 * HeroTextclip — Giant word with background image visible THROUGH the text.
 * Uses CSS background-clip: text to reveal the photo through large typography.
 * Rest of hero has solid dark overlay.
 */
function HeroTextclip() {
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
    }, 8000);
    return () => clearInterval(timer);
  }, [images.length]);

  // Extract a short "clip word" from business name (first word or 2)
  const clipWord = business.name.split(/\s+/).slice(0, 2).join(' ').toUpperCase();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-navy-950">
      {/* Hidden background image — only shows through text clip */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={`textclip-bg-${current}`}
            src={images[current]?.url || ''}
            alt={images[current]?.alt || ''}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          />
        </AnimatePresence>
      </div>

      {/* Dark overlay — covers everything except where text clips through */}
      <div className="absolute inset-0 bg-navy-950/90 z-[1]" />

      {/* Giant clipping text — image shows through these letters */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex items-center justify-center z-[2] pointer-events-none select-none overflow-hidden"
      >
        <h2
          className="text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[12vw] font-black leading-none tracking-tight text-center"
          style={{
            backgroundImage: `url(${images[current]?.url || ''})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
          }}
        >
          {clipWord}
        </h2>
      </motion.div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16 lg:pt-0 lg:pb-0">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-4 py-2 mb-6"
        >
          <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
          <span className="text-gold-400 text-sm font-medium">{hero.badge}</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6"
        >
          {hero.titleParts.map((part, i) =>
            part.highlight ? (
              <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
                {part.text}
              </span>
            ) : (
              <React.Fragment key={i}>{part.text}</React.Fragment>
            )
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="text-base sm:text-lg text-white/60 leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          {hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Link to="/contact" className="btn-primary text-base">
            {hero.ctaPrimary} <ArrowRight size={18} />
          </Link>
          <Link to="/projects" className="btn-secondary text-base">
            {hero.ctaSecondary}
          </Link>
        </motion.div>

        {/* Trust */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex items-center justify-center gap-6 flex-wrap"
        >
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={15} weight="fill" className={i < business.ratingRounded ? 'text-gold-400' : 'text-gold-400/40'} />
            ))}
            <span className="text-white/65 text-sm ml-2">{business.rating}/5 ({business.reviewCount} reviews)</span>
          </div>
          <div className="hidden sm:block h-5 w-px bg-white/15" />
          <div className="flex items-center gap-2">
            <CheckCircle size={15} weight="fill" className="text-emerald-400" />
            <span className="text-white/65 text-sm">{hero.trustBadge}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroTextclip;
