import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CrudPage from '../components/common/CrudPage';
import * as actions from '../store/inventorySlice';
import { showToast } from '../store/uiSlice';

function Usage({ items }) {
  const d = useDispatch();
  const [id, setId] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const go = () => {
    const it = items.find((i) => i.id === id);
    if (!it || !(Number(amount) > 0) || Number(amount) > Number(it.qty))
      return d(showToast({ type: 'error', msg: 'Invalid usage amount' }));
    d(actions.use({ id, amount, note }));
    d(showToast({ type: 'success', msg: 'Usage recorded' }));
    setAmount('');
    setNote('');
  };

  return (
    <div className="card p-3 mb-3">
      <h6>Record usage</h6>
      <div className="row g-2">
        <div className="col-md-3">
          <select className="form-select" value={id} onChange={(e) => setId(e.target.value)}>
            <option value="">Item</option>
            {items.map((i) => <option key={i.id} value={i.id}>{i.item} ({i.qty})</option>)}
          </select>
        </div>
        <div className="col-md-2">
          <input className="form-control" type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div className="col-md-4">
          <input className="form-control" placeholder="Note" value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
        <div className="col-md-3">
          <button className="btn btn-warning" onClick={go}>Use stock</button>
        </div>
      </div>
      <h6 className="mt-3">Usage history</h6>
      <ul className="small mb-0">
        {items.flatMap((i) =>
          (i.history || []).map((h, k) => (
            <li key={i.id + k}>{h.date} – {i.item}: {h.amount} {i.unit} {h.note && `(${h.note})`}</li>
          ))
        )}
      </ul>
    </div>
  );
}

export default function Inventory() {
  const items = useSelector((s) => s.inventory);
  const fields = [
    { name: 'item', label: 'Item' },
    { name: 'type', label: 'Type', options: ['Fertilizer', 'Pesticide', 'Seed'] },
    { name: 'qty', label: 'Quantity', type: 'number' },
    { name: 'minQty', label: 'Min quantity', type: 'number' },
    { name: 'unit', label: 'Unit (kg/L)' },
  ];

  return (
    <CrudPage
      title="Inputs Inventory"
      items={items}
      fields={fields}
      actions={actions}
      csvName="inventory.csv"
      rowClass={(i) => (Number(i.qty) <= Number(i.minQty) ? 'table-danger' : '')}
    >
      <Usage items={items} />
    </CrudPage>
  );
}