export default function HumidityGauge({ humidity = 0 }) {
  let label = 'Optimal';
  let color = '#198754';
  if (humidity < 30) { label = 'Low'; color = '#fd7e14'; }
  else if (humidity > 60) { label = 'High'; color = '#dc3545'; }

  return (
    <div className="card p-3 text-center" style={{ minWidth: 170, maxWidth: 220, whiteSpace: 'nowrap' }}>
      <h6>Humidity</h6>
      <div
        style={{
          width: 110, height: 110, borderRadius: '50%', margin: '0 auto',
          background: `conic-gradient(${color} ${humidity * 3.6}deg, #e9ecef 0deg)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 84, height: 84, borderRadius: '50%', background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 20, color: '#000',
          }}
        >
          {humidity}%
        </div>
      </div>
      <span className="badge mt-2" style={{ background: color }}>{label}</span>
    </div>
  );
}