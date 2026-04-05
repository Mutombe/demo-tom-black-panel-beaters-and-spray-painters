import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FunnelSimple,
  MapPin,
  Calendar,
  X,
} from '@phosphor-icons/react';
import PageTransition from '../components/PageTransition';
import PageHero from '../components/PageHero';
import SectionReveal from '../components/SectionReveal';
import siteData from '../data/siteData';

function Projects() {
  const { business, projects } = siteData;
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered =
    activeCategory === 'All'
      ? projects.items
      : projects.items.filter((p) => p.category === activeCategory);

  const heroImage =
    siteData.pageImages?.projects ||
    projects.items?.[0]?.image ||
    siteData.hero?.backgroundImage ||
    '';

  return (
    <PageTransition>
      <PageHero
        label="Our Portfolio"
        title={projects.heroTitle}
        subtitle={projects.heroSubtitle}
        image={heroImage}
        imageAlt={`${business.name} completed projects`}
      />

      {/* Filter + Gallery */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Filter Bar */}
          <SectionReveal>
            <div className="flex items-center gap-2 sm:gap-3 mb-8 sm:mb-12 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
              <FunnelSimple
                size={20}
                className="text-steel-400 shrink-0"
              />
              {projects.categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? 'bg-navy-900 text-white shadow-lg'
                      : 'bg-earth-50 text-steel-600 hover:bg-earth-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </SectionReveal>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="group block w-full text-left rounded-2xl overflow-hidden bg-earth-50 border border-earth-100 hover:shadow-xl transition-shadow"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={project.image}
                        alt={`${project.title} - ${project.category} project by ${business.name} in ${project.location}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                        <span className="bg-gold-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-base sm:text-lg font-bold text-navy-900 mb-2 group-hover:text-gold-600 transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-3 sm:gap-4 text-steel-400 text-xs sm:text-sm">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {project.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {project.year}
                        </span>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedProject.image}
                  alt={`${selectedProject.title} detailed view`}
                  className="w-full aspect-video object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                  aria-label="Close project details"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-gold-500 text-white text-sm font-semibold px-4 py-2 rounded-full">
                    {selectedProject.category}
                  </span>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-navy-900 mb-2">
                  {selectedProject.title}
                </h2>
                <div className="flex items-center gap-4 text-steel-400 text-sm mb-6">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {selectedProject.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {selectedProject.year}
                  </span>
                </div>
                <p className="text-steel-600 leading-relaxed mb-6 text-sm sm:text-base">
                  {selectedProject.desc}
                </p>
                <div>
                  <h4 className="text-sm font-semibold text-navy-900 uppercase tracking-wider mb-3">
                    Services Provided
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.services.map((s) => (
                      <span
                        key={s}
                        className="bg-earth-50 text-steel-600 text-sm px-3 py-1.5 rounded-lg border border-earth-100"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}

export default Projects;
