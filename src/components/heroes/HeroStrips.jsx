import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle } from '@phosphor-icons/react';
import siteData from '../../data/siteData';

/**
 * HeroStrips — Vertical strip collage (venetian-blind effect).
 * 5-6 vertical image strips with content overlaid.
 * Strips animate in from alternating top/bottom.
 */
function HeroStrips() {
  const { business, hero } = siteData;

  const images = hero.backgroundImages?.length
    ? hero.backgroundImages
    : hero.backgroundImage
      ? [{ url: hero.backgroundImage, alt: hero.backgroundAlt || '' }]
      : [];

  // Create 6 strips, distributing available images
  const strips = useMemo(() => {
    if (images.length === 0) return [];
    return Array.from({ length: 6 }, (_, i) => ({
      image: images[i % images.length],
      fromTop: i % 2 === 0,
      delay: 0.1 + i * 0.12,
    }));
  }, [images]);

  if (images.length === 0) return null;

  return (
    <section className="relative min-h-screen overflow-hidden bg-navy-950">
      {/* Vertical image strips */}
      <div className="absolute inset-0 flex">
        {strips.map((strip, i) => (
          <motion.div
            key={i}
            className="flex-1 relative overflow-hidden"
            initial={{
              y: strip.fromTop ? '-100%' : '100%',
              opacity: 0,
            }}
            animate={{
              y: '0%',
              opacity: 1,
            }}
            transition={{
              duration: 1.2,
              delay: strip.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <img
              src={strip.image.url}
              alt={strip.image.alt}
              className="w-full h-full object-cover"
              style={{
                // Each strip shows a different portion of the image
                objectPosition: `${(i / 5) * 100}% center`,
              }}
            />
            {/* Individual strip separator line */}
            <div className="absolute inset-y-0 right-0 w-px bg-navy-950/80" />
          </motion.div>
        ))}
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-navy-950/75" />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'radial-gradient(ellipse at center 45%, rgba(15,29,48,0.5) 0%, rgba(15,29,48,0.8) 70%)',
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-950 to-transparent z-[1]" />

      {/* Content — centered */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.1] backdrop-blur-sm rounded-full px-4 py-2 mb-8"
          >
            <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
            <span className="text-gold-400 text-sm font-medium">{hero.badge}</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-7"
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
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4 }}
            className="text-base sm:text-lg md:text-xl text-white/60 leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            {hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
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
            transition={{ duration: 0.6, delay: 1.8 }}
            className="flex items-center justify-center gap-6 flex-wrap"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} weight="fill" className={i < business.ratingRounded ? 'text-gold-400' : 'text-gold-400/40'} />
              ))}
              <span className="text-white/65 text-sm ml-2">{business.rating}/5 ({business.reviewCount} reviews)</span>
            </div>
            <div className="hidden sm:block h-5 w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <CheckCircle size={16} weight="fill" className="text-emerald-400" />
              <span className="text-white/65 text-sm">{hero.trustBadge}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroStrips;
