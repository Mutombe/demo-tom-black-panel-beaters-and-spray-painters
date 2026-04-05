import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle } from '@phosphor-icons/react';
import siteData from '../../data/siteData';

/**
 * HeroScattered — Floating cards/panels scattered at different Z-levels.
 * Mix of stat cards, image cards, and pill labels arranged organically.
 * Creates a "creative workspace" feel.
 */
function HeroScattered() {
  const { business, hero, stats } = siteData;
  const images = hero.backgroundImages || [];
  const displayStats = (stats || []).slice(0, 4);

  // Floating card positions (desktop only) — organic scatter
  const floatingCards = [
    { type: 'image', x: '58%', y: '15%', w: 200, h: 140, rotate: -3, delay: 0.8, imgIdx: 0 },
    { type: 'image', x: '72%', y: '40%', w: 180, h: 220, rotate: 4, delay: 1.0, imgIdx: 1 },
    { type: 'image', x: '55%', y: '58%', w: 160, h: 120, rotate: -2, delay: 1.2, imgIdx: 2 },
    { type: 'stat', x: '82%', y: '22%', rotate: 2, delay: 0.9, statIdx: 0 },
    { type: 'stat', x: '62%', y: '75%', rotate: -4, delay: 1.3, statIdx: 1 },
    { type: 'pill', x: '78%', y: '65%', rotate: 3, delay: 1.1, text: hero.trustBadge },
  ];

  return (
    <section className="relative min-h-screen bg-navy-950 overflow-hidden">
      {/* Subtle gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 70% 50%, rgba(212,175,55,0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 30% 30%, rgba(15,29,48,1) 0%, rgba(15,29,48,1) 100%)`,
        }}
      />

      {/* Scattered floating cards — desktop only */}
      <div className="hidden lg:block absolute inset-0 z-[1]">
        {floatingCards.map((card, i) => {
          if (card.type === 'image' && images[card.imgIdx]) {
            return (
              <motion.div
                key={i}
                className="absolute rounded-2xl overflow-hidden shadow-2xl shadow-black/30"
                style={{
                  left: card.x,
                  top: card.y,
                  width: card.w,
                  height: card.h,
                }}
                initial={{ opacity: 0, y: 30, rotate: card.rotate + 10, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, rotate: card.rotate, scale: 1 }}
                transition={{ duration: 0.9, delay: card.delay, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.05, rotate: 0, transition: { duration: 0.3 } }}
              >
                <img
                  src={images[card.imgIdx].url}
                  alt={images[card.imgIdx].alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
              </motion.div>
            );
          }

          if (card.type === 'stat' && displayStats[card.statIdx]) {
            const stat = displayStats[card.statIdx];
            return (
              <motion.div
                key={i}
                className="absolute bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 shadow-xl"
                style={{ left: card.x, top: card.y }}
                initial={{ opacity: 0, y: 20, rotate: card.rotate + 8, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, rotate: card.rotate, scale: 1 }}
                transition={{ duration: 0.8, delay: card.delay, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.08, rotate: 0, transition: { duration: 0.3 } }}
              >
                <div className="text-2xl font-bold text-gold-400">{stat.number}</div>
                <div className="text-xs text-white/50 mt-0.5">{stat.label}</div>
              </motion.div>
            );
          }

          if (card.type === 'pill') {
            return (
              <motion.div
                key={i}
                className="absolute bg-emerald-500/15 backdrop-blur-sm border border-emerald-500/20 rounded-full px-4 py-2 shadow-lg"
                style={{ left: card.x, top: card.y }}
                initial={{ opacity: 0, scale: 0.7, rotate: card.rotate }}
                animate={{ opacity: 1, scale: 1, rotate: card.rotate }}
                transition={{ duration: 0.7, delay: card.delay }}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} weight="fill" className="text-emerald-400" />
                  <span className="text-emerald-300 text-xs font-medium">{card.text}</span>
                </div>
              </motion.div>
            );
          }

          return null;
        })}
      </div>

      {/* Main text content — left side */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center pt-28 pb-16 lg:pt-0 lg:pb-0">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-4 py-2 mb-6"
          >
            <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
            <span className="text-gold-400 text-sm font-medium">{hero.badge}</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08] mb-6"
          >
            {hero.titleParts.map((part, i) =>
              part.highlight ? (
                <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">{part.text}</span>
              ) : (
                <React.Fragment key={i}>{part.text}</React.Fragment>
              )
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base sm:text-lg text-white/55 leading-relaxed mb-10 max-w-md"
          >
            {hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
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
            transition={{ duration: 0.5, delay: 1.0 }}
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

          {/* Mobile-only image showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-10 flex gap-3 lg:hidden"
          >
            {images.slice(0, 3).map((img, i) => (
              <div
                key={i}
                className="flex-1 aspect-square rounded-xl overflow-hidden"
              >
                <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroScattered;
