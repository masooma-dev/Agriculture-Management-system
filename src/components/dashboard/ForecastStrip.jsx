export default function ForecastStrip({ daily }) {
  return (
    <div className="d-flex gap-2 flex-wrap mt-3">
      {daily.time.map((day, i) => (
        <div key={day} className="border rounded p-2 text-center flex-fill">
          <div className="small fw-bold">
            {new Date(day).toLocaleDateString('en-US', { weekday: 'short' })}
          </div>
          <div>{Math.round(daily.temperature_2m_max[i])}° / {Math.round(daily.temperature_2m_min[i])}°</div>
          <div className="small text-muted">Rain {daily.precipitation_probability_max[i]}%</div>
        </div>
      ))}
    </div>
  )
}