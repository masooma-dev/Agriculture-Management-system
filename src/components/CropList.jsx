import { useSelector, useDispatch } from 'react-redux'
import { removeCrop, updateCrop } from '../store/cropsSlice'

export default function CropList() {
  const crops = useSelector((state) => state.crops)
  const dispatch = useDispatch()

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th><th>Field</th><th>Planting date</th><th>Status</th><th></th>
        </tr>
      </thead>
      <tbody>
        {crops.map((c) => (
          <tr key={c.id}>
            <td>{c.name}</td>
            <td>{c.field}</td>
            <td>{c.plantingDate}</td>
            <td>
              <select
                value={c.status || 'Planted'}
                onChange={(e) => dispatch(updateCrop({ ...c, status: e.target.value }))}
              >
                <option>Planted</option>
                <option>Growing</option>
                <option>Harvested</option>
              </select>
            </td>
            <td><button onClick={() => dispatch(removeCrop(c.id))}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}