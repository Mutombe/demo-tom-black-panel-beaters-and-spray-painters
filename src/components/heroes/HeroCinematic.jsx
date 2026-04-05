import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle, ShieldCheck } from '@phosphor-icons/react';
import siteData from '../../data/siteData';

function HeroCinematic() {
  const { business, hero } = siteData;
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Build image list for carousel
  const images = hero.backgroundImages?.length
    ? hero.backgroundImages
    : hero.backgroundImage
      ? [{ url: hero.backgroundImage, alt: hero.backgroundAlt || '' }]
      : [];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-cycle background images
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [images.length]);

  // Subtle parallax on mouse move
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  }, []);

  // Split title into words for stagger reveal
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
  
  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background carousel with Ken Burns zoom */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={`cinematic-bg-${currentSlide}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          >
            <motion.div
              className="w-full h-full"
              animate={{
                scale: [1.0, 1.1],
                x: mousePos.x * -8,
                y: mousePos.y * -8,
              }}
              transition={{
                scale: { duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' },
                x: { duration: 0.8, ease: 'easeOut' },
                y: { duration: 0.8, ease: 'easeOut' },
              }}
            >
              <img
                src={images[currentSlide]?.url || ''}
                alt={images[currentSlide]?.alt || ''}
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Film grain noise overlay */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            animation: 'noise-shift 8s steps(10) infinite',
          }}
        />

        {/* Multi-stop smoky gradient -- left side solid, fading to transparent on right */}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background: `linear-gradient(to right,
              rgba(15,29,48,0.95) 0%,
              rgba(15,29,48,0.88) 15%,
              rgba(15,29,48,0.75) 30%,
              rgba(15,29,48,0.58) 45%,
              rgba(15,29,48,0.40) 55%,
              rgba(15,29,48,0.22) 65%,
              rgba(15,29,48,0.08) 80%,
              transparent 100%
            )`,
          }}
        />
        {/* Radial gradient for depth */}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background: 'radial-gradient(ellipse at 30% 50%, transparent 0%, rgba(15,29,48,0.25) 60%, rgba(15,29,48,0.45) 100%)',
          }}
        />
        {/* Bottom fade for page transition */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent z-[2]" />
      </div>

      {/* Content -- aligned left on the solid gradient side */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 lg:pt-0">
        <div className="max-w-2xl xl:max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-4 py-2 mb-8"
          >
            <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
            <span className="text-gold-400 text-sm font-medium">{hero.badge}</span>
          </motion.div>

          {/* Heading with dramatic stagger reveal -- each word slides up */}
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
                    initial={{ opacity: 0, y: '100%', rotateX: 40 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.75,
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

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 + titleWords.length * 0.15 + 0.2 }}
            className="text-base sm:text-lg md:text-xl text-white/65 leading-relaxed mb-10 max-w-xl"
          >
            {hero.subtitle}
          </motion.p>

          {/* CTAs -- upgraded sizing */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 + titleWords.length * 0.15 + 0.4 }}
            className="flex flex-wrap gap-4 mb-12"
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

          {/* Trust bar -- enhanced glass card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 + titleWords.length * 0.15 + 0.6 }}
            className="inline-flex items-center gap-4 text-white/60 text-sm"
          >
            
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  weight="fill"
                  className={i < business.ratingRounded ? 'text-gold-400' : 'text-gold-400/40'}
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
        </div>
      </div>

      {/* Slide indicators -- right edge, vertically centered */}
      {images.length > 1 && (
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2.5 rounded-full transition-all duration-500 ${
                i === currentSlide
                  ? 'bg-gold-400 h-8 shadow-lg shadow-gold-400/40'
                  : 'bg-white/20 h-2.5 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default HeroCinematic;
