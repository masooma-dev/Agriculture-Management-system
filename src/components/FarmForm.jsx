import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addFarm } from '../store/farmsSlice'
import { validateName } from '../utils/validators'

export default function FarmForm() {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [size, setSize] = useState('')
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    const nameErr = validateName(name)
    if (nameErr) errs.name = nameErr
    if (!location.trim()) errs.location = 'Location is required'
    if (!size || Number(size) <= 0) errs.size = 'Size must be more than 0'
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    dispatch(addFarm({ name, location, size: Number(size) }))
    setName('')
    setLocation('')
    setSize('')
  }

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-2 flex-wrap my-3">
      <div>
        <input className="form-control" placeholder="Farm name"
          value={name} onChange={(e) => setName(e.target.value)} />
        {errors.name && <div className="text-danger small">{errors.name}</div>}
      </div>
      <div>
        <input className="form-control" placeholder="Location"
          value={location} onChange={(e) => setLocation(e.target.value)} />
        {errors.location && <div className="text-danger small">{errors.location}</div>}
      </div>
      <div>
        <input className="form-control" type="number" placeholder="Size (acres)"
          value={size} onChange={(e) => setSize(e.target.value)} />
        {errors.size && <div className="text-danger small">{errors.size}</div>}
      </div>
      <button className="btn btn-success" type="submit">Add Farm</button>
    </form>
  )
}