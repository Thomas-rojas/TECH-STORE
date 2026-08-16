const MAX_EDGE = 1200
const MAX_BYTES = 12 * 1024 * 1024

export function readImageFile(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) {
    return Promise.reject(new Error('Elige una foto (JPG, PNG o WEBP).'))
  }
  if (file.size > MAX_BYTES) {
    return Promise.reject(new Error('La foto pesa demasiado. Usa una de menos de 12 MB.'))
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('No se pudo leer la foto.'))
    reader.onload = () => {
      const image = new Image()
      image.onload = () => {
        const scale = Math.min(1, MAX_EDGE / Math.max(image.width, image.height))
        const width = Math.max(1, Math.round(image.width * scale))
        const height = Math.max(1, Math.round(image.height * scale))
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const context = canvas.getContext('2d')
        if (!context) {
          resolve(String(reader.result))
          return
        }
        context.fillStyle = '#ffffff'
        context.fillRect(0, 0, width, height)
        context.drawImage(image, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', 0.84))
      }
      image.onerror = () => reject(new Error('Ese archivo no se puede usar como foto.'))
      image.src = String(reader.result)
    }
    reader.readAsDataURL(file)
  })
}
