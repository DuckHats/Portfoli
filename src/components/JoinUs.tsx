import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
export function JoinUs() {
  return <section className="py-32 bg-white border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div initial={{
        opacity: 0,
        scale: 0.9
      }} whileInView={{
        opacity: 1,
        scale: 1
      }} transition={{
        type: 'spring',
        stiffness: 100
      }} className="relative inline-block">
          <div className="absolute inset-0 bg-[#1a1a1a] translate-x-2 translate-y-2" />
          <button className="relative bg-white border-4 border-[#1a1a1a] px-12 py-8 text-4xl md:text-6xl font-display font-bold hover:-translate-y-2 hover:-translate-x-2 transition-transform duration-300 flex items-center gap-4 group">
            UNEIX-TE
            <ArrowRight className="w-12 h-12 group-hover:translate-x-4 transition-transform text-[#e63946]" />
          </button>
        </motion.div>

        <p className="mt-8 text-xl text-gray-600 max-w-lg mx-auto">
          Sempre estem buscant nous ànecs per unir-se al nostre estany.
          Dissenyadors, desenvolupadors i somiadors benvinguts.
        </p>
      </div>
    </section>;
}