import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  List,
  X,
  CaretDown,
  HardHat,
  Phone,
  WhatsappLogo,
  MagnifyingGlass,
  Envelope,
  Clock,
  FacebookLogo,
  LinkedinLogo,
  InstagramLogo,
} from '@phosphor-icons/react';
import siteData from '../data/siteData';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  {
    name: 'Our Work',
    children: [
      { name: 'Services', path: '/services' },
      { name: 'Projects', path: '/projects' },
    ],
  },
  { name: 'Reviews', path: '/reviews' },
  { name: 'Careers', path: '/careers' },
  { name: 'Contact', path: '/contact' },
];

/* ------------------------------------------------------------------ */
/*  Social icon map — renders whichever links exist in siteData       */
/* ------------------------------------------------------------------ */
const socialIconMap = {
  facebook: FacebookLogo,
  linkedin: LinkedinLogo,
  instagram: InstagramLogo,
};

/* ------------------------------------------------------------------ */
/*  Utility Bar — phone / email / hours | social icons                */
/* ------------------------------------------------------------------ */
function UtilityBar({ business, visible }) {
  const socials = business.socialLinks || {};
  const hasSocials = Object.values(socials).some((v) => v && v !== '#');
  const firstHours = business.hours?.[0];

  return (
    <motion.div
      initial={false}
      animate={{
        height: visible ? 'auto' : 0,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="overflow-hidden bg-navy-950 border-b border-white/5 relative z-[1]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-8 text-white/60 text-xs">
          {/* Left — contact details */}
          <div className="flex items-center gap-4 sm:gap-6 min-w-0">
            {business.phone && (
              <a
                href={`tel:${business.phoneRaw || business.phone}`}
                className="flex items-center gap-1.5 hover:text-gold-400 transition-colors shrink-0"
              >
                <Phone size={12} weight="bold" />
                <span className="hidden xs:inline">{business.phone}</span>
              </a>
            )}
            {business.email && (
              <a
                href={`mailto:${business.email}`}
                className="hidden sm:flex items-center gap-1.5 hover:text-gold-400 transition-colors min-w-0"
              >
                <Envelope size={12} weight="bold" className="shrink-0" />
                <span className="truncate">{business.email}</span>
              </a>
            )}
            {firstHours && (
              <span className="hidden lg:flex items-center gap-1.5">
                <Clock size={12} weight="bold" className="shrink-0" />
                <span>
                  {firstHours.day}: {firstHours.time}
                </span>
              </span>
            )}
          </div>

          {/* Right — social icons */}
          {hasSocials && (
            <div className="flex items-center gap-2">
              {Object.entries(socials).map(([platform, url]) => {
                if (!url || url === '#') return null;
                const Icon = socialIconMap[platform];
                if (!Icon) return null;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 hover:text-gold-400 transition-colors"
                    aria-label={platform}
                  >
                    <Icon size={14} weight="bold" />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Desktop nav link with animated gold underline                     */
/* ------------------------------------------------------------------ */
function NavLink({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`relative px-3 py-2 text-sm font-medium transition-colors group ${
        active ? 'text-gold-400' : 'text-white/80 hover:text-white'
      }`}
    >
      {children}
      {/* Animated underline */}
      <span
        className={`absolute bottom-0 left-3 right-3 h-[2px] bg-gold-400 rounded-full transition-transform duration-300 origin-left ${
          active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}
      />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile menu link with staggered animation                         */
/* ------------------------------------------------------------------ */
const mobileLinkVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.06 * i, duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  }),
  exit: { opacity: 0, x: -16, transition: { duration: 0.2 } },
};

/* ------------------------------------------------------------------ */
/*  NAVBAR                                                            */
/* ------------------------------------------------------------------ */
function Navbar({ onSearchOpen }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const location = useLocation();
  const navRef = useRef(null);

  const { business, navbar } = siteData;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(null);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Check if a path is active (exact match or child route)
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Flatten all link indices for stagger animation in mobile
  const flatLinks = [];
  navLinks.forEach((link) => {
    if (link.children) {
      flatLinks.push({ type: 'parent', ...link });
      link.children.forEach((child) => flatLinks.push({ type: 'child', ...child }));
    } else {
      flatLinks.push({ type: 'link', ...link });
    }
  });

  return (
    <motion.header
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 z-50"
      style={{ top: 'var(--banner-height, 0px)' }}
    >
      {/* Top Utility Bar — hides on scroll */}
      <UtilityBar business={business} visible={!isScrolled} />

      {/* Main Navigation Bar */}
      <nav
        className={`transition-all duration-500 ${
          isScrolled
            ? 'bg-navy-950/85 backdrop-blur-2xl shadow-2xl shadow-black/20 border-b border-gold-500/20'
            : 'bg-navy-950/30 backdrop-blur-sm border-b border-white/0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20 lg:h-22">
            {/* ============ Logo ============ */}
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              {navbar.logoImage ? (
                <img
                  src={navbar.logoImage}
                  alt={navbar.logoLine1}
                  className={`h-9 sm:h-10 lg:h-11 w-auto object-contain ${
                    navbar.logoBrightness === 'invert' ? 'brightness-0 invert' : ''
                  }`}
                  loading="eager"
                />
              ) : (
                <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-gold-500 rounded-xl flex items-center justify-center group-hover:bg-gold-400 transition-colors shadow-lg shadow-gold-500/20">
                  <HardHat size={20} weight="fill" className="text-white sm:hidden" />
                  <HardHat size={22} weight="fill" className="text-white hidden sm:block lg:hidden" />
                  <HardHat size={24} weight="fill" className="text-white hidden lg:block" />
                </div>
              )}
              {(!navbar.logoImage || navbar.showLogoText) && (
                <div className="min-w-0">
                  <span className="text-white font-bold text-base sm:text-lg lg:text-xl tracking-tight block leading-tight truncate max-w-[140px] sm:max-w-[200px] lg:max-w-none">
                    {navbar.logoLine1}
                  </span>
                  <span className="text-gold-400 text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-medium leading-tight block truncate max-w-[140px] sm:max-w-[200px] lg:max-w-none">
                    {navbar.logoLine2}
                  </span>
                </div>
              )}
            </Link>

            {/* ============ Desktop Nav ============ */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(link.name)}
                    onMouseLeave={() => setDropdownOpen(null)}
                  >
                    <button
                      className={`relative flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors group ${
                        link.children.some((c) => isActive(c.path))
                          ? 'text-gold-400'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {link.name}
                      <CaretDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          dropdownOpen === link.name ? 'rotate-180' : ''
                        }`}
                      />
                      {/* Underline for dropdown parent */}
                      <span
                        className={`absolute bottom-0 left-3 right-3 h-[2px] bg-gold-400 rounded-full transition-transform duration-300 origin-left ${
                          link.children.some((c) => isActive(c.path))
                            ? 'scale-x-100'
                            : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {dropdownOpen === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.97 }}
                          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                          className="absolute top-full left-0 mt-2 w-52 bg-navy-900/95 backdrop-blur-2xl rounded-xl border border-white/10 shadow-2xl shadow-black/30 overflow-hidden"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className={`flex items-center gap-3 px-5 py-3.5 text-sm transition-all ${
                                isActive(child.path)
                                  ? 'text-gold-400 bg-gold-500/10 border-l-2 border-gold-400'
                                  : 'text-white/70 hover:text-white hover:bg-white/5 border-l-2 border-transparent hover:border-gold-400/40'
                              }`}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink key={link.path} to={link.path} active={isActive(link.path)}>
                    {link.name}
                  </NavLink>
                )
              )}
            </div>

            {/* ============ CTA + Search + Phone + Mobile Toggle ============ */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search */}
              <button
                onClick={onSearchOpen}
                className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
                aria-label="Search"
              >
                <MagnifyingGlass size={18} className="sm:hidden" />
                <MagnifyingGlass size={20} className="hidden sm:block" />
              </button>

              {/* Phone — visible on xl+ */}
              <a
                href={`tel:${business.phoneRaw || business.phone}`}
                className="hidden xl:flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
              >
                <Phone size={16} weight="bold" />
                <span>{business.phone}</span>
              </a>

              {/* Divider — visible on xl+ */}
              <div className="hidden xl:block w-px h-5 bg-white/10" />

              {/* CTA — Get Free Quote */}
              <Link
                to="/contact"
                className="hidden sm:inline-flex items-center bg-gold-500 hover:bg-gold-600 text-navy-950 px-5 lg:px-6 py-2 lg:py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/25 hover:-translate-y-px active:translate-y-0"
              >
                Get Free Quote
              </Link>

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden text-white p-1.5 relative z-[60]"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="block"
                    >
                      <X size={24} weight="bold" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="block"
                    >
                      <List size={24} weight="bold" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ============ Mobile Full-Screen Menu ============ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 z-50 bg-navy-950/98 backdrop-blur-2xl"
            style={{ top: 'var(--banner-height, 0px)' }}
          >
            <div className="flex flex-col justify-between h-full pt-24 pb-8 px-6 overflow-y-auto">
              {/* Nav links */}
              <div className="space-y-1">
                {/* Mobile search bar */}
                <motion.button
                  custom={0}
                  variants={mobileLinkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => {
                    setMobileOpen(false);
                    onSearchOpen?.();
                  }}
                  className="flex items-center gap-4 w-full text-white/40 px-2 py-3 rounded-xl hover:bg-white/5 mb-4"
                >
                  <MagnifyingGlass size={20} />
                  <span className="text-base">Search...</span>
                  <kbd className="ml-auto text-xs text-white/20 bg-white/5 px-2 py-1 rounded-md font-mono">
                    Ctrl+K
                  </kbd>
                </motion.button>

                {navLinks.map((link, idx) =>
                  link.children ? (
                    <div key={link.name}>
                      <motion.button
                        custom={idx + 1}
                        variants={mobileLinkVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={() =>
                          setDropdownOpen(dropdownOpen === link.name ? null : link.name)
                        }
                        className={`flex items-center justify-between w-full px-2 py-4 text-2xl font-semibold tracking-tight transition-colors ${
                          link.children.some((c) => isActive(c.path))
                            ? 'text-gold-400'
                            : 'text-white/90'
                        }`}
                      >
                        {link.name}
                        <CaretDown
                          size={20}
                          className={`transition-transform duration-300 ${
                            dropdownOpen === link.name ? 'rotate-180' : ''
                          }`}
                        />
                      </motion.button>
                      <AnimatePresence>
                        {dropdownOpen === link.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden pl-4 border-l-2 border-gold-500/30 ml-2"
                          >
                            {link.children.map((child) => (
                              <Link
                                key={child.path}
                                to={child.path}
                                className={`block px-4 py-3 text-lg font-medium transition-colors ${
                                  isActive(child.path)
                                    ? 'text-gold-400'
                                    : 'text-white/60 hover:text-white'
                                }`}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.div
                      key={link.path}
                      custom={idx + 1}
                      variants={mobileLinkVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Link
                        to={link.path}
                        className={`block px-2 py-4 text-2xl font-semibold tracking-tight transition-colors ${
                          isActive(link.path)
                            ? 'text-gold-400'
                            : 'text-white/90 hover:text-white'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  )
                )}
              </div>

              {/* Bottom CTA section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="space-y-4 pt-6 border-t border-white/10"
              >
                {/* Primary CTA */}
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-gold-500 hover:bg-gold-600 text-navy-950 py-4 rounded-2xl font-bold text-lg tracking-wide transition-all"
                >
                  Get Free Quote
                </Link>

                {/* Secondary actions */}
                <div className="flex gap-3">
                  <a
                    href={`https://wa.me/${business.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-green-600/90 hover:bg-green-500 text-white py-3.5 rounded-xl text-sm font-semibold transition-colors"
                  >
                    <WhatsappLogo size={20} weight="fill" />
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${business.phoneRaw || business.phone}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white py-3.5 rounded-xl text-sm font-semibold transition-colors"
                  >
                    <Phone size={20} weight="bold" />
                    Call Us
                  </a>
                </div>

                {/* Contact details in mobile menu */}
                {business.email && (
                  <a
                    href={`mailto:${business.email}`}
                    className="flex items-center justify-center gap-2 text-white/40 text-sm hover:text-white/60 transition-colors pt-2"
                  >
                    <Envelope size={14} />
                    {business.email}
                  </a>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
