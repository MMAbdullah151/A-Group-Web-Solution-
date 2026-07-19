import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import * as Icons from 'lucide-react'
import SectionHeading, { CTASection, StarRating } from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import PortfolioCard from '../components/PortfolioCard'
import {
  CURRENT_SERVICES,
  COMING_SOON_SERVICES,
  WHY_CHOOSE_US,
  PROCESS_STEPS,
  CURRENT_PORTFOLIO,
  COMING_SOON_PORTFOLIO,
  TESTIMONIALS,
} from '../data/siteData'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80"
            alt=""
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
        </div>
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />

        <div className="section-padding relative mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:items-center">
          <div className="flex-1 text-center lg:text-left">
            <span className="mb-4 inline-block rounded-full bg-secondary/20 px-4 py-1.5 text-sm font-semibold text-secondary">
              Connecting Businesses Worldwide
            </span>
            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Professional Website Development for{' '}
              <span className="gradient-text">Your Business</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 md:text-xl">
              We design modern, responsive, and affordable websites that help businesses grow online.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link to="/book-order" className="btn-primary">
                Get Free Quote
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/contact" className="btn-outline">
                Contact Us
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-6 lg:justify-start">
              {['0+ Projects', '100% Responsive', '24/7 Support'].map((stat) => (
                <div key={stat} className="text-center lg:text-left">
                  <p className="text-lg font-bold text-secondary">{stat.split(' ')[0]}</p>
                  <p className="text-sm text-gray-400">{stat.split(' ').slice(1).join(' ')}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden flex-1 lg:block">
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
                alt="Team working on website development"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-white p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary">Project Delivered</p>
                    <p className="text-xs text-gray-500">On time, every time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Short */}
      <section className="section-padding mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            tag="Who We Are"
            title="Your Partner in Digital Growth"
            subtitle="A Group Web Solution helps businesses establish a strong online presence by creating professional websites that are fast, responsive, and easy to manage."
          />
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-section">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            tag="Our Current Services"
            title="Professional Web Solutions for Your Business"
            subtitle="We currently specialize in Business Website Development, Website Maintenance, and Domain & Hosting Services — with more offerings coming soon."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CURRENT_SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} compact />
            ))}
          </div>
          <div className="mt-12">
            <p className="mb-6 text-center text-sm font-semibold uppercase tracking-wide text-amber-700">
              Coming Soon
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {COMING_SOON_SERVICES.map((service) => (
                <ServiceCard key={service.id} service={service} compact />
              ))}
            </div>
          </div>
          <div className="mt-10 text-center">
            <Link to="/services" className="btn-primary">
              View All Services
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding mx-auto max-w-7xl">
        <SectionHeading
          tag="Why Choose Us"
          title="Built for Businesses Like Yours"
          subtitle="We make website development simple, affordable, and stress-free."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE_US.map(({ icon, title, desc }) => {
            const Icon = Icons[icon]
            return (
              <div
                key={title}
                className="card-hover rounded-2xl border border-gray-100 p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-bold text-primary">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-section">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            tag="Our Process"
            title="How We Build Your Website"
            subtitle="A simple, transparent process from start to finish."
          />
          <div className="grid gap-4 md:grid-cols-7">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.step} className="relative text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-secondary">
                  {step.step}
                </div>
                <h3 className="mb-1 text-sm font-bold text-primary">{step.title}</h3>
                <p className="text-xs text-gray-500">{step.desc}</p>
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="absolute right-0 top-6 hidden h-0.5 w-full translate-x-1/2 bg-secondary/30 md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="section-padding mx-auto max-w-7xl">
        <SectionHeading
          tag="Latest Projects"
          title="See Our Work in Action"
          subtitle="Explore sample business websites we build today, with more project types coming soon."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {CURRENT_PORTFOLIO.map((project) => (
            <PortfolioCard key={project.id} project={project} compact />
          ))}
        </div>
        <p className="mb-4 mt-10 text-center text-sm font-semibold uppercase tracking-wide text-amber-700">
          Coming Soon
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {COMING_SOON_PORTFOLIO.map((project) => (
            <PortfolioCard key={project.id} project={project} compact />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/portfolio" className="btn-primary">
            View Full Portfolio
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>


      <CTASection
        title="Ready to Grow Your Business Online?"
        subtitle="Get a free quote today and let's build something amazing together."
        buttonText="Get Started"
      />
    </>
  )
}
