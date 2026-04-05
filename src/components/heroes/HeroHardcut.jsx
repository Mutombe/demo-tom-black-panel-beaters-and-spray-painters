import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle } from '@phosphor-icons/react';
import siteData from '../../data/siteData';

/**
 * HeroHardcut — Clean 50/50 split-screen with no gradient.
 * Left half: solid dark with text content.
 * Right half: full-bleed image with hard edge.
 */
function HeroHardcut() {
  const { business, hero, stats } = siteData;
  const bgImage = hero.backgroundImages?.[0]?.url || hero.backgroundImage;
  const displayStats = (stats || []).slice(0, 3);

  return (
    <section className="relative min-h-screen bg-navy-950 overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left half — solid dark, text content */}
        <div className="w-full lg:w-1/2 flex items-center px-6 sm:px-10 lg:px-16 xl:px-20 pt-28 pb-12 lg:pt-0 lg:pb-0 relative z-10">
          <div className="max-w-xl w-full">
            {/* Vertical accent bar */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-1 h-16 bg-gradient-to-b from-gold-400 to-gold-600 rounded-full mb-8 origin-top"
            />

            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="inline-block text-gold-400 text-xs font-bold uppercase tracking-[4px] mb-6"
            >
              {hero.badge}
            </motion.span>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.08] mb-6"
            >
              {hero.titleParts.map((part, i) =>
                part.highlight ? (
                  <span key={i} className="text-gold-400">{part.text}</span>
                ) : (
                  <React.Fragment key={i}>{part.text}</React.Fragment>
                )
              )}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-base sm:text-lg text-white/55 leading-relaxed mb-8 max-w-md"
            >
              {hero.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
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

            {/* Stats row */}
            {displayStats.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex gap-8 mb-8"
              >
                {displayStats.map((stat) => (
                  <div key={stat.label}>
                    <span className="text-2xl sm:text-3xl font-black text-gold-400 block leading-none">{stat.number}</span>
                    <span className="text-xs text-white/50 block mt-1.5">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="flex items-center gap-5 flex-wrap"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} weight="fill" className={i < business.ratingRounded ? 'text-gold-400' : 'text-gold-400/40'} />
                ))}
                <span className="text-white/55 text-sm ml-2">{business.rating}/5</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle size={14} weight="fill" className="text-emerald-400" />
                <span className="text-white/55 text-sm">{hero.trustBadge}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right half — full-bleed image, hard edge */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-1/2 min-h-[40vh] lg:min-h-screen relative"
        >
          <img
            src={bgImage}
            alt={hero.backgroundAlt}
            className="w-full h-full object-cover absolute inset-0"
          />
          {/* Subtle bottom gradient on mobile only */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-navy-950 to-transparent lg:hidden" />
        </motion.div>
      </div>
    </section>
  );
}

export default HeroHardcut;
