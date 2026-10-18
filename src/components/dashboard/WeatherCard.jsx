import useWeather from '../../hooks/useWeather'

function humidityStatus(h) {
  if (h < 30) return { label: 'Low', color: 'warning' }
  if (h <= 60) return { label: 'Optimal', color: 'success' }
  return { label: 'High', color: 'danger' }
}

export default function WeatherCard() {
  const { data, loading, error, updated } = useWeather()

  if (loading) return <div className="card p-3">Loading weather...</div>
  if (error) return <div className="card p-3 text-danger">Error: {error}</div>

  const c = data.current
  const h = humidityStatus(c.relative_humidity_2m)

  return (
    <div className="row g-3 mb-4">
      <div className="col-md-6">
        <div className="card p-3 h-100">
          <h5>Live Weather</h5>
          <h2>{c.temperature_2m}°C</h2>
          <p className="mb-1">Wind: {c.wind_speed_10m} km/h</p>
          <p className="mb-1">Rain chance: {data.daily.precipitation_probability_max[0]}%</p>
          <small className="text-muted">Last updated: {updated}</small>
        </div>
      </div>
      <div className="col-md-6">
        <div className="card p-3 h-100">
          <h5>Humidity</h5>
          <h2>{c.relative_humidity_2m}%</h2>
          <span className={`badge bg-${h.color}`}>{h.label}</span>
          <div className="progress mt-2">
            <div className={`progress-bar bg-${h.color}`} style={{ width: `${c.relative_humidity_2m}%` }}></div>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="d-flex gap-2 flex-wrap">
          {data.daily.time.map((d, i) => (
            <div key={d} className="card p-2 text-center flex-fill">
              <small>{d}</small>
              <strong>{Math.round(data.daily.temperature_2m_max[i])}° / {Math.round(data.daily.temperature_2m_min[i])}°</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}