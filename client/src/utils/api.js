import { SITE } from '../data/siteData'

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

async function submitViaFormSubmit(fields, files = []) {
  const formData = new FormData()
  formData.append('_subject', fields._subject)
  formData.append('_template', 'table')
  formData.append('_captcha', 'false')

  Object.entries(fields).forEach(([key, value]) => {
    if (key.startsWith('_')) return
    formData.append(key, Array.isArray(value) ? value.join(', ') : String(value ?? ''))
  })

  files.filter(Boolean).forEach((file) => {
    formData.append('attachment', file, file.name)
  })

  const res = await fetch(FORM_SUBMIT_URL, {
    method: 'POST',
    body: formData,
    headers: { Accept: 'application/json' },
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
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
  return submitViaFormSubmit(
    {
      _subject: `New Order: ${orderData.fullName} - ${orderData.websiteType}`,
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
    },
    [logo, ...images]
  )
}

export async function submitOrder(orderData, fileOptions = {}) {
  try {
    return await submitOrderViaApi(orderData, fileOptions)
  } catch (err) {
    console.warn('Server order submit failed, using email fallback:', err.message)
    return submitOrderViaFormSubmit(orderData, fileOptions)
  }
}

export async function submitContact(formData) {
  try {
    return await request('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
  } catch (err) {
    console.warn('Server contact submit failed, using email fallback:', err.message)
    return submitViaFormSubmit({
      _subject: `New Contact: ${formData.name}`,
      Name: formData.name,
      Email: formData.email,
      Phone: formData.phone,
      Message: formData.message,
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
