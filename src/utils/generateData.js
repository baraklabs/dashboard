export function generateDummyData(timeRange = 'Last 30 Days') {
  let days = 30
  let multiplier = 1

  switch (timeRange) {
    case 'Last 7 Days':
      days = 7
      multiplier = 7 / 30
      break
    case 'Last 30 Days':
      days = 30
      multiplier = 1
      break
    case 'Last 90 Days':
      days = 90
      multiplier = 90 / 30
      break
    case 'Year to Date':
      days = 365
      multiplier = 365 / 30
      break
    default:
      days = 30
      multiplier = 1
  }

  const salesTrendLabels = []
  const salesTrendData = []
  const profitTrendData = []

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    salesTrendLabels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))

    const baseSales = 5000 * multiplier + Math.sin(i * 0.2) * 1000 + Math.random() * 800
    const profit = baseSales * (0.15 + Math.random() * 0.1)

    salesTrendData.push(Math.round(baseSales))
    profitTrendData.push(Math.round(profit))
  }

  const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Beauty']
  const categoryData = categories.map(() => Math.floor(Math.random() * 15000 * multiplier) + 5000)
  const categoryColors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c']

  const topProducts = [
    { name: 'Wireless Headphones', units: Math.round(245 * multiplier), revenue: Math.round(48900 * multiplier) },
    { name: 'Smart Watch Series 5', units: Math.round(189 * multiplier), revenue: Math.round(56700 * multiplier) },
    { name: 'Ergonomic Office Chair', units: Math.round(156 * multiplier), revenue: Math.round(39000 * multiplier) },
    { name: 'Bluetooth Speaker', units: Math.round(312 * multiplier), revenue: Math.round(15600 * multiplier) },
    { name: 'Gaming Mouse', units: Math.round(420 * multiplier), revenue: Math.round(21000 * multiplier) },
  ]

  const recentActivity = [
    { type: 'sale', amount: '$2,450', product: 'Wireless Headphones', time: '2 min ago' },
    { type: 'refund', amount: '$89', product: 'Bluetooth Speaker', time: '15 min ago' },
    { type: 'sale', amount: '$1,200', product: 'Smart Watch Series 5', time: '28 min ago' },
    { type: 'sale', amount: '$350', product: 'Ergonomic Office Chair', time: '45 min ago' },
    { type: 'sale', amount: '$1,800', product: 'Gaming Laptop', time: '1 hr ago' },
    { type: 'refund', amount: '$120', product: 'Gaming Mouse', time: '2 hrs ago' },
  ]

  const kpis = {
    totalRevenue: Math.round(1245890 * multiplier),
    totalOrders: Math.round(3420 * multiplier),
    avgOrderValue: 364,
    conversionRate: 3.2,
  }

  return {
    salesTrendLabels,
    salesTrendData,
    profitTrendData,
    categories,
    categoryData,
    categoryColors,
    topProducts,
    recentActivity,
    kpis,
  }
}
