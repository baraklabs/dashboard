import { Line } from 'react-chartjs-2'

const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  plugins: {
    legend: { position: 'top' },
    tooltip: { mode: 'index', intersect: false },
  },
  scales: {
    y: {
      beginAtZero: false,
      grid: { display: false },
      ticks: { callback: (v) => '$' + v.toLocaleString() },
    },
    x: {
      grid: { display: false },
      ticks: { autoSkip: true, maxTicksLimit: 8, maxRotation: 0 },
    },
  },
}

export default function SalesTrendChart({ labels, salesData, profitData }) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Sales ($)',
        data: salesData,
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        borderWidth: 3,
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Profit ($)',
        data: profitData,
        borderColor: '#2ecc71',
        backgroundColor: 'rgba(46, 204, 113, 0.1)',
        borderWidth: 3,
        tension: 0.3,
        fill: true,
      },
    ],
  }

  return <Line data={data} options={options} />
}
