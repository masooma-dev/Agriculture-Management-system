import { useSelector } from 'react-redux';
import WeatherCard from '../components/dashboard/WeatherCard';
import CuttingSchedule from '../components/dashboard/CuttingSchedule';
import { selectHarvestStats } from '../store/harvestSelectors';
import { selectAlerts } from '../store/alertsSelectors';

const Stat = ({ title, value, color }) => (
  <div className="card p-3 text-center" style={{ flex: '1 1 150px', borderLeft: `4px solid ${color}` }}>
    <div className="text-muted">{title}</div>
    <div style={{ fontSize: 28, fontWeight: 700, color }}>{value}</div>
  </div>
);

export default function Dashboard() {
  const stats = useSelector(selectHarvestStats);
  const alerts = useSelector(selectAlerts);

  return (
    <div>
      <h2>Dashboard</h2>

      {alerts.length > 0 && (
        <div className="alert alert-warning">
          <strong>Alerts</strong>
          {alerts.map((a, i) => <div key={i}>⚠️ {a}</div>)}
        </div>
      )}

      <WeatherCard />
      <CuttingSchedule />

      <div className="d-flex gap-3 flex-wrap my-3">
        <Stat title="Total Harvested (kg)" value={stats.harvested} color="#198754" />
        <Stat title="Orders Received" value={stats.ordered} color="#0d6efd" />
        <Stat title="Quantity Sold (kg)" value={stats.sold} color="#fd7e14" />
        <Stat title="Remaining Stock (kg)" value={stats.remaining} color="#dc3545" />
      </div>

      <div>Sold vs harvested: {stats.soldPercent}%</div>
      <div className="progress my-2" style={{ height: 10 }}>
        <div className="progress-bar bg-success" style={{ width: `${stats.soldPercent}%` }} />
      </div>
      <div className="text-muted">
        Pending orders: {stats.pending} | Delivered orders: {stats.delivered}
      </div>
    </div>
  );
}