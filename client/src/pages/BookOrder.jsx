import { useState } from 'react'
import { CheckCircle, AlertCircle, Upload, Loader2 } from 'lucide-react'
import PageHero from '../components/PageHero'
import { submitOrder, uploadFiles } from '../utils/api'
import {
  BUSINESS_TYPES,
  WEBSITE_TYPES,
  BUDGET_OPTIONS,
  FEATURE_OPTIONS,
} from '../data/siteData'

const INITIAL = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  whatsapp: '',
  businessType: '',
  websiteType: '',
  budget: '',
  requiredFeatures: [],
  projectDescription: '',
  honeypot: '',
}

export default function BookOrder() {
  const [form, setForm] = useState(INITIAL)
  const [logo, setLogo] = useState(null)
  const [images, setImages] = useState([])
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const toggleFeature = (feature) => {
    setForm((prev) => ({
      ...prev,
      requiredFeatures: prev.requiredFeatures.includes(feature)
        ? prev.requiredFeatures.filter((f) => f !== feature)
        : [...prev.requiredFeatures, feature],
    }))
  }

  const validate = () => {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    if (!form.websiteType) e.websiteType = 'Please select a website type'
    if (!form.projectDescription.trim()) e.projectDescription = 'Please describe your project'
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
      let logoUrl = ''
      let imageUrls = []

      const allFiles = [logo, ...images].filter(Boolean)
      if (allFiles.length > 0) {
        const uploadResult = await uploadFiles(allFiles)
        if (logo) logoUrl = uploadResult.files[0]?.url || ''
        if (images.length > 0) {
          imageUrls = uploadResult.files.slice(logo ? 1 : 0).map((f) => f.url)
        }
      }

      await submitOrder({ ...form, logoUrl, imageUrls })
      setStatus('success')
      setForm(INITIAL)
      setLogo(null)
      setImages([])
    } catch (err) {
      setStatus('error')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const inputClass = (field) =>
    `w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:border-secondary focus:ring-2 focus:ring-secondary/20 ${
      errors[field] ? 'border-red-400' : 'border-gray-200'
    }`

  return (
    <>
      <PageHero
        title="Book an Order"
        subtitle="Tell us about your project and we'll get back to you with a free quote."
        breadcrumb="Home / Book an Order"
      />

      <section className="section-padding mx-auto max-w-3xl">
        {status === 'success' && (
          <div className="mb-8 flex items-center gap-3 rounded-xl bg-green-50 p-4 text-green-700">
            <CheckCircle className="h-6 w-6 shrink-0" />
            <div>
              <p className="font-semibold">Order submitted successfully!</p>
              <p className="text-sm">We'll contact you within 24 hours with a quote.</p>
            </div>
          </div>
        )}
        {status === 'error' && (
          <div className="mb-8 flex items-center gap-3 rounded-xl bg-red-50 p-4 text-red-700">
            <AlertCircle className="h-6 w-6 shrink-0" />
            <p>Failed to submit. Please try again or contact us via WhatsApp.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <input
            type="text"
            name="website"
            value={form.honeypot}
            onChange={(e) => update('honeypot', e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-primary">Full Name *</label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => update('fullName', e.target.value)}
                className={inputClass('fullName')}
                placeholder="John Doe"
              />
              {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-primary">Company Name</label>
              <input
                type="text"
                value={form.companyName}
                onChange={(e) => update('companyName', e.target.value)}
                className={inputClass('companyName')}
                placeholder="Your Company"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-primary">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className={inputClass('email')}
                placeholder="you@company.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-primary">Phone Number *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                className={inputClass('phone')}
                placeholder="+94 77 123 4567"
              />
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-primary">WhatsApp Number</label>
            <input
              type="tel"
              value={form.whatsapp}
              onChange={(e) => update('whatsapp', e.target.value)}
              className={inputClass('whatsapp')}
              placeholder="+94 77 123 4567"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-primary">Business Type</label>
              <select
                value={form.businessType}
                onChange={(e) => update('businessType', e.target.value)}
                className={inputClass('businessType')}
              >
                <option value="">Select business type</option>
                {BUSINESS_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-primary">Website Type *</label>
              <select
                value={form.websiteType}
                onChange={(e) => update('websiteType', e.target.value)}
                className={inputClass('websiteType')}
              >
                <option value="">Select website type</option>
                {WEBSITE_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.websiteType && <p className="mt-1 text-xs text-red-500">{errors.websiteType}</p>}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-primary">Budget</label>
            <select
              value={form.budget}
              onChange={(e) => update('budget', e.target.value)}
              className={inputClass('budget')}
            >
              <option value="">Select your budget</option>
              {BUDGET_OPTIONS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-primary">Required Features</label>
            <div className="grid gap-2 sm:grid-cols-2">
              {FEATURE_OPTIONS.map((feature) => (
                <label
                  key={feature}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors ${
                    form.requiredFeatures.includes(feature)
                      ? 'border-secondary bg-secondary/5 text-primary'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.requiredFeatures.includes(feature)}
                    onChange={() => toggleFeature(feature)}
                    className="accent-secondary"
                  />
                  {feature}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-primary">Project Description *</label>
            <textarea
              value={form.projectDescription}
              onChange={(e) => update('projectDescription', e.target.value)}
              rows={5}
              className={inputClass('projectDescription')}
              placeholder="Tell us about your business and what you need in your website..."
            />
            {errors.projectDescription && (
              <p className="mt-1 text-xs text-red-500">{errors.projectDescription}</p>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-primary">Upload Logo</label>
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 p-6 transition-colors hover:border-secondary hover:bg-secondary/5">
                <Upload className="mb-2 h-8 w-8 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {logo ? logo.name : 'Click to upload logo'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setLogo(e.target.files[0] || null)}
                />
              </label>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-primary">Upload Images</label>
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 p-6 transition-colors hover:border-secondary hover:bg-secondary/5">
                <Upload className="mb-2 h-8 w-8 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {images.length > 0 ? `${images.length} file(s) selected` : 'Click to upload images'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => setImages(Array.from(e.target.files))}
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full !py-4 text-base disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Order'
            )}
          </button>
        </form>
      </section>
    </>
  )
}
