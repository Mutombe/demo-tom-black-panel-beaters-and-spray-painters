import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck } from '@phosphor-icons/react';
import siteData from '../../data/siteData';

function HeroSplit() {
  const { business, hero, stats } = siteData;
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const bgImage = hero.backgroundImages?.[0]?.url || hero.backgroundImage;
  const displayStats = (stats || []).slice(0, 2);

  // Subtle parallax on mouse move
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  }, []);

  // Split title into words for stagger animation
  const titleWords = hero.titleParts.flatMap((part) => {
    const words = part.text.split(/(\s+)/);
    return words
      .filter((w) => w.trim().length > 0)
      .map((word) => ({
        text: word + ' ',
        highlight: part.highlight || false,
      }));
  });

  // Avatar placeholder colors
  
  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center bg-navy-950 overflow-hidden"
    >
      {/* Full-bleed background image -- covers entire section with parallax */}
      <div className="absolute inset-0">
        <motion.div
          className="w-full h-full"
          animate={{
            x: mousePos.x * -8,
            y: mousePos.y * -8,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <img
            src={bgImage}
            alt={hero.backgroundAlt}
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </motion.div>
      </div>

      {/* Gradient overlay -- dark on left fading to semi-transparent on right */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right,
            rgba(15,29,48,0.95) 0%,
            rgba(15,29,48,0.90) 25%,
            rgba(15,29,48,0.70) 45%,
            rgba(15,29,48,0.40) 65%,
            rgba(15,29,48,0.18) 85%,
            rgba(15,29,48,0.08) 100%
          )`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-navy-950/25" />
      {/* Radial gradient for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 25% 50%, transparent 0%, rgba(15,29,48,0.15) 50%, rgba(15,29,48,0.30) 100%)',
        }}
      />

      {/* Decorative gold accent line at image edge */}
      <div className="absolute top-[15%] bottom-[15%] right-[45%] lg:right-[42%] w-px bg-gradient-to-b from-transparent via-gold-500/30 to-transparent hidden lg:block z-[5]" />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16 lg:pt-0 lg:pb-0">
        <div className="lg:max-w-[52%] xl:max-w-[50%]">
          {/* Accent line above heading */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            className="h-[3px] bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 mb-8 rounded-full"
          />

          {/* Eyebrow / badge */}
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="inline-block text-gold-400 text-xs font-semibold uppercase tracking-[3px] mb-6"
          >
            {hero.badge}
          </motion.span>

          {/* Heading with word-by-word stagger */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08] mb-7">
            <span className="inline-flex flex-wrap gap-x-[0.2em]">
              {titleWords.map((word, i) => (
                <span key={i} className="overflow-hidden inline-block">
                  <motion.span
                    className={`inline-block ${
                      word.highlight
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600'
                        : ''
                    }`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.5 + i * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {word.text}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          {/* Subtitle with more breathing room */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 + titleWords.length * 0.15 + 0.15 }}
            className="text-base sm:text-lg md:text-xl text-white/60 leading-relaxed mb-10 max-w-lg"
          >
            {hero.subtitle}
          </motion.p>

          {/* CTAs -- upgraded sizing */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 + titleWords.length * 0.15 + 0.3 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 bg-gold-500 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg text-sm sm:text-base font-bold transition-all duration-300 hover:bg-gold-600 hover:shadow-xl hover:shadow-gold-500/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              {hero.ctaPrimary}
              <ArrowRight size={20} weight="bold" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2.5 border-2 border-white/30 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg text-sm sm:text-base font-bold backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:-translate-y-0.5 active:translate-y-0"
            >
              {hero.ctaSecondary}
            </Link>
          </motion.div>

          {/* Stats row */}
          {displayStats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + titleWords.length * 0.15 + 0.45 }}
              className="flex gap-8 mb-8"
            >
              {displayStats.map((stat, idx) => (
                <React.Fragment key={stat.label}>
                  {idx > 0 && <div className="w-px bg-white/15" />}
                  <div>
                    <span className="text-3xl sm:text-4xl font-black text-gold-400 block leading-none">
                      {stat.number}
                    </span>
                    <span className="text-xs sm:text-sm text-white/55 block mt-1.5 font-medium">
                      {stat.label}
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>
          )}

          {/* Trust bar -- enhanced glass card with avatars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 + titleWords.length * 0.15 + 0.6 }}
            className="inline-flex items-center gap-4 text-white/60 text-sm"
          >
            
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={15}
                  weight="fill"
                  className={i < business.ratingRounded ? 'text-gold-400' : 'text-gold-400/40'}
                />
              ))}
              <span className="text-white/65 text-sm ml-1.5 font-medium">
                {business.rating}/5
              </span>
              <span className="text-white/45 text-sm">
                ({business.reviewCount} reviews)
              </span>
            </div>
            <div className="hidden sm:block h-8 w-px bg-white/15" />
            <div className="hidden sm:flex items-center gap-2">
              <ShieldCheck size={17} weight="fill" className="text-emerald-400" />
              <span className="text-white/65 text-sm font-medium">{hero.trustBadge}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating stat card overlapping the image boundary */}
      {displayStats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 30, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-[8%] bottom-[12%] z-10 hidden lg:block"
        >
          <div className="bg-navy-950/70 backdrop-blur-2xl border border-white/[0.12] rounded-2xl px-7 py-6 shadow-2xl shadow-black/30 min-w-[180px]">
            <div className="text-4xl font-black text-gold-400 leading-none mb-1">
              {displayStats[0].number}
            </div>
            <div className="text-sm text-white/55 font-medium">{displayStats[0].label}</div>
            {displayStats[1] && (
              <>
                <div className="w-full h-px bg-white/10 my-4" />
                <div className="text-4xl font-black text-gold-400 leading-none mb-1">
                  {displayStats[1].number}
                </div>
                <div className="text-sm text-white/55 font-medium">{displayStats[1].label}</div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </section>
  );
}

export default HeroSplit;
