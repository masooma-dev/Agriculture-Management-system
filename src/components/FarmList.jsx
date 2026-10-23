import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFarm, updateFarm } from '../store/farmsSlice'
import { validateName } from '../utils/validators'

export default function FarmList() {
  const farms = useSelector((state) => state.farms) || []
  const dispatch = useDispatch()
  const [editId, setEditId] = useState(null)
  const [draft, setDraft] = useState({})
  const [error, setError] = useState('')

  const startEdit = (f) => {
    setEditId(f.id)
    setDraft({ name: f.name, location: f.location, size: f.size })
    setError('')
  }

  const save = () => {
    const nameErr = validateName(draft.name)
    if (nameErr) return setError(nameErr)
    if (!draft.location.trim()) return setError('Location is required')
    if (!draft.size || Number(draft.size) <= 0)
      return setError('Size must be more than 0')
    dispatch(updateFarm({ id: editId, ...draft, size: Number(draft.size) }))
    setEditId(null)
  }

  if (farms.length === 0) return <p>No farms yet.</p>

  return (
    <>
      {error && <div className="text-danger small">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr><th>Name</th><th>Location</th><th>Size (acres)</th><th></th></tr>
        </thead>
        <tbody>
          {farms.map((f) =>
            editId === f.id ? (
              <tr key={f.id}>
                <td><input className="form-control" value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></td>
                <td><input className="form-control" value={draft.location}
                  onChange={(e) => setDraft({ ...draft, location: e.target.value })} /></td>
                <td><input className="form-control" type="number" value={draft.size}
                  onChange={(e) => setDraft({ ...draft, size: e.target.value })} /></td>
                <td className="text-nowrap">
                  <button className="btn btn-sm btn-success me-1" onClick={save}>Save</button>
                  <button className="btn btn-sm btn-secondary" onClick={() => setEditId(null)}>Cancel</button>
                </td>
              </tr>
            ) : (
              <tr key={f.id}>
                <td>{f.name}</td>
                <td>{f.location}</td>
                <td>{f.size}</td>
                <td className="text-nowrap">
                  <button className="btn btn-sm btn-primary me-1" onClick={() => startEdit(f)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => dispatch(removeFarm(f.id))}>Delete</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  )
}