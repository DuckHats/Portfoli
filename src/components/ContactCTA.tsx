import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { brandConfig } from '../config/brand.config';
import { ShadowButton } from './ShadowButton';

export const ContactCTA: React.FC = () => {
  const content = useContent();
  const { contactCTA } = content.services;

  if (!contactCTA) return null;

  return (
    <section className="py-20 px-4 md:px-8 border-t border-neutral-200" style={{ backgroundColor: brandConfig.colors.primary.white }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-6"
          style={{ fontFamily: brandConfig.typography.fontFamily.display, color: brandConfig.colors.primary.black }}
        >
          {contactCTA.title}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl mb-10 max-w-2xl mx-auto"
          style={{ fontFamily: brandConfig.typography.fontFamily.body, color: brandConfig.colors.neutral.gray600 }}
        >
          {contactCTA.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <ShadowButton to="/contact" size="large">
            {contactCTA.button}
            <ArrowRight size={24} className="w-12 h-12 group-hover:translate-x-4 transition-transform text-[#e63946]" />
          </ShadowButton>
        </motion.div>
      </div>
    </section>
  );
};
