import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading, { CTASection } from '../components/SectionHeading'
import { PRICING } from '../data/siteData'

export default function Pricing() {
  return (
    <>
      <PageHero
        title="Pricing Plans"
        subtitle="Transparent, affordable pricing with no hidden fees."
        breadcrumb="Home / Pricing"
      />

      <section className="section-padding mx-auto max-w-7xl">
        <SectionHeading
          tag="Choose Your Plan"
          title="Simple Pricing for Every Business"
          subtitle="All plans include responsive design, SEO basics, and post-launch support."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {PRICING.map((plan) => (
            <div
              key={plan.name}
              className={`card-hover relative rounded-2xl border p-8 ${
                plan.popular
                  ? 'border-secondary bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]'
                  : 'border-gray-100 bg-white shadow-sm'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-secondary px-4 py-1 text-xs font-bold text-primary">
                  MOST POPULAR
                </span>
              )}
              <h3 className={`text-xl font-bold ${plan.popular ? 'text-secondary' : 'text-primary'}`}>
                {plan.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-primary'}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.popular ? 'text-gray-400' : 'text-gray-500'}`}>
                  / {plan.period}
                </span>
              </div>
              <p className={`mt-3 text-sm ${plan.popular ? 'text-gray-300' : 'text-gray-600'}`}>
                {plan.desc}
              </p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${plan.popular ? 'text-secondary' : 'text-secondary'}`} />
                    <span className={plan.popular ? 'text-gray-200' : 'text-gray-600'}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/book-order"
                className={`mt-8 block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all ${
                  plan.popular
                    ? 'bg-secondary text-primary hover:bg-cyan-300'
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Need something custom?{' '}
          <Link to="/contact" className="font-semibold text-secondary hover:underline">
            Contact us
          </Link>{' '}
          for a personalized quote.
        </p>
      </section>

      <CTASection
        title="Not Sure Which Plan Fits?"
        subtitle="Book a free consultation and we'll help you choose the right package."
        buttonText="Get Free Quote"
      />
    </>
  )
}
