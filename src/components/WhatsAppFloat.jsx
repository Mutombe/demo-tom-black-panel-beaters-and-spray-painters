import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WhatsappLogo, X } from '@phosphor-icons/react';
import siteData from '../data/siteData';

function WhatsAppFloat() {
  const { business } = siteData;
  const [show, setShow] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (show) {
      const t = setTimeout(() => setTooltip(true), 4000);
      const t2 = setTimeout(() => setTooltip(false), 10000);
      return () => { clearTimeout(t); clearTimeout(t2); };
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl shadow-black/15 p-4 max-w-[220px] border border-earth-100 relative"
          >
            <button
              onClick={() => setTooltip(false)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-steel-200 rounded-full flex items-center justify-center hover:bg-steel-300 transition-colors"
            >
              <X size={10} className="text-steel-600" />
            </button>
            <p className="text-navy-900 text-sm font-medium leading-snug">
              Need help? Chat with us on WhatsApp!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={`https://wa.me/${business.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="relative w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all hover:-translate-y-0.5 group"
        aria-label="Chat on WhatsApp"
      >
        <WhatsappLogo size={28} weight="fill" className="text-white" />
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
      </motion.a>
    </div>
  );
}

export default WhatsAppFloat;
