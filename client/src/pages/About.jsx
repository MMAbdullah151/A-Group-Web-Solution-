import * as Icons from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading, { CTASection } from '../components/SectionHeading'
import { WHY_CHOOSE_US, SITE } from '../data/siteData'

export default function About() {
  return (
    <>
      <PageHero
        title="About Us"
        subtitle="Learn about our mission to help businesses succeed online."
        breadcrumb="Home / About"
      />

      <section className="section-padding mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              tag="Company Introduction"
              title={`Welcome to ${SITE.name}`}
              subtitle=""
              center={false}
            />
            <p className="mb-4 leading-relaxed text-gray-600">
              {SITE.name} is a web development company dedicated to helping businesses of all sizes
              establish a powerful online presence. We believe every business deserves a professional
              website — without the high costs or technical headaches.
            </p>
            <p className="leading-relaxed text-gray-600">
              From small local shops to growing companies, we create websites that are modern,
              mobile-friendly, and built to convert visitors into customers. Our team combines
              creative design with reliable technology to deliver results you can count on.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
              alt="Our team collaborating"
              className="rounded-2xl shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 rounded-xl bg-primary p-6 text-white shadow-xl">
              <p className="text-3xl font-bold text-secondary">0+</p>
              <p className="text-sm text-gray-300">Years of Experience</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-section">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                <Icons.Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-primary">Our Mission</h3>
              <p className="leading-relaxed text-gray-600">
                To provide affordable, professional, and modern website development services that
                empower businesses worldwide to connect with their customers and grow online.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                <Icons.Eye className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-primary">Our Vision</h3>
              <p className="leading-relaxed text-gray-600">
                To become the most trusted web development partner for small and medium businesses,
                making professional web presence accessible to everyone, everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding mx-auto max-w-7xl">
        <SectionHeading
          tag="Why Choose Us"
          title="What Makes Us Different"
          subtitle="We focus on simplicity, quality, and real results for your business."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE_US.slice(0, 4).map(({ icon, title, desc }) => {
            const Icon = Icons[icon]
            return (
              <div key={title} className="rounded-2xl border border-gray-100 p-6">
                <Icon className="mb-3 h-8 w-8 text-secondary" />
                <h3 className="mb-2 font-bold text-primary">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      <CTASection
        title="Let's Work Together"
        subtitle="Ready to take your business online? We'd love to hear from you."
        buttonText="Get Free Quote"
      />
    </>
  )
}
