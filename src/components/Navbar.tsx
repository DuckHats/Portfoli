import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { FullScreenMenu } from './FullScreenMenu';
import { useLanguage } from '../hooks/useLanguage';
import { useContent } from '../hooks/useContent';
import { brandConfig } from '../config/brand.config';
import { accessibilityConfig } from '../config/accessibility.config';
export function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isVisible, setIsVisible] = useState(!isHome);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    language,
    setLanguage
  } = useLanguage();
  const content = useContent();
  useEffect(() => {
    if (isHome) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [isHome]);
  return <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.nav aria-label={accessibilityConfig.nav[language].navbarLabel} initial={{
        opacity: isHome ? 0 : 1,
        y: -20
      }} animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -20
      }} transition={{
        duration: brandConfig.animation.duration.slow,
        ease: brandConfig.animation.easing.smooth
      }} className="pointer-events-auto bg-white/90 backdrop-blur-md rounded-full px-6 py-3 shadow-lg flex items-center gap-6 md:gap-8 border border-gray-200">
          {/* Language Toggle - Hidden on mobile */}
          <fieldset className="hidden md:flex text-xs font-bold tracking-widest gap-2"
           style={{
          color: brandConfig.colors.primary.black
        }}><legend className="sr-only">{accessibilityConfig.nav[language].langaugeLabel}</legend>
            <button aria-label={accessibilityConfig.nav[language].catalanLabel} onClick={() => setLanguage('ca')} className={language === 'ca' ? '' : 'opacity-40'} style={{
            color: brandConfig.colors.primary.black
          }}>
              CA
            </button>
            <span aria-hidden="true" style={{
            color: brandConfig.colors.neutral.gray300
          }}>
              /
            </span>
            <button aria-label={accessibilityConfig.nav[language].spanishLabel} onClick={() => setLanguage('es')} className={language === 'es' ? '' : 'opacity-40'} style={{
            color: brandConfig.colors.primary.black
          }}>
              ES
            </button>
            <span aria-hidden="true" style={{
            color: brandConfig.colors.neutral.gray300
          }}>
              /
            </span>
            <button aria-label={accessibilityConfig.nav[language].englishLabel} onClick={() => setLanguage('en')} className={language === 'en' ? '' : 'opacity-40'} style={{
            color: brandConfig.colors.primary.black
          }}>
              EN
            </button>
          </fieldset>

          {/* Desktop Links */}
          <div aria-label={accessibilityConfig.nav[language].linkLinksLabel} className="hidden md:flex items-center gap-6">
            <NavLink aria-label={accessibilityConfig.nav[language].linkHomeLabel} to="/">{content.nav.home}</NavLink>
            <NavLink aria-label={accessibilityConfig.nav[language].linkTeamLabel} to="/team">{content.nav.team}</NavLink>
            <NavLink aria-label={accessibilityConfig.nav[language].linkProjectsLabel} to="/projects">{content.nav.projects}</NavLink>
          </div>

          {/* Divider - Hidden on mobile */}
          <div className="hidden md:block h-4 w-px" style={{
          backgroundColor: brandConfig.colors.neutral.gray300
        }} />

          {/* Branding - Links to About */}
          <Link aria-label={accessibilityConfig.nav[language].linkAboutLabel} to="/about" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="hidden md:inline font-display font-bold italic text-lg" style={{
            color: brandConfig.colors.primary.black
          }}>
              {content.nav.story}
            </span>
            <span className="font-bold text-lg md:text-base" style={{
            color: brandConfig.colors.accent.red
          }}>
              {brandConfig.name.toUpperCase()}
            </span>
            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{
            backgroundColor: brandConfig.colors.primary.black
          }}>
              <span className="text-[10px]" style={{
              color: brandConfig.colors.primary.white
            }}>
                ➜
              </span>
            </div>
          </Link>

          {/* Hamburger */}
          <button aria-label={accessibilityConfig.nav[language].hamburgerLabel} aria-haspopup="true" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen(true)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <Menu className="w-6 h-6" style={{
            color: brandConfig.colors.primary.black
          }} />
          </button>
        </motion.nav>
      </div>

      <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>;
}
function NavLink({
  to,
  children
}: {
  to: string;
  children: React.ReactNode;
}) {
  return <Link to={to} className="text-sm font-bold transition-colors duration-300 hover:opacity-100" style={{
    color: brandConfig.colors.neutral.gray500
  }}>
      {children}
    </Link>;
}