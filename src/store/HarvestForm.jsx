import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addHarvest } from '../store/harvestsSlice'

export default function HarvestForm() {
  const dispatch = useDispatch()
  const crops = useSelector((state) => state.crops)
  const [cropName, setCropName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [date, setDate] = useState('')
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!cropName) errs.cropName = 'Select a crop'
    if (!quantity || Number(quantity) <= 0) errs.quantity = 'Quantity must be more than 0'
    if (!date) errs.date = 'Date is required'
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    dispatch(addHarvest({ cropName, quantity: Number(quantity), date }))
    setCropName('')
    setQuantity('')
    setDate('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, margin: '20px 0', flexWrap: 'wrap' }}>
      <div>
        <select value={cropName} onChange={(e) => setCropName(e.target.value)}>
          <option value="">Select crop</option>
          {crops.map((c) => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>
        {errors.cropName && <div style={{ color: 'red' }}>{errors.cropName}</div>}
      </div>
      <div>
        <input type="number" placeholder="Quantity (kg)" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        {errors.quantity && <div style={{ color: 'red' }}>{errors.quantity}</div>}
      </div>
      <div>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        {errors.date && <div style={{ color: 'red' }}>{errors.date}</div>}
      </div>
      <button type="submit">Add Harvest</button>
    </form>
  )
}