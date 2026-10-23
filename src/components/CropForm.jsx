import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCrop } from '../store/cropsSlice'
import { validateCrop } from '../utils/validators'

export default function CropForm() {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [field, setField] = useState('')
  const [plantingDate, setPlantingDate] = useState('')
  const [status, setStatus] = useState('Planted')
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validateCrop({ name, field, plantingDate })
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    dispatch(addCrop({ name, field, plantingDate, status }))
    setName('')
    setField('')
    setPlantingDate('')
    setStatus('Planted')
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, margin: '20px 0', flexWrap: 'wrap' }}>
      <div>
        <input placeholder="Crop name" value={name} onChange={(e) => setName(e.target.value)} />
        {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
      </div>
      <div>
        <input placeholder="Field" value={field} onChange={(e) => setField(e.target.value)} />
        {errors.field && <div style={{ color: 'red' }}>{errors.field}</div>}
      </div>
      <div>
        <input type="date" value={plantingDate} onChange={(e) => setPlantingDate(e.target.value)} />
        {errors.plantingDate && <div style={{ color: 'red' }}>{errors.plantingDate}</div>}
      </div>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Planted</option>
        <option>Growing</option>
        <option>Harvested</option>
      </select>
      <button type="submit">Add Crop</button>
    </form>
  )
}