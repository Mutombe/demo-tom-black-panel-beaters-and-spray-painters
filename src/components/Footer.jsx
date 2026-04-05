import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HardHat,
  MapPin,
  Phone,
  Envelope,
  WhatsappLogo,
  Clock,
  ArrowRight,
  FacebookLogo,
  LinkedinLogo,
  InstagramLogo,
  PaperPlaneTilt,
  ShieldCheck,
  CheckCircle,
} from '@phosphor-icons/react';
import siteData from '../data/siteData';

function Footer() {
  const currentYear = new Date().getFullYear();
  const { business, navbar, footer } = siteData;
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  const serviceNames = siteData.servicesPreview.map((s) => s.title);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <>
      {/* ══════════════════════════════════════════════════
          PRE-FOOTER CTA BAND
          ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-900 to-navy-950">
        {/* Subtle dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Soft radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-500/[0.06] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          {/* Overline badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6">
            <PaperPlaneTilt size={14} weight="fill" className="text-gold-400" />
            <span className="text-gold-400 text-xs font-semibold uppercase tracking-widest">
              Stay in the Loop
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-4 font-heading">
            Ready to Build Something{' '}
            <span className="text-gold-400">Extraordinary</span>?
          </h2>
          <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Get project insights, industry updates, and exclusive offers
            delivered straight to your inbox.
          </p>

          {/* Newsletter input — glassmorphic pill */}
          <form
            onSubmit={handleSubscribe}
            className="relative max-w-lg mx-auto"
          >
            <div className="relative flex items-center bg-white/[0.05] border border-white/10 backdrop-blur-sm rounded-full p-1.5 focus-within:border-gold-500/40 transition-colors duration-300">
              <Envelope
                size={18}
                className="text-white/30 ml-4 mr-2 shrink-0"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 bg-transparent text-white text-sm placeholder:text-white/30 outline-none py-2.5 pr-2"
              />
              <button
                type="submit"
                className="shrink-0 bg-gold-500 hover:bg-gold-400 text-white text-sm font-semibold px-5 sm:px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/25 flex items-center gap-2"
              >
                <span className="hidden sm:inline">Get Free Assessment</span>
                <span className="sm:hidden">Subscribe</span>
                <ArrowRight size={14} weight="bold" />
              </button>
            </div>

            {/* Success message */}
            {subscribed && (
              <div className="absolute -bottom-10 left-0 right-0 flex items-center justify-center gap-2 text-green-400 text-sm animate-fade-in">
                <CheckCircle size={16} weight="fill" />
                <span>Thank you! We'll be in touch soon.</span>
              </div>
            )}
          </form>

          {/* Trust line */}
          <p className="mt-14 text-white/25 text-xs flex items-center justify-center gap-2">
            <ShieldCheck size={14} weight="fill" className="text-gold-500/60" />
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          MAIN FOOTER
          ══════════════════════════════════════════════════ */}
      <footer className="relative bg-navy-950 text-white overflow-hidden">
        {/* SVG wave divider at top */}
        <div className="absolute top-0 left-0 right-0 -translate-y-[1px]">
          <svg
            viewBox="0 0 1440 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-8 sm:h-12"
            preserveAspectRatio="none"
          >
            <path
              d="M0 48h1440V24c-120 12-240 20-360 20S840 32 720 20 480 0 360 0 120 12 0 24v24z"
              fill="currentColor"
              className="text-navy-950"
            />
          </svg>
        </div>

        {/* Subtle background texture */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, #fff 0.5px, transparent 0.5px)',
            backgroundSize: '16px 16px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* ── Company Identity ── */}
            <div className="lg:col-span-4">
              <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
                {navbar.logoImage ? (
                  <img
                    src={navbar.logoImage}
                    alt={navbar.logoLine1}
                    className={`h-10 w-auto object-contain ${navbar.logoBrightness === 'invert' ? 'brightness-0 invert' : ''}`}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-11 h-11 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center shadow-lg shadow-gold-500/20 group-hover:shadow-gold-500/30 transition-shadow">
                    <HardHat size={22} weight="fill" className="text-white" />
                  </div>
                )}
                {(!navbar.logoImage || navbar.showLogoText) && (
                  <div>
                    <span className="text-white font-bold text-lg block leading-tight">
                      {navbar.logoLine1}
                    </span>
                    <span className="text-gold-400 text-[10px] uppercase tracking-[0.2em] font-medium">
                      {navbar.logoLine2}
                    </span>
                  </div>
                )}
              </Link>

              <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-xs">
                {footer.description}
              </p>

              {/* Social icons — upgraded with ring borders */}
              <div className="flex gap-3">
                {[
                  {
                    href: business.socialLinks.facebook,
                    label: 'Facebook',
                    Icon: FacebookLogo,
                  },
                  {
                    href: business.socialLinks.linkedin,
                    label: 'LinkedIn',
                    Icon: LinkedinLogo,
                  },
                  {
                    href: business.socialLinks.instagram,
                    label: 'Instagram',
                    Icon: InstagramLogo,
                  },
                ]
                  .filter((s) => s.href)
                  .map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-12 h-12 rounded-full bg-white/[0.04] ring-1 ring-white/10 hover:bg-gold-500 hover:ring-gold-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gold-500/20"
                    >
                      <Icon size={20} weight="fill" />
                    </a>
                  ))}
              </div>
            </div>

            {/* ── Quick Links ── */}
            <div className="lg:col-span-2">
              <div>
                <span className="block w-8 h-0.5 bg-gold-500 rounded-full mb-3" />
                <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
                  Quick Links
                </h4>
              </div>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-white/50 hover:text-gold-400 text-sm transition-all duration-200 flex items-center gap-2 group"
                    >
                      <ArrowRight
                        size={12}
                        weight="bold"
                        className="opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-gold-500"
                      />
                      <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Services ── */}
            <div className="lg:col-span-3">
              <div>
                <span className="block w-8 h-0.5 bg-gold-500 rounded-full mb-3" />
                <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
                  Our Services
                </h4>
              </div>
              <ul className="space-y-3">
                {serviceNames.map((service) => (
                  <li key={service}>
                    <Link
                      to="/services"
                      className="text-white/50 hover:text-gold-400 text-sm transition-all duration-200 flex items-center gap-2 group"
                    >
                      <ArrowRight
                        size={12}
                        weight="bold"
                        className="opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-gold-500"
                      />
                      <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                        {service}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Contact Info ── */}
            <div className="lg:col-span-3">
              <div>
                <span className="block w-8 h-0.5 bg-gold-500 rounded-full mb-3" />
                <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
                  Contact Us
                </h4>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm group">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0 group-hover:bg-gold-500/10 transition-colors">
                    <MapPin size={16} className="text-gold-500" />
                  </div>
                  <span className="text-white/50 pt-1.5 leading-snug">
                    {business.address}, {business.country}
                  </span>
                </li>
                <li>
                  <a
                    href={`tel:${business.phoneRaw}`}
                    className="flex gap-3 text-sm text-white/50 hover:text-gold-400 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0 group-hover:bg-gold-500/10 transition-colors">
                      <Phone size={16} className="text-gold-500" />
                    </div>
                    <span className="pt-2">{business.phone}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${business.email}`}
                    className="flex gap-3 text-sm text-white/50 hover:text-gold-400 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0 group-hover:bg-gold-500/10 transition-colors">
                      <Envelope size={16} className="text-gold-500" />
                    </div>
                    <span className="pt-2 break-all">{business.email}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${business.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-3 text-sm text-white/50 hover:text-green-400 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0 group-hover:bg-green-500/10 transition-colors">
                      <WhatsappLogo size={16} className="text-green-500" />
                    </div>
                    <span className="pt-2">WhatsApp Us</span>
                  </a>
                </li>
                <li className="flex gap-3 text-sm">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock size={16} className="text-gold-500" />
                  </div>
                  <div className="text-white/50 pt-1.5 leading-snug">
                    {business.hours.map((h) => (
                      <p key={h.day}>
                        <span className="text-white/60">{h.day}:</span> {h.time}
                      </p>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════
              BOTTOM BAR
              ══════════════════════════════════════════════════ */}
          <div className="mt-14 pt-8 border-t border-white/10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Copyright */}
              <p className="text-white/30 text-sm text-center lg:text-left">
                &copy; {currentYear} {footer.copyright}. All rights reserved.
              </p>

              {/* Trust badges */}
              <div className="flex items-center gap-4 flex-wrap justify-center">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] ring-1 ring-white/[0.06] text-white/40 text-xs">
                  <ShieldCheck size={14} weight="fill" className="text-gold-500/70" />
                  <span>Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] ring-1 ring-white/[0.06] text-white/40 text-xs">
                  <CheckCircle size={14} weight="fill" className="text-gold-500/70" />
                  <span>ISO Certified</span>
                </div>
              </div>

              {/* Legal links */}
              <div className="flex gap-6 text-sm text-white/30">
                <button
                  onClick={() =>
                    document.dispatchEvent(new CustomEvent('openPrivacy'))
                  }
                  className="hover:text-white/60 transition-colors"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() =>
                    document.dispatchEvent(new CustomEvent('openCookie'))
                  }
                  className="hover:text-white/60 transition-colors"
                >
                  Cookie Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
