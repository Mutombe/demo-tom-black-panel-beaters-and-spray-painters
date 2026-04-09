import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowDown, Phone, WhatsappLogo, Star, Quotes, CaretLeft, CaretRight,
  CheckCircle, ShieldCheck, Wrench, Car, Clock, Eye, Target, Trophy,
} from '@phosphor-icons/react';
import PageTransition from '../components/PageTransition';
import siteData from '../data/siteData';

const iconMap = { Wrench, Car, ShieldCheck, Eye, Target, Trophy, Star };

function AnimatedCounter({ target, suffix = '', duration = 2.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const numericTarget = parseInt(String(target).replace(/[^0-9]/g, ''), 10) || 0;
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const inc = numericTarget / (duration * 60);
    const timer = setInterval(() => { start += inc; if (start >= numericTarget) { setCount(numericTarget); clearInterval(timer); } else setCount(Math.floor(start)); }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, numericTarget, duration]);
  return <span ref={ref}>{inView ? count.toLocaleString() : '0'}{suffix}</span>;
}

function NoiseTexture({ opacity = 0.035 }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-10" style={{ opacity, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px' }} />
  );
}

/* ================================================================
   EMBER PARTICLES -- floating orange embers
   ================================================================ */
function EmberParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
      {[...Array(30)].map((_, i) => (
        <div key={i} className="absolute" style={{
          width: `${Math.random() * 3 + 1}px`, height: `${Math.random() * 6 + 2}px`,
          background: `linear-gradient(to top, rgba(249,115,22,${Math.random() * 0.8 + 0.2}), transparent)`,
          left: `${Math.random() * 100}%`, bottom: `${Math.random() * 30}%`,
          animation: `sparkle-float ${Math.random() * 5 + 3}s ease-out infinite`,
          animationDelay: `${Math.random() * 3}s`, borderRadius: '50%',
        }} />
      ))}
    </div>
  );
}

/* ================================================================
   1. HERO -- Full Viewport, Industrial Dark + Ember Sparks
   ================================================================ */
function HeroSection() {
  const { business, hero } = siteData;
  const containerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = hero?.backgroundImages?.map(img => img.url) || [
    'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1400&q=80',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1400&q=80',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=80',
  ];
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(p => (p + 1) % heroImages.length), 5500);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section ref={containerRef} className="relative h-screen min-h-[700px] overflow-hidden bg-black">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <AnimatePresence mode="sync">
          <motion.img key={currentSlide} src={heroImages[currentSlide]} alt="Tom Black workshop" className="absolute inset-0 w-full h-[130%] object-cover object-center" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2.5, ease: 'easeInOut' }} loading="eager" />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/55 to-black/95 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-transparent to-black/50 z-[1]" />
      </motion.div>

      <EmberParticles />
      <NoiseTexture opacity={0.045} />

      {/* Orange hot-rod stripe -- left edge */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500/0 via-orange-500 to-orange-500/0 z-20" />

      {/* Slide indicators -- bottom horizontal */}
      <div className="absolute bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {heroImages.map((_, i) => (
          <button key={i} onClick={() => setCurrentSlide(i)} className={`h-[3px] transition-all duration-700 ${i === currentSlide ? 'w-12 bg-orange-500' : 'w-4 bg-white/15 hover:bg-white/30'}`} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>

      <motion.div className="relative z-20 flex flex-col justify-center h-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-36" style={{ y: textY, opacity: textOpacity }}>
        {/* Spark icon */}
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="w-14 h-14 bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-8">
          <Wrench size={24} weight="fill" className="text-orange-500" />
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="text-orange-400 text-xs sm:text-sm font-semibold uppercase tracking-[0.35em] mb-6" style={{ fontFamily: 'var(--font-sans)' }}>
          {hero?.badge || 'Master Spray Painters'}
        </motion.p>

        <div className="overflow-hidden">
          {['PRECISION', 'PAINT', 'PERFECTION.'].map((line, i) => (
            <motion.div key={line} initial={{ y: '120%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.5 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}>
              <h1 className={`font-heading leading-[0.85] tracking-tighter ${line === 'PAINT' ? 'bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent' : 'text-white'}`} style={{ fontSize: 'clamp(2.2rem, 7vw, 4.5rem)', fontWeight: line === 'PAINT' ? 900 : 200 }}>
                {line}
              </h1>
            </motion.div>
          ))}
        </div>

        {/* Warranty badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.2 }} className="flex flex-wrap items-center gap-4 mt-8">
          <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 px-4 py-2.5">
            <ShieldCheck size={18} weight="fill" className="text-orange-500" />
            <span className="text-orange-300 text-xs uppercase tracking-[0.15em] font-semibold" style={{ fontFamily: 'var(--font-sans)' }}>Lifetime Colour Warranty</span>
          </div>
          <div className="flex items-center gap-2 text-white/25 text-xs uppercase tracking-[0.15em]" style={{ fontFamily: 'var(--font-sans)' }}>
            <div className="w-6 h-[1px] bg-orange-500/30" />
            Kirkman Rd, Harare
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.4 }} className="flex flex-wrap gap-4 mt-8">
          <Link to="/contact" className="group inline-flex items-center gap-3 bg-orange-500 text-black px-8 py-4 text-sm uppercase tracking-[0.15em] font-bold transition-all duration-500 hover:bg-orange-400 hover:shadow-xl hover:shadow-orange-500/25" style={{ fontFamily: 'var(--font-sans)' }}>
            {hero?.ctaPrimary || 'Free Assessment'} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="tel:+263772379707" className="group inline-flex items-center gap-3 border border-white/15 text-white px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold hover:border-orange-500/40 hover:text-orange-400 transition-all duration-500" style={{ fontFamily: 'var(--font-sans)' }}>
            <Phone size={16} weight="fill" /> Call Now
          </a>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-white/15 text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: 'var(--font-sans)' }}>Explore</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}><ArrowDown size={14} className="text-orange-500/40" /></motion.div>
      </motion.div>
    </section>
  );
}

/* ================================================================
   2. MARQUEE
   ================================================================ */
function MarqueeTicker() {
  const items = ['SPRAY PAINTING', 'PANEL BEATING', 'ACCIDENT REPAIR', 'FRAME CORRECTION', 'INSURANCE WORK', 'CUSTOM REFINISHING', 'DENT REMOVAL'];
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <section className="bg-black border-y border-orange-500/10 py-5 sm:py-6 overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-6 sm:gap-8 mx-6 sm:mx-8">
            <span className="text-orange-500/70 font-heading text-lg sm:text-2xl tracking-wider font-bold uppercase">{item}</span>
            <span className="text-orange-500/15 text-xs">///</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ================================================================
   3. BEFORE / AFTER -- side-by-side reveal
   ================================================================ */
function BeforeAfterShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const cases = [
    { before: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80', after: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80', title: 'SUV Rear-End Collision', days: '4 Days' },
    { before: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&q=80', after: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0571?w=600&q=80', title: 'Sedan Side Panel Repair', days: '3 Days' },
    { before: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&q=80', after: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80', title: 'Complete Respray', days: '7 Days' },
  ];

  return (
    <section ref={ref} className="bg-neutral-900 py-24 sm:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-14 sm:mb-20">
          <div className="w-12 h-[2px] bg-orange-500 mb-6" />
          <p className="text-orange-500/60 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>Our Results</p>
          <h2 className="font-heading text-white leading-[0.92] font-bold uppercase" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
            The Tom Black <span className="text-orange-500">Difference</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <motion.div key={c.title} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.12 }} className="group">
              <div className="grid grid-cols-2 gap-[2px] overflow-hidden">
                <div className="relative aspect-square overflow-hidden">
                  <img src={c.before} alt={`Before ${c.title}`} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-red-900/20" />
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-[8px] uppercase tracking-widest px-2 py-1 font-bold">Before</span>
                </div>
                <div className="relative aspect-square overflow-hidden">
                  <img src={c.after} alt={`After ${c.title}`} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <span className="absolute top-3 right-3 bg-green-600 text-white text-[8px] uppercase tracking-widest px-2 py-1 font-bold">After</span>
                </div>
              </div>
              <div className="bg-black p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-white text-sm font-bold uppercase tracking-wide">{c.title}</h3>
                  <p className="text-white/35 text-xs mt-1" style={{ fontFamily: 'var(--font-sans)' }}>Factory-finish restored</p>
                </div>
                <div className="flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5">
                  <Clock size={12} className="text-orange-500" />
                  <span className="text-orange-400 text-[10px] uppercase tracking-wider font-bold">{c.days}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   4. SERVICES
   ================================================================ */
function ServicesGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { servicesPreview, services } = siteData;
  const images = [
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0571?w=800&q=80',
    'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&q=80',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80',
    'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0571?w=800&q=80',
  ];

  return (
    <section ref={ref} className="bg-black py-24 sm:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-14 sm:mb-20">
          <div className="w-12 h-[2px] bg-orange-500 mb-6" />
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="text-orange-500/60 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>Capabilities</p>
              <h2 className="font-heading text-white leading-[0.92] font-bold uppercase" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>Our <span className="text-orange-500">Services</span></h2>
            </div>
            <Link to="/services" className="group text-white/30 text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:text-orange-500 transition-colors" style={{ fontFamily: 'var(--font-sans)' }}>
              View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {servicesPreview?.slice(0, 6).map((service, i) => {
            const Icon = iconMap[service.icon] || Wrench;
            return (
              <motion.div key={service.title} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.08 * i }} className={i === 0 ? 'sm:col-span-2' : ''}>
                <Link to={`/services#${services?.items?.[i]?.slug || ''}`} className={`group relative block overflow-hidden ${i === 0 ? 'aspect-[16/9] sm:aspect-[2.2/1]' : 'aspect-[3/4]'}`}>
                  <img src={images[i]} alt={service.title} className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10 opacity-90" />
                  <div className="absolute top-5 left-5 z-10 w-10 h-10 bg-green-600 flex items-center justify-center"><Icon size={18} weight="fill" className="text-white" /></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
                    <h3 className="font-heading text-white text-xl sm:text-2xl font-bold uppercase tracking-wide mb-2">{service.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>{service.desc}</p>
                    <div className="flex items-center gap-2 mt-3 text-orange-500 group-hover:translate-x-1 transition-transform duration-300">
                      <span className="text-xs uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-sans)' }}>Learn More</span><ArrowRight size={14} />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 to-yellow-500 z-10" />
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
   5. STATS
   ================================================================ */
function StatsBand() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const { stats } = siteData;
  return (
    <section ref={ref} className="relative bg-black overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16">
          {stats?.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.12 }} className="text-center relative">
              <div className="font-heading text-orange-500 leading-none font-bold" style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}>
                <AnimatedCounter target={String(stat.number).replace(/[^0-9]/g, '')} suffix={String(stat.number).replace(/[0-9]/g, '')} />
              </div>
              <div className="text-white/30 text-xs sm:text-sm uppercase tracking-[0.25em] mt-3" style={{ fontFamily: 'var(--font-sans)' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   6. ABOUT
   ================================================================ */
function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <section ref={ref} className="bg-black py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9 }}>
            <div className="w-12 h-[2px] bg-orange-500 mb-6" />
            <p className="text-orange-500/60 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>Est. Harare</p>
            <h2 className="font-heading text-white leading-[0.95] font-bold uppercase mb-8" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              The Tom Black <span className="text-orange-500">Story</span>
            </h2>
            <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-6 max-w-lg" style={{ fontFamily: 'var(--font-sans)' }}>
              With 181 five-star reviews and counting, Tom Black Panelbeaters has built a reputation as Harare's most trusted auto body repair shop. Located on Nuffield Road, our state-of-the-art facility handles everything from minor cosmetic touch-ups to major structural repairs.
            </p>
            <p className="text-white/35 text-sm leading-relaxed max-w-lg" style={{ fontFamily: 'var(--font-sans)' }}>
              Our team of certified technicians uses computerised colour-matching systems and downdraft spray booths to deliver factory-grade results every time. We work directly with insurance companies to streamline your claims process.
            </p>
            <div className="w-full h-px bg-white/5 my-8" />
            <div className="flex gap-10 sm:gap-16">
              <div><div className="text-orange-500 font-heading text-3xl sm:text-4xl font-bold leading-none">4</div><div className="text-white/30 text-[10px] uppercase tracking-[0.2em] mt-2" style={{ fontFamily: 'var(--font-sans)' }}>Reviews</div></div>
              <div><div className="text-orange-500 font-heading text-3xl sm:text-4xl font-bold leading-none">5.0</div><div className="text-white/30 text-[10px] uppercase tracking-[0.2em] mt-2" style={{ fontFamily: 'var(--font-sans)' }}>Rating</div></div>
              <div><div className="text-orange-500 font-heading text-3xl sm:text-4xl font-bold leading-none">24hr</div><div className="text-white/30 text-[10px] uppercase tracking-[0.2em] mt-2" style={{ fontFamily: 'var(--font-sans)' }}>Tow Service</div></div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, delay: 0.2 }} className="relative">
            <div className="overflow-hidden"><img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0571?w=800&q=80" alt="Tom Black workshop" className="w-full aspect-[4/5] object-cover object-center" loading="lazy" /></div>
            <div className="absolute -bottom-8 -left-6 sm:-left-10 w-[45%] overflow-hidden border-4 border-black shadow-2xl">
              <img src="https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&q=80" alt="Spray booth" className="w-full aspect-square object-cover object-center" loading="lazy" />
            </div>
            <div className="absolute -top-4 -right-4 sm:-right-6 bg-orange-500 text-black p-5 sm:p-7 shadow-2xl">
              <div className="text-center"><Trophy size={28} weight="fill" className="mx-auto mb-1" /><div className="font-heading text-xs uppercase tracking-[0.15em] font-bold">#1 Rated</div></div>
            </div>
            <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-orange-500/30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   7. WHY CHOOSE US
   ================================================================ */
function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const points = [
    { title: 'Computerised Colour Matching', desc: 'Spectrophotometer technology ensures a seamless, invisible repair every time.' },
    { title: 'Insurance Direct Billing', desc: 'Approved by all major insurers. We handle the paperwork so you don\'t have to.' },
    { title: 'Downdraft Spray Booths', desc: 'Hospital-clean painting environment for a flawless, dust-free finish.' },
    { title: '181+ Verified Reviews', desc: 'Harare\'s highest-rated panel beater on Google with a 4.5-star average.' },
  ];

  return (
    <section ref={ref} className="bg-neutral-900 py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9 }} className="relative">
            <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80" alt="Finished vehicle" className="w-full aspect-[4/5] object-cover object-center" loading="lazy" />
            <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-orange-500/40" />
            <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-orange-500/40" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, delay: 0.15 }}>
            <div className="w-12 h-[2px] bg-orange-500 mb-6" />
            <p className="text-orange-500/60 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>Why Tom Black</p>
            <h2 className="font-heading text-white leading-[0.95] font-bold uppercase mb-12" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
              Built on <span className="text-orange-500">Trust</span>
            </h2>
            <div className="space-y-8">
              {points.map((p, i) => (
                <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }} className="flex gap-5">
                  <div className="shrink-0 mt-1"><div className="w-8 h-8 bg-green-600 flex items-center justify-center"><CheckCircle size={16} weight="fill" className="text-white" /></div></div>
                  <div>
                    <h4 className="font-heading text-white text-base sm:text-lg font-bold uppercase tracking-wide mb-1">{p.title}</h4>
                    <p className="text-white/40 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>{p.desc}</p>
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
   8. TESTIMONIALS
   ================================================================ */
function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const { homeTestimonials } = siteData;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const testimonials = homeTestimonials || [];
  const next = useCallback(() => setActive(p => (p + 1) % testimonials.length), [testimonials.length]);
  const prev = useCallback(() => setActive(p => (p - 1 + testimonials.length) % testimonials.length), [testimonials.length]);
  useEffect(() => { const t = setInterval(next, 7000); return () => clearInterval(t); }, [next]);
  if (!testimonials.length) return null;
  const t = testimonials[active];

  return (
    <section ref={ref} className="relative bg-black py-24 sm:py-32 lg:py-40 overflow-hidden">
      <NoiseTexture opacity={0.02} />
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center">
          <Quotes size={48} weight="fill" className="text-orange-500/15 mx-auto mb-8" />
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}>
              <blockquote className="text-white text-lg sm:text-xl lg:text-2xl leading-relaxed font-heading mb-10">&ldquo;{t.text}&rdquo;</blockquote>
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-[2px] bg-orange-500" />
                <div className="text-white text-sm uppercase tracking-[0.15em] font-semibold" style={{ fontFamily: 'var(--font-sans)' }}>{t.name}</div>
                <div className="text-white/40 text-xs uppercase tracking-[0.15em]" style={{ fontFamily: 'var(--font-sans)' }}>{t.role}</div>
                <div className="flex gap-0.5 mt-1">{[...Array(t.rating || 5)].map((_, i) => <Star key={i} size={12} weight="fill" className="text-orange-500" />)}</div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-center gap-6 mt-12">
            <button onClick={prev} className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/30 hover:text-orange-500 hover:border-orange-500/30 transition-colors" aria-label="Previous"><CaretLeft size={16} /></button>
            <div className="flex gap-2">{testimonials.map((_, i) => <button key={i} onClick={() => setActive(i)} className={`h-[2px] transition-all duration-500 ${i === active ? 'w-10 bg-orange-500' : 'w-3 bg-white/10'}`} aria-label={`Testimonial ${i+1}`} />)}</div>
            <button onClick={next} className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/30 hover:text-orange-500 hover:border-orange-500/30 transition-colors" aria-label="Next"><CaretRight size={16} /></button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================
   9. CTA
   ================================================================ */
function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section ref={ref} className="relative py-24 sm:py-32 overflow-hidden">
      <img src="https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1400&q=80" alt="Workshop" className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
      <div className="absolute inset-0 bg-black/70" />
      <NoiseTexture opacity={0.03} />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <div className="w-12 h-[2px] bg-orange-500 mx-auto mb-6" />
        <h2 className="font-heading text-white leading-[0.92] font-bold uppercase mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
          Accident? We've <span className="text-orange-500">Got You</span>
        </h2>
        <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto mb-10" style={{ fontFamily: 'var(--font-sans)' }}>
          Free on-site assessments. Insurance claims processed directly. Towing available 24/7.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact" className="group inline-flex items-center justify-center gap-3 bg-orange-500 text-black px-8 py-4 text-sm uppercase tracking-[0.15em] font-bold hover:bg-orange-400 transition-all" style={{ fontFamily: 'var(--font-sans)' }}>
            Book Assessment <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="https://wa.me/263772379707" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-3 border border-green-500/40 text-green-400 px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold hover:bg-green-500/10 transition-all" style={{ fontFamily: 'var(--font-sans)' }}>
            <WhatsappLogo size={18} weight="fill" /> WhatsApp Us
          </a>
        </div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <PageTransition>
      <HeroSection />
      <MarqueeTicker />
      <BeforeAfterShowcase />
      <ServicesGrid />
      <StatsBand />
      <AboutSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <CTASection />
    </PageTransition>
  );
}
