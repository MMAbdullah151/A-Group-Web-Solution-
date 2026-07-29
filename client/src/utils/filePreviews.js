function readFileAsDataURL(file, maxWidth = 900) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const scale = img.width > maxWidth ? maxWidth / img.width : 1
        const width = Math.round(img.width * scale)
        const height = Math.round(img.height * scale)
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', 0.82))
      }
      img.onerror = () => resolve(String(reader.result))
      img.src = String(reader.result)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export async function buildFilePreviews({ logo = null, images = [] } = {}) {
  const logoPreview = logo ? await readFileAsDataURL(logo) : null
  const imagePreviews = await Promise.all(images.filter(Boolean).map((file) => readFileAsDataURL(file)))
  return { logoPreview, imagePreviews }
}
