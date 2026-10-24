import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeCrop, updateCrop, healthLabel, selectCrops } from '../store/cropsSlice';

const colors = { Healthy: '#198754', 'Needs Attention': '#fd7e14', Critical: '#dc3545', 'No data': '#6c757d' };

export default function CropList() {
  const dispatch = useDispatch();
  const crops = useSelector(selectCrops);
  const role = useSelector((s) => s.auth?.user?.role);
  const canEdit = role !== 'manager';
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('cuttingDate');
  const [editId, setEditId] = useState(null);
  const [draft, setDraft] = useState({});

  const rows = crops
    .filter((c) => filter === 'All' || healthLabel(c.healthScore) === filter)
    .slice()
    .sort((a, b) =>
      sortBy === 'healthScore'
        ? (a.healthScore ?? 0) - (b.healthScore ?? 0)
        : String(a.cuttingDate || '').localeCompare(String(b.cuttingDate || ''))
    );

  const startEdit = (c) => { setEditId(c.id); setDraft({ ...c }); };
  const save = () => {
    dispatch(updateCrop({ ...draft, healthScore: Number(draft.healthScore) }));
    setEditId(null);
  };
  const del = (id) => {
    if (window.confirm('Delete this crop?')) dispatch(removeCrop(id));
  };
  const set = (k) => (e) => setDraft({ ...draft, [k]: e.target.value });

  return (
    <div>
      <div className="d-flex gap-2 mb-2">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All</option><option>Healthy</option>
          <option>Needs Attention</option><option>Critical</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="cuttingDate">Sort: cutting date</option>
          <option value="healthScore">Sort: health score</option>
        </select>
      </div>
      <table className="table">
        <thead>
          <tr><th>Name</th><th>Field</th><th>Cutting date</th><th>Score</th><th>Health</th><th>Status</th><th></th></tr>
        </thead>
        <tbody>
          {rows.map((c) => {
            const label = healthLabel(c.healthScore);
            const editing = editId === c.id;
            return (
              <tr key={c.id}>
                <td>{editing ? <input value={draft.name} onChange={set('name')} /> : c.name}</td>
                <td>{editing ? <input value={draft.field} onChange={set('field')} /> : c.field}</td>
                <td>{editing ? <input type="date" value={draft.cuttingDate || ''} onChange={set('cuttingDate')} /> : c.cuttingDate}</td>
                <td>{editing ? <input type="number" value={draft.healthScore ?? ''} onChange={set('healthScore')} style={{ width: 70 }} /> : c.healthScore}</td>
                <td><span className="badge" style={{ background: colors[label] }}>{label}</span></td>
                <td>{c.status}</td>
                <td>
                  {canEdit && (editing ? (
                    <>
                      <button onClick={save}>Save</button>{' '}
                      <button onClick={() => setEditId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(c)}>Edit</button>{' '}
                      <button onClick={() => del(c.id)}>Delete</button>
                    </>
                  ))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}