
import { motion } from 'framer-motion';
import { useContent } from '../hooks/useContent';
import { useLanguage } from '../hooks/useLanguage';
import { brandConfig } from '../config/brand.config';
import { aboutImage } from '../config/team.config';
const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 40
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};
export function About() {
  const content = useContent();
  const {
      language
    } = useLanguage();
  return <section className="py-24 px-4 md:px-8" style={{
    backgroundColor: brandConfig.colors.primary.white,
    color: brandConfig.colors.primary.black
  }}>
      <div className="max-w-4xl mx-auto space-y-24">
        {/* Vision Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        margin: '-100px'
      }} variants={fadeInUp} className="text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 border-b-4 inline-block pb-2" style={{
          borderColor: brandConfig.colors.primary.black
        }}>
            {content.about.vision.title}
          </h2>
          <p className="text-lg md:text-xl leading-relaxed font-light" style={{
          color: brandConfig.colors.neutral.gray700
        }}>
            {content.about.vision.description}
          </p>
        </motion.div>

        {/* Born Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        margin: '-100px'
      }} variants={fadeInUp} className="text-center">
          <div className="border-4 p-8 md:p-12 relative" style={{
          borderColor: brandConfig.colors.primary.black
        }}>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-4" style={{
            backgroundColor: brandConfig.colors.primary.white
          }}>
              <h2 className="text-4xl md:text-5xl font-display font-bold">
                {content.about.born.title}
              </h2>
            </div>
            <h3 className="text-3xl md:text-6xl font-display font-bold uppercase tracking-widest mt-4">
              {brandConfig.name.toUpperCase()}
            </h3>
            <p className="mt-4" style={{
            color: brandConfig.colors.neutral.gray600
          }}>
              {content.about.born.established} {brandConfig.established}
            </p>
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        margin: '-100px'
      }} variants={fadeInUp} className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              {content.about.about.title}
            </h2>
            <p className="leading-relaxed mb-4" style={{
            color: brandConfig.colors.neutral.gray700
          }}>
              {content.about.about.description1}
            </p>
            <p className="leading-relaxed" style={{
            color: brandConfig.colors.neutral.gray700
          }}>
              {content.about.about.description2}
            </p>
          </div>
          <div className="w-full aspect-square p-2 mb-4 border-2 transition-shadow duration-300" style={{
            backgroundColor: brandConfig.colors.primary.white,
            borderColor: brandConfig.colors.primary.black,
            boxShadow: `4px 4px 0px 0px ${brandConfig.colors.primary.black}`
          }} onMouseEnter={e => {
            e.currentTarget.style.boxShadow = `8px 8px 0px 0px ${brandConfig.colors.accent.red}`;
          }} onMouseLeave={e => {
            e.currentTarget.style.boxShadow = `4px 4px 0px 0px ${brandConfig.colors.primary.black}`;
          }}>
            <img src={aboutImage.url} alt={aboutImage.alt[language]} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
          </div>
        </motion.div>
      </div>
    </section>;
}