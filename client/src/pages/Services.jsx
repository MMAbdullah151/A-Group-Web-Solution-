import PageHero from '../components/PageHero'
import SectionHeading, { CTASection } from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import { CURRENT_SERVICES, SERVICES_INTRO } from '../data/siteData'

export default function Services() {
  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Professional web solutions for businesses of every size."
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

      <CTASection
        title="Ready to Get Started?"
        subtitle="Contact us today for Business Website Development, Website Maintenance, or Domain & Hosting Services."
        buttonText="Book a Consultation"
      />
    </>
  )
}
