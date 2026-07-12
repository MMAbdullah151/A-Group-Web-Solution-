import nodemailer from 'nodemailer'

let transporter = null

function getTransporter() {
  if (transporter) return transporter

  if (!process.env.SMTP_USER || process.env.SMTP_USER === 'your-email@gmail.com') {
    return null
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  return transporter
}

export async function sendAdminEmail(subject, html) {
  const transport = getTransporter()
  const adminEmail = process.env.ADMIN_EMAIL

  if (!transport || !adminEmail) {
    console.log('[Email] SMTP not configured. Skipping email:', subject)
    return
  }

  try {
    await transport.sendMail({
      from: `"A Group Web Solution" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject,
      html,
    })
    console.log('[Email] Sent:', subject)
  } catch (err) {
    console.error('[Email] Failed:', err.message)
  }
}

export function orderEmailHtml(order) {
  return `
    <h2>New Website Order</h2>
    <table style="border-collapse:collapse;width:100%">
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Name</strong></td><td style="padding:8px;border:1px solid #ddd">${order.fullName}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Company</strong></td><td style="padding:8px;border:1px solid #ddd">${order.companyName || 'N/A'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd">${order.email}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #ddd">${order.phone}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>WhatsApp</strong></td><td style="padding:8px;border:1px solid #ddd">${order.whatsapp || 'N/A'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Business Type</strong></td><td style="padding:8px;border:1px solid #ddd">${order.businessType || 'N/A'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Website Type</strong></td><td style="padding:8px;border:1px solid #ddd">${order.websiteType}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Budget</strong></td><td style="padding:8px;border:1px solid #ddd">${order.budget || 'N/A'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Features</strong></td><td style="padding:8px;border:1px solid #ddd">${(order.requiredFeatures || []).join(', ') || 'None'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Description</strong></td><td style="padding:8px;border:1px solid #ddd">${order.projectDescription}</td></tr>
    </table>
  `
}

export function contactEmailHtml(contact) {
  return `
    <h2>New Contact Message</h2>
    <p><strong>Name:</strong> ${contact.name}</p>
    <p><strong>Email:</strong> ${contact.email}</p>
    <p><strong>Phone:</strong> ${contact.phone || 'N/A'}</p>
    <p><strong>Message:</strong></p>
    <p>${contact.message}</p>
  `
}
