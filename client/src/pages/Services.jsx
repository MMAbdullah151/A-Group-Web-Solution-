import { ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading, { CTASection } from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import { SERVICES } from '../data/siteData'

const EXTRA_SERVICES = [
  'Landing Pages',
  'Website Redesign',
  'Domain Registration Assistance',
  'Web Hosting Assistance',
  'Contact Form Setup',
  'Google Maps Integration',
]

export default function Services() {
  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Complete web solutions tailored to your business needs."
        breadcrumb="Home / Services"
      />

      <section className="section-padding mx-auto max-w-7xl">
        <SectionHeading
          tag="Core Services"
          title="What We Offer"
          subtitle="Professional web development services designed to help your business thrive online."
        />
        <div className="grid gap-8">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="section-padding bg-section">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            tag="Additional Services"
            title="More Ways We Can Help"
            subtitle="Extra services to complete your online presence."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EXTRA_SERVICES.map((service) => (
              <div
                key={service}
                className="card-hover flex items-center gap-3 rounded-xl bg-white p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium text-primary">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Not Sure Which Service You Need?"
        subtitle="Contact us for a free consultation and we'll recommend the best solution."
        buttonText="Book a Consultation"
      />
    </>
  )
}
