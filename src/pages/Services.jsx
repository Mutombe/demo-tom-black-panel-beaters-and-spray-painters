import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  Phone,
  Quotes,
  ShieldCheck,
  Star,
  Trophy,
  ChatCircleDots,
} from '@phosphor-icons/react';
import PageTransition from '../components/PageTransition';
import PageHero from '../components/PageHero';
import SectionReveal from '../components/SectionReveal';
import siteData from '../data/siteData';
import iconMap from '../data/iconMap';

function Services() {
  const { business, services } = siteData;
  const [activeNav, setActiveNav] = useState(null);
  const sectionRefs = useRef({});

  const heroImage =
    siteData.pageImages?.services ||
    services.items?.[0]?.image ||
    siteData.hero?.backgroundImage ||
    '';

  // Track which service section is in view for the sticky nav
  useEffect(() => {
    const observers = [];
    services.items.forEach((service) => {
      const el = sectionRefs.current[service.slug];
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveNav(service.slug);
          }
        },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [services.items]);

  const scrollToService = (slug) => {
    const el = sectionRefs.current[slug];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Pull a representative testimonial from siteData if available
  const testimonial = useMemo(() => {
    const items = siteData.homeTestimonials || siteData.reviews?.items;
    if (!items || items.length === 0) return null;
    return items.find((t) => t.rating === 5) || items[0];
  }, []);

  // Stats for the interstitial break
  const interstitialStats = useMemo(() => {
    const s = siteData.stats;
    if (s && s.length >= 3) return s.slice(0, 3);
    return [
      { number: business.yearsExperience || '10+', label: 'Years Experience' },
      { number: business.projectsCompleted || '100+', label: 'Projects Completed' },
      { number: business.rating || '4.5', label: 'Star Rating' },
    ];
  }, [business]);

  const firstService = services.items[0];
  const FirstIcon = firstService ? (iconMap[firstService.iconName] || iconMap.Buildings) : iconMap.Buildings;
  const remainingServices = services.items.slice(1);

  return (
    <PageTransition>
      <PageHero
        label="Our Services"
        title={services.heroTitle}
        subtitle={services.heroSubtitle}
        image={heroImage}
        imageAlt={`${business.name} professional services`}
      />

      {/* ── Sticky Horizontal Service Nav ── */}
      <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-md border-b border-earth-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 overflow-x-auto scrollbar-hide py-1" aria-label="Service navigation">
            {services.items.map((service, i) => (
              <button
                key={service.slug}
                onClick={() => scrollToService(service.slug)}
                className={`whitespace-nowrap px-4 py-3 text-sm font-medium transition-all duration-300 border-b-2 shrink-0 ${
                  activeNav === service.slug
                    ? 'border-gold-500 text-navy-900'
                    : 'border-transparent text-steel-400 hover:text-steel-600 hover:border-earth-200'
                }`}
              >
                <span className="text-gold-500/60 mr-1.5 font-semibold text-xs">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {service.title}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* ── First Service: Full-Width Hero Treatment ── */}
      {firstService && (
        <section
          ref={(el) => (sectionRefs.current[firstService.slug] = el)}
          id={firstService.slug}
          className="relative min-h-[70vh] sm:min-h-[75vh] flex items-center overflow-hidden"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={firstService.image}
              alt={`${firstService.title} services by ${business.name}`}
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/70 to-navy-950/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
          </div>

          {/* Decorative number */}
          <div className="absolute top-8 right-8 sm:top-12 sm:right-16 select-none pointer-events-none">
            <span className="text-[10rem] sm:text-[14rem] lg:text-[18rem] font-bold leading-none text-white/[0.04]">
              01
            </span>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
            <div className="max-w-2xl">
              <SectionReveal>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-gold-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-gold-500/30">
                    <FirstIcon size={28} className="text-gold-400" weight="fill" />
                  </div>
                  <span className="text-gold-400 text-sm font-semibold uppercase tracking-wider">
                    Featured Service
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                  {firstService.title}
                </h2>
                <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                  {firstService.desc}
                </p>
              </SectionReveal>

              <SectionReveal delay={0.2}>
                <div className="flex flex-wrap gap-2 mb-10">
                  {firstService.features.map((feature) => (
                    <span
                      key={feature}
                      className="bg-gold-500/10 text-gold-300 px-3 py-1.5 rounded-full text-xs font-semibold border border-gold-500/20 backdrop-blur-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </SectionReveal>

              <SectionReveal delay={0.3}>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact" className="btn-primary text-sm sm:text-base">
                    Get a Quote
                    <ArrowRight size={18} />
                  </Link>
                  <Link to="/projects" className="btn-secondary text-sm sm:text-base">
                    View Projects
                  </Link>
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>
      )}

      {/* ── Remaining Services: Alternating Grid with Interstitials ── */}
      {remainingServices.map((service, index) => {
        const actualIndex = index + 1; // offset by 1 since first is hero
        const IconComp = iconMap[service.iconName] || iconMap.Buildings;
        const isReversed = index % 2 !== 0;
        const numberStr = String(actualIndex + 1).padStart(2, '0');

        // Determine if we should insert an interstitial BEFORE this service
        // Insert after every 2 services (so before index 2, 4, etc. in remaining array)
        const showStatBreak = index === 2;
        const showTestimonialBreak = index === 4 && testimonial;

        return (
          <React.Fragment key={service.slug}>
            {/* ── Stat Callout Interstitial ── */}
            {showStatBreak && (
              <section className="relative py-16 sm:py-20 overflow-hidden bg-navy-900">
                <div className="absolute inset-0 opacity-5 bg-pattern-dots text-white" />
                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <SectionReveal>
                    <div className="grid grid-cols-3 gap-8 text-center">
                      {interstitialStats.map((stat, si) => (
                        <div key={si}>
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: si * 0.15, duration: 0.5 }}
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gold-400 mb-2"
                          >
                            {stat.number}
                          </motion.div>
                          <p className="text-white/60 text-xs sm:text-sm font-medium uppercase tracking-wider">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </SectionReveal>
                </div>
              </section>
            )}

            {/* ── Testimonial Interstitial ── */}
            {showTestimonialBreak && (
              <section className="relative py-16 sm:py-20 bg-earth-50 overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <SectionReveal>
                    <div className="text-center">
                      <Quotes size={48} weight="fill" className="text-gold-500/20 mx-auto mb-6" />
                      <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium text-navy-900 leading-relaxed mb-8 italic">
                        "{testimonial.text}"
                      </blockquote>
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-navy-900 flex items-center justify-center text-white font-semibold text-sm">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div className="text-left">
                          <p className="text-navy-900 font-semibold text-sm">{testimonial.name}</p>
                          <p className="text-steel-400 text-xs">{testimonial.role}</p>
                        </div>
                        <div className="flex items-center gap-0.5 ml-3">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} size={14} weight="fill" className="text-gold-500" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </SectionReveal>
                </div>
              </section>
            )}

            {/* ── Mid-Page CTA Banner (after 2nd remaining = 3rd service overall) ── */}
            {index === 2 && (
              <section className="relative py-14 sm:py-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600" />
                <div className="absolute inset-0 opacity-10 bg-pattern-waves" />
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <SectionReveal>
                    <ChatCircleDots size={40} className="text-white/80 mx-auto mb-4" weight="fill" />
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3">
                      Not sure which service you need?
                    </h3>
                    <p className="text-white/80 text-sm sm:text-base mb-6 max-w-lg mx-auto">
                      Our experts will assess your project and recommend the right solution. No obligations.
                    </p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 text-sm sm:text-base"
                    >
                      Get a Free Consultation
                      <ArrowRight size={18} />
                    </Link>
                  </SectionReveal>
                </div>
              </section>
            )}

            {/* ── Service Section ── */}
            <section
              ref={(el) => (sectionRefs.current[service.slug] = el)}
              id={service.slug}
              className={`relative section-padding overflow-hidden ${
                index % 2 === 0 ? 'bg-white' : 'bg-earth-50'
              }`}
            >
              {/* Decorative background number */}
              <div className={`absolute top-4 ${isReversed ? 'left-4 sm:left-8' : 'right-4 sm:right-8'} select-none pointer-events-none`}>
                <span className="text-8xl sm:text-[10rem] lg:text-[12rem] font-bold leading-none text-navy-900/[0.03]">
                  {numberStr}
                </span>
              </div>

              <div className="relative max-w-7xl mx-auto">
                <div
                  className={`grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center`}
                >
                  {/* Image Column */}
                  <SectionReveal
                    direction={isReversed ? 'left' : 'right'}
                    className={isReversed ? 'lg:order-2' : ''}
                  >
                    <div className="relative group">
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/10">
                        <img
                          src={service.image}
                          alt={`${service.title} services by ${business.name} in ${business.city}`}
                          className="w-full aspect-[4/3] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                        {/* Hover overlay with number */}
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      {/* Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="bg-gold-500 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg shadow-gold-500/30">
                          <IconComp size={18} weight="fill" />
                          <span className="text-sm font-bold">{numberStr}</span>
                        </div>
                      </div>
                      {/* Decorative corner accent */}
                      <div className={`absolute -bottom-3 ${isReversed ? '-left-3' : '-right-3'} w-24 h-24 border-2 border-gold-500/20 rounded-2xl -z-10`} />
                    </div>
                  </SectionReveal>

                  {/* Content Column */}
                  <SectionReveal
                    direction={isReversed ? 'right' : 'left'}
                    className={isReversed ? 'lg:order-1' : ''}
                  >
                    <div>
                      {/* Icon + Label */}
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gold-500/10 rounded-xl flex items-center justify-center">
                          <IconComp size={26} className="text-gold-600" weight="duotone" />
                        </div>
                        <span className="text-gold-600 text-xs font-semibold uppercase tracking-wider">
                          Service {numberStr}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900 mb-4">
                        {service.title}
                      </h2>
                      <p className="text-steel-600 leading-relaxed mb-8 text-sm sm:text-base">
                        {service.desc}
                      </p>

                      {/* Feature Pills */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {service.features.map((feature) => (
                          <span
                            key={feature}
                            className="bg-gold-500/10 text-gold-700 px-3 py-1.5 rounded-full text-xs font-semibold"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      <Link to="/contact" className="btn-primary text-sm sm:text-base">
                        Request a Quote
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </SectionReveal>
                </div>
              </div>
            </section>
          </React.Fragment>
        );
      })}

      {/* ── Trust Badge Strip ── */}
      <section className="bg-earth-50 border-y border-earth-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
            {[
              { icon: ShieldCheck, label: 'Licensed & Insured' },
              { icon: Trophy, label: 'Award-Winning Quality' },
              { icon: Star, label: `${business.rating} Star Rating` },
              { icon: CheckCircle, label: `${business.projectsCompleted || '100+'} Projects` },
            ].map(({ icon: Icon, label }, i) => (
              <SectionReveal key={label} delay={i * 0.1}>
                <div className="flex flex-col items-center gap-2">
                  <Icon size={28} className="text-gold-500" weight="fill" />
                  <span className="text-navy-900 text-xs sm:text-sm font-semibold">{label}</span>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={siteData.hero?.backgroundImage || heroImage}
            alt={`${business.name} quality work`}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-navy-950/70" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6">
              {services.ctaTitle}
            </h2>
            <p className="text-white/70 text-base sm:text-lg mb-8 sm:mb-10 max-w-xl mx-auto">
              {services.ctaSubtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary text-sm sm:text-base">
                <Phone size={20} />
                Contact Us Today
              </Link>
              <Link to="/projects" className="btn-secondary text-sm sm:text-base">
                View Our Projects
                <ArrowRight size={20} />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  );
}

export default Services;
