import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeBuyer } from '../store/buyersSlice';

export default function BuyerList() {
  const buyers = useSelector((state) => state.buyers) || [];
  const role = useSelector((s) => s.auth?.user?.role);
  const canDelete = role !== 'manager';
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [selected, setSelected] = useState(null);

  const q = search.trim().toLowerCase();
  const rows = buyers
    .filter((b) => !q || b.name.toLowerCase().includes(q) || b.cnic.includes(q))
    .slice()
    .sort((a, b) =>
      sortBy === 'quantity'
        ? Number(b.quantity || 0) - Number(a.quantity || 0)
        : String(b.date || '').localeCompare(String(a.date || ''))
    );

  const del = (b) => {
    if (window.confirm(`Delete buyer ${b.name}?`)) dispatch(removeBuyer(b.id));
  };

  if (buyers.length === 0) return <p>No buyers yet.</p>;

  return (
    <div>
      <div className="d-flex gap-2 mb-2 flex-wrap">
        <input
          className="form-control"
          style={{ maxWidth: 260 }}
          placeholder="Search by name or CNIC"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="form-select" style={{ maxWidth: 200 }} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Sort: newest date</option>
          <option value="quantity">Sort: quantity</option>
        </select>
      </div>

      {rows.length === 0 ? (
        <p>No buyers match your search.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Photo</th><th>Name</th><th>CNIC</th>
                <th>Crop</th><th>Qty (kg)</th><th>Date</th><th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((b) => (
                <tr key={b.id}>
                  <td>
                    <img src={b.image} alt={b.name} width="50" height="50"
                      style={{ objectFit: 'cover', borderRadius: '50%', cursor: 'pointer' }}
                      onClick={() => setSelected(b)} />
                  </td>
                  <td>{b.name}</td>
                  <td>{b.cnic}</td>
                  <td>{b.cropName || '-'}</td>
                  <td>{b.quantity ?? '-'}</td>
                  <td>{b.date || '-'}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-secondary me-1" onClick={() => setSelected(b)}>View</button>
                    {canDelete && (
                      <button className="btn btn-sm btn-danger" onClick={() => del(b)}>Delete</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
          }}
        >
          <div className="card p-3 text-center" style={{ maxWidth: 360 }} onClick={(e) => e.stopPropagation()}>
            <img src={selected.image} alt={selected.name}
              style={{ width: '100%', maxHeight: 260, objectFit: 'contain' }} />
            <h5 className="mt-2">{selected.name}</h5>
            <p className="mb-1">CNIC: {selected.cnic}</p>
            <p className="mb-1">Crop: {selected.cropName || '-'}</p>
            <p className="mb-1">Quantity: {selected.quantity ?? '-'} kg</p>
            <p className="mb-2">Date: {selected.date || '-'}</p>
            <div className="d-flex gap-2 justify-content-center">
              <button className="btn btn-primary btn-sm" onClick={() => window.print()}>Print</button>
              <button className="btn btn-secondary btn-sm" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}