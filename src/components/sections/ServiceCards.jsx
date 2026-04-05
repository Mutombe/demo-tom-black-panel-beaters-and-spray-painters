import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import { designTokens } from '../../data/siteData';
import siteData from '../../data/siteData';
import iconMap from '../../data/iconMap';
import SectionReveal from '../SectionReveal';

function CardNumber({ index }) {
  return (
    <span className="absolute top-4 right-5 text-6xl font-bold text-navy-900/[0.04] leading-none pointer-events-none select-none">
      {String(index + 1).padStart(2, '0')}
    </span>
  );
}

function LearnMorePill({ className = '' }) {
  return (
    <Link
      to="/services"
      className={`inline-flex items-center gap-2 bg-gold-500/10 text-gold-700 hover:bg-gold-500 hover:text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${className}`}
    >
      Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
    </Link>
  );
}

function IconTopCard({ service, index, isFeatured }) {
  const IconComp = iconMap[service.iconName] || iconMap.Buildings;
  const serviceItem = siteData.services?.items?.find(s => s.title === service.title);

  return (
    <SectionReveal delay={index * 0.1}>
      <div className={`group relative bg-white hover:bg-navy-900 border border-earth-100 hover:border-navy-800 rounded-2xl p-8 transition-all duration-500 h-full overflow-hidden hover:shadow-lg hover:shadow-black/10 hover:-translate-y-1 ${isFeatured ? 'lg:col-span-2' : ''}`}>
        {/* Card number watermark */}
        <CardNumber index={index} />

        {/* Shine sweep */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

        {/* Gold border glow on hover (dark card state) */}
        <div className="absolute inset-0 rounded-2xl border border-gold-500/0 group-hover:border-gold-500/20 transition-all duration-500 pointer-events-none" />

        {/* Icon */}
        <div className={`${isFeatured ? 'w-18 h-18 p-5' : 'w-14 h-14 p-4'} bg-gradient-to-br from-gold-500/10 to-gold-500/5 group-hover:from-gold-500/20 group-hover:to-gold-500/10 rounded-2xl border border-gold-500/10 flex items-center justify-center mb-6 transition-all duration-500`}>
          <IconComp size={isFeatured ? 34 : 28} className="text-gold-600 group-hover:text-gold-400 transition-colors duration-500" />
        </div>

        <h3 className={`${isFeatured ? 'text-2xl' : 'text-xl'} font-bold text-navy-900 group-hover:text-white mb-3 transition-colors duration-500`}>
          {service.title}
        </h3>
        <p className="text-steel-500 group-hover:text-white/70 text-sm leading-relaxed transition-colors duration-500">
          {service.desc}
        </p>

        <div className="mt-6">
          <LearnMorePill className="group-hover:bg-gold-500/20 group-hover:text-gold-400 group-hover:hover:bg-gold-500 group-hover:hover:text-white" />
        </div>

        {/* Bottom border reveal */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-500 to-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </SectionReveal>
  );
}

function OverlayCard({ service, index }) {
  const IconComp = iconMap[service.iconName] || iconMap.Buildings;
  const serviceItem = siteData.services?.items?.find(s => s.title === service.title);
  const bgImage = serviceItem?.image;

  return (
    <SectionReveal delay={index * 0.1}>
      <Link to="/services" className="group relative block rounded-2xl overflow-hidden h-full min-h-[300px] hover:shadow-lg hover:shadow-black/10 hover:-translate-y-1 transition-all duration-500">
        {bgImage && (
          <img
            src={bgImage}
            alt={service.title}
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
          />
        )}
        <div className={`absolute inset-0 ${bgImage ? 'bg-gradient-to-t from-navy-950/90 via-navy-950/50 to-navy-950/20' : 'bg-navy-900'} group-hover:from-navy-950/95 transition-all duration-500`} />

        {/* Card number watermark */}
        <span className="absolute top-5 right-6 text-7xl font-bold text-white/[0.06] leading-none pointer-events-none select-none z-10">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Gold border glow on hover */}
        <div className="absolute inset-0 rounded-2xl border border-gold-500/0 group-hover:border-gold-500/25 transition-all duration-500 pointer-events-none z-20" />

        <div className="relative z-10 p-8 flex flex-col h-full justify-end">
          <div className="w-12 h-12 bg-gradient-to-br from-gold-500/20 to-gold-500/10 group-hover:from-gold-500/30 group-hover:to-gold-500/15 rounded-2xl border border-gold-500/10 flex items-center justify-center mb-4 transition-all duration-500">
            <IconComp size={24} className="text-gold-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
          <p className="text-white/60 group-hover:text-white/80 text-sm leading-relaxed transition-colors duration-500">{service.desc}</p>
          <div className="mt-5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            <span className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-400 hover:bg-gold-500 hover:text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300">
              Explore <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </SectionReveal>
  );
}

function HorizontalCard({ service, index }) {
  const IconComp = iconMap[service.iconName] || iconMap.Buildings;

  return (
    <SectionReveal delay={index * 0.1}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="group relative flex gap-6 items-start bg-white hover:bg-earth-50/80 border border-earth-100 hover:border-earth-200 rounded-2xl p-6 transition-all duration-500 h-full hover:shadow-lg hover:shadow-black/10 overflow-hidden"
      >
        {/* Card number watermark */}
        <CardNumber index={index} />

        <div className="w-14 h-14 bg-gradient-to-br from-gold-500/10 to-gold-500/5 group-hover:from-gold-500/15 group-hover:to-gold-500/10 rounded-2xl border border-gold-500/10 flex items-center justify-center shrink-0 transition-all duration-300">
          <IconComp size={28} className="text-gold-600 transition-colors" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-navy-900 mb-2">{service.title}</h3>
          <p className="text-steel-500 text-sm leading-relaxed mb-4">{service.desc}</p>
          <LearnMorePill />
        </div>
      </motion.div>
    </SectionReveal>
  );
}

function MinimalCard({ service, index, isFeatured }) {
  return (
    <SectionReveal delay={index * 0.1}>
      <div className={`relative border-l-3 border-gold-500 pl-6 py-5 h-full group hover:bg-earth-50/50 transition-all duration-500 rounded-r-lg hover:shadow-lg hover:shadow-black/10 hover:-translate-y-2 overflow-hidden ${isFeatured ? 'lg:col-span-2 bg-earth-50/30 pr-6 rounded-2xl border-l-4' : ''}`}>
        {/* Card number watermark */}
        <CardNumber index={index} />

        <h3 className={`${isFeatured ? 'text-xl' : 'text-lg'} font-bold text-navy-900 mb-2 group-hover:text-navy-800 transition-colors`}>
          {service.title}
        </h3>
        <p className="text-steel-500 text-sm leading-relaxed">{service.desc}</p>
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <LearnMorePill />
        </div>
      </div>
    </SectionReveal>
  );
}

function SectionLabel({ text }) {
  return (
    <span className="inline-flex items-center gap-3 text-gold-600 text-sm font-semibold uppercase tracking-wider mb-4">
      <span className="w-8 h-[2px] bg-gold-500 rounded-full" />
      {text}
    </span>
  );
}

function ServiceCards() {
  const style = designTokens?.serviceCardStyle || 'icon-top';
  const { servicesPreview } = siteData;

  const cardComponents = {
    'icon-top': IconTopCard,
    'overlay': OverlayCard,
    'horizontal': HorizontalCard,
    'minimal': MinimalCard,
  };

  const CardComponent = cardComponents[style] || IconTopCard;
  const isCompact = style === 'horizontal' || style === 'minimal';
  const supportsFeatured = style === 'icon-top' || style === 'minimal';

  return (
    <section className="section-padding bg-white" id="services">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-16">
            <SectionLabel text="What We Do" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-6">Comprehensive Services</h2>
            <p className="text-steel-500 text-lg max-w-2xl mx-auto">
              From concept to completion, we provide end-to-end solutions that stand the test of time.
            </p>
          </div>
        </SectionReveal>

        <div className={
          isCompact
            ? 'grid sm:grid-cols-2 gap-4'
            : 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6'
        }>
          {servicesPreview.map((service, index) => (
            <CardComponent
              key={service.title}
              service={service}
              index={index}
              isFeatured={supportsFeatured && index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServiceCards;
