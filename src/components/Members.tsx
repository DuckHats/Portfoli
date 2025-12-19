import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../hooks/useContent';
import { useLanguage } from '../hooks/useLanguage';
import { brandConfig } from '../config/brand.config';
import { teamMembers } from '../config/team.config';
export function Members() {
  const content = useContent();
  const {
    language
  } = useLanguage();
  return <section className="py-24" style={{
    backgroundColor: brandConfig.colors.neutral.gray50
  }}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-display font-bold mb-16 text-center" style={{
        color: brandConfig.colors.primary.black
      }}>
          {content.team.membersTitle}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member, index) => <motion.div key={index} initial={{
          opacity: 0,
          scale: 0.8
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          delay: index * 0.05
        }} whileHover={{
          y: -5
        }} className="flex flex-col items-center">
              <div className="w-full aspect-square p-2 mb-4 border-2 transition-shadow duration-300" style={{
            backgroundColor: brandConfig.colors.primary.white,
            borderColor: brandConfig.colors.primary.black,
            boxShadow: `4px 4px 0px 0px ${brandConfig.colors.primary.black}`
          }} onMouseEnter={e => {
            e.currentTarget.style.boxShadow = `8px 8px 0px 0px ${brandConfig.colors.accent.red}`;
          }} onMouseLeave={e => {
            e.currentTarget.style.boxShadow = `4px 4px 0px 0px ${brandConfig.colors.primary.black}`;
          }}>
                <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
              </div>
              <h3 className="font-display text-lg font-bold text-center" style={{
            color: brandConfig.colors.primary.black
          }}>
                {member.name}
              </h3>
              <p className="text-xs font-mono uppercase tracking-wider" style={{
            color: brandConfig.colors.neutral.gray500
          }}>
                {member.role[language]}
              </p>
            </motion.div>)}
        </div>
      </div>
    </section>;
}