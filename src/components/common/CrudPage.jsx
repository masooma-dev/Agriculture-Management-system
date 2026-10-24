import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const opts = (f) => (f.options || []).map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
export default function CrudPage({ title, items, fields, actions, rowClass, children }) {
  const d = useDispatch();
  const admin = useSelector((s) => s.auth.role) === 'admin';
  const empty = Object.fromEntries(fields.map((f) => [f.name, '']));
  const [f, setF] = useState(empty); const [err, setErr] = useState('');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    if (fields.some((x) => !x.optional && f[x.name] === '')) return setErr('Please fill all required fields');
    d(f.id ? actions.update(f) : actions.add(f)); setF(empty); setErr('');
  };
  const show = (x, it) => (x.options ? opts(x).find((o) => String(o.value) === String(it[x.name]))?.label ?? it[x.name] : it[x.name]);
  return (
    <div className="container-fluid p-3">
      <h3>{title}</h3>{children}
      <form onSubmit={submit} className="row g-2 mb-3">
        {fields.map((x) => (
          <div className="col-6 col-md-3" key={x.name}>
            {x.options
              ? <select className="form-select" value={f[x.name]} onChange={set(x.name)}><option value="">{x.label}</option>{opts(x).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
              : <input className="form-control" type={x.type || 'text'} min={x.type === 'number' ? 0 : undefined} placeholder={x.label} title={x.label} value={f[x.name]} onChange={set(x.name)} />}
          </div>))}
        <div className="col-12 col-md-3">
          <button className="btn btn-success me-2">{f.id ? 'Update' : 'Add'}</button>
          {f.id && <button type="button" className="btn btn-secondary" onClick={() => setF(empty)}>Cancel</button>}
        </div>
        {err && <div className="text-danger">{err}</div>}
      </form>
      {!items.length ? <div className="text-center text-muted p-4">No records yet.</div> : (
        <div className="table-responsive"><table className="table table-striped align-middle">
          <thead><tr>{fields.map((x) => <th key={x.name}>{x.label}</th>)}{admin && <th>Actions</th>}</tr></thead>
          <tbody>{items.map((it) => (
            <tr key={it.id} className={rowClass?.(it)}>{fields.map((x) => <td key={x.name}>{show(x, it)}</td>)}
              {admin && <td>
                <button className="btn btn-sm btn-outline-primary me-1" onClick={() => setF(it)}>Edit</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => window.confirm('Delete this record?') && d(actions.remove(it.id))}>Delete</button>
              </td>}
            </tr>))}</tbody></table></div>)}
    </div>
  );
}