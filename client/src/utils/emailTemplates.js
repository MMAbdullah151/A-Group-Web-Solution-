import { SITE } from '../data/siteData'

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function display(value, fallback = 'Not provided') {
  const text = value?.toString().trim()
  return escapeHtml(text || fallback)
}

function plain(value, fallback = 'Not provided') {
  const text = value?.toString().trim()
  return text || fallback
}

function formatFeaturesHtml(features) {
  if (!features?.length) {
    return '<span style="color:#64748b">None selected</span>'
  }

  return `<ul style="margin:0;padding-left:18px;color:#0B1D33">${features
    .map((feature) => `<li style="margin:4px 0">${escapeHtml(feature)}</li>`)
    .join('')}</ul>`
}

function formatFeaturesText(features) {
  if (!features?.length) return 'None selected'
  return features.map((feature) => `  • ${feature}`).join('\n')
}

function row(label, value, { isHtml = false } = {}) {
  return `
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;background:#f8fbff;width:34%;font-weight:600;color:#031428;vertical-align:top">${label}</td>
      <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;color:#0B1D33;vertical-align:top">${isHtml ? value : display(value)}</td>
    </tr>
  `
}

function section(title) {
  return `
    <tr>
      <td colspan="2" style="padding:14px 16px;background:linear-gradient(135deg,#031428,#0A2F52);color:#00E8FF;font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase">${title}</td>
    </tr>
  `
}

function textLine(label, value) {
  return `${label.padEnd(18)}: ${plain(value)}`
}

function renderImageGallery(logoPreview, imagePreviews = []) {
  if (!logoPreview && !imagePreviews.length) {
    return '<span style="color:#64748b">No images uploaded</span>'
  }

  const blocks = []

  if (logoPreview) {
    blocks.push(`
      <div style="margin-bottom:12px">
        <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#031428">Customer Logo</p>
        <img src="${logoPreview}" alt="Customer logo" style="display:block;max-width:240px;max-height:240px;border-radius:10px;border:1px solid #dbeafe" />
      </div>
    `)
  }

  imagePreviews.forEach((preview, index) => {
    blocks.push(`
      <div style="margin-bottom:12px">
        <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#031428">Reference Image ${index + 1}</p>
        <img src="${preview}" alt="Reference image ${index + 1}" style="display:block;max-width:240px;max-height:240px;border-radius:10px;border:1px solid #dbeafe" />
      </div>
    `)
  })

  return `<div>${blocks.join('')}</div>`
}

export function buildOrderFormSubmitFields(order, options = {}) {
  const {
    logo = null,
    images = [],
    logoUrl = null,
    imageUrls = [],
  } = options

  const fields = {
    'Customer Information': '------------------------------',
    'Full Name': plain(order.fullName),
    'Company Name': plain(order.companyName),
    Email: plain(order.email),
    Phone: plain(order.phone),
    WhatsApp: plain(order.whatsapp),
    'Project Details': '------------------------------',
    'Business Type': plain(order.businessType),
    'Website Type': plain(order.websiteType),
    Budget: plain(order.budget),
    'Required Features': order.requiredFeatures?.length
      ? order.requiredFeatures.join(', ')
      : 'None selected',
    'Project Description': plain(order.projectDescription),
    'Uploaded Images': '------------------------------',
  }

  if (logo) {
    fields['Logo File Name'] = logo.name
    fields['Logo Preview Link'] = logoUrl || 'See attached preview file'
  } else {
    fields['Logo File Name'] = 'None uploaded'
  }

  if (images.length > 0) {
    images.forEach((file, index) => {
      fields[`Reference Image ${index + 1} Name`] = file.name
      fields[`Reference Image ${index + 1} Link`] = imageUrls[index] || 'See attached preview file'
    })
  } else {
    fields['Reference Images'] = 'None uploaded'
  }

  return fields
}

export function buildOrderEmailHtml(order, options = {}) {
  const {
    logoName,
    imageCount = 0,
    logoUrl,
    imageUrls,
    baseUrl = '',
    logoPreview = null,
    imagePreviews = [],
  } = options

  const hasInlineImages = logoPreview || imagePreviews.length > 0
  const attachmentNote = hasInlineImages
    ? [
        logoName ? `Logo: ${escapeHtml(logoName)}` : null,
        imageCount > 0 ? `${imageCount} reference image(s) included below` : null,
      ]
        .filter(Boolean)
        .join('<br />')
    : logoName || imageCount > 0
      ? [
          logoName ? `Logo file: ${escapeHtml(logoName)}` : null,
          imageCount > 0 ? `${imageCount} reference image(s) — filenames only (previews unavailable)` : null,
        ]
          .filter(Boolean)
          .join('<br />')
      : 'No files attached'

  const uploadedLinks = [
    logoUrl
      ? `<a href="${logoUrl.startsWith('http') ? logoUrl : `${baseUrl}${logoUrl}`}" style="color:#0088FF">View uploaded logo</a>`
      : null,
    ...(imageUrls || []).map((url, index) => {
      const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`
      return `<a href="${fullUrl}" style="color:#0088FF">View image ${index + 1}</a>`
    }),
  ]
    .filter(Boolean)
    .join('<br />')

  const imageGallery = renderImageGallery(logoPreview, imagePreviews)

  return `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:24px;background:#eef6fc;font-family:Arial,Helvetica,sans-serif">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #dbeafe;box-shadow:0 10px 30px rgba(3,20,40,0.08)">
      <tr>
        <td style="padding:28px 24px;background:linear-gradient(135deg,#031428 0%,#0A2F52 100%);color:#ffffff">
          <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#00E8FF;margin-bottom:8px">${escapeHtml(SITE.name)}</div>
          <h1 style="margin:0;font-size:24px;line-height:1.3;color:#ffffff">New Website Order</h1>
          <p style="margin:10px 0 0;color:#cbd5e1;font-size:14px">A customer submitted the Book an Order form on your website.</p>
        </td>
      </tr>
      <tr>
        <td style="padding:0">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse">
            ${section('Customer Information')}
            ${row('Full Name', order.fullName)}
            ${row('Company Name', order.companyName)}
            ${row('Email', `<a href="mailto:${escapeHtml(order.email)}" style="color:#0088FF;text-decoration:none">${display(order.email)}</a>`, { isHtml: true })}
            ${row('Phone', order.phone)}
            ${row('WhatsApp', order.whatsapp)}
            ${section('Project Details')}
            ${row('Business Type', order.businessType)}
            ${row('Website Type', order.websiteType)}
            ${row('Budget', order.budget)}
            ${row('Required Features', formatFeaturesHtml(order.requiredFeatures), { isHtml: true })}
            ${section('Project Description')}
            <tr>
              <td colspan="2" style="padding:16px;color:#0B1D33;line-height:1.7;white-space:pre-wrap;border-bottom:1px solid #e2e8f0">${display(order.projectDescription)}</td>
            </tr>
            ${section('Attachments')}
            ${row('Uploaded Files', attachmentNote, { isHtml: true })}
            ${hasInlineImages ? `<tr><td colspan="2" style="padding:16px;border-bottom:1px solid #e2e8f0">${imageGallery}</td></tr>` : ''}
            ${uploadedLinks ? row('File Links', uploadedLinks, { isHtml: true }) : ''}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:18px 24px;background:#f8fbff;color:#64748b;font-size:13px;line-height:1.6">
          Reply directly to this email to contact <strong style="color:#031428">${display(order.fullName, 'the customer')}</strong>.
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim()
}

export function buildOrderEmailText(order, options = {}) {
  const { logoName, imageCount = 0, logoPreview = null, imagePreviews = [] } = options

  const attachments = logoPreview || imagePreviews.length > 0
    ? [
        logoName ? `Logo: ${logoName} (included in email)` : null,
        imagePreviews.length > 0 ? `Reference images: ${imagePreviews.length} image(s) included in email` : null,
      ]
        .filter(Boolean)
        .join('\n')
    : logoName || imageCount > 0
      ? [
          logoName ? `Logo: ${logoName}` : null,
          imageCount > 0 ? `Reference images: ${imageCount} file(s) — see HTML email for previews` : null,
        ]
          .filter(Boolean)
        .join('\n')
      : 'No files attached'

  return `
${'='.repeat(48)}
${SITE.name.toUpperCase()}
NEW WEBSITE ORDER
${'='.repeat(48)}

CUSTOMER INFORMATION
${'-'.repeat(48)}
${textLine('Full Name', order.fullName)}
${textLine('Company Name', order.companyName)}
${textLine('Email', order.email)}
${textLine('Phone', order.phone)}
${textLine('WhatsApp', order.whatsapp)}

PROJECT DETAILS
${'-'.repeat(48)}
${textLine('Business Type', order.businessType)}
${textLine('Website Type', order.websiteType)}
${textLine('Budget', order.budget)}

Required Features:
${formatFeaturesText(order.requiredFeatures)}

PROJECT DESCRIPTION
${'-'.repeat(48)}
${plain(order.projectDescription)}

ATTACHMENTS
${'-'.repeat(48)}
${attachments}

${'-'.repeat(48)}
Reply directly to this email to contact the customer.
  `.trim()
}

export function buildContactEmailHtml(contact) {
  return `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:24px;background:#eef6fc;font-family:Arial,Helvetica,sans-serif">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #dbeafe">
      <tr>
        <td style="padding:28px 24px;background:linear-gradient(135deg,#031428,#0A2F52);color:#ffffff">
          <h1 style="margin:0;font-size:24px">New Contact Message</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:0">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse">
            ${row('Name', contact.name)}
            ${row('Email', `<a href="mailto:${escapeHtml(contact.email)}" style="color:#0088FF">${display(contact.email)}</a>`, { isHtml: true })}
            ${row('Phone', contact.phone)}
            <tr>
              <td colspan="2" style="padding:16px;color:#0B1D33;line-height:1.7;white-space:pre-wrap">${display(contact.message)}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim()
}

export function buildContactEmailText(contact) {
  return `
${'='.repeat(48)}
${SITE.name.toUpperCase()}
NEW CONTACT MESSAGE
${'='.repeat(48)}

${textLine('Name', contact.name)}
${textLine('Email', contact.email)}
${textLine('Phone', contact.phone)}

Message:
${plain(contact.message)}
  `.trim()
}
