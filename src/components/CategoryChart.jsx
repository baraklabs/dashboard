import { Doughnut } from 'react-chartjs-2'

const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: { padding: 8, font: { size: 11 }, boxWidth: 12 },
    },
    tooltip: {
      callbacks: {
        label(context) {
          const sum = context.dataset.data.reduce((a, b) => a + b, 0)
          const pct = ((context.parsed / sum) * 100).toFixed(1) + '%'
          return `${context.label}: $${context.parsed.toLocaleString()} (${pct})`
        },
      },
    },
  },
}

export default function CategoryChart({ categories, categoryData, categoryColors }) {
  const data = {
    labels: categories,
    datasets: [
      {
        data: categoryData,
        backgroundColor: categoryColors,
        borderWidth: 0,
        hoverBorderWidth: 2,
      },
    ],
  }

  return <Doughnut data={data} options={options} />
}
