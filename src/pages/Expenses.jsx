import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { addExpense, removeExpense } from '../store/expensesSlice';
import { selectProfitByCrop, selectTotals } from '../store/profitSelectors';

const CATEGORIES = ['Seeds', 'Fertilizer', 'Labour', 'Fuel', 'Other'];

export default function Expenses() {
  const dispatch = useDispatch();
  const expenses = useSelector((s) => s.expenses) || [];
  const crops = useSelector((s) => s.crops) || [];
  const profit = useSelector(selectProfitByCrop);
  const totals = useSelector(selectTotals);
  const role = useSelector((s) => s.auth?.user?.role);
  const canDelete = role !== 'manager';

  const [cropId, setCropId] = useState('');
  const [type, setType] = useState('Expense');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState({});

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!cropId) errs.crop = 'Select a crop';
    if (!(Number(amount) > 0)) errs.amount = 'Enter an amount above 0';
    if (!date) errs.date = 'Date is required';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const crop = crops.find((c) => String(c.id) === String(cropId));
    dispatch(addExpense({
      cropId: crop.id, cropName: crop.name, type,
      category: type === 'Revenue' ? 'Sale' : category,
      amount: Number(amount), date, note,
    }));
    setAmount(''); setNote(''); setDate('');
  };

  const del = (x) => {
    if (window.confirm('Delete this record?')) dispatch(removeExpense(x.id));
  };

  const Card = ({ title, value, color }) => (
    <div className="card p-3 text-center" style={{ flex: '1 1 140px', borderLeft: `4px solid ${color}` }}>
      <div className="text-muted">{title}</div>
      <div style={{ fontSize: 24, fontWeight: 700, color }}>{value}</div>
    </div>
  );

  return (
    <div>
      <h2>Expenses and Profit/Loss</h2>

      <div className="d-flex gap-3 flex-wrap my-3">
        <Card title="Total Expense" value={totals.expense} color="#dc3545" />
        <Card title="Total Revenue" value={totals.revenue} color="#198754" />
        <Card title={totals.net >= 0 ? 'Net Profit' : 'Net Loss'} value={totals.net} color={totals.net >= 0 ? '#198754' : '#dc3545'} />
      </div>

      <form onSubmit={submit} className="d-flex gap-2 flex-wrap mb-3">
        <div>
          <select className="form-select" value={cropId} onChange={(e) => setCropId(e.target.value)}>
            <option value="">Select crop</option>
            {crops.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          {errors.crop && <div className="text-danger small">{errors.crop}</div>}
        </div>
        <select className="form-select" style={{ width: 130 }} value={type} onChange={(e) => setType(e.target.value)}>
          <option>Expense</option><option>Revenue</option>
        </select>
        {type === 'Expense' && (
          <select className="form-select" style={{ width: 140 }} value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        )}
        <div>
          <input className="form-control" type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          {errors.amount && <div className="text-danger small">{errors.amount}</div>}
        </div>
        <div>
          <input className="form-control" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          {errors.date && <div className="text-danger small">{errors.date}</div>}
        </div>
        <input className="form-control" style={{ width: 160 }} placeholder="Note" value={note} onChange={(e) => setNote(e.target.value)} />
        <button className="btn btn-success" type="submit">Add</button>
      </form>

      {profit.length > 0 && (
        <div style={{ width: '100%', height: 280 }} className="mb-3">
          <ResponsiveContainer>
            <BarChart data={profit}>
              <XAxis dataKey="crop" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="expense" fill="#dc3545" name="Expense" />
              <Bar dataKey="revenue" fill="#198754" name="Revenue" />
              <Bar dataKey="net" fill="#0d6efd" name="Net" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {expenses.length === 0 ? (
        <p>No records yet.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="table align-middle">
            <thead>
              <tr><th>Date</th><th>Crop</th><th>Type</th><th>Category</th><th>Amount</th><th>Note</th><th></th></tr>
            </thead>
            <tbody>
              {expenses.map((x) => (
                <tr key={x.id}>
                  <td>{x.date}</td><td>{x.cropName}</td>
                  <td>{x.type}</td><td>{x.category}</td>
                  <td>{x.amount}</td><td>{x.note}</td>
                  <td>{canDelete && <button className="btn btn-sm btn-danger" onClick={() => del(x)}>Delete</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}