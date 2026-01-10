import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { ShadowButton } from './ShadowButton';
import { brandConfig } from '../config/brand.config';

export function JoinUs() {
  const content = useContent();
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
            {content.joinUs.title}
            <ArrowRight className="w-12 h-12 group-hover:translate-x-4 transition-transform text-[#e63946]" />
          </ShadowButton>
        </motion.div>

        <p className="mt-8 text-xl text-gray-600 max-w-lg mx-auto">
          {content.joinUs.description}
        </p>
      </div>
    </section>
  );
}