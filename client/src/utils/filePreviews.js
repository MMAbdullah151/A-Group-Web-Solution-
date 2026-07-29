const MAX_PREVIEW_WIDTH = 320
const JPEG_QUALITY = 0.72
const MAX_PREVIEW_BYTES = 90000
const MAX_SVG_BYTES = 50000

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error(`Failed to read ${file.name}`))
    reader.readAsDataURL(file)
  })
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Image load failed'))
    img.src = src
  })
}

function dataUrlByteSize(dataUrl) {
  const base64 = dataUrl.split(',')[1] || ''
  return Math.ceil((base64.length * 3) / 4)
}

async function compressRasterImage(file, quality = JPEG_QUALITY) {
  const dataUrl = await readFileAsDataURL(file)
  const img = await loadImage(dataUrl)

  const scale = Math.min(1, MAX_PREVIEW_WIDTH / Math.max(img.width, img.height, 1))
  const width = Math.max(1, Math.round(img.width * scale))
  const height = Math.max(1, Math.round(img.height * scale))

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, width, height)

  let currentQuality = quality
  let result = canvas.toDataURL('image/jpeg', currentQuality)

  while (dataUrlByteSize(result) > MAX_PREVIEW_BYTES && currentQuality > 0.35) {
    currentQuality -= 0.08
    result = canvas.toDataURL('image/jpeg', currentQuality)
  }

  if (dataUrlByteSize(result) > MAX_PREVIEW_BYTES) {
    return null
  }

  return result
}

async function compressImage(file) {
  if (!file) return null

  const isSvg =
    file.type === 'image/svg+xml' || file.name?.toLowerCase().endsWith('.svg')

  if (isSvg) {
    if (file.size > MAX_SVG_BYTES) return null
    return readFileAsDataURL(file)
  }

  try {
    return await compressRasterImage(file)
  } catch {
    if (file.size <= MAX_PREVIEW_BYTES) {
      return readFileAsDataURL(file)
    }
    return null
  }
}

export async function buildFilePreviews({ logo = null, images = [] } = {}) {
  const logoPreview = logo ? await compressImage(logo) : null
  const imagePreviews = []

  for (const file of images.filter(Boolean)) {
    const preview = await compressImage(file)
    if (preview) imagePreviews.push(preview)
  }

  return { logoPreview, imagePreviews }
}

export function estimatePayloadSize(value) {
  return new Blob([value]).size
}

export function dataUrlToFile(dataUrl, filename) {
  const [header, base64] = dataUrl.split(',')
  const mime = header.match(/:(.*?);/)?.[1] || 'image/jpeg'
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)

  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i)
  }

  return new File([bytes], filename, { type: mime })
}

export function buildPreviewAttachmentFiles({ logo, images, logoPreview, imagePreviews }) {
  const attachments = []

  if (logoPreview) {
    const baseName = logo?.name?.replace(/\.[^.]+$/, '') || 'customer-logo'
    attachments.push(dataUrlToFile(logoPreview, `${baseName}-preview.jpg`))
  }

  imagePreviews.forEach((preview, index) => {
    const baseName = images[index]?.name?.replace(/\.[^.]+$/, '') || `reference-image-${index + 1}`
    attachments.push(dataUrlToFile(preview, `${baseName}-preview.jpg`))
  })

  return attachments
}
