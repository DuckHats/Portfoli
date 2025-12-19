import React from 'react';
import { Team } from '../components/Team';
import { Members } from '../components/Members';
import { JoinUs } from '../components/JoinUs';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { motion } from 'framer-motion';
export function TeamPage() {
  return <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <Navbar />
      <div className="pt-20 flex-1">
        {/* Intro Section */}
        <section className="py-16 px-4 max-w-4xl mx-auto text-center">
          <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="text-5xl md:text-7xl font-display font-bold mb-8 text-[#1a1a1a]">
            LA BANDADA
          </motion.h1>
          <motion.p initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.2
        }} className="text-xl text-gray-600 leading-relaxed">
            Som un grup divers de creatius i enginyers units per una sola
            missió: construir l'extraordinari. Des de diferents racons del món,
            ens reunim per volar en la mateixa direcció.
          </motion.p>
        </section>

        <Team />
        <Members />
        <JoinUs />
      </div>
      <Footer />
    </div>;
}