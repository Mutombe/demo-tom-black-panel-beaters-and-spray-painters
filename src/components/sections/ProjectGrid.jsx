import React, { useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import { designTokens } from '../../data/siteData';
import siteData from '../../data/siteData';
import SectionReveal from '../SectionReveal';

/* ─── Shared: Category Filter Bar ─── */
function CategoryFilterBar({ categories, active, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            active === cat
              ? 'bg-gold-500 text-white shadow-lg shadow-gold-500/25'
              : 'bg-white/80 text-navy-700 border border-navy-200/50 hover:bg-gold-50 hover:border-gold-300 hover:text-navy-900'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

/* ─── Shared: Project Card Overlay Content ─── */
function ProjectCardContent({ project, large = false }) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 ${large ? 'p-8' : 'p-6'}`}>
      {/* Glassmorphic category badge */}
      <span className="inline-block backdrop-blur-sm bg-white/10 border border-white/20 text-white text-xs font-medium px-3 py-1 rounded-full mb-3">
        {project.category}
      </span>
      <h3 className={`${large ? 'text-2xl' : 'text-xl'} font-bold text-white`}>{project.title}</h3>
      {/* Hover reveal: description, year, location */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 0 }}
        className="overflow-hidden"
      >
        <div className="mt-2 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500 ease-out">
          {project.description && (
            <p className="text-white/70 text-sm leading-relaxed line-clamp-2 mb-2">{project.description}</p>
          )}
          <div className="flex items-center gap-3 text-xs text-white/50">
            {project.year && <span>{project.year}</span>}
            {project.year && project.location && <span className="w-1 h-1 rounded-full bg-gold-400" />}
            {project.location && <span>{project.location}</span>}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Shared: Image with inner shadow ─── */
function ProjectImage({ src, alt, className = '' }) {
  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover object-center ${className}`}
        loading="lazy"
      />
      {/* Inner shadow overlay for depth */}
      <div className="absolute inset-0 shadow-[inset_0_-60px_60px_-30px_rgba(0,0,0,0.5)] pointer-events-none" />
    </>
  );
}

/* ─── Grid-3 Variant ─── */
function Grid3Projects({ projects }) {
  const { business } = siteData;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <SectionReveal key={project.title} delay={index * 0.15}>
          <Link
            to="/projects"
            className={`group relative block rounded-2xl overflow-hidden ${
              index === 0
                ? 'md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto md:min-h-[500px]'
                : 'aspect-[4/5]'
            }`}
          >
            <ProjectImage
              src={project.image}
              alt={`${project.title} by ${business.name}`}
              className="group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
            <ProjectCardContent project={project} large={index === 0} />
          </Link>
        </SectionReveal>
      ))}
    </div>
  );
}

/* ─── Masonry Variant ─── */
function MasonryProjects({ projects }) {
  const { business } = siteData;
  const heights = ['aspect-[3/4]', 'aspect-[4/5]', 'aspect-square'];

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {projects.map((project, index) => (
        <SectionReveal key={project.title} delay={index * 0.15}>
          <Link
            to="/projects"
            className={`group relative block rounded-2xl overflow-hidden ${heights[index % heights.length]} break-inside-avoid`}
          >
            <ProjectImage
              src={project.image}
              alt={`${project.title} by ${business.name}`}
              className="group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            <ProjectCardContent project={project} />
          </Link>
        </SectionReveal>
      ))}
    </div>
  );
}

/* ─── Carousel Variant ─── */
function CarouselProjects({ projects }) {
  const { business } = siteData;
  const scrollRef = useRef(null);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`[data-carousel-scroll]::-webkit-scrollbar { display: none; }`}</style>
        {projects.map((project) => (
          <Link
            key={project.title}
            to="/projects"
            className="group relative flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[40vw] snap-center rounded-2xl overflow-hidden aspect-[4/5]"
          >
            <ProjectImage
              src={project.image}
              alt={`${project.title} by ${business.name}`}
              className="group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" />
            <ProjectCardContent project={project} />
          </Link>
        ))}
      </div>
      {/* Scroll fade hints */}
      <div className="absolute top-0 bottom-4 left-0 w-8 bg-gradient-to-r from-earth-50 to-transparent pointer-events-none hidden md:block" />
      <div className="absolute top-0 bottom-4 right-0 w-8 bg-gradient-to-l from-earth-50 to-transparent pointer-events-none hidden md:block" />
    </div>
  );
}

/* ─── Bento Variant ─── */
function BentoProjects({ projects }) {
  const { business } = siteData;
  if (projects.length < 2) return <Grid3Projects projects={projects} />;

  return (
    <div className="grid md:grid-cols-2 gap-4 auto-rows-auto">
      {/* Large hero item */}
      <SectionReveal>
        <Link to="/projects" className="group relative block rounded-2xl overflow-hidden h-full min-h-[400px] md:row-span-2">
          <ProjectImage
            src={projects[0].image}
            alt={`${projects[0].title} by ${business.name}`}
            className="group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
          <ProjectCardContent project={projects[0]} large />
        </Link>
      </SectionReveal>

      {/* Stacked smaller items */}
      {projects.slice(1).map((project, index) => (
        <SectionReveal key={project.title} delay={(index + 1) * 0.15}>
          <Link to="/projects" className="group relative block rounded-2xl overflow-hidden aspect-video">
            <ProjectImage
              src={project.image}
              alt={`${project.title} by ${business.name}`}
              className="group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
            <ProjectCardContent project={project} />
          </Link>
        </SectionReveal>
      ))}
    </div>
  );
}

/* ─── Main ProjectGrid Component ─── */
function ProjectGrid() {
  const style = designTokens?.projectGridStyle || 'grid-3';
  const { featuredProjects } = siteData;

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(featuredProjects.map((p) => p.category).filter(Boolean))];
    return ['All', ...cats];
  }, [featuredProjects]);

  const [activeCategory, setActiveCategory] = useState('All');

  // Filter projects by selected category
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return featuredProjects;
    return featuredProjects.filter((p) => p.category === activeCategory);
  }, [activeCategory, featuredProjects]);

  const variants = {
    'grid-3': Grid3Projects,
    'masonry': MasonryProjects,
    'carousel': CarouselProjects,
    'bento': BentoProjects,
  };

  const Component = variants[style] || Grid3Projects;

  return (
    <section className="section-padding bg-earth-50">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 text-gold-600 text-sm font-semibold uppercase tracking-wider mb-4">
                <span className="w-6 h-[2px] bg-gold-500 rounded-full" />
                Our Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900">Featured Projects</h2>
            </div>
            <Link to="/projects" className="inline-flex items-center gap-2 text-navy-900 font-semibold hover:text-gold-600 transition-colors">
              View All Projects <ArrowRight size={18} />
            </Link>
          </div>
        </SectionReveal>

        {/* Category filter pills */}
        {categories.length > 2 && (
          <SectionReveal delay={0.1}>
            <CategoryFilterBar
              categories={categories}
              active={activeCategory}
              onSelect={setActiveCategory}
            />
          </SectionReveal>
        )}

        {/* Animated grid swap */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          >
            <Component projects={filteredProjects} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default ProjectGrid;
