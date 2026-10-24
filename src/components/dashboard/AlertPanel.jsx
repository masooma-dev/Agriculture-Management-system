import { useSelector } from 'react-redux';
import { selectAlerts } from '../../store/selectors';

export default function AlertsPanel() {
  const alerts = useSelector(selectAlerts);

  if (!alerts.length) {
    return <div className="alert alert-success mb-0">No alerts. All good!</div>;
  }

  return (
    <div>
      {alerts.map((a, i) => (
        <div key={i} className={`alert alert-${a.type} py-2 mb-2`}>
          {a.msg}
        </div>
      ))}
    </div>
  );
}