import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useContent } from '../hooks/useContent';
import { useLanguage } from '../hooks/useLanguage';
import { brandConfig } from '../config/brand.config';
import { teamImage } from '../config/team.config';
export function Team() {
  const containerRef = useRef<HTMLDivElement>(null);
  const content = useContent();
  const {
    language
  } = useLanguage();
  const {
    scrollYProgress
  } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  return <section ref={containerRef} className="py-24" style={{
    backgroundColor: brandConfig.colors.primary.white
  }}>
      <div className="max-w-5xl mx-auto px-4 text-center">
        <motion.div style={{
        opacity
      }} className="mb-16">
          <div className="border-2 inline-block px-8 py-2 mb-8 rotate-[-2deg]" style={{
          borderColor: brandConfig.colors.primary.black
        }}>
            <h2 className="text-4xl font-display font-bold" style={{
            color: brandConfig.colors.primary.black
          }}>
              {content.team.teamTitle}
            </h2>
          </div>

          <motion.div style={{
          scale
        }} className="relative w-full max-w-4xl mx-auto aspect-[16/9] border-4 p-2 rotate-1" sx={{
          borderColor: brandConfig.colors.primary.black,
          backgroundColor: brandConfig.colors.primary.white,
          boxShadow: `10px 10px 0px 0px ${brandConfig.colors.primary.black}`
        }}>
            <div className="w-full h-full flex items-center justify-center overflow-hidden" style={{
            backgroundColor: brandConfig.colors.neutral.gray200
          }}>
              <img src={teamImage.url} alt={teamImage.alt[language]} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            <div className="absolute -top-4 -left-4 text-4xl" style={{
            color: brandConfig.colors.accent.red
          }}>
              ↙
            </div>
            <div className="absolute -top-4 -right-4 text-4xl" style={{
            color: brandConfig.colors.accent.red
          }}>
              ↘
            </div>
            <div className="absolute -bottom-4 -left-4 text-4xl" style={{
            color: brandConfig.colors.accent.red
          }}>
              ↖
            </div>
            <div className="absolute -bottom-4 -right-4 text-4xl" style={{
            color: brandConfig.colors.accent.red
          }}>
              ↗
            </div>
          </motion.div>
        </motion.div>

        <motion.div initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} viewport={{
        once: true
      }} className="max-w-2xl mx-auto text-lg" style={{
        color: brandConfig.colors.neutral.gray700
      }}>
          <h3 className="text-2xl font-bold mb-4" style={{
          color: brandConfig.colors.primary.black
        }}>
            {content.team.planTitle}
          </h3>
          <div className="space-y-2">
            <div className="h-1 w-full rounded-full" style={{
            backgroundColor: brandConfig.colors.primary.black
          }} />
            <div className="h-1 w-3/4 rounded-full mx-auto" style={{
            backgroundColor: brandConfig.colors.primary.black
          }} />
            <div className="h-1 w-1/2 rounded-full mx-auto" style={{
            backgroundColor: brandConfig.colors.primary.black
          }} />
          </div>
        </motion.div>
      </div>
    </section>;
}