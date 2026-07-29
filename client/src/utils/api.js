import { SITE } from '../data/siteData'
import { buildContactEmailHtml, buildContactEmailText, buildOrderEmailText } from './emailTemplates.js'

const API_BASE = import.meta.env.VITE_API_URL || '/api'
const FORM_SUBMIT_URL = `https://formsubmit.co/ajax/${encodeURIComponent(SITE.email)}`
const MAX_ATTACHMENT_BYTES = 9 * 1024 * 1024

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

function getAttachmentSize(files = {}) {
  const { logo = null, images = [] } = files
  return [logo, ...images.filter(Boolean)].reduce((total, file) => total + (file?.size || 0), 0)
}

async function submitFormSubmitEmail({ subject, replyTo, message, fields = {}, files = {} }) {
  const formData = new FormData()
  formData.append('_subject', subject)
  formData.append('_template', 'box')
  formData.append('_captcha', 'false')

  if (replyTo) {
    formData.append('_replyto', replyTo)
  }

  formData.append('message', message)

  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, Array.isArray(value) ? value.join(', ') : String(value))
    }
  })

  const { logo = null, images = [] } = files
  const attachmentSize = getAttachmentSize(files)

  if (attachmentSize > 0 && attachmentSize <= MAX_ATTACHMENT_BYTES) {
    if (logo) {
      formData.append('Logo', logo, logo.name || 'logo')
    }

    images.filter(Boolean).forEach((file, index) => {
      formData.append(`Reference Image ${index + 1}`, file, file.name || `image-${index + 1}`)
    })
  }

  const res = await fetch(FORM_SUBMIT_URL, {
    method: 'POST',
    body: formData,
    headers: { Accept: 'application/json' },
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.message || `Email send failed (${res.status})`)
  }

  if (String(data.success).toLowerCase() === 'false') {
    throw new Error(data.message || 'Email send failed')
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
      // Server upload unavailable — email fallback will handle files.
    }
  }

  return request('/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

function buildOrderFields(orderData) {
  return {
    'Full Name': orderData.fullName,
    Company: orderData.companyName,
    Email: orderData.email,
    Phone: orderData.phone,
    WhatsApp: orderData.whatsapp,
    'Business Type': orderData.businessType,
    'Website Type': orderData.websiteType,
    Budget: orderData.budget,
    Features: orderData.requiredFeatures,
    Description: orderData.projectDescription,
  }
}

async function submitOrderViaFormSubmit(orderData, { logo = null, images = [] } = {}) {
  const templateOptions = {
    logoName: logo?.name,
    imageCount: images.length,
  }

  const message = buildOrderEmailText(orderData, templateOptions)
  const fields = buildOrderFields(orderData)
  const files = { logo, images }
  const attachmentSize = getAttachmentSize(files)

  if (attachmentSize > MAX_ATTACHMENT_BYTES) {
    const oversizeMessage = `${message}\n\nATTACHMENT NOTE:\nCustomer selected files totaling ${(attachmentSize / (1024 * 1024)).toFixed(1)}MB, which is too large to email. Please contact the customer to request the files directly.`
    return submitFormSubmitEmail({
      subject: `New Website Order | ${orderData.fullName} | ${orderData.websiteType}`,
      replyTo: orderData.email,
      message: oversizeMessage,
      fields,
      files: { logo: null, images: [] },
    })
  }

  try {
    return await submitFormSubmitEmail({
      subject: `New Website Order | ${orderData.fullName} | ${orderData.websiteType}`,
      replyTo: orderData.email,
      message,
      fields,
      files,
    })
  } catch (err) {
    console.warn('Order email with attachments failed, retrying without files:', err.message)

    const fallbackMessage = `${message}\n\nATTACHMENT NOTE:\nThe customer uploaded ${[
      logo?.name ? `Logo: ${logo.name}` : null,
      ...images.map((file, index) => `Image ${index + 1}: ${file.name}`),
    ]
      .filter(Boolean)
      .join('\n')}\n\nPlease contact the customer to receive these files directly.`

    return submitFormSubmitEmail({
      subject: `New Website Order | ${orderData.fullName} | ${orderData.websiteType}`,
      replyTo: orderData.email,
      message: fallbackMessage,
      fields,
      files: { logo: null, images: [] },
    })
  }
}

export async function submitOrder(orderData, fileOptions = {}) {
  const { honeypot, ...payload } = orderData
  if (honeypot) return { success: true }

  try {
    return await submitOrderViaApi(payload, fileOptions)
  } catch (err) {
    console.warn('Server order submit unavailable, using email delivery:', err.message)
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
    return submitFormSubmitEmail({
      subject: `New Contact Message | ${payload.name}`,
      replyTo: payload.email,
      message: buildContactEmailText(payload),
      fields: {
        Name: payload.name,
        Email: payload.email,
        Phone: payload.phone,
        Message: payload.message,
      },
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
