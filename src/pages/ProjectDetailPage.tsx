import { useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { Navbar } from '../components/Navbar.tsx'
import { Footer } from '../components/Footer.tsx'
import { ShadowButton } from '../components/ShadowButton.tsx'
import { useContent } from '../hooks/useContent.ts'
import { useLanguage } from '../hooks/useLanguage.ts'
import { brandConfig } from '../config/brand.config.ts'
import { projectsData } from '../config/projects.config.ts'
export function ProjectDetailPage() {
  const { projectId } = useParams<{
    projectId: string
  }>()
  const content = useContent()
  const { language } = useLanguage()
  const project = projectsData.find((p) => p.id === projectId)
  if (!project) {
    return <Navigate to="/projects" replace />
  }
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: brandConfig.colors.primary.white,
      }}
    >
      <Navbar />

      <div className="pt-20 flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ShadowButton to="/projects" size="small" className="mb-8">
              <ArrowLeft className="w-4 h-4" />
              {content.projects.backToProjects}
            </ShadowButton>

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: brandConfig.animation.duration.slow,
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span
                  className="text-sm font-mono px-3 py-1 border-2"
                  style={{
                    color: brandConfig.colors.accent.red,
                    borderColor: brandConfig.colors.accent.red,
                  }}
                >
                  {project.category[language]}
                </span>
                <span
                  className="text-sm font-mono"
                  style={{
                    color: brandConfig.colors.neutral.gray500,
                  }}
                >
                  {project.date}
                </span>
              </div>

              <h1
                className="text-5xl md:text-8xl font-display font-bold mb-6"
                style={{
                  color: brandConfig.colors.primary.black,
                }}
              >
                {project.title}
              </h1>

              <p
                className="text-xl md:text-2xl leading-relaxed max-w-3xl"
                style={{
                  color: brandConfig.colors.neutral.gray700,
                }}
              >
                {project.description[language]}
              </p>

              {/* Links */}
              <div className="flex gap-4 mt-8">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 font-mono transition-colors"
                    style={{
                      backgroundColor: brandConfig.colors.primary.black,
                      color: brandConfig.colors.primary.white,
                    }}
                  >
                    {content.projects.visitSite}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 font-mono border-2 border-black text-black transition-colors hover:bg-black hover:text-white hover:border-white"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Image */}
        <section className="py-8 px-4 md:px-8">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: brandConfig.animation.duration.slow,
              delay: 0.2,
            }}
            className="max-w-7xl mx-auto"
          >
            <div
              className="w-full aspect-video overflow-hidden border-4"
              style={{
                borderColor: brandConfig.colors.primary.black,
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </section>

        {/* Content Sections */}
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Challenge */}
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
              }}
            >
              <h2
                className="text-3xl md:text-4xl font-display font-bold mb-6 border-b-4 inline-block pb-2"
                style={{
                  color: brandConfig.colors.primary.black,
                  borderColor: brandConfig.colors.primary.black,
                }}
              >
                {content.projects.challenge}
              </h2>
              <p
                className="text-lg md:text-xl leading-relaxed"
                style={{
                  color: brandConfig.colors.neutral.gray700,
                }}
              >
                {project.challenge[language]}
              </p>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
              }}
            >
              <h2
                className="text-3xl md:text-4xl font-display font-bold mb-6 border-b-4 inline-block pb-2"
                style={{
                  color: brandConfig.colors.primary.black,
                  borderColor: brandConfig.colors.primary.black,
                }}
              >
                {content.projects.solution}
              </h2>
              <p
                className="text-lg md:text-xl leading-relaxed"
                style={{
                  color: brandConfig.colors.neutral.gray700,
                }}
              >
                {project.solution[language]}
              </p>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
              }}
            >
              <h2
                className="text-3xl md:text-4xl font-display font-bold mb-6 border-b-4 inline-block pb-2"
                style={{
                  color: brandConfig.colors.primary.black,
                  borderColor: brandConfig.colors.primary.black,
                }}
              >
                {content.projects.results}
              </h2>
              <ul className="space-y-4">
                {project.results[language].map((result, index) => (
                  <motion.li
                    key={index}
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.1,
                    }}
                    className="flex items-start gap-4"
                  >
                    <span
                      className="text-2xl font-bold"
                      style={{
                        color: brandConfig.colors.accent.red,
                      }}
                    >
                      →
                    </span>
                    <span
                      className="text-lg md:text-xl"
                      style={{
                        color: brandConfig.colors.neutral.gray700,
                      }}
                    >
                      {result}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Technologies */}
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
              }}
            >
              <h2
                className="text-3xl md:text-4xl font-display font-bold mb-6 border-b-4 inline-block pb-2"
                style={{
                  color: brandConfig.colors.primary.black,
                  borderColor: brandConfig.colors.primary.black,
                }}
              >
                {content.projects.technologies}
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.05,
                    }}
                    className="px-4 py-2 font-mono text-sm border-2"
                    style={{
                      borderColor: brandConfig.colors.primary.black,
                      color: brandConfig.colors.primary.black,
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="py-16 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
              <h2
                className="text-3xl md:text-4xl font-display font-bold mb-12 text-center"
                style={{
                  color: brandConfig.colors.primary.black,
                }}
              >
                {content.projects.gallery}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {project.gallery.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.1,
                    }}
                    className="aspect-video overflow-hidden border-4"
                    style={{
                      borderColor: brandConfig.colors.primary.black,
                    }}
                  >
                    <img
                      src={image}
                      alt={`${project.title} - ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Next Project CTA */}
        <section
          className="py-24 px-4 md:px-8 border-t-4"
          style={{
            borderColor: brandConfig.colors.primary.black,
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                type: 'spring',
                stiffness: 100,
              }}
            >
              <ShadowButton to="/projects" size="large">
                {content.projects.viewAllProjects}
              </ShadowButton>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
