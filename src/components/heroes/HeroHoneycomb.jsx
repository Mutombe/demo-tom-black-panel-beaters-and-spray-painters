import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Star, CheckCircle } from '@phosphor-icons/react';
import siteData from '../../data/siteData';

/**
 * HeroHoneycomb — Copied from Silvergill's HeroHex.
 * Carousel hero with animated honeycomb image grid.
 * Proper geometric hex layout: Row 0 (2), Row 1 (3 with CTA center), Row 2 (1).
 */
const HEX_CLIP = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';

const layoutHex = (row, col, size, gap = 10) => {
  const height = size * 1.1547;
  const xStep = size + gap;
  const yStep = (height * 0.75) + gap;
  const xOffset = (row % 2 === 1) ? (xStep / 2) : 0;

  return {
    width: `${size}px`,
    height: `${height}px`,
    left: `${col * xStep + xOffset}px`,
    top: `${row * yStep}px`,
    clipPath: HEX_CLIP,
  };
};

function HeroHoneycomb() {
  const { business, hero } = siteData;
  const [currentSlide, setCurrentSlide] = useState(0);

  const allImages = hero.backgroundImages?.length
    ? hero.backgroundImages.map(img => img.url)
    : hero.backgroundImage
      ? [hero.backgroundImage]
      : [];

  // Build slides of 5 images each
  const slides = [];
  if (allImages.length > 0) {
    const numSlides = Math.min(3, Math.max(1, Math.ceil(allImages.length / 3)));
    for (let s = 0; s < numSlides; s++) {
      const slideImages = [];
      for (let i = 0; i < 5; i++) {
        slideImages.push(allImages[(s * 3 + i) % allImages.length]);
      }
      slides.push({
        images: slideImages,
        bgImage: allImages[s % allImages.length],
      });
    }
  }

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const current = slides[currentSlide] || { images: allImages.slice(0, 5), bgImage: allImages[0] || '' };

  return (
    <section className="relative min-h-screen overflow-hidden bg-navy-950">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${currentSlide}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src={current.bgImage}
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950/95 via-navy-900/90 to-navy-800/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-950/50 to-transparent" />

      {/* Main Container */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-start lg:justify-between px-6 lg:px-12 xl:px-20 pt-32 lg:pt-48 pb-20 lg:pb-0">

        {/* Left Content Text */}
        <div className="w-full lg:w-[45%] relative z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <motion.span className="block text-gold-400 text-xs font-semibold uppercase tracking-[3px] mb-3">
                {hero.badge}
              </motion.span>

              {/* Heading */}
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[0.9] mb-6"
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

              <motion.p className="text-white/60 text-sm md:text-base max-w-[400px] leading-relaxed">
                {hero.subtitle}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          {slides.length > 1 && (
            <div className="flex items-center gap-2 mt-8">
              <button onClick={prevSlide} className="w-10 h-10 border border-white/30 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-all">
                <ArrowLeft size={18} />
              </button>
              <button onClick={nextSlide} className="w-10 h-10 border border-white/30 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-all">
                <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* Trust Row */}
          <div className="hidden lg:flex items-center gap-6 mt-10">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} weight="fill" className={i < business.ratingRounded ? 'text-gold-400' : 'text-gold-400/40'} />
              ))}
              <span className="text-white/50 text-sm ml-2">{business.rating}/5</span>
            </div>
            <div className="h-5 w-px bg-white/15" />
            <div className="flex items-center gap-2">
              <CheckCircle size={14} weight="fill" className="text-emerald-400" />
              <span className="text-white/50 text-sm">{hero.trustBadge}</span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            DESKTOP HONEYCOMB GRID — exact Silvergill layout
            Row 0: col 0, col 1 (2 images)
            Row 1: col 0, col 1 (CTA), col 2 (3 cells)
            Row 2: col 1 (1 image)
            ═══════════════════════════════════════ */}
        <div className="hidden lg:block relative w-[600px] h-[500px] xl:-mr-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-full"
            >
              {/* Row 0, Col 0 */}
              <motion.div className="absolute" style={layoutHex(0, 0, 160, 15)} initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} transition={{delay:0.1}}>
                <img src={current.images[0]} alt="" className="w-full h-full object-cover" />
              </motion.div>
              {/* Row 0, Col 1 */}
              <motion.div className="absolute" style={layoutHex(0, 1, 160, 15)} initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} transition={{delay:0.2}}>
                <img src={current.images[1]} alt="" className="w-full h-full object-cover" />
              </motion.div>
              {/* Row 1, Col 0 */}
              <motion.div className="absolute" style={layoutHex(1, 0, 160, 15)} initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} transition={{delay:0.3}}>
                <img src={current.images[2]} alt="" className="w-full h-full object-cover" />
              </motion.div>
              {/* Row 1, Col 1 — CTA BUTTON */}
              <motion.div className="absolute z-10" style={layoutHex(1, 1, 160, 15)} initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} transition={{delay:0.4}}>
                <Link to="/contact" className="block w-full h-full bg-gradient-to-br from-gold-400 to-gold-600 hover:from-gold-300 hover:to-gold-500 transition-all duration-300 group">
                  <span className="absolute inset-0 flex flex-col items-center justify-center text-navy-950 font-bold">
                    <span className="text-sm tracking-[0.2em] group-hover:scale-105 transition-transform">GET A</span>
                    <span className="text-2xl tracking-[0.15em] mt-1 group-hover:scale-105 transition-transform">QUOTE</span>
                  </span>
                </Link>
              </motion.div>
              {/* Row 1, Col 2 */}
              <motion.div className="absolute" style={layoutHex(1, 2, 160, 15)} initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} transition={{delay:0.5}}>
                <img src={current.images[3]} alt="" className="w-full h-full object-cover" />
              </motion.div>
              {/* Row 2, Col 1 */}
              <motion.div className="absolute" style={layoutHex(2, 1, 160, 15)} initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} transition={{delay:0.6}}>
                <img src={current.images[4]} alt="" className="w-full h-full object-cover" />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ═══════════════════════════════════════
            MOBILE HONEYCOMB GRID — scaled to 90px
            ═══════════════════════════════════════ */}
        <div className="lg:hidden relative w-[300px] h-[350px] mt-12 mx-auto z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={`mob-${currentSlide}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-full"
            >
              {/* Row 0 */}
              <motion.div className="absolute" style={layoutHex(0, 0, 90, 8)} initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} transition={{delay:0.1}}>
                <img src={current.images[0]} alt="" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div className="absolute" style={layoutHex(0, 1, 90, 8)} initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} transition={{delay:0.2}}>
                <img src={current.images[1]} alt="" className="w-full h-full object-cover" />
              </motion.div>

              {/* Row 1 */}
              <motion.div className="absolute" style={layoutHex(1, 0, 90, 8)} initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} transition={{delay:0.3}}>
                <img src={current.images[2]} alt="" className="w-full h-full object-cover" />
              </motion.div>
              {/* CTA */}
              <motion.div className="absolute z-10" style={layoutHex(1, 1, 90, 8)} initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} transition={{delay:0.4}}>
                <Link to="/contact" className="flex w-full h-full bg-gradient-to-br from-gold-400 to-gold-600 items-center justify-center font-bold text-navy-950">
                  <span className="flex flex-col items-center">
                    <span className="text-[10px] tracking-widest">GET A</span>
                    <span className="text-sm tracking-widest">QUOTE</span>
                  </span>
                </Link>
              </motion.div>
              <motion.div className="absolute" style={layoutHex(1, 2, 90, 8)} initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} transition={{delay:0.5}}>
                <img src={current.images[3]} alt="" className="w-full h-full object-cover" />
              </motion.div>

              {/* Row 2 */}
              <motion.div className="absolute" style={layoutHex(2, 1, 90, 8)} initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} transition={{delay:0.6}}>
                <img src={current.images[4]} alt="" className="w-full h-full object-cover" />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-6 lg:left-12 z-30 flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-gold-400 w-8' : 'bg-white/30 w-1.5 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default HeroHoneycomb;
