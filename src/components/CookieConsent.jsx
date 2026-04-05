import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Shield } from '@phosphor-icons/react';
import siteData from '../data/siteData';

function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showCookiePolicy, setShowCookiePolicy] = useState(false);

  const { business } = siteData;
  const consentKey = business.cookieConsentKey;

  useEffect(() => {
    const consent = localStorage.getItem(consentKey);
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [consentKey]);

  useEffect(() => {
    const handlePrivacy = () => setShowPrivacy(true);
    const handleCookie = () => setShowCookiePolicy(true);
    document.addEventListener('openPrivacy', handlePrivacy);
    document.addEventListener('openCookie', handleCookie);
    return () => {
      document.removeEventListener('openPrivacy', handlePrivacy);
      document.removeEventListener('openCookie', handleCookie);
    };
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(consentKey, 'accepted');
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem(consentKey, 'declined');
    setShowBanner(false);
  };

  return (
    <>
      {/* Cookie Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6"
          >
            <div className="max-w-4xl mx-auto bg-navy-900 border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gold-500/20 rounded-xl flex items-center justify-center shrink-0">
                  <Cookie size={24} className="text-gold-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-base mb-1">
                    We value your privacy
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    We use cookies to enhance your browsing experience and
                    analyze site traffic. By clicking "Accept", you consent to
                    our use of cookies.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-4 ml-14">
                <button
                  onClick={acceptCookies}
                  className="bg-gold-500 hover:bg-gold-400 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Accept All
                </button>
                <button
                  onClick={declineCookies}
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={() => setShowCookiePolicy(true)}
                  className="text-white/60 hover:text-white px-4 py-2 text-sm font-medium transition-colors"
                >
                  Cookie Policy
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPrivacy(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                <div className="flex items-center gap-3">
                  <Shield size={24} className="text-navy-900" />
                  <h2 className="text-xl font-bold text-navy-900">
                    Privacy Policy
                  </h2>
                </div>
                <button
                  onClick={() => setShowPrivacy(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              <div className="px-6 py-6 prose prose-sm max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  At {business.legalName}, we are committed to
                  protecting your personal information and your right to
                  privacy.
                </p>
                <h3 className="text-navy-900 font-semibold mt-6 mb-2">
                  Information We Collect
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We collect personal information that you voluntarily provide
                  to us when you contact us, submit a project inquiry, or apply
                  for a career position. This includes your name, email
                  address, phone number, and any message content you provide.
                </p>
                <h3 className="text-navy-900 font-semibold mt-6 mb-2">
                  How We Use Your Information
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We use the information we collect to respond to your
                  inquiries, process project requests, evaluate job
                  applications, send relevant communications, and improve our
                  website and services.
                </p>
                <h3 className="text-navy-900 font-semibold mt-6 mb-2">
                  Data Security
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We implement appropriate technical and organizational
                  security measures to protect your personal information
                  against unauthorized access, alteration, disclosure, or
                  destruction.
                </p>
                <h3 className="text-navy-900 font-semibold mt-6 mb-2">
                  Your Rights
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  You have the right to access, correct, or delete your
                  personal data. You may contact us at {business.email} for
                  any privacy-related requests.
                </p>
                <h3 className="text-navy-900 font-semibold mt-6 mb-2">
                  Contact
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  For privacy concerns, contact us at {business.email} or
                  call {business.phone}.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookie Policy Modal */}
      <AnimatePresence>
        {showCookiePolicy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowCookiePolicy(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                <div className="flex items-center gap-3">
                  <Cookie size={24} className="text-navy-900" />
                  <h2 className="text-xl font-bold text-navy-900">
                    Cookie Policy
                  </h2>
                </div>
                <button
                  onClick={() => setShowCookiePolicy(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              <div className="px-6 py-6 prose prose-sm max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  This website uses cookies to ensure you get the best
                  experience.
                </p>
                <h3 className="text-navy-900 font-semibold mt-6 mb-2">
                  What Are Cookies
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Cookies are small text files stored on your device when you
                  visit a website. They help the website remember your
                  preferences and improve your experience.
                </p>
                <h3 className="text-navy-900 font-semibold mt-6 mb-2">
                  Types of Cookies We Use
                </h3>
                <ul className="text-gray-600 space-y-2">
                  <li>
                    <strong>Essential Cookies:</strong> Required for the
                    website to function properly.
                  </li>
                  <li>
                    <strong>Analytics Cookies:</strong> Help us understand how
                    visitors interact with our website.
                  </li>
                  <li>
                    <strong>Preference Cookies:</strong> Remember your settings
                    and preferences.
                  </li>
                </ul>
                <h3 className="text-navy-900 font-semibold mt-6 mb-2">
                  Managing Cookies
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  You can control and manage cookies through your browser
                  settings. Please note that removing or blocking cookies may
                  impact your user experience.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default CookieConsent;
