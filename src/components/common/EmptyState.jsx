export default function EmptyState({ icon = '📭', text = 'No records yet.' }) {
  return (
    <div className="text-center text-muted p-4">
      <div style={{ fontSize: 40 }}>{icon}</div>
      {text}
    </div>
  );
}