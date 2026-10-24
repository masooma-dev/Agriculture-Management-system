import Expenses from './pages/Expenses';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Crops from './pages/Crops';
import Buyers from './pages/Buyers';
import Inventory from './pages/Inventory';
import Reports from './pages/Reports';
import Tasks from './pages/Tasks'


function Protected({ children }) {
  const user = useSelector((s) => s.auth?.user);
  return user ? children : <Navigate to="/login" replace />;
}

const Soon = ({ title }) => <h2>{title} (coming soon)</h2>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Protected><Layout /></Protected>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/crops" element={<Crops />} />
          <Route path="/harvest-orders" element={<Dashboard />} />
          <Route path="/buyers" element={<Buyers />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="*" element={<h2>Page not found</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}