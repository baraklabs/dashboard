export default function RecentActivity({ activities }) {
  return (
    <div className="recent-activity">
      {activities.map((activity, i) => {
        const isSale = activity.type === 'sale'
        return (
          <div key={i} className="activity-item">
            <div className="activity-info">
              <div
                className="activity-icon"
                style={{ background: isSale ? '#27ae60' : '#e74c3c' }}
              >
                {isSale ? '↑' : '↓'}
              </div>
              <div className="activity-details">
                <h4>{activity.product}</h4>
                <p>
                  {isSale ? 'New Sale' : 'Refund Processed'} • {activity.time}
                </p>
              </div>
            </div>
            <div className="activity-amount">{activity.amount}</div>
          </div>
        )
      })}
    </div>
  )
}
