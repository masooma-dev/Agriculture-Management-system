import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, setTaskStatus, removeTask } from '../store/tasksSlice';

const STATUSES = ['Pending', 'In progress', 'Done'];

export default function Tasks() {
  const dispatch = useDispatch();
  const tasks = useSelector((s) => s.tasks) || [];
  const crops = useSelector((s) => s.crops) || [];
  const role = useSelector((s) => s.auth?.user?.role);
  const canDelete = role !== 'manager';

  const [title, setTitle] = useState('');
  const [cropName, setCropName] = useState('');
  const [due, setDue] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [errors, setErrors] = useState({});

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (!due) errs.due = 'Due date is required';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    dispatch(addTask({ title: title.trim(), cropName, due, assignedTo }));
    setTitle(''); setDue(''); setAssignedTo(''); setCropName('');
  };

  const del = (t) => {
    if (window.confirm('Delete this task?')) dispatch(removeTask(t.id));
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div>
      <h2>Tasks</h2>

      <form onSubmit={submit} className="d-flex gap-2 flex-wrap my-3">
        <div>
          <input className="form-control" placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} />
          {errors.title && <div className="text-danger small">{errors.title}</div>}
        </div>
        <select className="form-select" style={{ width: 160 }} value={cropName} onChange={(e) => setCropName(e.target.value)}>
          <option value="">No crop</option>
          {crops.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
        <div>
          <input className="form-control" type="date" value={due} onChange={(e) => setDue(e.target.value)} />
          {errors.due && <div className="text-danger small">{errors.due}</div>}
        </div>
        <input className="form-control" style={{ width: 160 }} placeholder="Assigned to" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />
        <button className="btn btn-success" type="submit">Add task</button>
      </form>

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="table align-middle">
            <thead>
              <tr><th>Title</th><th>Crop</th><th>Due</th><th>Assigned to</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {tasks.map((t) => (
                <tr key={t.id} className={t.status !== 'Done' && t.due < today ? 'table-danger' : ''}>
                  <td>{t.title}</td>
                  <td>{t.cropName || '-'}</td>
                  <td>{t.due}</td>
                  <td>{t.assignedTo || '-'}</td>
                  <td>
                    <select className="form-select form-select-sm" value={t.status}
                      onChange={(e) => dispatch(setTaskStatus({ id: t.id, status: e.target.value }))}>
                      {STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>{canDelete && <button className="btn btn-sm btn-danger" onClick={() => del(t)}>Delete</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}