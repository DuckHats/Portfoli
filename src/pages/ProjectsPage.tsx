import { Projects } from '../components/Projects'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { brandConfig } from '../config/brand.config'
export function ProjectsPage() {
  return (
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
  )
}
