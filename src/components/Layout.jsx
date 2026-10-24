import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { selectAlerts } from '../store/alertsSelectors';

const links = [
  ['/', 'Dashboard'], ['/crops', 'Crops'], ['/harvest-orders', 'Harvest & Orders'],
  ['/buyers', 'Buyers'], ['/tasks', 'Tasks'], ['/expenses', 'Expenses'],
  ['/inventory', 'Inventory'], ['/reports', 'Reports'],
];

export default function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth?.user);
  const alerts = useSelector(selectAlerts);
  const [menu, setMenu] = useState(false);
  const [bell, setBell] = useState(false);
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute('data-bs-theme', next ? 'dark' : 'light');
  };
  const doLogout = () => { dispatch(logout()); navigate('/login'); };

  return (
    <div>
      <nav className="navbar px-3 py-2" style={{ background: '#14341b', color: '#fff', position: 'relative' }}>
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-sm btn-outline-light d-md-none" onClick={() => setMenu(!menu)}>☰</button>
          <strong>Agriculture Management</strong>
        </div>
        <div className="d-flex align-items-center gap-3 flex-wrap">
          <small>{new Date().toLocaleDateString()}</small>
          <button className="btn btn-sm btn-outline-light" onClick={() => setBell(!bell)}>
            🔔 {alerts.length}
          </button>
          <button className="btn btn-sm btn-outline-light" onClick={toggleDark}>{dark ? '☀️' : '🌙'}</button>
          <small>{user?.name} ({user?.role})</small>
          <button className="btn btn-sm btn-light" onClick={doLogout}>Logout</button>
        </div>
        {bell && (
          <div className="card p-2" style={{ position: 'absolute', right: 10, top: 56, zIndex: 50, minWidth: 240, color: '#000' }}>
            {alerts.length === 0 ? <small>No alerts</small> : alerts.map((a, i) => <small key={i}>⚠️ {a}</small>)}
          </div>
        )}
      </nav>

      <div className="d-flex">
        <aside className={`${menu ? '' : 'd-none'} d-md-block p-2`}
          style={{ width: 200, minHeight: '100vh', background: '#1f4d2b' }}>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setMenu(false)}
              className="d-block px-2 py-2 text-decoration-none rounded mb-1"
              style={({ isActive }) => ({ color: '#fff', background: isActive ? '#2e7d46' : 'transparent' })}>
              {label}
            </NavLink>
          ))}
        </aside>
        <main className="flex-grow-1 p-3" style={{ minWidth: 0 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}