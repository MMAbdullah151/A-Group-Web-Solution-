import { useState } from 'react'
import { Phone, Mail, MapPin, MessageCircle, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import { submitContact } from '../utils/api'
import { SITE } from '../data/siteData'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', honeypot: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.message.trim()) e.message = 'Message is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.honeypot) return
    if (!validate()) return

    setLoading(true)
    setStatus(null)
    try {
      await submitContact(form)
      setStatus('success')
      setForm({ name: '', email: '', phone: '', message: '', honeypot: '' })
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  const whatsappUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hello! I would like to inquire about your services.')}`

  const inputClass = (field) =>
    `w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:border-secondary focus:ring-2 focus:ring-secondary/20 ${
      errors[field] ? 'border-red-400' : 'border-gray-200'
    }`

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out anytime!"
        breadcrumb="Home / Contact"
      />

      <section className="section-padding mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              tag="Get in Touch"
              title="Let's Start a Conversation"
              subtitle="Have a question or ready to start your project? Contact us using any method below."
              center={false}
            />

            <div className="space-y-5">
              {[
                { icon: Phone, label: 'Phone', value: SITE.phone, href: `tel:${SITE.phone}` },
                { icon: MessageCircle, label: 'WhatsApp', value: SITE.phone, href: whatsappUrl },
                { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
                { icon: MapPin, label: 'Address', value: SITE.address, href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 rounded-xl border border-gray-100 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{label}</p>
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="font-semibold text-primary hover:text-secondary">
                        {value}
                      </a>
                    ) : (
                      <p className="font-semibold text-primary">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-semibold text-white transition-all hover:bg-[#20bd5a]"
            >
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
            </a>
          </div>

          <div>
            {status === 'success' && (
              <div className="mb-4 flex items-center gap-2 rounded-xl bg-green-50 p-4 text-green-700">
                <CheckCircle className="h-5 w-5" />
                <p className="text-sm font-medium">Message sent! We'll reply soon.</p>
              </div>
            )}
            {status === 'error' && (
              <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-red-700">
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm">Failed to send. Try WhatsApp instead.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <input type="text" name="website" value={form.honeypot} onChange={(e) => update('honeypot', e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />

              <div>
                <label className="mb-1.5 block text-sm font-medium text-primary">Name *</label>
                <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} className={inputClass('name')} placeholder="Your name" />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-primary">Email *</label>
                <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className={inputClass('email')} placeholder="you@email.com" />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-primary">Phone</label>
                <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputClass('phone')} placeholder="+94 77 123 4567" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-primary">Message *</label>
                <textarea value={form.message} onChange={(e) => update('message', e.target.value)} rows={5} className={inputClass('message')} placeholder="How can we help you?" />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
                {loading ? <><Loader2 className="h-5 w-5 animate-spin" /> Sending...</> : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl shadow-lg">
          <iframe
            src={SITE.mapEmbed}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Business location on Google Maps"
          />
        </div>
      </section>
    </>
  )
}
