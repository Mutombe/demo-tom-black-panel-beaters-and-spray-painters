import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Quotes,
  GoogleLogo,
  ThumbsUp,
  ShieldCheck,
  CaretDown,
} from '@phosphor-icons/react';
import PageTransition from '../components/PageTransition';
import PageHero from '../components/PageHero';
import SectionReveal from '../components/SectionReveal';
import siteData from '../data/siteData';

function Reviews() {
  const { business, reviews } = siteData;
  const [showAll, setShowAll] = useState(false);

  const heroImage =
    siteData.pageImages?.reviews ||
    siteData.hero?.backgroundImage ||
    '';

  // Find the featured review: highest-rated, then longest text
  const featuredReview = useMemo(() => {
    if (!reviews.items || reviews.items.length === 0) return null;
    const sorted = [...reviews.items].sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return (b.text?.length || 0) - (a.text?.length || 0);
    });
    return sorted[0];
  }, [reviews.items]);

  // Remaining reviews (everything except the featured one)
  const remainingReviews = useMemo(() => {
    if (!featuredReview) return reviews.items;
    return reviews.items.filter(
      (r) => r.name !== featuredReview.name || r.text !== featuredReview.text
    );
  }, [reviews.items, featuredReview]);

  const INITIAL_SHOW_COUNT = 6;
  const visibleReviews = showAll
    ? remainingReviews
    : remainingReviews.slice(0, INITIAL_SHOW_COUNT);
  const hasMore = remainingReviews.length > INITIAL_SHOW_COUNT;

  // Calculate total reviews and average for the social proof banner
  const totalStars = useMemo(() => {
    return reviews.ratingBreakdown.reduce((sum, item) => sum + item.count, 0);
  }, [reviews.ratingBreakdown]);

  return (
    <PageTransition>
      <PageHero
        label="Client Reviews"
        title={reviews.heroTitle}
        subtitle={reviews.heroSubtitle}
        image={heroImage}
        imageAlt={`${business.name} client testimonials`}
      />

      {/* ── Social Proof Banner ── */}
      <section className="relative -mt-6 z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="bg-navy-900 rounded-2xl px-6 sm:px-10 py-5 sm:py-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-center shadow-2xl shadow-navy-950/30">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-gold-400">
                {business.rating}
              </span>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    weight="fill"
                    className={
                      i < business.ratingRounded
                        ? 'text-gold-400'
                        : 'text-white/20'
                    }
                  />
                ))}
              </div>
            </div>
            <div className="w-px h-8 bg-white/10 hidden sm:block" />
            <span className="text-white/70 text-sm font-medium">
              <span className="text-white font-bold">{business.reviewCount}</span> Reviews on Google
            </span>
            <div className="w-px h-8 bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2 text-white/70 text-sm font-medium">
              <GoogleLogo size={18} weight="bold" className="text-white/50" />
              <span>
                Trusted Since <span className="text-white font-bold">{business.established || '2008'}</span>
              </span>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ── Featured Review ── */}
      {featuredReview && (
        <section className="section-padding bg-white">
          <div className="max-w-4xl mx-auto">
            <SectionReveal>
              <div className="relative bg-gradient-to-br from-earth-50 to-white rounded-3xl p-8 sm:p-10 md:p-14 border border-earth-100 shadow-xl shadow-black/5">
                {/* Decorative oversized quotes */}
                <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
                  <Quotes
                    size={64}
                    weight="fill"
                    className="text-gold-500/10"
                  />
                </div>
                <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 rotate-180">
                  <Quotes
                    size={48}
                    weight="fill"
                    className="text-gold-500/10"
                  />
                </div>

                {/* Gold accent line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent rounded-full" />

                <div className="relative text-center">
                  {/* Stars */}
                  <div className="flex items-center justify-center gap-1.5 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={24}
                        weight="fill"
                        className={
                          i < featuredReview.rating
                            ? 'text-gold-500'
                            : 'text-earth-200'
                        }
                      />
                    ))}
                  </div>

                  {/* Quote text */}
                  <blockquote className="text-lg sm:text-xl md:text-2xl text-navy-900 leading-relaxed font-medium mb-8 italic">
                    "{featuredReview.text}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden ring-2 ring-gold-500/20 ring-offset-2">
                      {featuredReview.avatar ? (
                        <img
                          src={featuredReview.avatar}
                          alt={featuredReview.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full bg-navy-900 flex items-center justify-center text-white font-bold text-lg">
                          {featuredReview.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="text-left">
                      <p className="text-navy-900 font-bold text-base">
                        {featuredReview.name}
                      </p>
                      <p className="text-steel-400 text-sm">
                        {featuredReview.role}
                      </p>
                    </div>
                    {featuredReview.project && (
                      <span className="hidden sm:inline-block text-xs text-gold-600 bg-gold-50 px-3 py-1.5 rounded-full font-semibold border border-gold-100 ml-2">
                        {featuredReview.project}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>
      )}

      {/* ── Rating Breakdown ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <SectionReveal>
          <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-earth-100 p-6 sm:p-8 md:p-10">
            <div className="grid sm:grid-cols-2 gap-8 sm:gap-10 items-center">
              <div className="text-center sm:text-left">
                <div className="text-5xl sm:text-6xl font-bold text-navy-900 mb-2">
                  {business.rating}
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={22}
                      weight="fill"
                      className={
                        i < business.ratingRounded
                          ? 'text-gold-500'
                          : 'text-gold-500/40'
                      }
                    />
                  ))}
                </div>
                <p className="text-steel-500 text-sm sm:text-base">
                  Based on {business.reviewCount} reviews
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-3 text-sm text-steel-400">
                  <GoogleLogo size={18} weight="bold" />
                  <span>Google Reviews</span>
                </div>
              </div>

              {/* Rating Bars */}
              <div className="space-y-3">
                {reviews.ratingBreakdown.map((item) => {
                  const percentage =
                    totalStars > 0
                      ? (item.count / totalStars) * 100
                      : 0;
                  return (
                    <div
                      key={item.stars}
                      className="flex items-center gap-3"
                    >
                      <span className="text-sm text-steel-500 w-12 font-medium">
                        {item.stars} star
                      </span>
                      <div className="flex-1 h-3 bg-earth-100 rounded-full overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${percentage}%`,
                          }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="h-full bg-gradient-to-r from-gold-400 to-gold-500 rounded-full relative"
                          style={{
                            boxShadow:
                              percentage > 0
                                ? '0 0 8px rgba(212, 168, 83, 0.4)'
                                : 'none',
                          }}
                        />
                      </div>
                      <span className="text-sm text-steel-400 w-8 text-right font-medium">
                        {item.count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ── Reviews Grid ── */}
      <section className="section-padding bg-earth-50">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-10 sm:mb-14">
              <span className="inline-block text-gold-600 text-sm font-semibold uppercase tracking-wider mb-3">
                Client Feedback
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900">
                What Our Clients Say
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {visibleReviews.map((review, index) => (
                <motion.div
                  key={review.name + review.date}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: (index % 6) * 0.06 }}
                  layout
                >
                  <div className="bg-white rounded-2xl p-5 sm:p-6 border border-earth-100 h-full flex flex-col hover:shadow-lg hover:border-earth-200 transition-all duration-300 group">
                    {/* Header: Stars + Verified Badge */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            weight="fill"
                            className={
                              i < review.rating
                                ? 'text-gold-500'
                                : 'text-earth-200'
                            }
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
                        <ShieldCheck size={12} weight="fill" />
                        <span className="text-[10px] font-semibold uppercase tracking-wide">
                          Verified
                        </span>
                      </div>
                    </div>

                    <span className="text-xs text-steel-400 mb-3 sm:mb-4">
                      {review.date}
                    </span>

                    {/* Review Text */}
                    <div className="flex-1">
                      <Quotes
                        size={22}
                        weight="fill"
                        className="text-gold-500/15 mb-2"
                      />
                      <p className="text-steel-600 text-sm leading-relaxed">
                        {review.text}
                      </p>
                    </div>

                    {/* Footer: Author + Project Tag */}
                    <div className="mt-4 sm:mt-6 pt-4 border-t border-earth-100">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-earth-100">
                            {review.avatar ? (
                              <img
                                src={review.avatar}
                                alt={review.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="w-full h-full bg-navy-900 flex items-center justify-center text-white font-semibold text-sm">
                                {review.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-navy-900 font-semibold text-sm truncate">
                              {review.name}
                            </p>
                            <p className="text-steel-400 text-xs truncate">
                              {review.role}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-gold-600 bg-gold-50 px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 font-semibold border border-gold-100">
                          {review.project}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Show All / Show Less Button */}
          {hasMore && (
            <SectionReveal>
              <div className="text-center mt-10 sm:mt-12">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-2 bg-white border-2 border-navy-900 text-navy-900 px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-navy-900 hover:text-white hover:-translate-y-0.5 text-sm sm:text-base"
                >
                  {showAll ? 'Show Less' : `Show All ${remainingReviews.length} Reviews`}
                  <CaretDown
                    size={18}
                    className={`transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>
            </SectionReveal>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-navy-900" />
        <div className="absolute inset-0 opacity-5 bg-pattern-dots text-white" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <SectionReveal>
            <ThumbsUp
              size={48}
              className="text-gold-400 mx-auto mb-6"
              weight="fill"
            />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              {reviews.ctaTitle}
            </h2>
            <p className="text-white/60 text-base sm:text-lg mb-6 sm:mb-8">
              {reviews.ctaSubtitle}
            </p>
            <a
              href={`https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(reviews.ctaWhatsappText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm sm:text-base"
            >
              {reviews.ctaCta}
            </a>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  );
}

export default Reviews;
