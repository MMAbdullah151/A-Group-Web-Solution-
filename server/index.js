import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import Order from './models/Order.js'
import Contact from './models/Contact.js'
import Newsletter from './models/Newsletter.js'
import { sendAdminEmail, orderEmailHtml, contactEmailHtml } from './utils/email.js'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 5000

const uploadsDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(null, `${unique}${path.extname(file.originalname)}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Only image files allowed'))
  },
})

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json({ limit: '1mb' }))
app.use('/uploads', express.static(uploadsDir))

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 30 })
app.use('/api', limiter)

async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/agroup-website'
  try {
    await mongoose.connect(uri)
    console.log('MongoDB connected')
  } catch (err) {
    console.warn('MongoDB connection failed:', err.message)
    console.warn('Running without database — forms will fail until MongoDB is available')
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' })
})

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message, honeypot } = req.body
    if (honeypot) return res.json({ success: true })
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ message: 'Name, email, and message are required' })
    }

    const contact = await Contact.create({ name, email, phone, message })
    await sendAdminEmail(`New Contact: ${name}`, contactEmailHtml(contact))
    res.status(201).json({ success: true, message: 'Message sent successfully' })
  } catch (err) {
    console.error('Contact error:', err)
    res.status(500).json({ message: 'Failed to send message' })
  }
})

app.post('/api/orders', async (req, res) => {
  try {
    const { honeypot, ...data } = req.body
    if (honeypot) return res.json({ success: true })
    if (!data.fullName?.trim() || !data.email?.trim() || !data.phone?.trim() || !data.websiteType || !data.projectDescription?.trim()) {
      return res.status(400).json({ message: 'Required fields missing' })
    }

    const order = await Order.create(data)
    await sendAdminEmail(`New Order: ${data.fullName} - ${data.websiteType}`, orderEmailHtml(order))
    res.status(201).json({ success: true, message: 'Order submitted successfully', orderId: order._id })
  } catch (err) {
    console.error('Order error:', err)
    res.status(500).json({ message: 'Failed to submit order' })
  }
})

app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body
    if (!email?.trim()) return res.status(400).json({ message: 'Email is required' })

    await Newsletter.findOneAndUpdate(
      { email: email.toLowerCase() },
      { email: email.toLowerCase() },
      { upsert: true, new: true }
    )
    res.status(201).json({ success: true, message: 'Subscribed successfully' })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(200).json({ success: true, message: 'Already subscribed' })
    }
    console.error('Newsletter error:', err)
    res.status(500).json({ message: 'Failed to subscribe' })
  }
})

app.post('/api/upload', upload.array('files', 10), (req, res) => {
  try {
    const files = (req.files || []).map((f) => ({
      filename: f.filename,
      url: `/uploads/${f.filename}`,
    }))
    res.json({ success: true, files })
  } catch (err) {
    res.status(500).json({ message: err.message || 'Upload failed' })
  }
})

app.get('/api/orders', async (_req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(50)
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders' })
  }
})

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ message: err.message || 'Server error' })
})

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
})
