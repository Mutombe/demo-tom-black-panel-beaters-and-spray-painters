import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  Phone,
  Envelope,
  MapPin,
  WhatsappLogo,
  Clock,
  PaperPlaneTilt,
  NavigationArrow,
  ChatCircleDots,
  EnvelopeSimple,
  CheckCircle,
} from '@phosphor-icons/react';
import PageTransition from '../components/PageTransition';
import PageHero from '../components/PageHero';
import SectionReveal from '../components/SectionReveal';
import siteData from '../data/siteData';

function Contact() {
  const { business, contact, services } = siteData;

  const heroImage =
    siteData.pageImages?.contact ||
    siteData.hero?.backgroundImage ||
    '';

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: business.phone,
      href: `tel:${business.phoneRaw}`,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
      borderColor: 'border-blue-500',
    },
    {
      icon: Envelope,
      label: 'Email',
      value: business.email,
      href: `mailto:${business.email}`,
      color: 'text-red-500',
      bg: 'bg-red-50',
      borderColor: 'border-red-500',
    },
    {
      icon: WhatsappLogo,
      label: 'WhatsApp',
      value: 'Chat with us',
      href: `https://wa.me/${business.whatsappNumber}`,
      color: 'text-green-500',
      bg: 'bg-green-50',
      borderColor: 'border-green-500',
    },
    {
      icon: MapPin,
      label: 'Address',
      value: business.address,
      href: `https://www.google.com/maps?q=${business.coordinates.lat},${business.coordinates.lng}`,
      color: 'text-gold-600',
      bg: 'bg-gold-50',
      borderColor: 'border-gold-500',
    },
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [sendMethod, setSendMethod] = useState('email');
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.message) {
      toast.error('Please fill in your name and message.');
      return;
    }

    if (sendMethod === 'whatsapp') {
      const text = encodeURIComponent(
        `Hello ${business.name},\n\nMy name is ${formData.name}.\n${
          formData.service ? `Service: ${formData.service}\n` : ''
        }${formData.email ? `Email: ${formData.email}\n` : ''}${
          formData.phone ? `Phone: ${formData.phone}\n` : ''
        }\nMessage:\n${formData.message}`
      );
      window.open(`https://wa.me/${business.whatsappNumber}?text=${text}`, '_blank');
      toast.success('Opening WhatsApp with your message.');
    } else {
      const subject = encodeURIComponent(
        `Project Inquiry${formData.service ? `: ${formData.service}` : ''} - ${formData.name}`
      );
      const body = encodeURIComponent(
        `Dear ${business.name},\n\nMy name is ${formData.name}.\n${
          formData.phone ? `Phone: ${formData.phone}\n` : ''
        }${
          formData.service ? `Service interested in: ${formData.service}\n` : ''
        }\nMessage:\n${formData.message}\n\nBest regards,\n${formData.name}`
      );
      window.location.href = `mailto:${business.email}?subject=${subject}&body=${body}`;
      toast.success('Opening your email client with the message.');
    }
  };

  /* Floating label helper — determines if label should float */
  const isFieldActive = (fieldName) =>
    focusedField === fieldName || formData[fieldName]?.length > 0;

  return (
    <PageTransition>
      <PageHero
        label="Get in Touch"
        title={contact.heroTitle}
        subtitle={contact.heroSubtitle}
        image={heroImage}
        imageAlt={`Contact ${business.name}`}
      />

      {/* ──────────────────────────────────────────────
          CONTACT INFO CARDS — with colored left border accent
      ────────────────────────────────────────────── */}
      <section className="relative -mt-8 z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {contactInfo.map((item, index) => (
            <SectionReveal key={item.label} delay={index * 0.1}>
              <a
                href={item.href}
                target={item.label === 'WhatsApp' || item.label === 'Address' ? '_blank' : undefined}
                rel={item.label === 'WhatsApp' || item.label === 'Address' ? 'noopener noreferrer' : undefined}
                className={`group block bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg shadow-black/5 border border-earth-100 hover:shadow-xl transition-all duration-300 border-l-4 ${item.borderColor} relative overflow-hidden`}
              >
                {/* Hover bottom-border expansion */}
                <div className={`absolute bottom-0 left-0 right-0 h-0 group-hover:h-[3px] ${item.bg} transition-all duration-300`} />

                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 ${item.bg} rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <item.icon
                    size={20}
                    className={item.color}
                    weight="fill"
                  />
                </div>
                <p className="text-[10px] sm:text-xs text-steel-400 uppercase tracking-wider mb-1">
                  {item.label}
                </p>
                <p className="text-navy-900 font-semibold text-xs sm:text-sm group-hover:text-gold-600 transition-colors truncate">
                  {item.value}
                </p>
              </a>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          FORM + SIDEBAR
      ────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 sm:gap-12">
            {/* Form container — gold accent line + geometric background */}
            <div className="lg:col-span-3">
              <SectionReveal direction="right">
                <div className="relative bg-earth-50/50 border border-earth-100 rounded-2xl overflow-hidden">
                  {/* Decorative vertical gold line on left */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-gold-400 via-gold-500 to-gold-300" />

                  {/* Subtle geometric pattern background */}
                  <div
                    className="absolute inset-0 opacity-[0.015] pointer-events-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />

                  <div className="relative p-6 sm:p-8 md:p-10 pl-7 sm:pl-10 md:pl-12">
                    {/* Form header with response badge */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6 sm:mb-8">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-navy-900 mb-1.5">
                          {contact.formTitle}
                        </h2>
                        <p className="text-steel-500 text-sm">
                          {contact.formSubtitle}
                        </p>
                      </div>
                      {/* Social proof badge */}
                      <div className="flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium flex-shrink-0 w-fit">
                        <CheckCircle size={14} weight="fill" />
                        Responds within 2 hours
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                      <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                        <FloatingInput
                          id="name"
                          label="Full Name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          isActive={isFieldActive('name')}
                        />
                        <FloatingInput
                          id="email"
                          label="Email Address"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          isActive={isFieldActive('email')}
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                        <FloatingInput
                          id="phone"
                          label="Phone Number"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField(null)}
                          isActive={isFieldActive('phone')}
                        />
                        <div className="relative">
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('service')}
                            onBlur={() => setFocusedField(null)}
                            className="peer w-full bg-white/60 border-2 border-earth-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 rounded-xl px-5 pt-6 pb-2.5 text-navy-900 text-sm outline-none transition-all appearance-none cursor-pointer"
                          >
                            <option value="">Select a service</option>
                            {services.items.map((s) => (
                              <option key={s.title}>{s.title}</option>
                            ))}
                            <option>Other</option>
                          </select>
                          <label
                            htmlFor="service"
                            className={`absolute left-5 transition-all duration-200 pointer-events-none ${
                              isFieldActive('service')
                                ? 'top-2 text-[10px] text-gold-600 font-semibold'
                                : 'top-4 text-sm text-steel-400'
                            }`}
                          >
                            Service Needed
                          </label>
                          {/* Custom dropdown caret */}
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-steel-400">
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </div>
                        </div>
                      </div>

                      {/* Textarea with floating label */}
                      <div className="relative">
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          required
                          rows={5}
                          className="peer w-full bg-white/60 border-2 border-earth-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 rounded-xl px-5 pt-7 pb-3 text-navy-900 text-sm outline-none transition-all resize-none"
                        />
                        <label
                          htmlFor="message"
                          className={`absolute left-5 transition-all duration-200 pointer-events-none ${
                            isFieldActive('message')
                              ? 'top-2 text-[10px] text-gold-600 font-semibold'
                              : 'top-4 text-sm text-steel-400'
                          }`}
                        >
                          Your Message *
                        </label>
                      </div>

                      {/* ── SEND METHOD TOGGLE — prominent pill buttons ── */}
                      <div>
                        <p className="text-sm font-medium text-navy-900 mb-3">
                          How would you like to send this?
                        </p>
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => setSendMethod('email')}
                            className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-full text-sm font-semibold border-2 transition-all duration-300 ${
                              sendMethod === 'email'
                                ? 'border-gold-500 bg-gold-500 text-white shadow-lg shadow-gold-500/20'
                                : 'border-earth-200 text-steel-500 hover:border-earth-300 bg-white'
                            }`}
                          >
                            <EnvelopeSimple size={20} weight={sendMethod === 'email' ? 'fill' : 'regular'} />
                            Email
                          </button>
                          <button
                            type="button"
                            onClick={() => setSendMethod('whatsapp')}
                            className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-full text-sm font-semibold border-2 transition-all duration-300 ${
                              sendMethod === 'whatsapp'
                                ? 'border-green-500 bg-green-500 text-white shadow-lg shadow-green-500/20'
                                : 'border-earth-200 text-steel-500 hover:border-earth-300 bg-white'
                            }`}
                          >
                            <WhatsappLogo size={20} weight="fill" />
                            WhatsApp
                          </button>
                        </div>
                      </div>

                      {/* Submit button — color changes with method */}
                      <motion.button
                        type="submit"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-semibold text-white transition-all text-sm sm:text-base shadow-lg ${
                          sendMethod === 'whatsapp'
                            ? 'bg-green-600 hover:bg-green-500 shadow-green-600/20'
                            : 'bg-gold-500 hover:bg-gold-400 shadow-gold-500/20'
                        }`}
                      >
                        {sendMethod === 'whatsapp' ? (
                          <>
                            <ChatCircleDots size={20} weight="fill" />
                            Send via WhatsApp
                          </>
                        ) : (
                          <>
                            <PaperPlaneTilt size={20} weight="fill" />
                            Send via Email
                          </>
                        )}
                      </motion.button>
                    </form>
                  </div>
                </div>
              </SectionReveal>
            </div>

            {/* ── SIDEBAR ── */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Business Hours */}
              <SectionReveal direction="left">
                <div className="bg-navy-900 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                  {/* Subtle radial accent */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-gold-500/5 rounded-full blur-2xl" />

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className="w-10 h-10 bg-gold-500/15 rounded-xl flex items-center justify-center">
                        <Clock size={20} className="text-gold-400" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold">Business Hours</h3>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      {business.hours.map((h) => (
                        <div
                          key={h.day}
                          className="flex items-center justify-between text-xs sm:text-sm"
                        >
                          <span className="text-white/60">{h.day}</span>
                          <span
                            className={`font-medium ${
                              h.time === 'Closed'
                                ? 'text-red-400'
                                : 'text-gold-400'
                            }`}
                          >
                            {h.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SectionReveal>

              {/* Quick Contact — with colored left borders */}
              <SectionReveal direction="left" delay={0.1}>
                <div className="bg-earth-50 rounded-2xl p-6 sm:p-8 border border-earth-100">
                  <h3 className="text-base sm:text-lg font-bold text-navy-900 mb-4">
                    Quick Contact
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <a
                      href={`tel:${business.phoneRaw}`}
                      className="group flex items-center gap-3 p-3 rounded-xl bg-white hover:shadow-md transition-all border-l-4 border-blue-500 hover:border-l-[6px]"
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone size={18} className="text-blue-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-steel-400">Call Us</p>
                        <p className="text-navy-900 font-semibold text-xs sm:text-sm group-hover:text-blue-600 transition-colors">
                          {business.phone}
                        </p>
                      </div>
                    </a>
                    <a
                      href={`https://wa.me/${business.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 p-3 rounded-xl bg-white hover:shadow-md transition-all border-l-4 border-green-500 hover:border-l-[6px]"
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <WhatsappLogo
                          size={18}
                          className="text-green-500"
                          weight="fill"
                        />
                      </div>
                      <div>
                        <p className="text-xs text-steel-400">WhatsApp</p>
                        <p className="text-navy-900 font-semibold text-xs sm:text-sm group-hover:text-green-600 transition-colors">
                          Chat Now
                        </p>
                      </div>
                    </a>
                    <a
                      href={`mailto:${business.email}`}
                      className="group flex items-center gap-3 p-3 rounded-xl bg-white hover:shadow-md transition-all border-l-4 border-red-500 hover:border-l-[6px]"
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Envelope size={18} className="text-red-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-steel-400">Email</p>
                        <p className="text-navy-900 font-semibold text-xs sm:text-sm truncate max-w-[180px] group-hover:text-red-600 transition-colors">
                          {business.email}
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </SectionReveal>

              {/* Get Directions CTA */}
              <SectionReveal direction="left" delay={0.2}>
                <a
                  href={`https://www.google.com/maps?q=${business.coordinates.lat},${business.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-gold-500 hover:bg-gold-400 text-white p-4 rounded-2xl transition-all hover:-translate-y-0.5 shadow-lg shadow-gold-500/15"
                >
                  <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0">
                    <NavigationArrow size={20} weight="fill" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Get Directions</p>
                    <p className="text-xs sm:text-sm text-white/80">
                      Open in Google Maps
                    </p>
                  </div>
                </a>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          MAP — with glassmorphic overlay address card
      ────────────────────────────────────────────── */}
      <section className="bg-earth-50">
        <SectionReveal>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-4 sm:mb-6 flex items-center gap-3">
              <div className="w-9 h-9 bg-gold-500/10 rounded-lg flex items-center justify-center">
                <MapPin size={20} className="text-gold-500" />
              </div>
              Find Us
            </h3>
          </div>

          <div className="relative w-full h-[300px] sm:h-[450px] bg-earth-200">
            <iframe
              src={business.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${business.name} office location on Google Maps`}
            />

            {/* Glassmorphic overlay card with address + directions */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 max-w-xs sm:max-w-sm">
              <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl p-4 sm:p-5 shadow-xl shadow-black/10">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-gold-500/15 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={18} className="text-gold-600" weight="fill" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-navy-900 font-semibold text-sm mb-0.5">{business.name}</p>
                    <p className="text-steel-500 text-xs leading-relaxed">{business.address}</p>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps?q=${business.coordinates.lat},${business.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors w-full"
                >
                  <NavigationArrow size={14} weight="fill" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>
    </PageTransition>
  );
}

/* ──────────────────────────────────────────────
   FloatingInput — premium input with floating label
────────────────────────────────────────────── */
function FloatingInput({ id, label, type = 'text', required, value, onChange, onFocus, onBlur, isActive }) {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
        className="peer w-full bg-white/60 border-2 border-earth-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 rounded-xl px-5 pt-6 pb-2.5 text-navy-900 text-sm outline-none transition-all placeholder-transparent"
        placeholder={label}
      />
      <label
        htmlFor={id}
        className={`absolute left-5 transition-all duration-200 pointer-events-none ${
          isActive
            ? 'top-2 text-[10px] text-gold-600 font-semibold'
            : 'top-4 text-sm text-steel-400'
        }`}
      >
        {label}{required ? ' *' : ''}
      </label>
    </div>
  );
}

export default Contact;
