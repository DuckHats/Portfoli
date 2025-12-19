
import { About } from '../components/About';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { motion } from 'framer-motion';
export function AboutPage() {
  return <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <Navbar />
      <div className="pt-20 flex-1">
        <About />

        {/* Expanded Content Section */}
        <section className="py-24 px-4 md:px-8 max-w-4xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="space-y-12 text-lg md:text-xl leading-relaxed text-gray-800 font-light">
            <div>
              <h3 className="text-3xl font-display font-bold mb-6">
                Els Orígens de l'Estany
              </h3>
              <p className="mb-6">
                DuckHats va néixer en una CFGS allà al 2020, fruit d'una
                observació senzilla: la majoria d'agències digitals es prenen
                massa seriosament, o no prou. Volíem trobar l'equilibri
                perfecte—la filosofia del "Ànec".
              </p>
              <p>
                Calmat a la superfície, volant furiosament per sota. Això som
                nosaltres. Vam començar com un quatre d'amics cansats de la
                rigidesa corporativa i amb ganes de construir coses que
                generessin alegria, tant per a nosaltres com per als nostres
                clients.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 py-12 border-t border-b border-gray-200">
              <div>
                <h4 className="font-bold text-xl mb-4">El Nostre ADN</h4>
                <p className="text-gray-600 text-base">
                  Creiem en el codi com a ofici i el disseny com a llenguatge.
                  Cada píxel es col·loca amb intenció, cada línia de codi
                  s'escriu per al rendiment. No només construïm webs; construïm
                  hàbitats digitals.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-xl mb-4">
                  Els Barrets que Portem
                </h4>
                <p className="text-gray-600 text-base">
                  Per què "Barrets"? Perquè en el món digital, l'adaptabilitat
                  és supervivència. Un dia som dissenyadors UI, l'endemà
                  arquitectes backend, i de vegades només som terapeutes per a
                  la crisi d'identitat de la teva marca.
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
      <Footer />
    </div>;
}