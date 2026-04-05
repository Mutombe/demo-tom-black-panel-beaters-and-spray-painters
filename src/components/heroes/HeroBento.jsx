import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck } from '@phosphor-icons/react';
import siteData from '../../data/siteData';

function HeroBento() {
  const { business, hero, stats } = siteData;
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const images = hero.backgroundImages || [];
  const img1 = images[0]?.url || hero.backgroundImage;
  const img2 = images[1]?.url || hero.backgroundImage;
  const img3 = images[2]?.url || hero.backgroundImage;

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
      className="relative min-h-screen bg-navy-950 overflow-hidden"
    >
      {/* Full-width mosaic grid */}
      <div className="pt-24 lg:pt-28 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* 7:5 asymmetric grid */}
          <motion.div
            className="grid grid-cols-12 gap-3 sm:gap-4 h-[55vh] sm:h-[60vh] lg:h-[70vh] min-h-[400px] sm:min-h-[500px]"
            animate={{
              x: mousePos.x * -5,
              y: mousePos.y * -5,
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Left -- main image (col-span-7) */}
            <div className="col-span-12 sm:col-span-7 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden relative group cursor-pointer">
              <img
                src={img1}
                alt={hero.backgroundAlt || 'Main showcase'}
                className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-navy-950/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-950/25 to-transparent" />
            </div>

            {/* Right -- 2 stacked images (col-span-5) with hover effects */}
            <div className="hidden sm:grid col-span-5 grid-rows-2 gap-3 sm:gap-4">
              <div className="rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden relative group cursor-pointer">
                <img
                  src={img2}
                  alt="Project showcase"
                  className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/35 to-transparent transition-opacity duration-500 group-hover:opacity-60" />
              </div>
              <div className="rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden relative group cursor-pointer">
                <img
                  src={img3}
                  alt="Project showcase"
                  className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/35 to-transparent transition-opacity duration-500 group-hover:opacity-60" />
              </div>
            </div>
          </motion.div>

          {/* Glassmorphic content card -- larger, more prominent */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-6 sm:bottom-8 left-4 sm:left-6 right-4 sm:right-auto z-10 bg-navy-950/65 backdrop-blur-2xl border border-white/[0.12] rounded-2xl sm:rounded-3xl px-7 sm:px-10 py-7 sm:py-10 max-w-xl lg:max-w-2xl shadow-2xl shadow-black/30"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-4 py-2 mb-5">
              <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
              <span className="text-gold-400 text-sm font-medium tracking-wide">
                {hero.badge}
              </span>
            </div>

            {/* Heading with word-by-word stagger */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08] mb-5">
              <span className="inline-flex flex-wrap gap-x-[0.2em]">
                {titleWords.map((word, i) => (
                  <span key={i} className="overflow-hidden inline-block">
                    <motion.span
                      className={`inline-block ${
                        word.highlight
                          ? 'text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600'
                          : ''
                      }`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.65,
                        delay: 0.8 + i * 0.15,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {word.text}
                    </motion.span>
                  </span>
                ))}
              </span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + titleWords.length * 0.15 + 0.2 }}
              className="text-sm sm:text-base md:text-lg text-white/55 leading-relaxed mb-7 max-w-md"
            >
              {hero.subtitle}
            </motion.p>

            {/* CTAs -- upgraded sizing */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + titleWords.length * 0.15 + 0.35 }}
              className="flex flex-wrap gap-3 mb-6"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-gold-500 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg text-sm sm:text-base font-bold transition-all duration-300 hover:bg-gold-600 hover:shadow-xl hover:shadow-gold-500/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                {hero.ctaPrimary}
                <ArrowRight size={20} weight="bold" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg text-sm sm:text-base font-bold backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:-translate-y-0.5 active:translate-y-0"
              >
                {hero.ctaSecondary}
              </Link>
            </motion.div>

            {/* Trust bar with avatars */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 + titleWords.length * 0.15 + 0.5 }}
              className="flex items-center gap-4 flex-wrap"
            >
              <div className="flex -space-x-2">
                {avatarColors.map((color, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-navy-950/80"
                    style={{ backgroundColor: color, zIndex: avatarColors.length - i }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    weight="fill"
                    className={i < business.ratingRounded ? 'text-gold-400' : 'text-gold-400/40'}
                  />
                ))}
                <span className="text-white/60 text-xs ml-1.5 font-medium">
                  {business.rating}/5
                </span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-white/15" />
              <div className="hidden sm:flex items-center gap-1.5">
                <ShieldCheck size={15} weight="fill" className="text-emerald-400" />
                <span className="text-white/60 text-xs font-medium">{hero.trustBadge}</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats bar below the grid -- with gentle pulse */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pb-8"
        >
          {(stats || []).map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 + i * 0.1 }}
              className="group text-center py-5 px-4 border border-white/[0.08] rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-500"
            >
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gold-400 mb-1.5 tracking-tight"
              >
                {stat.number}
              </motion.div>
              <div className="text-xs sm:text-sm text-white/50 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default HeroBento;
