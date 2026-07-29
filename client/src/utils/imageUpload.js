import { dataUrlToFile } from './filePreviews.js'

async function uploadToTmpfiles(file) {
  const formData = new FormData()
  formData.append('file', file)

  const res = await fetch('https://tmpfiles.org/api/v1/upload', {
    method: 'POST',
    body: formData,
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok || data.status !== 'success' || !data.data?.url) {
    throw new Error('Image upload failed')
  }

  return data.data.url
}

export async function uploadPreviewImages({ logo = null, images = [], logoPreview, imagePreviews = [] }) {
  let logoUrl = null

  if (logo && logoPreview) {
    const baseName = logo.name?.replace(/\.[^.]+$/, '') || 'customer-logo'
    logoUrl = await uploadToTmpfiles(dataUrlToFile(logoPreview, `${baseName}-preview.jpg`)).catch(() => null)
  }

  const imageUrls = []

  for (let index = 0; index < imagePreviews.length; index += 1) {
    const preview = imagePreviews[index]
    const source = images[index]

    if (!preview || !source) {
      imageUrls.push(null)
      continue
    }

    const baseName = source.name?.replace(/\.[^.]+$/, '') || `reference-image-${index + 1}`
    const url = await uploadToTmpfiles(
      dataUrlToFile(preview, `${baseName}-preview.jpg`),
    ).catch(() => null)

    imageUrls.push(url)
  }

  return { logoUrl, imageUrls }
}
