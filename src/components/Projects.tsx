import React, { useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { brandConfig } from '../config/brand.config';
import { useContent } from '../hooks/useContent';
type Project = {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
};
const projects: Project[] = [{
  id: 1,
  title: 'Menú-Ginebro',
  date: 'En Procés',
  category: 'Web App',
  image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpetfood.guide%2Fwp-content%2Fuploads%2F2022%2F06%2Fwapt_image_post_-6.jpg&f=1&nofb=1&ipt=4f82a78be934f6f0dbbde99f0ec727af671f40f99f74f7c98bf0402e07aed173'
},
];
export function Projects() {
  const [activeProject, setActiveProject] = useState<number>(0);
  const content = useContent();
  return <section className="relative min-h-screen flex flex-col" style={{
    backgroundColor: brandConfig.colors.primary.white
  }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full flex-1 flex flex-col">
        <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 pb-4 mt-8 border-b-4" style={{
        color: brandConfig.colors.primary.black,
        borderColor: brandConfig.colors.primary.black
      }}>
          {content.projects.title}
        </h2>

        <div className="flex flex-col md:flex-row gap-8 flex-1">
          {/* Left Side - Preview (COMPLETELY FIXED) */}
          <div className="hidden md:block w-1/2 h-[80vh] sticky top-24">
            <div className="relative w-full h-full rounded-2xl overflow-hidden border-4" style={{
            borderColor: brandConfig.colors.primary.black,
            backgroundColor: brandConfig.colors.neutral.gray100
          }}>
              {projects.map((project, index) => <motion.div key={project.id} className="absolute inset-0" initial={{
              opacity: 0
            }} animate={{
              opacity: activeProject === index ? 1 : 0,
              scale: activeProject === index ? 1 : 1.1
            }} transition={{
              duration: brandConfig.animation.duration.normal
            }}>
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{
                background: `linear-gradient(to top, ${brandConfig.colors.primary.black}, transparent)`
              }} />

                  <div className="absolute bottom-8 left-8">
                    <motion.span className="text-sm font-mono mb-2 block" style={{
                  color: brandConfig.colors.accent.red
                }} animate={{
                  y: activeProject === index ? 0 : 20,
                  opacity: activeProject === index ? 1 : 0
                }}>
                      {project.category}
                    </motion.span>
                    <motion.h3 className="text-4xl font-display font-bold" style={{
                  color: brandConfig.colors.primary.white
                }} animate={{
                  y: activeProject === index ? 0 : 20,
                  opacity: activeProject === index ? 1 : 0
                }} transition={{
                  delay: 0.1
                }}>
                      {project.title}
                    </motion.h3>
                  </div>
                </motion.div>)}
            </div>
          </div>

          {/* Right Side - Scrollable List */}
          <div className="w-full md:w-1/2 flex flex-col gap-32 pb-32 pt-16">
            {projects.map((project, index) => <ProjectItem key={project.id} project={project} index={index} setActiveProject={setActiveProject} />)}
          </div>
        </div>
      </div>
    </section>;
}
function ProjectItem({
  project,
  index,
  setActiveProject
}: {
  project: Project;
  index: number;
  setActiveProject: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  useMotionValueEvent(scrollYProgress, 'change', latest => {
    if (latest > 0.3 && latest < 0.7) {
      setActiveProject(index);
    }
  });
  return <motion.div ref={ref} className="group cursor-pointer py-12" onMouseEnter={() => setActiveProject(index)} initial={{
    opacity: 0.3
  }} whileInView={{
    opacity: 1
  }} viewport={{
    margin: '-20% 0px -20% 0px'
  }}>
      {/* Mobile Preview */}
      <div className="md:hidden w-full aspect-video mb-4 rounded-lg overflow-hidden border-2" style={{
      borderColor: brandConfig.colors.primary.black
    }}>
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
      </div>

      <h3 className="text-5xl md:text-8xl font-display font-bold transition-all duration-300 group-hover:translate-x-4" style={{
      color: brandConfig.colors.primary.black
    }}>
        {project.title}
      </h3>
      <div className="flex items-center gap-4 mt-2">
        <span className="h-px w-12" style={{
        backgroundColor: brandConfig.colors.neutral.gray400
      }} />
        <p className="text-xl font-mono" style={{
        color: brandConfig.colors.neutral.gray500
      }}>
          {project.date}
        </p>
      </div>
    </motion.div>;
}