import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';

import DemoBanner from './components/DemoBanner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppFloat from './components/WhatsAppFloat';
import SearchModal from './components/SearchModal';
import EffectsProvider from './components/effects/EffectsProvider';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Reviews from './pages/Reviews';
import Careers from './pages/Careers';
import Contact from './pages/Contact';

function App() {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = () => setSearchOpen(true);
    document.addEventListener('openSearch', handler);
    return () => document.removeEventListener('openSearch', handler);
  }, []);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1e3a5f',
            color: '#fff',
            border: '1px solid rgba(212, 168, 83, 0.3)',
          },
        }}
      />
      <EffectsProvider>
      <ScrollToTop />
      <DemoBanner />
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <CookieConsent />
      <WhatsAppFloat />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      </EffectsProvider>
    </>
  );
}

export default App;
