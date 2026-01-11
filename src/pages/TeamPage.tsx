import { Team } from '../components/Team';
import { Helmet } from 'react-helmet-async';
import { Members } from '../components/Members';
import { JoinUs } from '../components/JoinUs';
import { useContent } from '../hooks/useContent';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { motion } from 'framer-motion';
export function TeamPage() {
    const content = useContent();
  return <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
    <Helmet>
                <title>Team - DuckHats</title>
                <link rel="canonical" href="https://duckhats.com/team/"/>
                <meta
                  name="description"
                  content="Meet our team and learn about our mission."
                />
              </Helmet>
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
            {content.team.title}
          </motion.h1>
          <motion.p initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.2
        }} className="text-xl text-gray-600 leading-relaxed">
            {content.team.subtitle}
          </motion.p>
        </section>

        <Team />
        <Members />
        <JoinUs />
      </div>
      <Footer />
    </div>;
}