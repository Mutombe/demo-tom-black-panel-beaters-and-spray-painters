import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlass,
  X,
  ArrowRight,
  Buildings,
  Briefcase,
  MapPin,
  Star,
  Users,
  Phone,
} from '@phosphor-icons/react';
import siteData from '../data/siteData';

function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Build searchable index from siteData
  const searchIndex = useMemo(() => {
    const items = [];
    const { business, services, projects, about, careers, contact } = siteData;

    // Pages
    items.push(
      { title: 'Home', desc: `${business.name} - ${business.tagline || ''}`, path: '/', icon: Buildings, section: 'Pages' },
      { title: 'About Us', desc: about?.heroSubtitle || `Learn about ${business.name}`, path: '/about', icon: Users, section: 'Pages' },
      { title: 'Services', desc: services?.heroSubtitle || 'Our professional services', path: '/services', icon: Briefcase, section: 'Pages' },
      { title: 'Projects', desc: projects?.heroSubtitle || 'Our completed projects', path: '/projects', icon: Buildings, section: 'Pages' },
      { title: 'Reviews', desc: `${business.rating} stars from ${business.reviewCount} reviews`, path: '/reviews', icon: Star, section: 'Pages' },
      { title: 'Careers', desc: `${careers?.positions?.length || 0} open positions`, path: '/careers', icon: Users, section: 'Pages' },
      { title: 'Contact', desc: `${business.phone} · ${business.email}`, path: '/contact', icon: Phone, section: 'Pages' },
    );

    // Services
    if (services?.items) {
      services.items.forEach((s) => {
        items.push({
          title: s.title,
          desc: s.desc?.slice(0, 100) + '...',
          path: `/services#${s.slug}`,
          icon: Briefcase,
          section: 'Services',
          keywords: (s.features || []).join(' '),
        });
      });
    }

    // Projects
    if (projects?.items) {
      projects.items.forEach((p) => {
        items.push({
          title: p.title,
          desc: `${p.category} · ${p.location}`,
          path: '/projects',
          icon: MapPin,
          section: 'Projects',
          keywords: (p.services || []).join(' ') + ' ' + (p.desc || ''),
        });
      });
    }

    return items;
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return searchIndex.filter((item) => {
      const text = `${item.title} ${item.desc} ${item.keywords || ''} ${item.section}`.toLowerCase();
      return text.includes(q);
    }).slice(0, 8);
  }, [query, searchIndex]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else document.dispatchEvent(new CustomEvent('openSearch'));
      }
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const handleSelect = (item) => {
    onClose();
    navigate(item.path);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-start justify-center pt-[15vh] px-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-earth-100">
              <MagnifyingGlass size={20} className="text-steel-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services, projects, pages..."
                className="flex-1 text-navy-900 text-base placeholder:text-steel-300 outline-none bg-transparent"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 text-xs text-steel-400 bg-earth-50 border border-earth-200 rounded px-1.5 py-0.5">
                ESC
              </kbd>
              <button onClick={onClose} className="sm:hidden p-1">
                <X size={18} className="text-steel-400" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[50vh] overflow-y-auto">
              {query.trim() && results.length === 0 && (
                <div className="px-5 py-8 text-center text-steel-400 text-sm">
                  No results for "{query}"
                </div>
              )}

              {results.length > 0 && (
                <div className="py-2">
                  {(() => {
                    let lastSection = '';
                    return results.map((item, i) => {
                      const showSection = item.section !== lastSection;
                      lastSection = item.section;
                      return (
                        <React.Fragment key={`${item.title}-${i}`}>
                          {showSection && (
                            <div className="px-5 pt-3 pb-1">
                              <span className="text-xs font-semibold text-steel-400 uppercase tracking-wider">
                                {item.section}
                              </span>
                            </div>
                          )}
                          <button
                            onClick={() => handleSelect(item)}
                            className="w-full flex items-center gap-3 px-5 py-3 hover:bg-earth-50 transition-colors text-left group"
                          >
                            <div className="w-9 h-9 bg-earth-50 group-hover:bg-gold-50 rounded-lg flex items-center justify-center shrink-0 transition-colors">
                              <item.icon size={18} className="text-steel-500 group-hover:text-gold-600 transition-colors" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-navy-900 font-medium text-sm truncate">
                                {item.title}
                              </p>
                              <p className="text-steel-400 text-xs truncate">
                                {item.desc}
                              </p>
                            </div>
                            <ArrowRight size={14} className="text-steel-300 group-hover:text-gold-500 shrink-0 transition-colors" />
                          </button>
                        </React.Fragment>
                      );
                    });
                  })()}
                </div>
              )}

              {!query.trim() && (
                <div className="px-5 py-6 text-center text-steel-400 text-sm">
                  <p>Type to search across all pages, services, and projects</p>
                  <p className="mt-2 text-xs">
                    <kbd className="bg-earth-50 border border-earth-200 rounded px-1.5 py-0.5 text-steel-500">Ctrl</kbd>
                    {' + '}
                    <kbd className="bg-earth-50 border border-earth-200 rounded px-1.5 py-0.5 text-steel-500">K</kbd>
                    {' to open anytime'}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SearchModal;
