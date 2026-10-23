export const validateName = (v) => {
  const t = v.trim()
  if (!t) return 'Name is required'
  if (!/^[A-Za-z ]+$/.test(t)) return 'Letters and spaces only'
  if (t.length < 3) return 'Minimum 3 characters'
  return ''
}

export const formatCnic = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 13)
  if (d.length <= 5) return d
  if (d.length <= 12) return d.slice(0, 5) + '-' + d.slice(5)
  return d.slice(0, 5) + '-' + d.slice(5, 12) + '-' + d.slice(12)
}

export const validateCnic = (v, buyers) => {
  if (!/^\d{5}-\d{7}-\d$/.test(v)) return 'CNIC must be 13 digits: 12345-1234567-1'
  if (buyers.some((b) => b.cnic === v)) return 'This CNIC is already registered'
  return ''
}

export const validateImage = (file) => {
  if (!file) return 'Image is required'
  if (!['image/jpeg', 'image/png'].includes(file.type)) return 'JPG or PNG only'
  if (file.size > 1024 * 1024) return 'Image must be 1 MB or less'
  return ''
}

export const validateQuantity = (q, stock) => {
  const n = Number(q)
  if (!n || n <= 0) return 'Enter a quantity above 0'
  if (n > stock) return `Only ${stock} available`
  return ''
}
export function validateCrop({ name, field, plantingDate }) {
  const errors = {}
  if (!name.trim()) errors.name = 'Crop name is required'
  if (!field.trim()) errors.field = 'Field is required'
  if (!plantingDate) errors.plantingDate = 'Planting date is required'
  return errors
}