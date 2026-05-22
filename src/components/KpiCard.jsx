export default function KpiCard({ title, value, change, positive }) {
  return (
    <div className="kpi-card">
      <h3>{title}</h3>
      <p className="kpi-value">{value}</p>
      <p className={`kpi-change ${positive ? 'positive' : 'negative'}`}>{change}</p>
    </div>
  )
}
