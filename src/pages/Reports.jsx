import { useState } from 'react';
import { useSelector } from 'react-redux';
import exportCsv from '../utils/exportCsv';

export default function Reports() {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const { crops, buyers, expenses, activity } = useSelector((s) => s);

  const inM = (d) => String(d || '').startsWith(month);
  const sales = buyers.filter((b) => inM(b.date));
  const exp = expenses.filter((e) => inM(e.date));
  const rows = [{
    month,
    harvest: crops.reduce((a, c) => a + Number(c.harvestQty || 0), 0),
    sold: sales.reduce((a, b) => a + Number(b.quantity), 0),
    expenses: exp.reduce((a, e) => a + Number(e.amount), 0),
  }];

  return (
    <div className="container-fluid p-3">
      <h3>Reports</h3>
      <div className="d-flex gap-2 mb-3 d-print-none">
        <input type="month" className="form-control w-auto" value={month} onChange={(e) => setMonth(e.target.value)} />
        <button className="btn btn-success" onClick={() => exportCsv(rows, `report-${month}.csv`)}>Export CSV</button>
        <button className="btn btn-outline-secondary" onClick={() => window.print()}>Print / PDF</button>
      </div>

      <table className="table table-bordered w-auto">
        <thead><tr><th>Month</th><th>Harvest</th><th>Sold</th><th>Expenses</th></tr></thead>
        <tbody>
          <tr><td>{month}</td><td>{rows[0].harvest}</td><td>{rows[0].sold}</td><td>{rows[0].expenses}</td></tr>
        </tbody>
      </table>

      <h4 className="mt-4">Activity Log</h4>
      <div className="table-responsive">
        <table className="table table-sm table-striped">
          <thead><tr><th>User</th><th>Action</th><th>Entity</th><th>Time</th></tr></thead>
          <tbody>
            {activity.map((a) => (
              <tr key={a.id}>
                <td>{a.user}</td><td>{a.action}</td><td>{a.entity}</td>
                <td>{new Date(a.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}