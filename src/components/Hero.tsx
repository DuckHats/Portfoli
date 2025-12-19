import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { brandConfig } from '../config/brand.config';
export function Hero() {
  const content = useContent();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const SECTIONS = [{
    id: 'home',
    label: content.nav.home,
    path: '/'
  }, {
    id: 'about',
    label: content.nav.about,
    path: '/about'
  }, {
    id: 'team',
    label: content.nav.team,
    path: '/team'
  }, {
    id: 'projects',
    label: content.nav.projects,
    path: '/projects'
  }];
  const nextSection = () => {
    setActiveIndex(prev => (prev + 1) % SECTIONS.length);
  };
  const prevSection = () => {
    setActiveIndex(prev => (prev - 1 + SECTIONS.length) % SECTIONS.length);
  };
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        nextSection();
      } else {
        prevSection();
      }
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, {
        passive: false
      });
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);
  const activeSection = SECTIONS[activeIndex];
  const prevIndex = (activeIndex - 1 + SECTIONS.length) % SECTIONS.length;
  const nextIndex = (activeIndex + 1) % SECTIONS.length;
  return <section ref={containerRef} className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-20" style={{
    backgroundColor: brandConfig.colors.primary.white
  }}>
      <div className="absolute inset-0 z-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-400 to-transparent" />

      <motion.div initial={{
      opacity: 0,
      y: 50
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: brandConfig.animation.duration.slow,
      ease: brandConfig.animation.easing.smooth
    }} className="z-10 flex flex-col items-center w-full max-w-7xl mx-auto px-4">
        {/* Logo Animation */}
        <motion.div className="w-32 h-32 md:w-48 md:h-48 mb-8 rounded-full overflow-hidden shadow-2xl border-4" style={{
        borderColor: brandConfig.colors.primary.black
      }} initial={{
        scale: 0,
        rotate: -180
      }} animate={{
        scale: 1,
        rotate: 0
      }} transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 0.2
      }}>
          <img src={brandConfig.logo.url} alt={brandConfig.logo.alt} className="w-full h-full object-cover" />
        </motion.div>

        <motion.h1 className="text-4xl md:text-7xl font-display font-bold tracking-tighter uppercase mb-4" style={{
        color: brandConfig.colors.primary.black
      }} initial={{
        letterSpacing: '-0.2em',
        opacity: 0
      }} animate={{
        letterSpacing: '0em',
        opacity: 1
      }} transition={{
        duration: 1,
        delay: 0.5,
        ease: brandConfig.animation.easing.spring
      }}>
          {brandConfig.name}
        </motion.h1>

        <motion.p className="text-lg md:text-xl font-sans tracking-widest uppercase mb-16 md:mb-24" style={{
        color: brandConfig.colors.neutral.gray600
      }} initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 1.2
      }}>
          {content.hero.tagline}
        </motion.p>

        {/* Manual Carousel */}
        <div className="relative w-full h-40 md:h-64 flex items-center justify-center mb-12 perspective-1000">
          <button onClick={prevSection} className="absolute left-0 md:left-10 z-20 p-4 hover:bg-black/5 rounded-full transition-colors">
            <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" style={{
            color: brandConfig.colors.primary.black
          }} />
          </button>

          <button onClick={nextSection} className="absolute right-0 md:right-10 z-20 p-4 hover:bg-black/5 rounded-full transition-colors">
            <ChevronRight className="w-8 h-8 md:w-12 md:h-12" style={{
            color: brandConfig.colors.primary.black
          }} />
          </button>

          <AnimatePresence mode="popLayout">
            {SECTIONS.map((section, index) => {
            if (index !== activeIndex && index !== prevIndex && index !== nextIndex) return null;
            let position = 0;
            if (index === prevIndex) position = -1;
            if (index === nextIndex) position = 1;
            return <motion.div key={section.id} initial={{
              opacity: 0,
              x: position === -1 ? -100 : position === 1 ? 100 : 0,
              scale: 0.5,
              filter: 'blur(10px)'
            }} animate={{
              opacity: position === 0 ? 1 : 0.3,
              x: position === 0 ? 0 : position === -1 ? '-60%' : '60%',
              scale: position === 0 ? 1 : 0.6,
              filter: position === 0 ? 'blur(0px)' : 'blur(4px)',
              zIndex: position === 0 ? 10 : 0
            }} exit={{
              opacity: 0,
              scale: 0.5,
              filter: 'blur(10px)'
            }} transition={{
              duration: brandConfig.animation.duration.normal,
              ease: brandConfig.animation.easing.default
            }} className="absolute text-center whitespace-nowrap cursor-pointer" onClick={() => {
              if (position === -1) prevSection();
              if (position === 1) nextSection();
            }}>
                  <span className={`font-display font-bold ${position === 0 ? 'text-6xl md:text-9xl' : 'text-4xl md:text-7xl'}`} style={{
                color: position === 0 ? brandConfig.colors.primary.black : brandConfig.colors.neutral.gray300
              }}>
                    {section.label}
                  </span>
                </motion.div>;
          })}
          </AnimatePresence>
        </div>

        {/* CTA Button */}
        <motion.div key={activeSection.id} initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: brandConfig.animation.duration.fast
      }}>
          <Link to={activeSection.path} className="group flex items-center gap-3 px-8 py-4 rounded-none transition-colors duration-300" style={{
          backgroundColor: brandConfig.colors.primary.black,
          color: brandConfig.colors.primary.white
        }}>
            <span className="font-mono text-lg">
              {content.hero.viewButton} [ {activeSection.label} ]
            </span>
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    </section>;
}