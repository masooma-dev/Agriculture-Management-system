import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBuyer } from '../store/buyersSlice'
import { validateName, formatCnic, validateCnic, validateImage } from '../utils/validators'

export default function BuyerForm() {
  const dispatch = useDispatch()
  const buyers = useSelector((state) => state.buyers) || []
  const [name, setName] = useState('')
  const [cnic, setCnic] = useState('')
  const [file, setFile] = useState(null)
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    const n = validateName(name)
    const c = validateCnic(cnic, buyers)
    const i = validateImage(file)
    if (n) errs.name = n
    if (c) errs.cnic = c
    if (i) errs.image = i
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    const reader = new FileReader()
    reader.onload = () => {
      dispatch(addBuyer({ name: name.trim(), cnic, image: reader.result }))
      setName('')
      setCnic('')
      setFile(null)
      e.target.reset()
    }
    reader.readAsDataURL(file)
  }

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-2 flex-wrap my-3">
      <div>
        <input className="form-control" placeholder="Buyer name"
          value={name} onChange={(e) => setName(e.target.value)} />
        {errors.name && <div className="text-danger small">{errors.name}</div>}
      </div>
      <div>
        <input className="form-control" placeholder="CNIC 12345-1234567-1"
          value={cnic} onChange={(e) => setCnic(formatCnic(e.target.value))} />
        {errors.cnic && <div className="text-danger small">{errors.cnic}</div>}
      </div>
      <div>
        <input className="form-control" type="file" accept="image/jpeg,image/png"
          onChange={(e) => setFile(e.target.files[0] || null)} />
        {errors.image && <div className="text-danger small">{errors.image}</div>}
      </div>
      <button className="btn btn-success" type="submit">Add Buyer</button>
    </form>
  )
}