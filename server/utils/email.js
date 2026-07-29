import nodemailer from 'nodemailer'
import { BUSINESS_EMAIL } from '../config.js'

let transporter = null

function getTransporter() {
  if (transporter) return transporter

  const smtpUser = process.env.SMTP_USER
  if (!smtpUser || smtpUser === 'your-email@gmail.com') {
    return null
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: smtpUser,
      pass: process.env.SMTP_PASS,
    },
  })

  return transporter
}

export function getAdminEmail() {
  return process.env.ADMIN_EMAIL || BUSINESS_EMAIL
}

export async function sendAdminEmail(subject, html, options = {}) {
  const transport = getTransporter()
  const adminEmail = getAdminEmail()

  if (!transport) {
    console.log('[Email] SMTP not configured. Set SMTP_USER and SMTP_PASS in server/.env')
    console.log('[Email] Skipped:', subject)
    return false
  }

  try {
    await transport.sendMail({
      from: `"A Group Web Solution" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      replyTo: options.replyTo || undefined,
      subject,
      html,
    })
    console.log('[Email] Sent to', adminEmail, ':', subject)
    return true
  } catch (err) {
    console.error('[Email] Failed to send to', adminEmail, ':', err.message)
    return false
  }
}

function formatList(items) {
  if (!items?.length) return 'None'
  return items.join(', ')
}

function formatUploadLinks(urls, baseUrl) {
  if (!urls?.length) return 'None'
  return urls
    .map((url, index) => {
      const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`
      return `<a href="${fullUrl}">File ${index + 1}</a>`
    })
    .join('<br />')
}

export function orderEmailHtml(order, baseUrl = '') {
  return `
    <div style="font-family:Arial,sans-serif;color:#031428;max-width:640px">
      <h2 style="color:#031428;border-bottom:2px solid #00D4FF;padding-bottom:8px">New Website Order</h2>
      <table style="border-collapse:collapse;width:100%;margin-top:16px">
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Name</strong></td><td style="padding:8px;border:1px solid #ddd">${order.fullName}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Company</strong></td><td style="padding:8px;border:1px solid #ddd">${order.companyName || 'N/A'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd"><a href="mailto:${order.email}">${order.email}</a></td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #ddd">${order.phone}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>WhatsApp</strong></td><td style="padding:8px;border:1px solid #ddd">${order.whatsapp || 'N/A'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Business Type</strong></td><td style="padding:8px;border:1px solid #ddd">${order.businessType || 'N/A'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Website Type</strong></td><td style="padding:8px;border:1px solid #ddd">${order.websiteType}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Budget</strong></td><td style="padding:8px;border:1px solid #ddd">${order.budget || 'N/A'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Features</strong></td><td style="padding:8px;border:1px solid #ddd">${formatList(order.requiredFeatures)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Logo</strong></td><td style="padding:8px;border:1px solid #ddd">${order.logoUrl ? formatUploadLinks([order.logoUrl], baseUrl) : 'None'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Images</strong></td><td style="padding:8px;border:1px solid #ddd">${formatUploadLinks(order.imageUrls, baseUrl)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Description</strong></td><td style="padding:8px;border:1px solid #ddd">${order.projectDescription}</td></tr>
      </table>
      <p style="margin-top:16px;color:#666;font-size:13px">Reply directly to this email to contact the customer.</p>
    </div>
  `
}

export function contactEmailHtml(contact) {
  return `
    <div style="font-family:Arial,sans-serif;color:#031428;max-width:640px">
      <h2 style="color:#031428;border-bottom:2px solid #00D4FF;padding-bottom:8px">New Contact Message</h2>
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></p>
      <p><strong>Phone:</strong> ${contact.phone || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${contact.message}</p>
    </div>
  `
}
