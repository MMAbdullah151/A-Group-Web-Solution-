import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function SectionHeading({ tag, title, subtitle, center = true }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`} data-reveal>
      {tag && (
        <span className="mb-2 inline-block rounded-full border border-secondary/20 bg-secondary/10 px-4 py-1 text-sm font-semibold text-accent">
          {tag}
        </span>
      )}
      <h2 className="text-3xl font-bold text-primary md:text-4xl">{title}</h2>
      {subtitle && (
        <p className={`mt-3 text-gray-600 ${center ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

export function CTASection({ title, subtitle, buttonText = 'Get Started', buttonLink = '/book-order' }) {
  return (
    <section className="section-padding brand-hero-bg relative overflow-hidden" data-reveal>
      <div className="absolute inset-0 brand-hero-glow opacity-80" />
      <div className="relative mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">{title}</h2>
        {subtitle && <p className="mt-4 text-lg text-gray-300">{subtitle}</p>}
        <Link to={buttonLink} className="btn-primary mt-8 inline-flex">
          {buttonText}
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  )
}

export function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      ))}
    </div>
  )
}
