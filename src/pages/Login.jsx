import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, USERS } from '../store/authSlice';

export default function Login() {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [err, setErr] = useState('');
  const d = useDispatch();
  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!u.trim() || p.length < 6) return setErr('Enter username and a password of 6+ characters');
    const m = USERS[u.trim().toLowerCase()];
    if (!m || m.password !== p) return setErr('Invalid credentials');
    d(login({ user: u.trim().toLowerCase(), role: m.role }));
    nav('/');
  };

  return (
    <div className="container" style={{ maxWidth: 400, marginTop: 100 }}>
      <form onSubmit={submit} className="card p-4 shadow">
        <h3 className="mb-3">Agri Management Login</h3>
        {err && <div className="alert alert-danger py-2">{err}</div>}
        <input className="form-control mb-2" placeholder="Username" value={u} onChange={(e) => setU(e.target.value)} />
        <input className="form-control mb-3" type="password" placeholder="Password" value={p} onChange={(e) => setP(e.target.value)} />
        <button className="btn btn-success w-100">Login</button>
        <small className="text-muted mt-2">admin/admin123 · manager/manager123</small>
      </form>
    </div>
  );
}