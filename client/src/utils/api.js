import { SITE } from '../data/siteData'
import {
  buildContactEmailHtml,
  buildContactEmailText,
  buildOrderEmailHtml,
  buildOrderEmailText,
} from './emailTemplates.js'
import { buildFilePreviews, estimatePayloadSize } from './filePreviews.js'

const API_BASE = import.meta.env.VITE_API_URL || '/api'
const FORM_SUBMIT_URL = `https://formsubmit.co/ajax/${encodeURIComponent(SITE.email)}`
const WEB3FORMS_URL = 'https://api.web3forms.com/submit'
const MAX_ATTACHMENT_BYTES = 9 * 1024 * 1024
const MAX_HTML_PAYLOAD_BYTES = 1400000

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

async function submitFormSubmitEmail({
  subject,
  replyTo,
  message,
  fields = {},
  files = {},
  isHtml = false,
}) {
  const formData = new FormData()
  formData.append('_subject', subject)
  formData.append('_captcha', 'false')

  if (!isHtml) {
    formData.append('_template', 'box')
  }

  if (replyTo) {
    formData.append('_replyto', replyTo)
  }

  formData.append('message', message)

  if (!isHtml) {
    Object.entries(fields).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        formData.append(key, Array.isArray(value) ? value.join(', ') : String(value))
      }
    })
  }

  const { logo = null, images = [] } = files
  const attachmentSize = getAttachmentSize(files)

  if (!isHtml && attachmentSize > 0 && attachmentSize <= MAX_ATTACHMENT_BYTES) {
    if (logo) {
      formData.append('attachment', logo, logo.name || 'logo')
    }

    images.filter(Boolean).forEach((file, index) => {
      formData.append('attachment', file, file.name || `image-${index + 1}`)
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

async function submitViaWeb3Forms(accessKey, orderData, html) {
  const formData = new FormData()
  formData.append('access_key', accessKey)
  formData.append('subject', `New Website Order | ${orderData.fullName} | ${orderData.websiteType}`)
  formData.append('from_name', SITE.name)
  formData.append('name', orderData.fullName)
  formData.append('email', orderData.email)
  formData.append('replyto', orderData.email)
  formData.append('message', html)

  const res = await fetch(WEB3FORMS_URL, {
    method: 'POST',
    body: formData,
    headers: { Accept: 'application/json' },
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok || !data.success) {
    throw new Error(data.message || `Web3Forms send failed (${res.status})`)
  }

  return { success: true, message: 'Submitted successfully' }
}

async function submitOrderViaFormSubmit(orderData, { logo = null, images = [] } = {}) {
  const previews = await buildFilePreviews({ logo, images })
  const templateOptions = {
    logoName: logo?.name,
    imageCount: images.length,
    logoPreview: previews.logoPreview,
    imagePreviews: previews.imagePreviews,
  }

  const subject = `New Website Order | ${orderData.fullName} | ${orderData.websiteType}`
  const fields = buildOrderFields(orderData)
  const files = { logo, images }
  const attachmentSize = getAttachmentSize(files)
  const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

  if (attachmentSize > MAX_ATTACHMENT_BYTES) {
    const oversizeMessage = `${buildOrderEmailText(orderData, templateOptions)}\n\nATTACHMENT NOTE:\nCustomer selected files totaling ${(attachmentSize / (1024 * 1024)).toFixed(1)}MB, which is too large to email. Please contact the customer to request the files directly.`
    return submitFormSubmitEmail({
      subject,
      replyTo: orderData.email,
      message: oversizeMessage,
      fields,
      files: { logo: null, images: [] },
    })
  }

  const html = buildOrderEmailHtml(orderData, templateOptions)
  const htmlSize = estimatePayloadSize(html)

  if (web3Key) {
    try {
      return await submitViaWeb3Forms(web3Key, orderData, html)
    } catch (err) {
      console.warn('Web3Forms order email failed, falling back to FormSubmit:', err.message)
    }
  }

  if (htmlSize <= MAX_HTML_PAYLOAD_BYTES) {
    try {
      return await submitFormSubmitEmail({
        subject,
        replyTo: orderData.email,
        message: html,
        isHtml: true,
      })
    } catch (err) {
      console.warn('HTML order email failed, retrying as plain text:', err.message)
    }
  }

  const fallbackMessage = `${buildOrderEmailText(orderData, templateOptions)}\n\nATTACHMENT NOTE:\nImage previews could not be embedded. The customer uploaded ${[
    logo?.name ? `Logo: ${logo.name}` : null,
    ...images.map((file, index) => `Image ${index + 1}: ${file.name}`),
  ]
    .filter(Boolean)
    .join('\n')}\n\nPlease contact the customer to receive these files directly.`

  return submitFormSubmitEmail({
    subject,
    replyTo: orderData.email,
    message: fallbackMessage,
    fields,
    files: { logo: null, images: [] },
  })
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
