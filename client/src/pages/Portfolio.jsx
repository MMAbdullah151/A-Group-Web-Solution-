import { useState } from 'react'
import { Rocket } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading, { CTASection } from '../components/SectionHeading'
import PortfolioCard from '../components/PortfolioCard'
import PortfolioModal from '../components/PortfolioModal'
import { CURRENT_PORTFOLIO, COMING_SOON_PORTFOLIO, PORTFOLIO_INTRO } from '../data/siteData'

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <>
      <PageHero
        title="Our Portfolio"
        subtitle="Sample business websites we build today — with more project types coming soon."
        breadcrumb="Home / Portfolio"
      />

      <section className="section-padding mx-auto max-w-7xl">
        <SectionHeading
          tag={PORTFOLIO_INTRO.tag}
          title={PORTFOLIO_INTRO.title}
          subtitle={PORTFOLIO_INTRO.subtitle}
        />

        <div className="grid gap-8 md:grid-cols-2">
          {CURRENT_PORTFOLIO.map((project) => (
            <PortfolioCard key={project.id} project={project} onView={setSelectedProject} />
          ))}
        </div>
      </section>

      <section className="section-padding bg-section">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col items-center gap-3 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold text-amber-800">
              <Rocket className="h-4 w-4" />
              Coming Soon
            </span>
            <SectionHeading
              tag="Expanding Soon"
              title="More Project Types on the Way"
              subtitle="E-commerce stores and portfolio websites will be added to our portfolio as we launch new services."
            />
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {COMING_SOON_PORTFOLIO.map((project) => (
              <PortfolioCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want a Website Like These?"
        subtitle="Let's create a professional business website tailored to your needs."
        buttonText="Start Your Project"
      />

      {selectedProject && (
        <PortfolioModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  )
}
