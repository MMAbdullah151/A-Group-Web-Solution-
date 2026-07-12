import { ExternalLink } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading, { CTASection } from '../components/SectionHeading'
import { PORTFOLIO } from '../data/siteData'

export default function Portfolio() {
  return (
    <>
      <PageHero
        title="Our Portfolio"
        subtitle="Explore demo projects showcasing the websites we build."
        breadcrumb="Home / Portfolio"
      />

      <section className="section-padding mx-auto max-w-7xl">
        <SectionHeading
          tag="Completed Projects"
          title="Websites We've Built"
          subtitle="Each project is crafted with care to meet our clients' unique business goals."
        />

        <div className="grid gap-8 md:grid-cols-2">
          {PORTFOLIO.map((project) => (
            <div
              key={project.id}
              className="card-hover group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-primary/90 via-primary/20 to-transparent p-6 opacity-0 transition-opacity group-hover:opacity-100">
                  <button className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-primary">
                    View Project <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {project.type}
                  </span>
                  <span className="text-xs text-gray-400">{project.category}</span>
                </div>
                <h3 className="text-xl font-bold text-primary">{project.title}</h3>
                <p className="mt-2 text-gray-600">{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title="Want a Website Like These?"
        subtitle="Let's create something amazing for your business."
        buttonText="Start Your Project"
      />
    </>
  )
}
