import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { login, USERS } from '../store/authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth?.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Username and password are required');
      return;
    }
    const found = USERS.find(
      (u) => u.username === username.trim().toLowerCase() && u.password === password
    );
    if (!found) {
      setError('Invalid credentials');
      return;
    }
    const { password: pw, ...safeUser } = found;
    dispatch(login(safeUser));
    navigate('/', { replace: true });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <form onSubmit={handleSubmit} className="card p-4" style={{ width: 340 }}>
        <h3 className="text-center mb-3">Agri Management Login</h3>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <input
          className="form-control mb-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-success w-100" type="submit">Login</button>
        <small className="text-muted text-center mt-2">
          admin/admin123 · manager/manager123
        </small>
      </form>
    </div>
  );
}