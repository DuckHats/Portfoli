import { Projects } from '../components/Projects'
import { Helmet } from 'react-helmet-async'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { brandConfig } from '../config/brand.config'
export function ProjectsPage() {
  return (
    <>
    <Helmet>
            <title>Projects - DuckHats</title>
            <link rel="canonical" href="https://duckhats.com/projects/"/>
            <meta
              name="description"
              content="Explore our projects and see what we've been working on."
            />
          </Helmet>
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: brandConfig.colors.primary.white,
      }}
    >
      <Navbar />
      <div className="flex-1 pt-20">
        <Projects />
      </div>
      <Footer />
    </div>
    </>
  )
}
