import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CaretRight } from '@phosphor-icons/react';

/**
 * Premium hero section for inner pages.
 * Multi-layer overlay, breadcrumb trail, staggered title animation,
 * decorative gold accents. Uses siteData image URLs.
 *
 * @param {string} label - Small uppercase label above the title
 * @param {string|Array} title - Page title (string or array of {text, highlight?} parts)
 * @param {string} subtitle - Description text below title
 * @param {string} image - Background image URL
 * @param {string} imageAlt - Alt text for the background image
 * @param {Array} breadcrumbs - Array of {label, path} for breadcrumb trail. Auto-generated from title if omitted.
 */
function PageHero({ label, title, subtitle, image, imageAlt, breadcrumbs }) {
  // Auto-generate breadcrumbs from the title if none provided
  const crumbs = useMemo(() => {
    if (breadcrumbs && breadcrumbs.length > 0) return breadcrumbs;
    const titleText = Array.isArray(title)
      ? title.map((p) => p.text).join('')
      : title || '';
    return [
      { label: 'Home', path: '/' },
      { label: titleText },
    ];
  }, [breadcrumbs, title]);

  // Split title into words for stagger animation
  const titleWords = useMemo(() => {
    if (Array.isArray(title)) {
      // Flatten highlighted parts into individual words preserving highlight info
      const words = [];
      title.forEach((part) => {
        const partWords = part.text.trim().split(/\s+/);
        partWords.forEach((word) => {
          if (word) words.push({ text: word, highlight: !!part.highlight });
        });
      });
      return words;
    }
    if (typeof title === 'string') {
      return title.split(/\s+/).map((word) => ({ text: word, highlight: false }));
    }
    return [];
  }, [title]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
    },
  };

  return (
    <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden min-h-[50vh] sm:min-h-[55vh] flex items-end">
      {/* Background Image */}
      {image && (
        <div className="absolute inset-0">
          <img
            src={image}
            alt={imageAlt || ''}
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </div>
      )}

      {/* Multi-layer overlay system */}
      {/* Layer 1: Heavy bottom gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/85 to-navy-950/30" />
      {/* Layer 2: Directional gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-navy-950/30 to-transparent" />
      {/* Layer 3: Radial vignette for cinematic depth */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: 'radial-gradient(ellipse at 30% 80%, transparent 0%, rgba(15,29,48,0.5) 70%, rgba(15,29,48,0.8) 100%)',
        }}
      />
      {/* Layer 4: Noise texture for analog feel */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

      {/* Decorative gold line — animated accent */}
      <motion.div
        className="absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-gold-500 via-gold-400 to-transparent"
        initial={{ width: 0 }}
        animate={{ width: '40%' }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          aria-label="Breadcrumb"
          className="mb-6"
        >
          <ol className="flex items-center gap-1.5 text-xs sm:text-sm font-medium">
            {crumbs.map((crumb, i) => {
              const isLast = i === crumbs.length - 1;
              return (
                <li key={i} className="flex items-center gap-1.5">
                  {i > 0 && (
                    <CaretRight size={12} weight="bold" className="text-gold-500/70 flex-shrink-0" />
                  )}
                  {crumb.path && !isLast ? (
                    <Link
                      to={crumb.path}
                      className="text-white/50 hover:text-white/80 transition-colors duration-200 truncate max-w-[120px] sm:max-w-none"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white/80 truncate max-w-[160px] sm:max-w-none">
                      {crumb.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </motion.nav>

        <div className="max-w-3xl">
          {/* Label */}
          {label && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="inline-block text-gold-400 text-sm font-semibold uppercase tracking-wider mb-4"
            >
              {label}
            </motion.span>
          )}

          {/* Staggered title */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight flex flex-wrap gap-x-[0.3em]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className={word.highlight ? 'text-gold-400' : undefined}
                style={{ display: 'inline-block' }}
              >
                {word.text}
              </motion.span>
            ))}
          </motion.h1>

          {/* Gold decorative rule above subtitle */}
          {subtitle && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="origin-left w-12 h-[2px] bg-gradient-to-r from-gold-400 to-gold-600 mb-4"
            />
          )}

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}

export default PageHero;
