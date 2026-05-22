import { useState, useMemo } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { generateDummyData } from './utils/generateData'
import Header from './components/Header'
import KpiCard from './components/KpiCard'
import SalesTrendChart from './components/SalesTrendChart'
import CategoryChart from './components/CategoryChart'
import TopProductsTable from './components/TopProductsTable'
import RecentActivity from './components/RecentActivity'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function App() {
  const [timeRange, setTimeRange] = useState('Last 30 Days')
  const data = useMemo(() => generateDummyData(timeRange), [timeRange])

  const kpis = [
    { title: 'Total Revenue', value: `$${data.kpis.totalRevenue.toLocaleString()}`, change: '↑ 12.5% vs last month', positive: true },
    { title: 'Total Orders', value: data.kpis.totalOrders.toLocaleString(), change: '↑ 8.3% vs last month', positive: true },
    { title: 'Average Order Value', value: `$${data.kpis.avgOrderValue}`, change: '↑ 5.3% vs last month', positive: true },
    { title: 'Conversion Rate', value: `${data.kpis.conversionRate}%`, change: '↓ 2.1% vs last month', positive: false },
  ]

  return (
    <div className="dashboard">
      <Header timeRange={timeRange} onTimeRangeChange={setTimeRange} />

      <div className="kpis">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h3>Sales Trend</h3>
          <div className="chart-body">
            <SalesTrendChart
              labels={data.salesTrendLabels}
              salesData={data.salesTrendData}
              profitData={data.profitTrendData}
            />
          </div>
        </div>
        <div className="chart-card">
          <h3>Product Category Performance</h3>
          <div className="chart-body">
            <CategoryChart
              categories={data.categories}
              categoryData={data.categoryData}
              categoryColors={data.categoryColors}
            />
          </div>
        </div>
      </div>

      <div className="details-section">
        <div className="details-left">
          <h3>Top Performing Products</h3>
          <TopProductsTable products={data.topProducts} />
        </div>
        <div className="details-right">
          <h3>Recent Sales Activity</h3>
          <RecentActivity activities={data.recentActivity} />
        </div>
      </div>
    </div>
  )
}
