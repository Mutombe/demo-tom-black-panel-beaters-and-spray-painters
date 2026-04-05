import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowDown,
  MapPin,
  Phone,
  WhatsappLogo,
  Star,
  Quotes,
  CaretLeft,
  CaretRight,
  Heart,
  Briefcase,
  Buildings,
  Leaf,
  Lightbulb,
  CheckCircle,
} from '@phosphor-icons/react';
import PageTransition from '../components/PageTransition';
import siteData from '../data/siteData';


/* ================================================================
   UTILITY — Icon map for services
   ================================================================ */
const iconMap = {
  Heart, Briefcase, Star, Buildings, Leaf, Lightbulb,
};


/* ================================================================
   ANIMATED COUNTER — counts up when in view
   ================================================================ */
function AnimatedCounter({ target, suffix = '', duration = 2.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const numericTarget = parseInt(target.replace(/[^0-9]/g, ''), 10) || 0;

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = numericTarget / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericTarget) {
        setCount(numericTarget);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, numericTarget, duration]);

  return (
    <span ref={ref}>
      {inView ? count.toLocaleString() : '0'}{suffix}
    </span>
  );
}


/* ================================================================
   NOISE TEXTURE — reusable inline noise overlay
   ================================================================ */
function NoiseTexture({ opacity = 0.035 }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-10"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px',
      }}
    />
  );
}


/* ================================================================
   DECORATIVE PARTICLES
   ================================================================ */
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            background: `radial-gradient(circle, rgba(255,255,255,${Math.random() * 0.3 + 0.1}) 0%, transparent 70%)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `sparkle-float ${Math.random() * 8 + 6}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}


/* ================================================================
   1. HERO — Full Viewport, Cinematic Crossfade
   ================================================================ */
function HeroSection() {
  const { business, hero } = siteData;
  const containerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = hero.backgroundImages.map(img => img.url);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section ref={containerRef} className="relative h-screen min-h-[700px] overflow-hidden bg-navy-950">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <AnimatePresence mode="sync">
          <motion.img
            key={currentSlide}
            src={heroImages[currentSlide]}
            alt={hero.backgroundImages[currentSlide]?.alt}
            className="absolute inset-0 w-full h-[130%] object-cover object-center"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            loading="eager"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/50 to-navy-950/90 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-transparent to-navy-950/30 z-[1]" />
      </motion.div>

      <FloatingParticles />

      <div className="absolute right-5 sm:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-[3px] transition-all duration-700 ${
              i === currentSlide ? 'h-10 bg-orange-500' : 'h-4 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <NoiseTexture opacity={0.03} />

      <div className="absolute top-[15%] left-0 w-[2px] h-32 sm:h-48 bg-gradient-to-b from-transparent via-orange-500 to-transparent z-20" />

      <motion.div
        className="relative z-20 flex flex-col justify-center h-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-36"
        style={{ y: textY, opacity }}
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className="w-16 h-[2px] bg-gradient-to-r from-orange-500 to-orange-400/50 mb-6 origin-left"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-orange-400 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] mb-8"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {hero.badge}
        </motion.p>

        <div className="overflow-hidden">
          {['DECADES OF', 'CRAFT', 'ON KIRKMAN ROAD.'].map((line, i) => (
            <motion.div
              key={line}
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1
                className={`font-heading leading-[0.92] tracking-tight ${
                  line === 'CRAFT'
                    ? 'bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 bg-clip-text text-transparent italic'
                    : 'text-white'
                }`}
                style={{
                  fontSize: 'clamp(2.2rem, 7vw, 4.5rem)',
                  fontWeight: line === 'CRAFT' ? 700 : 300,
                }}
              >
                {line}
              </h1>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex items-center gap-3 mt-8"
        >
          <div className="w-8 h-[1px] bg-orange-500/40" />
          <p className="text-white/30 text-xs sm:text-sm uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-sans)' }}>
            8000+ Repairs &middot; 19 Years &middot; Kirkman Road
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="flex flex-wrap gap-4 mt-10"
        >
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-3 bg-orange-500 text-white px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold transition-all duration-500 hover:bg-orange-500 hover:shadow-xl hover:shadow-orange-500/20"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {hero.ctaPrimary}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold transition-all duration-500 hover:border-orange-500/50 hover:text-orange-400 hover:bg-white/5"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {hero.ctaSecondary}
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/20 text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: 'var(--font-sans)' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} className="text-orange-500/40" />
        </motion.div>
      </motion.div>

      <div className="hidden lg:flex absolute right-8 bottom-12 z-20">
        <span
          className="text-white/10 text-[10px] uppercase tracking-[0.4em]"
          style={{ writingMode: 'vertical-rl', fontFamily: 'var(--font-sans)' }}
        >
          Tom Black Panel Beaters and Spray Painters &mdash; Harare, Zimbabwe
        </span>
      </div>
    </section>
  );
}


/* ================================================================
   2. MARQUEE TICKER
   ================================================================ */
function MarqueeTicker() {
  const items = ['COLLISION REPAIR', 'SPRAY PAINTING', 'DENT REMOVAL', 'FRAME WORK', 'INSURANCE CLAIMS', 'CUSTOM BODY'];
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <section className="bg-navy-950 border-y border-orange-500/10 py-5 sm:py-6 overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-6 sm:gap-8 mx-6 sm:mx-8">
            <span className="text-orange-500/80 font-heading text-lg sm:text-2xl italic tracking-wider">
              {item}
            </span>
            <span className="text-orange-500/20 text-sm">&diams;</span>
          </span>
        ))}
      </div>
    </section>
  );
}


/* ================================================================
   3. SERVICES GRID — 6 cards with full-bleed photos
   ================================================================ */
function ServicesGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { servicesPreview, services } = siteData;

  const serviceImages = [
    'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
  ];

  return (
    <section ref={ref} className="bg-navy-900 py-24 sm:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-14 sm:mb-20"
        >
          <div className="w-12 h-[2px] bg-orange-500 mb-6" />
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="text-orange-500/60 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>What We Do</p>
              <h2 className="font-heading text-white leading-[0.92] italic" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
                Our <span className="text-orange-500">Services</span>
              </h2>
            </div>
            <Link
              to="/services"
              className="group text-white/30 text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:text-orange-500 transition-colors"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              All Services
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {servicesPreview.map((service, i) => {
            const IconComp = iconMap[service.icon] || Star;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.08 * i }}
                className={i === 0 ? 'sm:col-span-2 lg:col-span-2' : ''}
              >
                <Link
                  to={`/services#${services?.items?.[i]?.slug || ''}`}
                  className={`group relative block overflow-hidden ${i === 0 ? 'aspect-[16/9] sm:aspect-[2/1]' : 'aspect-[3/4]'}`}
                >
                  <img
                    src={serviceImages[i]}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/20 opacity-90" />

                  <div className="absolute top-4 right-5 z-10">
                    <span className="text-orange-500/15 font-heading text-6xl sm:text-7xl italic leading-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="absolute top-5 left-5 z-10 w-10 h-10 border border-orange-500/30 flex items-center justify-center bg-navy-950/60 backdrop-blur-sm group-hover:bg-orange-500/20 group-hover:border-orange-500/60 transition-all duration-500">
                    <IconComp size={18} weight="light" className="text-orange-500" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
                    <h3 className="font-heading text-white text-xl sm:text-2xl italic tracking-wide mb-2">
                      {service.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                      {service.desc}
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-orange-500 group-hover:translate-x-1 transition-transform duration-300">
                      <span className="text-xs uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-sans)' }}>Explore</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 to-orange-400 z-10" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


/* ================================================================
   4. PORTFOLIO GALLERY — Horizontal scrolling
   ================================================================ */
function PortfolioGallery() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-80px' });
  const { projects } = siteData;

  return (
    <section ref={containerRef} className="bg-navy-950 py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div>
            <div className="w-12 h-[2px] bg-orange-500 mb-6" />
            <p className="text-orange-500/60 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>Selected Works</p>
            <h2 className="font-heading text-white leading-[0.92] italic" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              Our <span className="text-orange-500">Portfolio</span>
            </h2>
          </div>
          <Link
            to="/projects"
            className="group text-white/30 text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:text-orange-500 transition-colors"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            View All
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto px-5 sm:px-8 lg:px-12 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {projects.items.map((project, i) => (
            <div
              key={project.slug}
              className="group relative flex-shrink-0 w-[300px] sm:w-[360px] lg:w-[420px] overflow-hidden"
            >
              <div className="aspect-[3/4] overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/40 transition-colors duration-700" />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500/40 transition-colors duration-500 z-10" />
                <div className="absolute top-5 left-5 z-10">
                  <span className="bg-orange-500/90 text-white text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 font-semibold" style={{ fontFamily: 'var(--font-sans)' }}>
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-navy-950 via-navy-950/80 to-transparent">
                <h4 className="text-white font-heading text-lg sm:text-xl italic tracking-wide">
                  {project.title}
                </h4>
                <p className="text-white/40 text-xs mt-1 uppercase tracking-wider" style={{ fontFamily: 'var(--font-sans)' }}>
                  {project.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}


/* ================================================================
   5. STATS BAND — Large animated counters
   ================================================================ */
function StatsBand() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const { stats } = siteData;

  return (
    <section ref={ref} className="relative bg-navy-950 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="text-center relative"
            >
              <div
                className="font-heading text-orange-500 leading-none italic"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', textShadow: '0 0 40px rgba(255,255,255,0.08)' }}
              >
                <AnimatedCounter target={stat.number.replace(/[^0-9]/g, '')} suffix={stat.number.replace(/[0-9]/g, '')} duration={2.5} />
              </div>
              <div className="text-white/30 text-xs sm:text-sm uppercase tracking-[0.25em] mt-3" style={{ fontFamily: 'var(--font-sans)' }}>
                {stat.label}
              </div>
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-16 w-[1px] bg-gradient-to-b from-transparent via-orange-500/15 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ================================================================
   6. ABOUT / STORY SECTION — Split layout
   ================================================================ */
function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="bg-navy-950 py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <div className="w-12 h-[2px] bg-orange-500 mb-6" />
            <p className="text-orange-500/60 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>Our Story</p>
            <h2 className="font-heading text-white leading-[0.95] italic mb-8" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              The Tom<br />
              <span className="text-orange-500">Story</span>
            </h2>
            <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-6 max-w-lg" style={{ fontFamily: 'var(--font-sans)' }}>
              Tom Black Panel Beaters is one of Harare's longest-running panel beating workshops. Since 2005, our Kirkman Road shop has been the destination for drivers who demand quality bodywork.
            </p>
            <p className="text-white/35 text-sm leading-relaxed max-w-lg" style={{ fontFamily: 'var(--font-sans)' }}>
              Nearly two decades and 8,000+ repairs have built a reputation that speaks for itself. We combine old-school craftsmanship with modern spray technology to deliver results that stand up to any factory finish.
            </p>

            <div className="w-full h-px bg-white/5 my-8" />

            <div className="flex gap-10 sm:gap-16">
              <div>
                <div className="text-orange-500 font-heading text-3xl sm:text-4xl italic leading-none">2005</div>
                <div className="text-white/30 text-[10px] uppercase tracking-[0.2em] mt-2" style={{ fontFamily: 'var(--font-sans)' }}>Founded</div>
              </div>
              <div>
                <div className="text-orange-500 font-heading text-3xl sm:text-4xl italic leading-none">8000+</div>
                <div className="text-white/30 text-[10px] uppercase tracking-[0.2em] mt-2" style={{ fontFamily: 'var(--font-sans)' }}>Served</div>
              </div>
              <div>
                <div className="text-orange-500 font-heading text-3xl sm:text-4xl italic leading-none">19+</div>
                <div className="text-white/30 text-[10px] uppercase tracking-[0.2em] mt-2" style={{ fontFamily: 'var(--font-sans)' }}>Years</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative">
              <div className="overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80"
                  alt="Tom Black Panel Beaters and Spray Painters"
                  className="w-full aspect-[4/5] object-cover object-center"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-8 -left-6 sm:-left-10 w-[45%] overflow-hidden border-4 border-navy-950 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80"
                  alt="Tom Black Panel Beaters and Spray Painters team"
                  className="w-full aspect-square object-cover object-center"
                  loading="lazy"
                />
              </div>
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-orange-500 text-white p-5 sm:p-7 shadow-2xl">
                <div className="text-center">
                  <div className="font-heading text-xs uppercase tracking-[0.2em] leading-none" style={{ fontFamily: 'var(--font-sans)' }}>Est.</div>
                  <div className="font-heading text-3xl sm:text-4xl italic leading-none mt-1">2005</div>
                </div>
              </div>
              <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-orange-500/30" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


/* ================================================================
   7. WHY CHOOSE US — 4 points with image
   ================================================================ */
function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const points = [
    { title: 'Insurance Approved', desc: 'Approved by every major insurer in Zimbabwe. Direct billing, no hassle.' },
    { title: 'Factory-Match Finishes', desc: 'Computerised colour matching and professional spray booths for perfect results.' },
    { title: 'Written Warranty', desc: 'Every repair backed by a written workmanship warranty for your peace of mind.' },
    { title: 'Fast Turnaround', desc: 'We respect your time. Most repairs completed within the quoted timeframe.' },
  ];

  return (
    <section ref={ref} className="bg-navy-900 py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80"
              alt="Tom Black Panel Beaters and Spray Painters"
              className="w-full aspect-[4/5] object-cover object-center"
              loading="lazy"
            />
            <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-orange-500/40" />
            <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-orange-500/40" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <div className="w-12 h-[2px] bg-orange-500 mb-6" />
            <p className="text-orange-500/60 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>The Difference</p>
            <h2 className="font-heading text-white leading-[0.95] italic mb-12" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
              Why Choose <span className="text-orange-500">Tom</span>
            </h2>

            <div className="space-y-8">
              {points.map((point, i) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  className="flex gap-5"
                >
                  <div className="shrink-0 mt-1">
                    <div className="w-8 h-8 border border-orange-500/30 flex items-center justify-center bg-orange-500/5">
                      <CheckCircle size={16} weight="fill" className="text-orange-500" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-heading text-white text-base sm:text-lg italic tracking-wide mb-1">
                      {point.title}
                    </h4>
                    <p className="text-white/40 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                      {point.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


/* ================================================================
   8. TESTIMONIALS — Dark bg, quote marks, auto-cycling
   ================================================================ */
function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const { homeTestimonials } = siteData;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % homeTestimonials.length);
  }, [homeTestimonials.length]);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + homeTestimonials.length) % homeTestimonials.length);
  }, [homeTestimonials.length]);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const t = homeTestimonials[active];

  return (
    <section ref={ref} className="relative bg-navy-950 py-24 sm:py-32 lg:py-40 overflow-hidden">
      <NoiseTexture opacity={0.02} />
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Quotes size={48} weight="fill" className="text-orange-500/15 mx-auto mb-8" />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <blockquote className="text-white text-lg sm:text-xl lg:text-2xl leading-relaxed font-heading italic mb-10">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <div className="flex flex-col items-center gap-3">
                {t.avatar && (
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover object-center border-2 border-orange-500/30" loading="lazy" />
                )}
                <div className="w-8 h-[2px] bg-orange-500" />
                <div className="text-white text-sm uppercase tracking-[0.15em] font-semibold" style={{ fontFamily: 'var(--font-sans)' }}>{t.name}</div>
                <div className="text-white/40 text-xs uppercase tracking-[0.15em]" style={{ fontFamily: 'var(--font-sans)' }}>{t.role}</div>
                <div className="flex items-center gap-0.5 mt-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={12} weight="fill" className="text-orange-500" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-center gap-6 mt-12">
            <button onClick={prev} className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/30 hover:text-orange-500 hover:border-orange-500/30 transition-colors duration-300" aria-label="Previous testimonial">
              <CaretLeft size={16} />
            </button>
            <div className="flex gap-2">
              {homeTestimonials.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} className={`h-[2px] transition-all duration-500 ${i === active ? 'w-10 bg-orange-500' : 'w-3 bg-white/10 hover:bg-white/25'}`} aria-label={`Go to testimonial ${i + 1}`} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/30 hover:text-orange-500 hover:border-orange-500/30 transition-colors duration-300" aria-label="Next testimonial">
              <CaretRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


/* ================================================================
   9. CTA SECTION — Cinematic full-bleed
   ================================================================ */
function CTASection() {
  const { business, homeCta } = siteData;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section ref={ref} className="relative py-28 sm:py-36 lg:py-48 overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img src={homeCta.backgroundImage} alt="Tom Black Panel Beaters and Spray Painters" className="w-full h-[130%] object-cover object-center" loading="lazy" />
        <div className="absolute inset-0 bg-navy-950/70" />
      </motion.div>
      <NoiseTexture opacity={0.03} />
      <div className="relative z-20 max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 1 }}>
          <div className="w-16 h-[2px] bg-orange-500 mx-auto mb-8" />
          <h2 className="font-heading text-white leading-[0.92] italic mb-8" style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}>
            TRUSTED<br />
            <span className="text-orange-500">SINCE 2005</span>
          </h2>
          <p className="text-white/50 text-sm sm:text-base lg:text-lg max-w-lg mx-auto mb-12 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
            {homeCta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="group relative inline-flex items-center gap-3 bg-orange-500 text-white px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold transition-all duration-500 hover:bg-orange-500 hover:shadow-xl hover:shadow-orange-500/25" style={{ fontFamily: 'var(--font-sans)' }}>
              {homeCta.ctaPrimary}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a href={`https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(homeCta.whatsappText)}`} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 border border-orange-500/40 text-orange-400 px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold transition-all duration-500 hover:bg-orange-500/10 hover:border-orange-500/60" style={{ fontFamily: 'var(--font-sans)' }}>
              <WhatsappLogo size={20} weight="fill" />
              {homeCta.ctaSecondary}
            </a>
          </div>
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-white/25 uppercase tracking-[0.15em]" style={{ fontFamily: 'var(--font-sans)' }}>
            <a href={`tel:${business.phoneRaw}`} className="flex items-center gap-2 hover:text-orange-500 transition-colors">
              <Phone size={14} /> {business.phone}
            </a>
            <span className="hidden sm:inline text-white/10">|</span>
            <a href={`mailto:${business.email}`} className="hover:text-orange-500 transition-colors">{business.email}</a>
            <span className="hidden sm:inline text-white/10">|</span>
            <span className="flex items-center gap-2"><MapPin size={14} /> Harare, Zimbabwe</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


/* ================================================================
   HOME — Assembled
   ================================================================ */
function Home() {
  return (
    <PageTransition>
      <HeroSection />
      <MarqueeTicker />
      <ServicesGrid />
      <PortfolioGallery />
      <StatsBand />
      <AboutSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <CTASection />
    </PageTransition>
  );
}

export default Home;
