import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}
export function FullScreenMenu({
  isOpen,
  onClose
}: FullScreenMenuProps) {
  return <AnimatePresence>
      {isOpen && <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} className="fixed inset-0 z-[100] bg-[#1a1a1a] text-white overflow-y-auto">
          {/* Close Button */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50">
            <button onClick={onClose} className="w-16 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4">
            {/* Main Navigation */}
            <nav className="flex flex-col items-center space-y-2 mb-20">
              <MainMenuLink to="/" onClick={onClose}>
                Inici
              </MainMenuLink>
              <MainMenuLink to="/about" onClick={onClose}>
                Qui Som
              </MainMenuLink>
              <MainMenuLink to="/team" onClick={onClose}>
                Equip
              </MainMenuLink>
              <MainMenuLink to="/projects" onClick={onClose}>
                Projectes
              </MainMenuLink>
              <MainMenuLink to="/about" onClick={onClose}>
                Història
              </MainMenuLink>
            </nav>

            {/* Secondary Links */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16 text-xl md:text-2xl font-bold">
              <SecondaryLink href="#">Carreres</SecondaryLink>
              <SecondaryLink href="#">Portafoli(265)</SecondaryLink>
              <SecondaryLink href="#">Notícies(386)</SecondaryLink>
              <SecondaryLink href="mailto:hello@duckhats.cat">
                Contacte
              </SecondaryLink>
            </div>

            {/* Footer Links */}
            <div className="flex flex-wrap justify-center gap-6 text-xs md:text-sm text-gray-500 font-mono mb-8">
              <a href="#" className="hover:text-white transition-colors">
                Política d'Inversió ↗
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Política Anti-Assetjament
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Política de Privacitat
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Política de Compliment
              </a>
              <a href="#" className="hover:text-white transition-colors">
                10è Aniversari ↗
              </a>
            </div>

            {/* Language Toggle */}
            <div className="text-sm font-bold tracking-widest">
              <span className="text-white">CA</span> /{' '}
              <span className="text-gray-500">ES</span> /{' '}
              <span className="text-gray-500">EN</span>
            </div>
          </div>
        </motion.div>}
    </AnimatePresence>;
}
function MainMenuLink({
  to,
  children,
  onClick
}: {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return <Link to={to} onClick={onClick} className="group flex items-center gap-4 text-5xl md:text-7xl font-display font-bold hover:text-[#e63946] transition-colors relative py-2">
      <ArrowRight className="absolute -left-12 md:-left-16 w-8 h-8 md:w-12 md:h-12 opacity-0 group-hover:opacity-100 transition-opacity" />
      {children}
    </Link>;
}
function SecondaryLink({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) {
  return <a href={href} className="relative hover:text-[#e63946] transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#e63946] hover:after:w-full after:transition-all after:duration-300">
      {children}
    </a>;
}