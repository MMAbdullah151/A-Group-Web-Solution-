import { SITE } from '../data/siteData'
import {
  buildContactEmailText,
  buildOrderEmailText,
  buildOrderFormSubmitFields,
} from './emailTemplates.js'
import { buildFilePreviews, buildPreviewAttachmentFiles } from './filePreviews.js'
import { uploadPreviewImages } from './imageUpload.js'

const API_BASE = import.meta.env.VITE_API_URL || '/api'
const FORM_SUBMIT_URL = `https://formsubmit.co/ajax/${encodeURIComponent(SITE.email)}`
const WEB3FORMS_URL = 'https://api.web3forms.com/submit'
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

function getAttachmentSize(files = []) {
  return files.reduce((total, file) => total + (file?.size || 0), 0)
}

async function submitFormSubmitEmail({
  subject,
  replyTo,
  message,
  fields = {},
  attachments = [],
}) {
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

  const attachmentSize = getAttachmentSize(attachments)

  if (attachmentSize > 0 && attachmentSize <= MAX_ATTACHMENT_BYTES) {
    attachments.forEach((file) => {
      formData.append('attachment', file, file.name)
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

async function submitViaWeb3Forms(accessKey, orderData, { message, fields, attachments }) {
  const formData = new FormData()
  formData.append('access_key', accessKey)
  formData.append('subject', `New Website Order | ${orderData.fullName} | ${orderData.websiteType}`)
  formData.append('from_name', SITE.name)
  formData.append('name', orderData.fullName)
  formData.append('email', orderData.email)
  formData.append('replyto', orderData.email)
  formData.append('message', message)

  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, Array.isArray(value) ? value.join(', ') : String(value))
    }
  })

  attachments.forEach((file) => {
    formData.append('attachment', file, file.name)
  })

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
  const uploadLinks = await uploadPreviewImages({
    logo,
    images,
    logoPreview: previews.logoPreview,
    imagePreviews: previews.imagePreviews,
  }).catch(() => ({ logoUrl: null, imageUrls: [] }))

  const fields = buildOrderFormSubmitFields(orderData, {
    logo,
    images,
    logoUrl: uploadLinks.logoUrl,
    imageUrls: uploadLinks.imageUrls,
  })

  const attachments = buildPreviewAttachmentFiles({
    logo,
    images,
    logoPreview: previews.logoPreview,
    imagePreviews: previews.imagePreviews,
  })

  const subject = `New Website Order | ${orderData.fullName} | ${orderData.websiteType}`
  const message = `New website order from ${orderData.fullName}. Customer details are listed below. Open the attached preview files or preview links to view uploaded images.`
  const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
  const payload = { message, fields, attachments }

  if (getAttachmentSize(attachments) > MAX_ATTACHMENT_BYTES) {
    return submitFormSubmitEmail({
      subject,
      replyTo: orderData.email,
      message: `${message}\n\nNote: Uploaded files were too large to attach. Please contact the customer for the original files.`,
      fields,
      attachments: [],
    })
  }

  if (web3Key) {
    try {
      return await submitViaWeb3Forms(web3Key, orderData, payload)
    } catch (err) {
      console.warn('Web3Forms order email failed, falling back to FormSubmit:', err.message)
    }
  }

  try {
    return await submitFormSubmitEmail({
      subject,
      replyTo: orderData.email,
      ...payload,
    })
  } catch (err) {
    console.warn('Order email with attachments failed, retrying without files:', err.message)

    const fallbackMessage = `${buildOrderEmailText(orderData, {
      logoName: logo?.name,
      imageCount: images.length,
    })}\n\nNote: Image attachments could not be sent. Please contact the customer for uploaded files.`

    return submitFormSubmitEmail({
      subject,
      replyTo: orderData.email,
      message: fallbackMessage,
      fields,
      attachments: [],
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
      message: `New contact message from ${payload.name}. Details are listed below.`,
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
