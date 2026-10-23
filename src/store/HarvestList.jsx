import { useSelector, useDispatch } from 'react-redux'
import { removeHarvest } from '../store/harvestsSlice'

export default function HarvestList() {
  const harvests = useSelector((state) => state.harvests)
  const dispatch = useDispatch()

  return (
    <table className="table">
      <thead>
        <tr><th>Crop</th><th>Quantity (kg)</th><th>Date</th><th></th></tr>
      </thead>
      <tbody>
        {harvests.map((h) => (
          <tr key={h.id}>
            <td>{h.cropName}</td>
            <td>{h.quantity}</td>
            <td>{h.date}</td>
            <td><button onClick={() => dispatch(removeHarvest(h.id))}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}