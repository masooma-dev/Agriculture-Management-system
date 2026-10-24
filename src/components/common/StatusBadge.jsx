const map = {
  Healthy: 'success',
  'Needs Attention': 'warning',
  Critical: 'danger',
  Pending: 'warning',
  Delivered: 'success',
  Done: 'success',
  Overdue: 'danger',
};

export default function StatusBadge({ status }) {
  return <span className={`badge bg-${map[status] || 'secondary'}`}>{status}</span>;
}