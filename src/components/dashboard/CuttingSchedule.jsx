import { useSelector } from 'react-redux';
import { selectCuttingSchedule } from '../../store/cropsSlice';

export default function CuttingSchedule() {
  const rows = useSelector(selectCuttingSchedule);
  return (
    <div className="card p-3 my-3">
      <h5>Cutting Schedule</h5>
      {rows.length === 0 ? (
        <p>No crops with a cutting date yet.</p>
      ) : (
        <table className="table mb-0">
          <thead>
            <tr><th>Crop</th><th>Field</th><th>Cutting date</th><th>Days left</th></tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} style={{
                background: c.daysRemaining < 0 ? '#f8d7da' : c.daysRemaining <= 3 ? '#fff3cd' : 'transparent',
              }}>
                <td>{c.name}</td>
                <td>{c.field}</td>
                <td>{c.cuttingDate}</td>
                <td>
                  {c.daysRemaining < 0 ? `Overdue by ${-c.daysRemaining}`
                    : c.daysRemaining === 0 ? 'Today' : c.daysRemaining}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}