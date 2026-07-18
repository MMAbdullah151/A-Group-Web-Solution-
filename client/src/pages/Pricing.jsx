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
        subtitle="Transparent, affordable pricing for the services we offer today."
        breadcrumb="Home / Pricing"
      />

      <section className="section-padding mx-auto max-w-7xl">
        <SectionHeading
          tag="Choose Your Plan"
          title="Simple Pricing for Every Business"
          subtitle="Starter and Professional plans are available now. Our Premium e-commerce package is coming soon."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {PRICING.map((plan) => {
            const isComingSoon = plan.comingSoon

            return (
              <div
                key={plan.name}
                className={`card-hover relative rounded-2xl border p-8 ${
                  isComingSoon
                    ? 'border-dashed border-gray-200 bg-gray-50/50 opacity-95'
                    : plan.popular
                      ? 'scale-[1.02] border-secondary bg-primary text-white shadow-xl shadow-primary/20'
                      : 'border-gray-100 bg-white shadow-sm'
                }`}
              >
                {plan.popular && !isComingSoon && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-secondary px-4 py-1 text-xs font-bold text-primary">
                    MOST POPULAR
                  </span>
                )}
                {isComingSoon && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-100 px-4 py-1 text-xs font-bold text-amber-800">
                    COMING SOON
                  </span>
                )}
                <h3
                  className={`text-xl font-bold ${
                    isComingSoon ? 'text-primary' : plan.popular ? 'text-secondary' : 'text-primary'
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span
                    className={`text-4xl font-bold ${
                      isComingSoon ? 'text-primary' : plan.popular ? 'text-white' : 'text-primary'
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm ${isComingSoon ? 'text-gray-500' : plan.popular ? 'text-gray-400' : 'text-gray-500'}`}
                  >
                    / {plan.period}
                  </span>
                </div>
                <p
                  className={`mt-3 text-sm ${
                    isComingSoon ? 'text-gray-600' : plan.popular ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {plan.desc}
                </p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          isComingSoon ? 'text-amber-600' : 'text-secondary'
                        }`}
                      />
                      <span
                        className={
                          isComingSoon ? 'text-gray-600' : plan.popular ? 'text-gray-200' : 'text-gray-600'
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                {isComingSoon ? (
                  <span className="mt-8 block w-full cursor-not-allowed rounded-xl border border-dashed border-amber-300 bg-amber-50 py-3 text-center text-sm font-semibold text-amber-800">
                    {plan.cta}
                  </span>
                ) : (
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
                )}
              </div>
            )
          })}
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
