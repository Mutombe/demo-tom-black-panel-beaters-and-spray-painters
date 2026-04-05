import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle } from '@phosphor-icons/react';
import siteData from '../../data/siteData';

/**
 * HeroMosaic — Infinite scrolling column background (copied from Mamavee2-1).
 * 3 vertical columns of images scrolling up/down infinitely behind dark overlays.
 * Centered text content on top.
 */

/* ── Scrolling Column (straight from mamavee2-1) ── */
const ScrollingColumn = ({ images, direction, delay = 0 }) => {
  const [isPaused, setIsPaused] = useState(false);
  const duplicatedImages = [...images, ...images];

  return (
    <div
      className="relative overflow-hidden h-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        animate={{
          y: direction === 'up' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
          delay: delay,
        }}
        style={{ willChange: 'transform' }}
        className={`flex flex-col gap-4 ${isPaused ? 'pause-animation' : ''}`}
      >
        {duplicatedImages.map((img, index) => (
          <div
            key={index}
            className="relative w-full h-80 rounded-xl overflow-hidden flex-shrink-0"
          >
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
          </div>
        ))}
      </motion.div>

      <style>{`
        .pause-animation {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
};

function HeroMosaic() {
  const { business, hero } = siteData;

  const allImages = hero.backgroundImages?.length
    ? hero.backgroundImages.map(img => img.url)
    : hero.backgroundImage
      ? [hero.backgroundImage]
      : [];

  // Split images across 3 columns (cycling if not enough)
  const getCol = (offset, count) =>
    Array.from({ length: count }, (_, i) => allImages[(offset + i) % allImages.length]);

  const column1 = getCol(0, 5);
  const column2 = getCol(3, 5);
  const column3 = getCol(1, 5);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-navy-950">
      {/* Infinite Scrolling Background Columns */}
      <div className="absolute inset-0 flex gap-4 px-2">
        <div className="flex-1 h-full">
          <ScrollingColumn images={column1} direction="up" delay={0} />
        </div>
        <div className="flex-1 h-full hidden sm:block">
          <ScrollingColumn images={column2} direction="down" delay={0} />
        </div>
        <div className="flex-1 h-full hidden lg:block">
          <ScrollingColumn images={column3} direction="up" delay={0} />
        </div>
      </div>

      {/* Dark Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-transparent to-navy-950/90" />

      {/* Hero Content — Centered */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <span className="w-12 h-[1px] bg-gold-500" />
            <span className="text-gold-400 font-medium tracking-[0.3em] uppercase text-sm">
              {hero.badge}
            </span>
            <span className="w-12 h-[1px] bg-gold-500" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-6 tracking-tighter leading-none drop-shadow-2xl"
          >
            {hero.titleParts.map((part, i) =>
              part.highlight ? (
                <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300">
                  {part.text}
                </span>
              ) : (
                <React.Fragment key={i}>{part.text}</React.Fragment>
              )
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="text-white/70 text-lg md:text-2xl max-w-3xl mx-auto mb-12 font-light leading-relaxed drop-shadow-md"
          >
            {hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <Link to="/contact" className="btn-primary text-lg px-10 py-5">
              {hero.ctaPrimary} <ArrowRight size={20} />
            </Link>
            <Link to="/projects" className="btn-secondary text-lg px-10 py-5">
              {hero.ctaSecondary}
            </Link>
          </motion.div>

          {/* Trust Row */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-6 mt-10 flex-wrap"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} weight="fill" className={i < business.ratingRounded ? 'text-gold-400' : 'text-gold-400/40'} />
              ))}
              <span className="text-white/50 text-sm ml-2">{business.rating}/5 ({business.reviewCount} reviews)</span>
            </div>
            <div className="hidden sm:block h-5 w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <CheckCircle size={16} weight="fill" className="text-emerald-400" />
              <span className="text-white/50 text-sm">{hero.trustBadge}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[10px] text-gold-500 uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-gold-500 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}

export default HeroMosaic;
