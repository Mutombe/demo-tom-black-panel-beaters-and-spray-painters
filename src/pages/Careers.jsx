import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
  Briefcase,
  MapPin,
  ArrowRight,
  CaretDown,
  PaperPlaneTilt,
  WhatsappLogo,
  Envelope,
  Heart,
  GraduationCap,
  ShieldCheck,
  CurrencyDollar,
  FirstAid,
  Car,
  Rocket,
  Star,
  Users,
  Clock,
  Trophy,
  Lightbulb,
} from '@phosphor-icons/react';
import PageTransition from '../components/PageTransition';
import PageHero from '../components/PageHero';
import SectionReveal from '../components/SectionReveal';
import siteData from '../data/siteData';
import iconMap from '../data/iconMap';

// Color palette for alternating benefit icon backgrounds
const BENEFIT_COLORS = [
  { bg: 'bg-gold-500/10', text: 'text-gold-600', ring: 'ring-gold-500/20' },
  { bg: 'bg-navy-100', text: 'text-navy-700', ring: 'ring-navy-200' },
  { bg: 'bg-earth-200/60', text: 'text-earth-700', ring: 'ring-earth-300/40' },
  { bg: 'bg-green-50', text: 'text-green-600', ring: 'ring-green-200' },
  { bg: 'bg-gold-500/10', text: 'text-gold-600', ring: 'ring-gold-500/20' },
  { bg: 'bg-navy-100', text: 'text-navy-700', ring: 'ring-navy-200' },
];

// Perk items for the horizontal scroll strip
const PERK_ITEMS = [
  { icon: FirstAid, label: 'Health Coverage' },
  { icon: GraduationCap, label: 'Training & Development' },
  { icon: CurrencyDollar, label: 'Competitive Pay' },
  { icon: ShieldCheck, label: 'Safety Gear Provided' },
  { icon: Car, label: 'Transport Allowance' },
  { icon: Heart, label: 'Work-Life Balance' },
  { icon: Trophy, label: 'Performance Bonuses' },
  { icon: Rocket, label: 'Career Growth' },
  { icon: Users, label: 'Team Culture' },
  { icon: Lightbulb, label: 'Innovation Projects' },
];

function Careers() {
  const { business, careers } = siteData;
  const [expandedJob, setExpandedJob] = useState(null);
  const [quickEmail, setQuickEmail] = useState('');
  const perksRef = useRef(null);

  const handleApply = (jobTitle) => {
    const subject = encodeURIComponent(
      `Application: ${jobTitle} - ${business.legalName}`
    );
    const body = encodeURIComponent(
      `Dear Hiring Manager,\n\nI am writing to express my interest in the ${jobTitle} position at ${business.legalName}.\n\n[Please attach your CV and cover letter]\n\nThank you for your consideration.\n\nBest regards,\n[Your Name]`
    );
    window.location.href = `mailto:${business.email}?subject=${subject}&body=${body}`;
    toast.success('Opening email client. Good luck with your application!');
  };

  const handleWhatsApp = (jobTitle) => {
    const message = encodeURIComponent(
      `Hello ${business.name}, I am interested in the ${jobTitle} position. Could you please share more details about this opportunity?`
    );
    window.open(
      `https://wa.me/${business.whatsappNumber}?text=${message}`,
      '_blank'
    );
  };

  const handleQuickApply = (e) => {
    e.preventDefault();
    if (!quickEmail.trim()) {
      toast.error('Please enter your email address.');
      return;
    }
    const subject = encodeURIComponent(
      `General Application - ${business.legalName}`
    );
    const body = encodeURIComponent(
      `Dear Hiring Manager,\n\nI am interested in career opportunities at ${business.legalName}.\n\nMy email: ${quickEmail}\n\n[Please attach your CV and cover letter]\n\nBest regards`
    );
    window.location.href = `mailto:${business.email}?subject=${subject}&body=${body}`;
    toast.success('Opening email client. Good luck!');
    setQuickEmail('');
  };

  const heroImage =
    siteData.pageImages?.careers ||
    careers.heroImage ||
    siteData.hero?.backgroundImage ||
    '';

  return (
    <PageTransition>
      <PageHero
        label="Careers"
        title={careers.heroTitle}
        subtitle={careers.heroSubtitle}
        image={heroImage}
        imageAlt={`Career opportunities at ${business.name}`}
      />

      {/* ── Culture Section: 2-Column with Image ── */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-block text-gold-600 text-sm font-semibold uppercase tracking-wider mb-4">
                Our Culture
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900">
                {careers.cultureTitle}
              </h2>
            </div>
          </SectionReveal>

          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center mb-12 sm:mb-16">
            {/* Image Column with Gold Accent */}
            <SectionReveal direction="right">
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/10">
                  <img
                    src={careers.cultureImage}
                    alt={careers.cultureImageAlt}
                    className="w-full aspect-[4/3] object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/30 via-transparent to-transparent" />
                </div>
                {/* Gold accent corner */}
                <div className="absolute -bottom-3 -right-3 w-28 h-28 border-b-4 border-r-4 border-gold-500/40 rounded-br-3xl -z-10" />
                <div className="absolute -top-3 -left-3 w-20 h-20 border-t-4 border-l-4 border-gold-500/20 rounded-tl-3xl -z-10" />
              </div>
            </SectionReveal>

            {/* Culture Items Column */}
            <SectionReveal direction="left">
              <div className="space-y-6 sm:space-y-8">
                {careers.cultureItems.map((item, index) => {
                  const IconComp = iconMap[item.iconName] || iconMap.Users;
                  return (
                    <div key={item.title} className="flex gap-4 sm:gap-5">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shrink-0 ${BENEFIT_COLORS[index % BENEFIT_COLORS.length].bg}`}>
                        <IconComp
                          size={26}
                          className={BENEFIT_COLORS[index % BENEFIT_COLORS.length].text}
                          weight="duotone"
                        />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-navy-900 mb-1.5">
                          {item.title}
                        </h3>
                        <p className="text-steel-500 text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </SectionReveal>
          </div>

          {/* Culture Tagline Banner */}
          <SectionReveal>
            <div className="relative rounded-2xl overflow-hidden aspect-[21/9]">
              <img
                src={careers.cultureImage}
                alt={careers.cultureImageAlt}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-navy-950/50 to-navy-950/20 flex items-center">
                <div className="p-6 sm:p-8 md:p-12 max-w-lg">
                  <div className="w-10 h-1 bg-gold-500 rounded-full mb-4" />
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                    {careers.cultureTagline}
                  </h3>
                  <p className="text-white/80 leading-relaxed text-sm sm:text-base">
                    {careers.cultureTaglineDesc}
                  </p>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Perks Horizontal Scroll Strip ── */}
      <section className="bg-navy-900 py-6 sm:py-8 overflow-hidden">
        <div
          ref={perksRef}
          className="flex animate-marquee"
          style={{ width: 'max-content' }}
        >
          {/* Duplicate items for seamless loop */}
          {[...PERK_ITEMS, ...PERK_ITEMS].map((perk, i) => {
            const Icon = perk.icon;
            return (
              <div
                key={`${perk.label}-${i}`}
                className="flex items-center gap-2.5 px-6 sm:px-8"
              >
                <Icon size={20} className="text-gold-400" weight="fill" />
                <span className="text-white/80 text-sm font-medium whitespace-nowrap">
                  {perk.label}
                </span>
                <span className="text-white/20 ml-4">|</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Benefits Grid ── */}
      <section className="section-padding bg-earth-50">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-block text-gold-600 text-sm font-semibold uppercase tracking-wider mb-4">
                Benefits
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900">
                What We Offer
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {careers.benefits.map((benefit, index) => {
              const IconComp =
                iconMap[benefit.iconName] || iconMap.ShieldCheck;
              const colorSet = BENEFIT_COLORS[index % BENEFIT_COLORS.length];
              return (
                <SectionReveal key={benefit.title} delay={index * 0.08}>
                  <div className="bg-white rounded-2xl p-5 sm:p-6 border border-earth-100 h-full group hover:shadow-lg hover:border-earth-200 transition-all duration-300 card-hover-lift">
                    <div className="flex gap-4">
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 ${colorSet.bg} rounded-xl flex items-center justify-center shrink-0 ring-1 ${colorSet.ring} group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComp
                          size={24}
                          className={colorSet.text}
                          weight="duotone"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-navy-900 mb-1 text-sm sm:text-base">
                          {benefit.title}
                        </h3>
                        <p className="text-steel-500 text-xs sm:text-sm leading-relaxed">
                          {benefit.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Open Positions ── */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-block text-gold-600 text-sm font-semibold uppercase tracking-wider mb-4">
                Open Positions
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900 mb-4">
                Current Opportunities
              </h2>
              <p className="text-steel-500 text-base sm:text-lg">
                <span className="text-gold-500 font-bold">{careers.positions.length}</span>{' '}
                positions available
              </p>
            </div>
          </SectionReveal>

          <div className="space-y-4 sm:space-y-5">
            {careers.positions.map((job, index) => {
              const isExpanded = expandedJob === job.id;
              return (
                <SectionReveal key={job.id} delay={index * 0.06}>
                  <div
                    className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                      isExpanded
                        ? 'bg-white shadow-xl shadow-black/8 border-2 border-gold-500/20'
                        : 'bg-earth-50 border border-earth-100 hover:shadow-md hover:border-earth-200'
                    }`}
                  >
                    {/* Job Header */}
                    <button
                      onClick={() =>
                        setExpandedJob(isExpanded ? null : job.id)
                      }
                      className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 flex-wrap">
                          <h3 className="text-base sm:text-lg font-bold text-navy-900">
                            {job.title}
                          </h3>
                        </div>
                        {/* Styled department, type, location badges */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-navy-100 text-navy-700">
                            <Briefcase size={12} />
                            {job.department}
                          </span>
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                              job.type === 'Full-Time'
                                ? 'bg-green-50 text-green-700'
                                : job.type === 'Internship'
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-gold-50 text-gold-700'
                            }`}
                          >
                            {job.type}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-earth-100 text-earth-700">
                            <MapPin size={12} />
                            {job.location}
                          </span>
                        </div>
                      </div>

                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ml-4 transition-all duration-300 ${
                        isExpanded
                          ? 'bg-gold-500 text-white rotate-180'
                          : 'bg-earth-100 text-steel-400'
                      }`}>
                        <CaretDown size={18} weight="bold" />
                      </div>
                    </button>

                    {/* Expandable Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                            <div className="border-t border-earth-200 pt-5 sm:pt-6">
                              <p className="text-steel-600 leading-relaxed mb-6 text-sm sm:text-base">
                                {job.description}
                              </p>

                              <h4 className="text-sm font-semibold text-navy-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <div className="w-6 h-0.5 bg-gold-500 rounded-full" />
                                Requirements
                              </h4>
                              <ul className="space-y-2.5 mb-8">
                                {job.requirements.map((req) => (
                                  <li
                                    key={req}
                                    className="flex items-start gap-3 text-sm text-steel-600"
                                  >
                                    <div className="w-5 h-5 rounded-full bg-gold-500/10 flex items-center justify-center shrink-0 mt-0.5">
                                      <ArrowRight
                                        size={10}
                                        weight="bold"
                                        className="text-gold-600"
                                      />
                                    </div>
                                    {req}
                                  </li>
                                ))}
                              </ul>

                              {/* Apply Buttons */}
                              <div className="flex flex-wrap gap-3 p-4 sm:p-5 bg-earth-50 rounded-xl">
                                <button
                                  onClick={() => handleApply(job.title)}
                                  className="btn-primary text-sm flex-1 sm:flex-none justify-center"
                                >
                                  <PaperPlaneTilt size={18} />
                                  Apply via Email
                                </button>
                                <button
                                  onClick={() => handleWhatsApp(job.title)}
                                  className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 flex-1 sm:flex-none"
                                >
                                  <WhatsappLogo size={18} weight="fill" />
                                  Inquire via WhatsApp
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Your Career Starts Here: Application CTA ── */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={`Join the ${business.name} team`}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-navy-950/70" />
        </div>
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-dark rounded-3xl p-8 sm:p-10 md:p-14"
            >
              <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gold-500/30">
                <PaperPlaneTilt size={32} className="text-gold-400" weight="fill" />
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
                Your Career Starts Here
              </h2>
              <p className="text-white/60 text-sm sm:text-base mb-8 max-w-md mx-auto">
                {careers.generalApplicationSubtitle}
              </p>

              {/* Quick Apply Email Input */}
              <form
                onSubmit={handleQuickApply}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6"
              >
                <div className="relative flex-1">
                  <Envelope
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                  />
                  <input
                    type="email"
                    value={quickEmail}
                    onChange={(e) => setQuickEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/15 rounded-lg text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/30 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary text-sm whitespace-nowrap justify-center"
                >
                  <PaperPlaneTilt size={18} />
                  Quick Apply
                </button>
              </form>

              <p className="text-white/30 text-xs">
                Or send your full CV to{' '}
                <a
                  href={`mailto:${business.email}`}
                  className="text-gold-400/70 hover:text-gold-400 transition-colors underline"
                >
                  {business.email}
                </a>
              </p>
            </motion.div>
          </SectionReveal>
        </div>
      </section>

      {/* ── General Application (fallback flat CTA) ── */}
      <section className="bg-gold-500 py-12 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {careers.generalApplicationTitle}
              </h3>
              <p className="text-white/80 text-sm sm:text-base">
                We are always looking for talented individuals to join our team.
              </p>
            </div>
            <button
              onClick={() => handleApply('General Application')}
              className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 text-sm sm:text-base whitespace-nowrap shrink-0"
            >
              <PaperPlaneTilt size={18} />
              {careers.generalApplicationCta}
            </button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default Careers;
