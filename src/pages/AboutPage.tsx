import { About } from '../components/About';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useContent } from '../hooks/useContent';

export function AboutPage() {
  const content = useContent();

  return (
    <>
      <Helmet>
        <title>About Us - DuckHats</title>
        <link rel="canonical" href="https://duckhats.com/about" />
        <meta
          name="description"
          content="Learn more about DuckHats and our mission."
        />
      </Helmet>

      <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
        <Navbar />
        <div className="pt-20 flex-1">
          <About />

          {/* Expanded Content Section */}
          <section className="py-24 px-4 md:px-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12 text-lg md:text-xl leading-relaxed text-gray-800 font-light"
            >
              <div>
                <h3 className="text-3xl font-display font-bold mb-6">
                  {content.about.origins.title}
                </h3>
                <p className="mb-6">{content.about.origins.paragraph1}</p>
                <p>{content.about.origins.paragraph2}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 py-12 border-t border-b border-gray-200">
                <div>
                  <h4 className="font-bold text-xl mb-4">
                    {content.about.dna.title}
                  </h4>
                  <p className="text-gray-600 text-base">
                    {content.about.dna.description}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-4">
                    {content.about.hats.title}
                  </h4>
                  <p className="text-gray-600 text-base">
                    {content.about.hats.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}