import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle } from '@phosphor-icons/react';
import siteData from '../../data/siteData';

/**
 * HeroContained — Hero image inset from edges with rounded corners.
 * Creates an editorial, app-like feel with generous padding around the image.
 * Text content sits above the contained image.
 */
function HeroContained() {
  const { business, hero, stats } = siteData;
  const bgImage = hero.backgroundImages?.[0]?.url || hero.backgroundImage;
  const displayStats = (stats || []).slice(0, 4);

  return (
    <section className="relative min-h-screen bg-navy-950 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-12">
        {/* Top content area */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-8 lg:mb-12 gap-6">
          {/* Left: heading + subtitle */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-4 py-2 mb-5"
            >
              <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
              <span className="text-gold-400 text-sm font-medium">{hero.badge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08] mb-5"
            >
              {hero.titleParts.map((part, i) =>
                part.highlight ? (
                  <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">{part.text}</span>
                ) : (
                  <React.Fragment key={i}>{part.text}</React.Fragment>
                )
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="text-base sm:text-lg text-white/55 leading-relaxed max-w-lg"
            >
              {hero.subtitle}
            </motion.p>
          </div>

          {/* Right: CTAs + trust */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                {hero.ctaPrimary} <ArrowRight size={18} />
              </Link>
              <Link to="/projects" className="btn-secondary">
                {hero.ctaSecondary}
              </Link>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} weight="fill" className={i < business.ratingRounded ? 'text-gold-400' : 'text-gold-400/40'} />
                ))}
                <span className="text-white/55 text-sm ml-1.5">{business.rating}/5</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle size={14} weight="fill" className="text-emerald-400" />
                <span className="text-white/55 text-sm">{hero.trustBadge}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contained image — inset with rounded corners */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/7] sm:aspect-[16/6] lg:aspect-[21/9]"
        >
          <img
            src={bgImage}
            alt={hero.backgroundAlt}
            className="w-full h-full object-cover"
          />
          {/* Subtle inner shadow */}
          <div className="absolute inset-0 shadow-[inset_0_2px_30px_rgba(0,0,0,0.3)]" />
          {/* Bottom gradient */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-950/60 to-transparent" />

          {/* Stats overlay on image — bottom */}
          {displayStats.length > 0 && (
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6">
              <div className="flex justify-center gap-3 sm:gap-4 max-w-2xl mx-auto">
                {displayStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex-1 text-center bg-white/10 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl py-3 px-2 sm:py-4 sm:px-4"
                  >
                    <div className="text-xl sm:text-2xl font-bold text-gold-400 mb-0.5">{stat.number}</div>
                    <div className="text-[10px] sm:text-xs text-white/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default HeroContained;
