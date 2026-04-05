import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quotes, ArrowRight, CaretLeft, CaretRight } from '@phosphor-icons/react';
import { designTokens } from '../../data/siteData';
import siteData from '../../data/siteData';
import SectionReveal from '../SectionReveal';

function GoogleBadge({ className = '' }) {
  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <svg width="14" height="14" viewBox="0 0 48 48" className="shrink-0">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      </svg>
      <span className="text-[10px] font-medium text-steel-400 uppercase tracking-wider">Verified</span>
    </div>
  );
}

function StarRating({ count, size = 14, className = 'text-gold-500', glow = false }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <Star
          key={i}
          size={size}
          weight="fill"
          className={className}
          style={glow ? { filter: 'drop-shadow(0 0 3px rgba(212, 168, 83, 0.4))' } : undefined}
        />
      ))}
    </div>
  );
}

function AvatarWithRing({ item, size = 'md', darkBg = false }) {
  const sizes = {
    sm: { container: 'w-9 h-9', text: 'text-xs' },
    md: { container: 'w-11 h-11', text: 'text-sm' },
    lg: { container: 'w-14 h-14', text: 'text-xl' },
  };
  const s = sizes[size] || sizes.md;
  const ringOffset = darkBg ? 'ring-offset-navy-900' : 'ring-offset-white';

  return (
    <div className={`${s.container} rounded-full overflow-hidden shrink-0 ring-2 ring-gold-500/30 ring-offset-2 ${ringOffset}`}>
      {item.avatar ? (
        <img src={item.avatar} alt={item.name} className="w-full h-full object-cover object-center" loading="lazy" referrerPolicy="no-referrer" />
      ) : (
        <div className={`w-full h-full bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center text-white font-semibold ${s.text}`}>
          {item.name.charAt(0)}
        </div>
      )}
    </div>
  );
}

function DecorativeQuote({ className = '' }) {
  return (
    <span className={`absolute text-8xl font-serif text-gold-500/[0.08] leading-none pointer-events-none select-none ${className}`}>
      &ldquo;
    </span>
  );
}

function SectionLabel({ text, light = false }) {
  return (
    <span className={`inline-flex items-center gap-3 ${light ? 'text-gold-400' : 'text-gold-600'} text-sm font-semibold uppercase tracking-wider mb-4`}>
      <span className="w-8 h-[2px] bg-gold-500 rounded-full" />
      {text}
    </span>
  );
}

function CardsTestimonials() {
  const { business, homeTestimonials } = siteData;
  const midIndex = Math.floor(homeTestimonials.length / 2);

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-16">
            <SectionLabel text="Testimonials" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-6">What Our Clients Say</h2>
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={22}
                  weight="fill"
                  className={i < business.ratingRounded ? 'text-gold-500' : 'text-gold-500/40'}
                  style={i < business.ratingRounded ? { filter: 'drop-shadow(0 0 3px rgba(212, 168, 83, 0.4))' } : undefined}
                />
              ))}
            </div>
            <p className="text-steel-500">{business.rating} out of 5 from {business.reviewCount} reviews</p>
          </div>
        </SectionReveal>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {homeTestimonials.map((item, index) => {
            const isFeatured = index === midIndex && homeTestimonials.length >= 3;
            return (
              <SectionReveal key={item.name} delay={index * 0.15}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className={`relative bg-earth-50/50 border border-earth-100 hover:border-earth-200 rounded-2xl p-8 h-full flex flex-col hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-500 overflow-hidden ${isFeatured ? 'md:scale-105 md:shadow-xl md:shadow-navy-900/8 md:border-gold-500/20 md:z-10' : ''}`}
                >
                  {/* Oversized decorative quote */}
                  <DecorativeQuote className="-top-2 -left-1" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <StarRating count={item.rating} glow />
                      <GoogleBadge />
                    </div>
                    <p className="text-steel-700 leading-relaxed flex-1 mb-6 text-[15px]">"{item.text}"</p>
                  </div>

                  <div className="flex items-center gap-3 pt-5 border-t border-earth-100 mt-auto relative z-10">
                    <AvatarWithRing item={item} />
                    <div className="min-w-0">
                      <p className="text-navy-900 font-semibold text-sm">{item.name}</p>
                      <p className="text-steel-400 text-xs truncate">{item.role}</p>
                    </div>
                  </div>
                </motion.div>
              </SectionReveal>
            );
          })}
        </div>

        <SectionReveal>
          <div className="text-center mt-12">
            <Link to="/reviews" className="inline-flex items-center gap-2 text-navy-900 font-semibold hover:text-gold-600 transition-colors">
              Read All Reviews <ArrowRight size={18} />
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function SliderTestimonials() {
  const { business, homeTestimonials } = siteData;
  const [current, setCurrent] = useState(0);

  const goNext = () => setCurrent((prev) => (prev + 1) % homeTestimonials.length);
  const goPrev = () => setCurrent((prev) => (prev - 1 + homeTestimonials.length) % homeTestimonials.length);
  const item = homeTestimonials[current];

  return (
    <section className="section-padding bg-white">
      <div className="max-w-4xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-12">
            <SectionLabel text="Testimonials" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900">What Our Clients Say</h2>
          </div>
        </SectionReveal>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="relative bg-earth-50 border border-earth-100 rounded-2xl p-8 sm:p-12 text-center overflow-hidden"
            >
              {/* Oversized decorative quote */}
              <DecorativeQuote className="-top-4 left-4 !text-9xl" />

              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <StarRating count={item.rating} size={18} glow />
                  <GoogleBadge />
                </div>
                <p className="text-lg sm:text-xl text-steel-700 leading-relaxed mb-8 max-w-2xl mx-auto">
                  "{item.text}"
                </p>
                <AvatarWithRing item={item} size="lg" />
                <p className="text-navy-900 font-bold text-lg mt-3">{item.name}</p>
                <p className="text-steel-400 text-sm">{item.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={goPrev}
              className="w-10 h-10 rounded-full border border-earth-200 flex items-center justify-center hover:bg-earth-50 hover:border-gold-500/30 transition-colors"
              aria-label="Previous testimonial"
            >
              <CaretLeft size={18} className="text-navy-900" />
            </button>
            <div className="flex items-center gap-2">
              {homeTestimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-gold-500 shadow-[0_0_8px_rgba(212,168,83,0.4)]' : 'w-2 bg-earth-200 hover:bg-earth-300'}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={goNext}
              className="w-10 h-10 rounded-full border border-earth-200 flex items-center justify-center hover:bg-earth-50 hover:border-gold-500/30 transition-colors"
              aria-label="Next testimonial"
            >
              <CaretRight size={18} className="text-navy-900" />
            </button>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link to="/reviews" className="inline-flex items-center gap-2 text-navy-900 font-semibold hover:text-gold-600 transition-colors">
            Read All Reviews <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function QuoteHighlightTestimonials() {
  const { business, homeTestimonials } = siteData;
  const featured = homeTestimonials[0];

  return (
    <section className="section-padding bg-navy-900">
      <div className="max-w-5xl mx-auto text-center">
        <SectionReveal>
          <SectionLabel text="What Our Clients Say" light />
          <div className="relative inline-block">
            <DecorativeQuote className="-top-6 -left-8 !text-9xl !text-gold-500/[0.12]" />
            <Quotes size={72} weight="fill" className="text-gold-500/20 mx-auto mb-8 relative z-10" />
          </div>
          <blockquote className="text-2xl sm:text-3xl lg:text-4xl text-white font-light leading-relaxed mb-10 max-w-3xl mx-auto">
            "{featured.text}"
          </blockquote>
          <div className="flex items-center justify-center gap-3 mb-4">
            <StarRating count={featured.rating} size={20} className="text-gold-400" glow />
            <GoogleBadge className="!text-white/40" />
          </div>
          <AvatarWithRing item={featured} size="lg" darkBg />
          <p className="text-white font-bold text-lg mt-3">{featured.name}</p>
          <p className="text-white/50 text-sm">{featured.role}</p>
        </SectionReveal>

        {homeTestimonials.length > 1 && (
          <div className="mt-16 grid sm:grid-cols-2 gap-6">
            {homeTestimonials.slice(1).map((item, index) => (
              <SectionReveal key={item.name} delay={index * 0.1}>
                <div className="relative text-left border border-white/10 hover:border-gold-500/20 rounded-xl p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/5 overflow-hidden">
                  {/* Oversized decorative quote */}
                  <DecorativeQuote className="-top-2 -left-1 !text-gold-500/[0.06]" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <StarRating count={item.rating} size={12} className="text-gold-400" glow />
                      <GoogleBadge className="!text-white/30" />
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed mb-5">"{item.text}"</p>
                    <div className="flex items-center gap-3">
                      <AvatarWithRing item={item} size="sm" darkBg />
                      <div className="min-w-0">
                        <p className="text-white text-sm font-medium">{item.name}</p>
                        <p className="text-white/40 text-xs">{item.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        )}

        <SectionReveal>
          <div className="mt-10">
            <Link to="/reviews" className="inline-flex items-center gap-2 text-gold-400 font-semibold hover:text-gold-300 transition-colors">
              Read All Reviews <ArrowRight size={18} />
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function MinimalTestimonials() {
  const { homeTestimonials } = siteData;

  return (
    <section className="section-padding bg-white">
      <div className="max-w-4xl mx-auto">
        <SectionReveal>
          <div className="mb-12">
            <SectionLabel text="Testimonials" />
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">What Our Clients Say</h2>
          </div>
        </SectionReveal>

        <div className="space-y-8">
          {homeTestimonials.map((item, index) => (
            <SectionReveal key={item.name} delay={index * 0.1}>
              <div className="relative border-l-3 border-gold-500 pl-8 py-4 hover:bg-earth-50/30 transition-all duration-500 rounded-r-lg overflow-hidden hover:shadow-lg hover:shadow-gold-500/5">
                {/* Oversized decorative quote */}
                <DecorativeQuote className="top-0 right-4" />

                <div className="relative z-10">
                  <p className="text-steel-700 text-lg leading-relaxed mb-4">"{item.text}"</p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <AvatarWithRing item={item} size="sm" />
                    <div>
                      <span className="text-navy-900 font-semibold text-sm block">{item.name}</span>
                      <span className="text-steel-400 text-xs">{item.role}</span>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <StarRating count={item.rating} size={12} glow />
                      <GoogleBadge />
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal>
          <div className="mt-10">
            <Link to="/reviews" className="inline-flex items-center gap-2 text-navy-900 font-semibold hover:text-gold-600 transition-colors">
              Read All Reviews <ArrowRight size={18} />
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function TestimonialSection() {
  const style = designTokens?.testimonialStyle || 'cards';

  const variants = {
    'cards': CardsTestimonials,
    'slider': SliderTestimonials,
    'quote-highlight': QuoteHighlightTestimonials,
    'minimal': MinimalTestimonials,
  };

  const Component = variants[style] || CardsTestimonials;
  return <Component />;
}

export default TestimonialSection;
