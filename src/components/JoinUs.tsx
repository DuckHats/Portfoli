import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ShadowButton } from './ShadowButton';
import { brandConfig } from '../config/brand.config';
export function JoinUs() {
  return (
    <section
      className="py-32 border-t border-gray-200"
      style={{
        backgroundColor: brandConfig.colors.primary.white,
      }}
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 100,
          }}
        >
          <ShadowButton to="/join-us" size="large">
            UNEIX-TE
            <ArrowRight className="w-12 h-12 group-hover:translate-x-4 transition-transform text-[#e63946]" />
          </ShadowButton>
        </motion.div>

        <p className="mt-8 text-xl text-gray-600 max-w-lg mx-auto">
          Sempre estem buscant nous ànecs per unir-se al nostre estany.
          Dissenyadors, desenvolupadors i somiadors benvinguts.
        </p>
      </div>
    </section>
  )
}