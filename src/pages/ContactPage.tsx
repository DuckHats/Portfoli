import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ContactForm } from '../components/ContactForm';
import { useContent } from '../hooks/useContent';
import { brandConfig } from '../config/brand.config';

const ContactPage: React.FC = () => {
  const content = useContent();
  const { contact } = content;

  if (!contact) return null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: brandConfig.colors.primary.white }}>
      <Helmet>
        <title>{contact.title} - DuckHats</title>
        <meta name="description" content={contact.subtitle} />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{ fontFamily: brandConfig.typography.fontFamily.display, color: brandConfig.colors.primary.black }}
            >
              {contact.title}
            </h1>
            <p 
              className="text-xl md:text-2xl max-w-2xl mx-auto"
              style={{ fontFamily: brandConfig.typography.fontFamily.body, color: brandConfig.colors.neutral.gray600 }}
            >
              {contact.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
