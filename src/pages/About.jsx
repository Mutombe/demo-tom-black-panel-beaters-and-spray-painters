import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Target,
  Eye,
  Buildings,
  LinkedinLogo,
} from '@phosphor-icons/react';
import PageTransition from '../components/PageTransition';
import PageHero from '../components/PageHero';
import SectionReveal from '../components/SectionReveal';
import siteData from '../data/siteData';
import iconMap from '../data/iconMap';

function About() {
  const { business, about } = siteData;

  const heroImage =
    siteData.pageImages?.about ||
    about.storyImage ||
    siteData.hero?.backgroundImage ||
    '';

  /* Use a project image for the CTA background — falls back through available images */
  const ctaBgImage =
    siteData.homeCta?.backgroundImage ||
    siteData.hero?.backgroundImage ||
    about.storyImage ||
    '';

  return (
    <PageTransition>
      <PageHero
        label="About Us"
        title={about.heroTitle}
        subtitle={about.heroSubtitle}
        image={heroImage}
        imageAlt={`${business.name} team and company`}
      />

      {/* ──────────────────────────────────────────────
          COMPANY STORY — overlapping image + floating stat card
      ────────────────────────────────────────────── */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            {/* Image column — overlaps into text column on large screens */}
            <SectionReveal direction="right">
              <div className="relative lg:-mr-12 xl:-mr-16">
                {/* Decorative frame accent behind image */}
                <div className="absolute -top-4 -left-4 w-32 h-32 border-2 border-gold-500/20 rounded-2xl hidden sm:block" />

                <img
                  src={about.storyImage}
                  alt={about.storyImageAlt}
                  className="rounded-2xl w-full aspect-[4/3] object-cover object-center relative z-10 shadow-2xl shadow-navy-900/10"
                  loading="lazy"
                />

                {/* Floating stat card — overlaps image bottom-right corner */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="absolute -bottom-5 -right-3 sm:-bottom-6 sm:-right-5 z-20 hidden sm:block"
                >
                  <div className="bg-navy-900 text-white px-5 py-4 sm:px-7 sm:py-5 rounded-2xl shadow-xl border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gold-500/15 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Buildings size={24} className="text-gold-400" />
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-bold leading-none">
                          {about.storyProjectCount}
                        </div>
                        <div className="text-xs sm:text-sm text-white/60 mt-0.5">
                          {about.storyProjectLabel}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Second floating card — experience years, top-left */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: -20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="absolute -top-5 -right-3 sm:-top-4 sm:right-8 z-20 hidden sm:block"
                >
                  <div className="bg-gold-500 text-white px-4 py-3 sm:px-5 sm:py-4 rounded-xl shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold leading-none">
                      {business.yearsExperience}
                    </div>
                    <div className="text-[10px] sm:text-xs text-white/80 mt-0.5 uppercase tracking-wider font-medium">
                      Years Experience
                    </div>
                  </div>
                </motion.div>
              </div>
            </SectionReveal>

            {/* Text column — with left gold accent bar */}
            <SectionReveal direction="left">
              <div className="lg:pl-8 xl:pl-12">
                <span className="inline-flex items-center gap-2 text-gold-600 text-sm font-semibold uppercase tracking-wider mb-4">
                  <span className="w-8 h-[2px] bg-gold-500" />
                  Our Story
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900 mb-4 sm:mb-6 leading-tight">
                  {about.storyTitle}
                </h2>
                <div className="space-y-4 text-steel-600 leading-relaxed text-sm sm:text-base">
                  {about.storyParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {/* Inline mini-stats row */}
                <div className="flex gap-8 mt-8 pt-8 border-t border-earth-100">
                  {[
                    { num: business.projectsCompleted, label: 'Projects' },
                    { num: business.employees, label: 'Team Members' },
                    { num: business.yearsExperience, label: 'Years' },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="text-2xl sm:text-3xl font-bold text-navy-900">{s.num}</div>
                      <div className="text-xs text-steel-400 uppercase tracking-wider mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          MISSION — full-width banner with BG image
      ────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={siteData.homeCta?.backgroundImage || about.storyImage}
            alt=""
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-navy-950/70" />
          {/* Noise texture */}
          <div
            className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: '128px 128px',
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-500/15 rounded-2xl mb-6">
                <Target size={32} className="text-gold-400" weight="duotone" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400 mb-4">
                Our Mission
              </h3>
              <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-white leading-relaxed max-w-3xl mx-auto">
                "{about.mission}"
              </p>
              {/* Decorative gold rule */}
              <div className="w-16 h-[2px] bg-gradient-to-r from-gold-400 to-gold-600 mx-auto mt-8" />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* VISION — complementary card */}
      <section className="section-padding bg-earth-50">
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <div className="relative bg-white rounded-3xl p-8 sm:p-12 border border-earth-100 shadow-lg shadow-navy-900/[0.03] overflow-hidden">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold-500/8 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-navy-900/5 to-transparent rounded-tr-full" />

              <div className="relative flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-navy-900 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Eye size={28} className="text-gold-400" weight="duotone" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600 mb-3">
                    Our Vision
                  </h3>
                  <p className="text-lg sm:text-xl text-navy-900 leading-relaxed font-medium">
                    {about.vision}
                  </p>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          VALUES — numbered grid with faded background numbers
      ────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-flex items-center gap-2 text-gold-600 text-sm font-semibold uppercase tracking-wider mb-4">
                <span className="w-8 h-[2px] bg-gold-500" />
                Our Values
                <span className="w-8 h-[2px] bg-gold-500" />
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900">
                The Pillars That Guide Us
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {about.values.map((value, index) => {
              const IconComp = iconMap[value.iconName] || iconMap.ShieldCheck;
              const num = String(index + 1).padStart(2, '0');
              return (
                <SectionReveal key={value.title} delay={index * 0.1}>
                  <div className="relative group bg-white rounded-2xl p-5 sm:p-8 border border-earth-100 hover:border-gold-200 hover:shadow-lg hover:shadow-gold-500/5 transition-all duration-300 h-full overflow-hidden">
                    {/* Large faded number background */}
                    <span className="absolute top-2 right-3 sm:top-3 sm:right-4 text-5xl sm:text-7xl font-bold text-navy-900/[0.04] leading-none select-none pointer-events-none">
                      {num}
                    </span>

                    <div className="relative z-10">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gold-500/10 group-hover:bg-gold-500/15 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transition-colors">
                        <IconComp
                          size={24}
                          className="text-gold-600"
                          weight="duotone"
                        />
                      </div>
                      <h3 className="text-sm sm:text-lg font-bold text-navy-900 mb-2 sm:mb-3">
                        {value.title}
                      </h3>
                      <p className="text-steel-500 text-xs sm:text-sm leading-relaxed">
                        {value.desc}
                      </p>
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          TEAM — gold ring avatars + hover bio overlay + LinkedIn
      ────────────────────────────────────────────── */}
      <section className="section-padding bg-navy-900">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-flex items-center gap-2 text-gold-400 text-sm font-semibold uppercase tracking-wider mb-4">
                <span className="w-8 h-[2px] bg-gold-500/40" />
                Our Leadership
                <span className="w-8 h-[2px] bg-gold-500/40" />
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Meet the Team
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {about.team.map((member, index) => (
              <SectionReveal key={member.name} delay={index * 0.1}>
                <TeamCard member={member} businessName={business.name} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          TIMELINE — alternating left/right with gold connecting line
      ────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-flex items-center gap-2 text-gold-600 text-sm font-semibold uppercase tracking-wider mb-4">
                <span className="w-8 h-[2px] bg-gold-500" />
                Our Journey
                <span className="w-8 h-[2px] bg-gold-500" />
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900">
                Key Milestones
              </h2>
            </div>
          </SectionReveal>

          {/* Timeline container */}
          <div className="relative">
            {/* Vertical gold connecting line — centered on desktop, left-aligned on mobile */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold-500 via-gold-400 to-gold-300 sm:-translate-x-px" />

            <div className="space-y-8 sm:space-y-0">
              {about.milestones.map((milestone, index) => {
                const isEven = index % 2 === 0;
                return (
                  <SectionReveal key={milestone.year} delay={index * 0.1}>
                    <div className={`relative flex items-start sm:items-center gap-4 sm:gap-0 ${
                      index > 0 ? 'sm:mt-12' : ''
                    }`}>
                      {/* LEFT content (desktop only — even items) */}
                      <div className={`hidden sm:block sm:w-1/2 ${isEven ? 'pr-12 text-right' : ''}`}>
                        {isEven && (
                          <div className="bg-earth-50 rounded-2xl p-6 border border-earth-100 hover:shadow-lg hover:shadow-navy-900/5 transition-shadow">
                            <span className="text-2xl font-bold text-gold-500">{milestone.year}</span>
                            <h4 className="text-navy-900 font-bold text-lg mt-2 mb-2">{milestone.title}</h4>
                            <p className="text-steel-500 text-sm leading-relaxed">{milestone.desc}</p>
                          </div>
                        )}
                      </div>

                      {/* CENTER dot — desktop */}
                      <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 z-10">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                          className="w-4 h-4 bg-gold-500 rounded-full ring-4 ring-white shadow-md"
                        />
                      </div>

                      {/* LEFT dot — mobile */}
                      <div className="sm:hidden flex-shrink-0 z-10">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                          className="w-3 h-3 bg-gold-500 rounded-full ring-4 ring-white shadow-md mt-2 ml-[18px]"
                        />
                      </div>

                      {/* RIGHT content (desktop only — odd items) */}
                      <div className={`hidden sm:block sm:w-1/2 ${!isEven ? 'pl-12' : ''}`}>
                        {!isEven && (
                          <div className="bg-earth-50 rounded-2xl p-6 border border-earth-100 hover:shadow-lg hover:shadow-navy-900/5 transition-shadow">
                            <span className="text-2xl font-bold text-gold-500">{milestone.year}</span>
                            <h4 className="text-navy-900 font-bold text-lg mt-2 mb-2">{milestone.title}</h4>
                            <p className="text-steel-500 text-sm leading-relaxed">{milestone.desc}</p>
                          </div>
                        )}
                      </div>

                      {/* Mobile content — always to the right of the dot */}
                      <div className="sm:hidden flex-1 ml-4">
                        <div className="bg-earth-50 rounded-2xl p-4 border border-earth-100">
                          <span className="text-lg font-bold text-gold-500">{milestone.year}</span>
                          <h4 className="text-navy-900 font-bold text-base mt-1 mb-1">{milestone.title}</h4>
                          <p className="text-steel-500 text-xs leading-relaxed">{milestone.desc}</p>
                        </div>
                      </div>
                    </div>
                  </SectionReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          CTA — real background image with dark overlay (max 70%)
      ────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* BG Image */}
        <div className="absolute inset-0">
          <img
            src={ctaBgImage}
            alt=""
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-navy-950/70" />
          <div
            className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: '128px 128px',
            }}
          />
        </div>

        {/* Decorative gold line at top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                {about.ctaTitle}
              </h2>
              <p className="text-white/70 text-base sm:text-lg mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">
                {about.ctaSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-900 px-8 py-4 rounded-xl font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold-500/25 text-sm sm:text-base"
                >
                  {about.ctaCta}
                  <ArrowRight size={20} weight="bold" />
                </Link>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 px-8 py-4 rounded-xl font-semibold transition-all hover:-translate-y-0.5 text-sm sm:text-base backdrop-blur-sm"
                >
                  View Our Work
                  <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  );
}

/* ──────────────────────────────────────────────
   TeamCard — gold ring border, hover bio overlay, LinkedIn link
────────────────────────────────────────────── */
function TeamCard({ member, businessName }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group text-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative mb-4 sm:mb-6 overflow-hidden rounded-2xl">
        {/* Gold ring border */}
        <div className="p-[3px] bg-gradient-to-b from-gold-400 via-gold-500 to-gold-600 rounded-2xl">
          <div className="rounded-[13px] overflow-hidden aspect-[3/4] relative">
            <img
              src={member.image}
              alt={`${member.name}, ${member.role} at ${businessName}`}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />

            {/* Persistent gradient for name readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />

            {/* Bio overlay — slides up from bottom on hover */}
            <motion.div
              initial={false}
              animate={{
                y: hovered ? 0 : '100%',
                opacity: hovered ? 1 : 0,
              }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/95 via-navy-950/80 to-navy-950/40 p-4 pt-10 sm:p-5 sm:pt-14"
            >
              <p className="text-white/80 text-[10px] sm:text-xs leading-relaxed line-clamp-3">
                {member.bio || `Leading ${member.role.toLowerCase()} operations at ${businessName} with a focus on excellence and innovation.`}
              </p>
              {/* LinkedIn icon */}
              <a
                href={member.linkedin || '#'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-gold-400 hover:text-gold-300 text-[10px] sm:text-xs font-medium mt-2 transition-colors"
              >
                <LinkedinLogo size={14} weight="fill" />
                LinkedIn
              </a>
            </motion.div>
          </div>
        </div>
      </div>
      <h4 className="text-white font-semibold text-sm sm:text-lg">
        {member.name}
      </h4>
      <p className="text-gold-400 text-xs sm:text-sm mt-1">{member.role}</p>
    </div>
  );
}

export default About;
