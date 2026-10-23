import { useSelector, useDispatch } from 'react-redux'
import { removeBuyer } from '../store/buyersSlice'

export default function BuyerList() {
  const buyers = useSelector((state) => state.buyers) || []
  const dispatch = useDispatch()

  if (buyers.length === 0) return <p>No buyers yet.</p>

  return (
    <table className="table table-striped align-middle">
      <thead>
        <tr><th>Photo</th><th>Name</th><th>CNIC</th><th></th></tr>
      </thead>
      <tbody>
        {buyers.map((b) => (
          <tr key={b.id}>
            <td>
              <img src={b.image} alt={b.name} width="50" height="50"
                style={{ objectFit: 'cover', borderRadius: '50%' }} />
            </td>
            <td>{b.name}</td>
            <td>{b.cnic}</td>
            <td>
              <button className="btn btn-sm btn-danger"
                onClick={() => dispatch(removeBuyer(b.id))}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}