import React, { useMemo, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck } from '@phosphor-icons/react';
import siteData from '../../data/siteData';

function HeroParallax() {
  const { business, hero } = siteData;
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Subtle parallax on mouse move
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  }, []);

  // Build image pool from backgroundImages, fallback to single image
  const imagePool = useMemo(() => {
    const imgs = hero.backgroundImages?.length
      ? hero.backgroundImages.slice(0, 3)
      : hero.backgroundImage
        ? [{ url: hero.backgroundImage, alt: hero.backgroundAlt || '' }]
        : [];
    return imgs;
  }, [hero.backgroundImages, hero.backgroundImage, hero.backgroundAlt]);

  // Create columns -- 4 columns, each with 5 images distributed from the pool
  const columns = useMemo(() => {
    if (imagePool.length === 0) return [];
    const cols = [];
    for (let c = 0; c < 4; c++) {
      const colImages = [];
      for (let i = 0; i < 5; i++) {
        colImages.push(imagePool[(c + i) % imagePool.length]);
      }
      cols.push(colImages);
    }
    return cols;
  }, [imagePool]);

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

  // Avatar placeholder colors for trust bar
  
  if (imagePool.length === 0) return null;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-navy-950"
    >
      {/* Scrolling image columns behind everything -- more visible, blurred */}
      <motion.div
        className="absolute inset-0 flex gap-3 sm:gap-4 px-2 sm:px-4 opacity-45"
        animate={{
          x: mousePos.x * -6,
          y: mousePos.y * -6,
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ filter: 'blur(2px)' }}
      >
        {columns.map((colImages, colIndex) => {
          const isEven = colIndex % 2 === 0;
          const duration = 22 + colIndex * 5;

          return (
            <div
              key={colIndex}
              className="flex-1 overflow-hidden relative"
            >
              <motion.div
                className="flex flex-col gap-3 sm:gap-4"
                animate={{
                  y: isEven ? ['0%', '-50%'] : ['-50%', '0%'],
                }}
                transition={{
                  duration: duration,
                  ease: 'linear',
                  repeat: Infinity,
                }}
              >
                {/* Duplicate images for seamless loop */}
                {[...colImages, ...colImages].map((img, i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden aspect-[3/4] w-full flex-shrink-0"
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* Dark gradient overlay for text readability -- reduced opacity for visibility */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(15,29,48,0.75) 0%,
            rgba(15,29,48,0.60) 20%,
            rgba(15,29,48,0.55) 40%,
            rgba(15,29,48,0.58) 55%,
            rgba(15,29,48,0.68) 70%,
            rgba(15,29,48,0.82) 85%,
            rgba(15,29,48,0.95) 100%
          )`,
        }}
      />
      {/* Extra radial vignette for center focus */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse at center 40%, rgba(15,29,48,0.45) 0%, rgba(15,29,48,0.15) 40%, rgba(15,29,48,0.55) 100%)',
        }}
      />

      {/* Centered text content -- stronger glassmorphism card */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto bg-navy-950/60 backdrop-blur-xl border border-white/10 rounded-3xl sm:rounded-[2rem] px-6 sm:px-10 lg:px-14 py-10 sm:py-14 lg:py-16 shadow-2xl shadow-black/20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="inline-flex items-center gap-2.5 bg-white/[0.06] border border-white/[0.12] backdrop-blur-md rounded-full px-5 py-2.5 mb-8"
          >
            <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
            <span className="text-gold-400 text-sm font-medium tracking-wide">
              {hero.badge}
            </span>
          </motion.div>

          {/* Heading with word-by-word stagger */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-7">
            <span className="inline-flex flex-wrap justify-center gap-x-[0.2em]">
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
                      delay: 0.6 + i * 0.15,
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
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 + titleWords.length * 0.15 + 0.2 }}
            className="text-base sm:text-lg md:text-xl text-white/60 leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            {hero.subtitle}
          </motion.p>

          {/* CTAs -- upgraded sizing */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 + titleWords.length * 0.15 + 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
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

          {/* Trust bar -- enhanced glass card with avatars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 + titleWords.length * 0.15 + 0.6 }}
            className="inline-flex items-center gap-5 bg-white/[0.05] backdrop-blur-lg border border-white/[0.08] rounded-2xl px-6 py-4"
          >
            
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  weight="fill"
                  className={
                    i < business.ratingRounded
                      ? 'text-gold-400'
                      : 'text-gold-400/40'
                  }
                />
              ))}
              <span className="text-white/70 text-sm ml-1.5 font-medium">
                {business.rating}/5
              </span>
              <span className="text-white/50 text-sm">
                ({business.reviewCount} reviews)
              </span>
            </div>
            <div className="hidden sm:block h-8 w-px bg-white/15" />
            <div className="hidden sm:flex items-center gap-2">
              <ShieldCheck size={18} weight="fill" className="text-emerald-400" />
              <span className="text-white/70 text-sm font-medium">{hero.trustBadge}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroParallax;
