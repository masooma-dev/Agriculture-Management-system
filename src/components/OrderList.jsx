import { useSelector, useDispatch } from 'react-redux'
import { removeOrder } from '../store/ordersSlice'

function OrderList() {
  const orders = useSelector((state) => state.orders) || []
  const dispatch = useDispatch()

  if (orders.length === 0) return <p>No orders yet.</p>

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Customer</th><th>Crop</th><th>Qty</th><th>Status</th><th></th>
        </tr>
      </thead>
      <tbody>
        {orders.map((o) => (
          <tr key={o.id}>
            <td>{o.customer}</td>
            <td>{o.crop}</td>
            <td>{o.quantity}</td>
            <td>{o.status}</td>
            <td>
              <button className="btn btn-sm btn-danger"
                onClick={() => dispatch(removeOrder(o.id))}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default OrderList