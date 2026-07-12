import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading, { CTASection } from '../components/SectionHeading'
import { FAQS } from '../data/siteData'

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-semibold text-primary">{faq.q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-secondary transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="leading-relaxed text-gray-600">{faq.a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our services."
        breadcrumb="Home / FAQ"
      />

      <section className="section-padding mx-auto max-w-3xl">
        <SectionHeading
          tag="FAQ"
          title="Got Questions?"
          subtitle="We've answered the most common questions below. Can't find what you need? Contact us!"
        />

        <div className="rounded-2xl border border-gray-100 bg-white px-6 shadow-sm md:px-8">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={faq.q}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </section>

      <CTASection
        title="Still Have Questions?"
        subtitle="We're happy to help. Send us a message or chat on WhatsApp."
        buttonText="Contact Us"
        buttonLink="/contact"
      />
    </>
  )
}
