import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addOrder } from '../store/ordersSlice'

function OrderForm() {
  const dispatch = useDispatch()
  const empty = { customer: '', crop: '', quantity: '', status: 'Pending' }
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    const e = {}
    if (!form.customer.trim()) e.customer = 'Customer is required'
    if (!form.crop.trim()) e.crop = 'Crop is required'
    if (!form.quantity || Number(form.quantity) <= 0)
      e.quantity = 'Quantity must be more than 0'
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) return
    dispatch(addOrder(form))
    setForm(empty)
  }

  return (
    <div className="mb-3">
      <div className="d-flex gap-2">
        <input className="form-control" name="customer" placeholder="Customer"
          value={form.customer} onChange={handleChange} />
        <input className="form-control" name="crop" placeholder="Crop"
          value={form.crop} onChange={handleChange} />
        <input className="form-control" name="quantity" type="number"
          placeholder="Qty" value={form.quantity} onChange={handleChange} />
        <select className="form-select" name="status"
          value={form.status} onChange={handleChange}>
          <option>Pending</option>
          <option>Shipped</option>
          <option>Delivered</option>
        </select>
        <button className="btn btn-success" onClick={handleSubmit}>Add</button>
      </div>
      {Object.values(errors).map((msg) => (
        <div key={msg} className="text-danger small mt-1">{msg}</div>
      ))}
    </div>
  )
}

export default OrderForm