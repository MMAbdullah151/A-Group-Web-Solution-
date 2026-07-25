import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import * as Icons from 'lucide-react'
import SectionHeading, { CTASection, StarRating } from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import PortfolioCard from '../components/PortfolioCard'
import HeroAdCarousel from '../components/HeroAdCarousel'
import {
  CURRENT_SERVICES,
  HERO_ADS,
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
      <section className="relative overflow-hidden bg-primary brand-hero-bg">
        <div className="absolute inset-0 brand-hero-glow" />
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-secondary/15 blur-3xl hero-blob" />
        <div className="absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl hero-blob-delay" />

        <div className="section-padding relative mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:items-center">
          <div className="flex-1 text-center lg:text-left">
            <span className="mb-4 inline-block rounded-full border border-secondary/25 bg-secondary/15 px-4 py-1.5 text-sm font-semibold text-glow animate-fade-up">
              Connecting Businesses Worldwide
            </span>
            <h1 className="animate-fade-up-delay-1 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Professional Website Development for{' '}
              <span className="gradient-text">Your Business</span>
            </h1>
            <p className="animate-fade-up-delay-2 mt-6 text-lg text-gray-300 md:text-xl">
              We design modern, responsive, and affordable websites that help businesses grow online.
            </p>
            <div className="animate-fade-up-delay-3 mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link to="/book-order" className="btn-primary">
                Get Free Quote
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/contact" className="btn-outline">
                Contact Us
              </Link>
            </div>
            <div className="animate-fade-up-delay-4 mt-10 flex flex-wrap justify-center gap-6 lg:justify-start">
              {['0+ Projects', '100% Responsive', '24/7 Support'].map((stat) => (
                <div key={stat} className="text-center transition-transform duration-300 hover:-translate-y-1 lg:text-left">
                  <p className="text-lg font-bold text-secondary">{stat.split(' ')[0]}</p>
                  <p className="text-sm text-gray-400">{stat.split(' ').slice(1).join(' ')}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full flex-1">
            <HeroAdCarousel ads={HERO_ADS} />
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
            subtitle="Business websites, e-commerce, maintenance, and SEO basics — everything you need to grow online."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {CURRENT_SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} compact />
            ))}
          </div>
          <div className="mt-10 text-center" data-reveal>
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>
          {WHY_CHOOSE_US.map(({ icon, title, desc }) => {
            const Icon = Icons[icon]
            return (
              <div
                key={title}
                className="card-hover group rounded-2xl border border-gray-100 p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5">
                  <Icon className="icon-pop h-6 w-6 text-primary" />
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
          <div className="grid gap-4 md:grid-cols-7" data-reveal-group>
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.step} className="group relative text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-secondary transition-transform duration-300 group-hover:scale-110">
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
        <div className="grid gap-6 sm:grid-cols-2" data-reveal-group>
          {CURRENT_PORTFOLIO.map((project) => (
            <PortfolioCard key={project.id} project={project} compact />
          ))}
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2" data-reveal-group>
          {COMING_SOON_PORTFOLIO.map((project) => (
            <PortfolioCard key={project.id} project={project} compact />
          ))}
        </div>
        <div className="mt-10 text-center" data-reveal>
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
