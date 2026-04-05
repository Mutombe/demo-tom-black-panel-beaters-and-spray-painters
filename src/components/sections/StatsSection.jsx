import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Star, ShieldCheck, UsersThree } from '@phosphor-icons/react';
import { designTokens } from '../../data/siteData';
import siteData from '../../data/siteData';
import SectionReveal from '../SectionReveal';

const statIcons = [Trophy, Star, ShieldCheck, UsersThree];

/* Split a stat value like "500+" or "98%" into { num: "500", suffix: "+" } */
function splitStatValue(value) {
  const match = value.match(/^([^0-9]*)(\d[\d.,]*)(.*)$/);
  if (!match) return { prefix: '', num: value, suffix: '' };
  return { prefix: match[1], num: match[2], suffix: match[3] };
}

function AnimatedNumber({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const numMatch = value.match(/[\d.]+/);
    if (!numMatch) {
      setDisplay(value);
      setDone(true);
      return;
    }
    const target = parseFloat(numMatch[0]);
    const duration = 2000;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(target * eased);
      setDisplay(String(current));
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    }
    requestAnimationFrame(tick);
  }, [isInView, value]);

  const { prefix, num, suffix } = splitStatValue(value);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      {prefix && <span className="text-2xl text-gold-500 mr-1">{prefix}</span>}
      <span>{done ? num : display}</span>
      {suffix && <span className="text-2xl lg:text-3xl text-gold-500 ml-0.5 font-bold">{suffix}</span>}
    </span>
  );
}

function PulsingIcon({ icon: IconComp, isInView }) {
  return (
    <motion.div
      animate={isInView ? {
        boxShadow: [
          '0 0 0 0 rgba(212, 168, 83, 0)',
          '0 0 0 8px rgba(212, 168, 83, 0.12)',
          '0 0 0 0 rgba(212, 168, 83, 0)',
        ],
      } : {}}
      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      className="w-16 h-16 bg-gradient-to-br from-gold-500/15 to-gold-500/5 rounded-2xl border border-gold-500/10 flex items-center justify-center mx-auto mb-5"
    >
      <IconComp size={32} className="text-gold-500" weight="fill" />
    </motion.div>
  );
}

function OverlayStats() {
  const { stats } = siteData;

  return (
    <section className="relative -mt-16 z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl shadow-2xl shadow-black/10 p-[2px] bg-gradient-to-b from-gold-500/20 to-transparent">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-2">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const IconComp = statIcons[index] || Trophy;
              const isLast = index === stats.length - 1;
              return (
                <SectionReveal key={stat.label} delay={index * 0.1}>
                  <div className={`text-center py-8 px-4 border-t-2 border-gold-500/80 ${!isLast ? 'lg:border-r border-r-earth-100' : ''} ${index % 2 === 0 && index < stats.length - 1 ? 'border-r border-r-earth-100 lg:border-r' : ''}`}>
                    <IconComp size={28} className="text-gold-500 mx-auto mb-3" weight="fill" />
                    <div className="text-4xl sm:text-5xl font-bold text-navy-900 mb-2 tracking-tight">
                      <AnimatedNumber value={stat.number} />
                    </div>
                    <div className="text-sm text-steel-500 font-medium uppercase tracking-wider">{stat.label}</div>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function InlineStats() {
  const { stats } = siteData;

  return (
    <section className="py-20 bg-earth-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <SectionReveal key={stat.label} delay={index * 0.1}>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-navy-900 mb-3 tracking-tight">
                  <AnimatedNumber value={stat.number} />
                </div>
                <div className="text-sm text-steel-500 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function IconBoxStats() {
  const { stats } = siteData;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComp = statIcons[index] || Trophy;
            return (
              <SectionReveal key={stat.label} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="bg-earth-50 border border-earth-100 rounded-2xl p-8 text-center hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-500"
                >
                  <PulsingIcon icon={IconComp} isInView={isInView} />
                  <div className="text-4xl sm:text-5xl font-bold text-navy-900 mb-2 tracking-tight">
                    <AnimatedNumber value={stat.number} />
                  </div>
                  <div className="text-sm text-steel-500 font-medium uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CounterBarStats() {
  const { stats } = siteData;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 bg-navy-900" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-3 text-gold-400 text-sm font-semibold uppercase tracking-wider mb-4">
              <span className="w-8 h-[2px] bg-gold-500 rounded-full" />
              By The Numbers
              <span className="w-8 h-[2px] bg-gold-500 rounded-full" />
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Our Track Record</h2>
          </div>
        </SectionReveal>
        <div className="space-y-10">
          {stats.map((stat, index) => {
            const numMatch = stat.number.match(/[\d.]+/);
            const numVal = numMatch ? parseFloat(numMatch[0]) : 50;
            const maxVal = numVal > 100 ? numVal * 1.2 : 100;
            const fillPercent = Math.min(95, (numVal / maxVal) * 100);

            return (
              <SectionReveal key={stat.label} delay={index * 0.1}>
                <div>
                  <div className="flex justify-between items-baseline mb-3">
                    <span className="text-white font-medium">{stat.label}</span>
                    <span className="text-5xl sm:text-6xl font-bold text-white tracking-tight">
                      <AnimatedNumber value={stat.number} />
                    </span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full"
                      style={{ boxShadow: '0 0 10px rgba(212, 168, 83, 0.3), 0 0 20px rgba(212, 168, 83, 0.15)' }}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${fillPercent}%` } : { width: 0 }}
                      transition={{ duration: 1.2, delay: index * 0.2, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const style = designTokens?.statsStyle || 'overlay';

  const variants = {
    'overlay': OverlayStats,
    'inline': InlineStats,
    'icon-boxes': IconBoxStats,
    'counter-bar': CounterBarStats,
  };

  const StatsComponent = variants[style] || OverlayStats;
  return <StatsComponent />;
}

export default StatsSection;
