import { useSelector } from 'react-redux'
import { selectHarvestStats } from '../../store/selectors'

function Stat({ title, value, color }) {
  return (
    <div className="col-6 col-md-3">
      <div className={`card p-3 text-center border-${color}`}>
        <div className="small text-muted">{title}</div>
        <h3 className={`text-${color} mb-0`}>{value}</h3>
      </div>
    </div>
  )
}

export default function HarvestSummary() {
  const s = useSelector(selectHarvestStats)
  const pct = s.harvested ? Math.min(100, Math.round((s.sold / s.harvested) * 100)) : 0

  return (
    <div className="my-3">
      <div className="row g-3">
        <Stat title="Total Harvested" value={s.harvested} color="success" />
        <Stat title="Orders Received" value={s.ordered} color="primary" />
        <Stat title="Quantity Sold" value={s.sold} color="warning" />
        <Stat title="Remaining Stock" value={s.remaining} color="danger" />
      </div>
      <div className="mt-3">
        <small>Sold vs harvested: {pct}%</small>
        <div className="progress" style={{ height: 10 }}>
          <div className="progress-bar bg-success" style={{ width: `${pct}%` }} />
        </div>
        <small className="text-muted">
          Pending orders: {s.pending} | Delivered orders: {s.delivered}
        </small>
      </div>
    </div>
  )
}