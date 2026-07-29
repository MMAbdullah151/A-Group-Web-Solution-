import { SITE } from '../data/siteData'
import { buildContactEmailHtml, buildContactEmailText, buildOrderEmailHtml, buildOrderEmailText } from './emailTemplates.js'

const API_BASE = import.meta.env.VITE_API_URL || '/api'
const FORM_SUBMIT_URL = `https://formsubmit.co/ajax/${encodeURIComponent(SITE.email)}`

async function request(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.message || 'Request failed')
  }

  return data
}

async function submitHtmlEmail({ subject, replyTo, html, text, files = [] }) {
  const formData = new FormData()
  formData.append('_subject', subject)
  formData.append('_template', 'box')
  formData.append('_captcha', 'false')
  formData.append('_replyto', replyTo)
  formData.append('message', text || html)

  files.filter(Boolean).forEach((file, index) => {
    const label = file.name || `attachment-${index + 1}`
    formData.append('attachment', file, label)
  })

  files.filter(Boolean).forEach((file, index) => {
    const label = file.name?.toLowerCase().includes('logo')
      ? file.name
      : file.name || `attachment-${index + 1}`
    formData.append('attachment', file, label)
  })

  const res = await fetch(FORM_SUBMIT_URL, {
    method: 'POST',
    body: formData,
    headers: { Accept: 'application/json' },
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok || data.success === 'false') {
    throw new Error(data.message || 'Failed to send email')
  }

  return { success: true, message: 'Submitted successfully' }
}

async function submitOrderViaApi(orderData, { logo = null, images = [] } = {}) {
  const payload = { ...orderData }
  const allFiles = [logo, ...images].filter(Boolean)

  if (allFiles.length > 0) {
    try {
      const uploadResult = await uploadFiles(allFiles)
      if (logo) payload.logoUrl = uploadResult.files[0]?.url || ''
      if (images.length > 0) {
        payload.imageUrls = uploadResult.files.slice(logo ? 1 : 0).map((f) => f.url)
      }
    } catch {
      // Continue without uploads if the server upload endpoint is unavailable.
    }
  }

  return request('/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

async function submitOrderViaFormSubmit(orderData, { logo = null, images = [] } = {}) {
  const templateOptions = {
    logoName: logo?.name,
    imageCount: images.length,
  }

  return submitHtmlEmail({
    subject: `New Website Order | ${orderData.fullName} | ${orderData.websiteType}`,
    replyTo: orderData.email,
    html: buildOrderEmailHtml(orderData, templateOptions),
    text: buildOrderEmailText(orderData, templateOptions),
    files: [logo, ...images],
  })
}

export async function submitOrder(orderData, fileOptions = {}) {
  const { honeypot, ...payload } = orderData
  if (honeypot) return { success: true }

  try {
    return await submitOrderViaApi(payload, fileOptions)
  } catch (err) {
    console.warn('Server order submit failed, using email fallback:', err.message)
    return submitOrderViaFormSubmit(payload, fileOptions)
  }
}

export async function submitContact(formData) {
  const { honeypot, ...payload } = formData
  if (honeypot) return { success: true }

  try {
    return await request('/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  } catch (err) {
    console.warn('Server contact submit failed, using email fallback:', err.message)
    return submitHtmlEmail({
      subject: `New Contact Message | ${payload.name}`,
      replyTo: payload.email,
      html: buildContactEmailHtml(payload),
      text: buildContactEmailText(payload),
    })
  }
}

export function subscribeNewsletter(email) {
  return request('/newsletter', {
    method: 'POST',
    body: JSON.stringify({ email }),
  })
}

export async function uploadFiles(files) {
  const formData = new FormData()
  files.forEach((file) => formData.append('files', file))

  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    body: formData,
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Upload failed')
  return data
}
