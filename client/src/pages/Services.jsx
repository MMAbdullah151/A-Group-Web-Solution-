import { Rocket } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading, { CTASection } from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import { CURRENT_SERVICES, COMING_SOON_SERVICES, SERVICES_INTRO } from '../data/siteData'

export default function Services() {
  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Professional web solutions for businesses — with more services on the way."
        breadcrumb="Home / Services"
      />

      <section className="section-padding mx-auto max-w-7xl">
        <SectionHeading
          tag={SERVICES_INTRO.tag}
          title={SERVICES_INTRO.title}
          subtitle={SERVICES_INTRO.subtitle}
        />
        <div className="grid gap-8">
          {CURRENT_SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
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
              title="More Digital Services on the Way"
              subtitle="We're continuously expanding our services to provide complete digital solutions for your business."
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {COMING_SOON_SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} compact />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Get Started?"
        subtitle="Contact us today for Business Website Development, Website Maintenance, or Domain & Hosting Services."
        buttonText="Book a Consultation"
      />
    </>
  )
}
