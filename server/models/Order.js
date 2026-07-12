import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    companyName: String,
    email: { type: String, required: true },
    phone: { type: String, required: true },
    whatsapp: String,
    businessType: String,
    websiteType: { type: String, required: true },
    budget: String,
    requiredFeatures: [String],
    projectDescription: { type: String, required: true },
    logoUrl: String,
    imageUrls: [String],
    status: { type: String, default: 'pending', enum: ['pending', 'reviewed', 'in-progress', 'completed'] },
  },
  { timestamps: true }
)

export default mongoose.model('Order', orderSchema)
